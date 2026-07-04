// ============================================================
// webp-anim.ts
// Függőség nélküli animált WebP muxer.
// Statikus, frame-enként kódolt WebP fájlokból (canvas.convertToBlob
// vagy @jsquash/webp) animált WebP konténert (RIFF/WEBP) épít:
//   VP8X (animation flag) + ANIM (loop) + ANMF* (frame-enként).
// A WebP bitstream/konténer formátum a libwebp spec szerint.
// ============================================================

/** 24-bites little-endian bájthármas. */
function u24le(n: number): number[] {
  return [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff];
}

/** RIFF chunk építése: fourCC(4) + size(4 LE) + payload + páros padding. */
function buildChunk(fourCC: string, payload: Uint8Array): Uint8Array {
  const size = payload.length;
  const padded = size + (size & 1);
  const out = new Uint8Array(8 + padded);
  out[0] = fourCC.charCodeAt(0);
  out[1] = fourCC.charCodeAt(1);
  out[2] = fourCC.charCodeAt(2);
  out[3] = fourCC.charCodeAt(3);
  out[4] = size & 0xff;
  out[5] = (size >> 8) & 0xff;
  out[6] = (size >> 16) & 0xff;
  out[7] = (size >> 24) & 0xff;
  out.set(payload, 8);
  return out;
}

interface ParsedChunk { fourCC: string; payload: Uint8Array; }

/** Egy WebP fájl chunk-jainak kiolvasása (a "RIFF....WEBP" fejléc után). */
function parseWebpChunks(buf: ArrayBuffer): ParsedChunk[] {
  const u8 = new Uint8Array(buf);
  const view = new DataView(buf);
  const chunks: ParsedChunk[] = [];
  let off = 12; // "RIFF"(4) + size(4) + "WEBP"(4)
  while (off + 8 <= u8.length) {
    const cc = String.fromCharCode(u8[off], u8[off + 1], u8[off + 2], u8[off + 3]);
    const size = view.getUint32(off + 4, true);
    const start = off + 8;
    if (start + size > u8.length) break;
    chunks.push({ fourCC: cc, payload: u8.subarray(start, start + size) });
    off = start + size + (size & 1); // padding bájt átugrása
  }
  return chunks;
}

/**
 * Egy statikus WebP fájlból kinyeri a frame-képadat chunk-jait
 * (opcionális ALPH + VP8 /VP8L), CHUNK formátumban, és jelzi az alfát.
 * A VP8X-et kihagyja — azt az animált konténer adja.
 */
function extractFrameData(buf: ArrayBuffer): { data: Uint8Array; hasAlpha: boolean } {
  const chunks = parseWebpChunks(buf);
  const parts: Uint8Array[] = [];
  let hasAlpha = false;
  for (const c of chunks) {
    if (c.fourCC === "ALPH") {
      hasAlpha = true;
      parts.push(buildChunk("ALPH", c.payload));
    } else if (c.fourCC === "VP8 " || c.fourCC === "VP8L") {
      // VP8L tartalmazhat beépített alfát
      if (c.fourCC === "VP8L") hasAlpha = true;
      parts.push(buildChunk(c.fourCC, c.payload));
    }
  }
  const total = parts.reduce((s, p) => s + p.length, 0);
  const data = new Uint8Array(total);
  let o = 0;
  for (const p of parts) { data.set(p, o); o += p.length; }
  return { data, hasAlpha };
}

export interface WebpAnimFrame {
  /** Egy frame statikus WebP fájlja (pl. canvas.convertToBlob eredménye). */
  webp: ArrayBuffer;
  /** Frame időtartam milliszekundumban. */
  duration: number;
}

/**
 * Animált WebP konténer építése azonos méretű frame-ekből.
 * Minden frame teljes vászonméretű (X=Y=0), no-blend + dispose-none.
 * @param loopCount 0 = végtelen ismétlés.
 */
export function muxAnimatedWebp(
  frames: WebpAnimFrame[],
  width: number,
  height: number,
  loopCount = 0,
): Blob {
  const anmfChunks: Uint8Array[] = [];
  let anyAlpha = false;

  for (const f of frames) {
    const { data, hasAlpha } = extractFrameData(f.webp);
    if (hasAlpha) anyAlpha = true;

    const header = new Uint8Array(16);
    header.set(u24le(0), 0);            // Frame X (×2-es egység → 0)
    header.set(u24le(0), 3);            // Frame Y
    header.set(u24le(width - 1), 6);    // Frame Width Minus One
    header.set(u24le(height - 1), 9);   // Frame Height Minus One
    header.set(u24le(Math.max(0, Math.round(f.duration))), 12); // Duration (ms)
    header[15] = 0x02;                  // flags: bit1 blending=1 (no blend), bit0 dispose=0 (none)

    const payload = new Uint8Array(header.length + data.length);
    payload.set(header, 0);
    payload.set(data, header.length);
    anmfChunks.push(buildChunk("ANMF", payload));
  }

  // VP8X – kiterjesztett fejléc animation (+alfa) flaggel
  const vp8x = new Uint8Array(10);
  vp8x[0] = 0x02 | (anyAlpha ? 0x10 : 0x00); // animation | alpha
  vp8x.set(u24le(width - 1), 4);
  vp8x.set(u24le(height - 1), 7);
  const vp8xChunk = buildChunk("VP8X", vp8x);

  // ANIM – háttérszín (BGRA, átlátszó) + loop count
  const anim = new Uint8Array(6);
  anim[4] = loopCount & 0xff;
  anim[5] = (loopCount >> 8) & 0xff;
  const animChunk = buildChunk("ANIM", anim);

  const bodyParts = [vp8xChunk, animChunk, ...anmfChunks];
  const bodyLen = bodyParts.reduce((s, p) => s + p.length, 0);

  const riffSize = 4 + bodyLen; // "WEBP" + body
  const out = new Uint8Array(12 + bodyLen);
  out[0] = 0x52; out[1] = 0x49; out[2] = 0x46; out[3] = 0x46; // "RIFF"
  out[4] = riffSize & 0xff; out[5] = (riffSize >> 8) & 0xff;
  out[6] = (riffSize >> 16) & 0xff; out[7] = (riffSize >> 24) & 0xff;
  out[8] = 0x57; out[9] = 0x45; out[10] = 0x42; out[11] = 0x50; // "WEBP"
  let o = 12;
  for (const p of bodyParts) { out.set(p, o); o += p.length; }

  return new Blob([out], { type: "image/webp" });
}
