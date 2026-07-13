<script lang="ts">
  // ─── Kerek (kör) kivágás – avatar (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      drop: "Húzd ide a képet, vagy kattints a tallózáshoz", formats: "JPG, PNG, WebP – max. 10 MB",
      size: "Kimeneti méret (px)", border: "Keret vastagsága", borderColor: "Keret színe",
      preview: "Előnézet (átlátszó háttér)", download: "PNG letöltése", again: "Új kép",
      empty: "Tölts fel egy képet a kör alakú kivágáshoz.",
      hint: "A kép középről négyzetre vágódik, majd körré. Az eredmény átlátszó hátterű PNG – ideális profilképnek.",
    },
    ro: {
      drop: "Trage imaginea aici sau dă clic pentru a răsfoi", formats: "JPG, PNG, WebP – max. 10 MB",
      size: "Dimensiune ieșire (px)", border: "Grosime chenar", borderColor: "Culoare chenar",
      preview: "Previzualizare (fundal transparent)", download: "Descarcă PNG", again: "Imagine nouă",
      empty: "Încarcă o imagine pentru decuparea circulară.",
      hint: "Imaginea se decupează pătrat din centru, apoi în cerc. Rezultatul e PNG cu fundal transparent – ideal pentru poză de profil.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let imgSrc = $state("");
  let size = $state(400);
  let border = $state(0);
  let borderColor = $state("#ffffff");
  let dragging = $state(false);
  let canvas = $state<HTMLCanvasElement>();

  function loadFile(f: File | undefined) {
    if (!f || !f.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => { imgSrc = (e.target?.result as string) ?? ""; };
    reader.readAsDataURL(f);
  }

  $effect(() => {
    const src = imgSrc, s = Math.max(32, Math.min(2000, Math.floor(size) || 400)), bw = Math.max(0, Math.min(100, Math.floor(border) || 0)), bc = borderColor;
    if (!src || !canvas || typeof document === "undefined") return;
    const img = new Image();
    img.onload = () => {
      if (!canvas) return;
      canvas.width = s; canvas.height = s;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, s, s);
      const r = s / 2 - bw;
      ctx.save();
      ctx.beginPath();
      ctx.arc(s / 2, s / 2, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      const min = Math.min(img.width, img.height);
      const sx = (img.width - min) / 2, sy = (img.height - min) / 2;
      ctx.drawImage(img, sx, sy, min, min, bw, bw, s - 2 * bw, s - 2 * bw);
      ctx.restore();
      if (bw > 0) {
        ctx.beginPath();
        ctx.arc(s / 2, s / 2, r + bw / 2, 0, Math.PI * 2);
        ctx.lineWidth = bw;
        ctx.strokeStyle = bc;
        ctx.stroke();
      }
    };
    img.src = src;
  });

  function download() {
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "kor-avatar.png"; a.click();
      URL.revokeObjectURL(a.href);
    });
  }
</script>

<div class="tool">
  {#if !imgSrc}
    <div class="dz" class:dz--drag={dragging}
      ondragover={(e) => { e.preventDefault(); dragging = true; }} ondragleave={() => (dragging = false)}
      ondrop={(e) => { e.preventDefault(); dragging = false; loadFile(e.dataTransfer?.files?.[0]); }}>
      <input class="dz-input" type="file" accept="image/*" onchange={(e) => loadFile((e.target as HTMLInputElement).files?.[0])} />
      <div class="dz-inner"><span class="dz-icon">⭕</span><span class="dz-label">{L.drop}</span><span class="dz-sub">{L.formats}</span></div>
    </div>
    <div class="card"><p class="empty">{L.empty}</p></div>
  {:else}
    <div class="grid">
      <div class="card controls">
        <div class="field"><label class="lbl" for="kv-s">{L.size}: <strong>{size}px</strong></label><input id="kv-s" type="range" min="64" max="1024" step="8" bind:value={size} /></div>
        <div class="field"><label class="lbl" for="kv-b">{L.border}: <strong>{border}px</strong></label><input id="kv-b" type="range" min="0" max="60" bind:value={border} /></div>
        {#if border > 0}<div class="field"><label class="lbl" for="kv-bc">{L.borderColor}</label><input id="kv-bc" class="color" type="color" bind:value={borderColor} /></div>{/if}
        <button type="button" class="btn btn--primary" onclick={download}>⬇ {L.download}</button>
        <button type="button" class="btn btn--ghost" onclick={() => (imgSrc = "")}>↺ {L.again}</button>
      </div>
      <div class="card preview">
        <span class="lbl">{L.preview}</span>
        <div class="canvas-wrap checkered"><canvas bind:this={canvas}></canvas></div>
      </div>
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
  .grid { display: grid; grid-template-columns: 300px 1fr; gap: var(--sp-4); align-items: start; }
  @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .controls { display: flex; flex-direction: column; gap: var(--sp-4); }
  .field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .lbl { font-size: .8125rem; font-weight: 600; color: var(--text); }
  input[type="range"] { accent-color: var(--cat-kep, #3b82f6); }
  .color { width: 100%; height: 38px; padding: 2px; border: 1px solid var(--border); border-radius: var(--r-md, 8px); background: var(--bg-input); cursor: pointer; }
  .preview { display: flex; flex-direction: column; gap: var(--sp-3); }
  .canvas-wrap { display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); }
  .checkered { background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%); background-size: 16px 16px; background-position: 0 0, 0 8px, 8px -8px, -8px 0px; }
  canvas { max-width: 100%; max-height: 420px; height: auto; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; }
  .hint { margin: 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); }
  .btn--primary { background: var(--cat-kep, #3b82f6); color: #fff; border-color: transparent; }
  .btn--primary:hover { filter: brightness(1.08); }
  .btn--ghost { background: var(--bg-input); color: var(--text); }
  .btn--ghost:hover { border-color: var(--cat-kep, #3b82f6); }
</style>
