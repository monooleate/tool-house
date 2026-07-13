<script lang="ts">
  // ─── QR-kód olvasó (100% kliensoldali, kétnyelvű, jsQR) ───
  import jsQR from "jsqr";
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      drop: "Húzd ide a QR-kódos képet, vagy kattints", formats: "JPG, PNG, WebP – max. 10 MB",
      result: "Dekódolt tartalom", notFound: "Nem található QR-kód a képen. Próbálj élesebb, jobban kivágott képet.",
      isUrl: "Ez egy URL. Biztonsági okból nem nyitjuk meg automatikusan – másold és ellenőrizd, mielőtt megnyitod.",
      copy: "Másolás", copied: "Másolva!", again: "Új kép", empty: "Tölts fel egy QR-kódot tartalmazó képet.",
      hint: "A dekódolás a böngésződben történik – a kép nem kerül szerverre.",
    },
    ro: {
      drop: "Trage aici imaginea cu cod QR sau dă clic", formats: "JPG, PNG, WebP – max. 10 MB",
      result: "Conținut decodat", notFound: "Nu s-a găsit niciun cod QR în imagine. Încearcă o imagine mai clară, mai bine decupată.",
      isUrl: "Acesta este un URL. Din motive de siguranță nu îl deschidem automat – copiază-l și verifică-l înainte de a-l deschide.",
      copy: "Copiază", copied: "Copiat!", again: "Imagine nouă", empty: "Încarcă o imagine care conține un cod QR.",
      hint: "Decodarea are loc în browserul tău – imaginea nu ajunge pe server.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let imgSrc = $state("");
  let result = $state<string | null>(null);
  let scanned = $state(false);
  let dragging = $state(false);
  let copied = $state(false);
  let canvas = $state<HTMLCanvasElement>();

  function loadFile(f: File | undefined) {
    if (!f || !f.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => { imgSrc = (e.target?.result as string) ?? ""; };
    reader.readAsDataURL(f);
  }

  $effect(() => {
    const src = imgSrc;
    if (!src || !canvas || typeof document === "undefined") { result = null; scanned = false; return; }
    const img = new Image();
    img.onload = () => {
      if (!canvas) return;
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsQR(data.data, data.width, data.height);
      result = code ? code.data : null;
      scanned = true;
    };
    img.src = src;
  });

  const isUrl = $derived(result ? /^https?:\/\//i.test(result.trim()) : false);

  async function copy() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <canvas bind:this={canvas} style="display:none"></canvas>
  {#if !imgSrc}
    <div class="dz" class:dz--drag={dragging}
      ondragover={(e) => { e.preventDefault(); dragging = true; }} ondragleave={() => (dragging = false)}
      ondrop={(e) => { e.preventDefault(); dragging = false; loadFile(e.dataTransfer?.files?.[0]); }}>
      <input class="dz-input" type="file" accept="image/*" onchange={(e) => loadFile((e.target as HTMLInputElement).files?.[0])} />
      <div class="dz-inner"><span class="dz-icon">📷</span><span class="dz-label">{L.drop}</span><span class="dz-sub">{L.formats}</span></div>
    </div>
    <div class="card"><p class="empty">{L.empty}</p></div>
  {:else}
    <div class="preview-row">
      <img class="thumb" src={imgSrc} alt="QR" />
      <button type="button" class="btn btn--ghost" onclick={() => (imgSrc = "")}>↺ {L.again}</button>
    </div>
    <div class="card">
      {#if result !== null}
        <div class="out-head"><h3 class="legend">{L.result}</h3>
          <button type="button" class="btn btn--primary" onclick={copy}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button></div>
        <div class="result">{result}</div>
        {#if isUrl}<p class="warn">⚠ {L.isUrl}</p>{/if}
      {:else if scanned}
        <p class="notfound">🔍 {L.notFound}</p>
      {/if}
    </div>
  {/if}
  <p class="hint">{L.hint}</p>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-4); }
  .dz { position: relative; border: 2px dashed var(--border); border-radius: var(--r-lg, 12px); background: var(--bg-input); padding: var(--sp-7) var(--sp-5); text-align: center; transition: all var(--t-fast, .15s); }
  .dz--drag { border-color: var(--cat-kep, #3b82f6); background: #3b82f610; }
  .dz-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
  .dz-inner { display: flex; flex-direction: column; align-items: center; gap: var(--sp-2); pointer-events: none; }
  .dz-icon { font-size: 2rem; }
  .dz-label { font-size: .9rem; font-weight: 600; color: var(--text); }
  .dz-sub { font-size: .78rem; color: var(--text-subtle); }
  .preview-row { display: flex; align-items: center; gap: var(--sp-4); flex-wrap: wrap; }
  .thumb { max-width: 160px; max-height: 160px; border: 1px solid var(--border); border-radius: var(--r-md, 8px); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .result { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); font-family: var(--font-mono, monospace); font-size: .875rem; color: var(--text); word-break: break-all; white-space: pre-wrap; }
  .warn { margin: var(--sp-3) 0 0; font-size: .78rem; color: var(--warning); line-height: 1.5; }
  .notfound { margin: 0; padding: var(--sp-4); text-align: center; color: var(--text-muted); font-size: .85rem; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; }
  .hint { margin: 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn--primary { background: var(--cat-kep, #3b82f6); color: #fff; border-color: transparent; }
  .btn--primary:hover { filter: brightness(1.08); }
  .btn--ghost { background: var(--bg-input); color: var(--text); }
  .btn--ghost:hover { border-color: var(--cat-kep, #3b82f6); }
</style>
