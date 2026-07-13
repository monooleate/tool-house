<script lang="ts">
  // ─── Kép → ASCII art (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      drop: "Húzd ide a képet, vagy kattints a tallózáshoz",
      formats: "JPG, PNG, WebP, GIF – max. 10 MB",
      widthLbl: "Szélesség (karakter)", charset: "Karakterkészlet", invert: "Invertálás",
      dense: "Sűrű (10 szint)", simple: "Egyszerű (5 szint)", blocks: "Blokkok",
      output: "ASCII eredmény", copy: "Másolás", copied: "Másolva!", download: "Letöltés (.txt)",
      empty: "Tölts fel egy képet az ASCII átalakításhoz.",
      hint: "A kép a böngésződben alakul ASCII szöveggé – nem kerül szerverre. Monospace betűvel néz ki a legjobban.",
    },
    ro: {
      drop: "Trage imaginea aici sau dă clic pentru a răsfoi",
      formats: "JPG, PNG, WebP, GIF – max. 10 MB",
      widthLbl: "Lățime (caractere)", charset: "Set de caractere", invert: "Inversare",
      dense: "Dens (10 niveluri)", simple: "Simplu (5 niveluri)", blocks: "Blocuri",
      output: "Rezultat ASCII", copy: "Copiază", copied: "Copiat!", download: "Descarcă (.txt)",
      empty: "Încarcă o imagine pentru conversia ASCII.",
      hint: "Imaginea devine text ASCII în browserul tău – nu ajunge pe server. Arată cel mai bine cu font monospace.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  const RAMPS: Record<string, string> = {
    dense: "@%#*+=-:. ",
    simple: "@+-. ",
    blocks: "█▓▒░ ",
  };

  let imgSrc = $state("");
  let asciiWidth = $state(90);
  let charset = $state("dense");
  let invert = $state(false);
  let ascii = $state("");
  let dragging = $state(false);
  let copied = $state(false);

  function loadFile(f: File | undefined) {
    if (!f || !f.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => { imgSrc = (e.target?.result as string) ?? ""; };
    reader.readAsDataURL(f);
  }

  $effect(() => {
    const src = imgSrc, w = Math.max(20, Math.min(300, Math.floor(asciiWidth) || 90)), cs = charset, inv = invert;
    if (!src || typeof document === "undefined") { ascii = ""; return; }
    const img = new Image();
    img.onload = () => {
      const rows = Math.max(1, Math.round(w * (img.height / img.width) * 0.5));
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = rows;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, rows);
      const data = ctx.getImageData(0, 0, w, rows).data;
      let ramp = RAMPS[cs] ?? RAMPS.dense;
      if (inv) ramp = [...ramp].reverse().join("");
      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          out += ramp[Math.min(ramp.length - 1, Math.floor((lum / 255) * ramp.length))];
        }
        out += "\n";
      }
      ascii = out;
    };
    img.src = src;
  });

  async function copy() {
    if (!ascii) return;
    try { await navigator.clipboard.writeText(ascii); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
  function download() {
    const blob = new Blob([ascii], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "ascii-art.txt"; a.click();
    URL.revokeObjectURL(a.href);
  }
</script>

<div class="tool">
  <div class="dz" class:dz--drag={dragging}
    ondragover={(e) => { e.preventDefault(); dragging = true; }}
    ondragleave={() => (dragging = false)}
    ondrop={(e) => { e.preventDefault(); dragging = false; loadFile(e.dataTransfer?.files?.[0]); }}>
    <input class="dz-input" type="file" accept="image/*" onchange={(e) => loadFile((e.target as HTMLInputElement).files?.[0])} />
    <div class="dz-inner"><span class="dz-icon">🖼️</span><span class="dz-label">{L.drop}</span><span class="dz-sub">{L.formats}</span></div>
  </div>

  {#if imgSrc}
    <div class="card controls">
      <div class="field"><label class="lbl" for="as-w">{L.widthLbl}: <strong>{asciiWidth}</strong></label><input id="as-w" type="range" min="20" max="200" bind:value={asciiWidth} /></div>
      <div class="opts">
        <label class="mini-f"><span>{L.charset}</span>
          <select class="inp" bind:value={charset}><option value="dense">{L.dense}</option><option value="simple">{L.simple}</option><option value="blocks">{L.blocks}</option></select></label>
        <label class="check"><input type="checkbox" bind:checked={invert} /><span>{L.invert}</span></label>
      </div>
    </div>
    <div class="card">
      <div class="out-head"><h3 class="legend">{L.output}</h3>
        <div class="actions">
          <button type="button" class="btn btn--ghost" onclick={download} disabled={!ascii}>⬇ {L.download}</button>
          <button type="button" class="btn btn--primary" onclick={copy} disabled={!ascii}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>
        </div></div>
      <pre class="ascii"><code>{ascii}</code></pre>
    </div>
  {:else}
    <div class="card"><p class="empty">{L.empty}</p></div>
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
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .controls { display: flex; flex-direction: column; gap: var(--sp-4); }
  .field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .lbl { font-size: .8125rem; font-weight: 600; color: var(--text); }
  input[type="range"] { accent-color: var(--cat-kep, #3b82f6); }
  .inp { background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .85rem; }
  .opts { display: flex; gap: var(--sp-5); align-items: center; flex-wrap: wrap; }
  .mini-f { display: flex; flex-direction: column; gap: var(--sp-1); font-size: .78rem; color: var(--text-muted); }
  .check { display: inline-flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; }
  .check input[type="checkbox"] { accent-color: var(--cat-kep, #3b82f6); width: 16px; height: 16px; }
  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); flex-wrap: wrap; }
  .actions { display: flex; gap: var(--sp-2); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .ascii { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-3); overflow: auto; max-height: 480px; }
  .ascii code { font-family: var(--font-mono, monospace); font-size: 6px; line-height: 6px; letter-spacing: 0; color: var(--text); white-space: pre; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; }
  .hint { margin: 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-kep, #3b82f6); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
  .btn--ghost { background: var(--bg-input); color: var(--text); }
  .btn--ghost:hover:not(:disabled) { border-color: var(--cat-kep, #3b82f6); }
</style>
