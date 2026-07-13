<script lang="ts">
  // ─── Meme / felirat generátor (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      drop: "Húzd ide a képet, vagy kattints a tallózáshoz", formats: "JPG, PNG, WebP – max. 10 MB",
      top: "Felső felirat", bottom: "Alsó felirat", size: "Betűméret",
      topPh: "AMIKOR A KÓD ELSŐRE LEFUT", bottomPh: "DE NEM TUDOD MIÉRT",
      download: "PNG letöltése", preview: "Előnézet", empty: "Tölts fel egy képet a felirathoz.",
      hint: "Klasszikus Impact-stílusú felirat. A kép a böngésződben készül – nem kerül szerverre.",
    },
    ro: {
      drop: "Trage imaginea aici sau dă clic pentru a răsfoi", formats: "JPG, PNG, WebP – max. 10 MB",
      top: "Text sus", bottom: "Text jos", size: "Mărime font",
      topPh: "CÂND CODUL MERGE DIN PRIMA", bottomPh: "DAR NU ȘTII DE CE",
      download: "Descarcă PNG", preview: "Previzualizare", empty: "Încarcă o imagine pentru text.",
      hint: "Text în stil Impact clasic. Imaginea se creează în browserul tău – nu ajunge pe server.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let imgSrc = $state("");
  let topText = $state("");
  let bottomText = $state("");
  let fontScale = $state(1);
  let canvas = $state<HTMLCanvasElement>();
  let dragging = $state(false);

  function loadFile(f: File | undefined) {
    if (!f || !f.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => { imgSrc = (e.target?.result as string) ?? ""; };
    reader.readAsDataURL(f);
  }

  function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number) {
    if (!text) return;
    ctx.lineWidth = Math.max(2, fontSize / 14);
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  }

  $effect(() => {
    const src = imgSrc, top = topText, bot = bottomText, fs = fontScale;
    if (!src || !canvas || typeof document === "undefined") return;
    const img = new Image();
    img.onload = () => {
      if (!canvas) return;
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const fontSize = Math.round((img.height / 9) * fs);
      ctx.font = `bold ${fontSize}px Impact, "Arial Black", sans-serif`;
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#000";
      ctx.lineJoin = "round";
      const pad = fontSize * 0.3;
      ctx.textBaseline = "top";
      drawText(ctx, top.toUpperCase(), img.width / 2, pad, fontSize);
      ctx.textBaseline = "bottom";
      drawText(ctx, bot.toUpperCase(), img.width / 2, img.height - pad, fontSize);
    };
    img.src = src;
  });

  function download() {
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "meme.png"; a.click();
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
      <div class="dz-inner"><span class="dz-icon">🖼️</span><span class="dz-label">{L.drop}</span><span class="dz-sub">{L.formats}</span></div>
    </div>
    <div class="card"><p class="empty">{L.empty}</p></div>
  {:else}
    <div class="grid">
      <div class="card controls">
        <div class="field"><label class="lbl" for="mm-top">{L.top}</label><input id="mm-top" class="inp" type="text" bind:value={topText} placeholder={L.topPh} /></div>
        <div class="field"><label class="lbl" for="mm-bot">{L.bottom}</label><input id="mm-bot" class="inp" type="text" bind:value={bottomText} placeholder={L.bottomPh} /></div>
        <div class="field"><label class="lbl" for="mm-fs">{L.size}: <strong>{Math.round(fontScale * 100)}%</strong></label><input id="mm-fs" type="range" min="0.5" max="2" step="0.1" bind:value={fontScale} /></div>
        <button type="button" class="btn btn--primary" onclick={download}>⬇ {L.download}</button>
        <button type="button" class="btn btn--ghost" onclick={() => (imgSrc = "")}>↺</button>
      </div>
      <div class="card preview">
        <span class="lbl">{L.preview}</span>
        <div class="canvas-wrap"><canvas bind:this={canvas}></canvas></div>
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
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit; }
  .inp:focus { outline: none; border-color: var(--cat-kep, #3b82f6); box-shadow: 0 0 0 3px #3b82f622; }
  input[type="range"] { accent-color: var(--cat-kep, #3b82f6); }
  .preview { display: flex; flex-direction: column; gap: var(--sp-3); }
  .canvas-wrap { display: flex; align-items: center; justify-content: center; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-3); }
  canvas { max-width: 100%; max-height: 460px; height: auto; border-radius: var(--r-sm, 4px); }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; }
  .hint { margin: 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); }
  .btn--primary { background: var(--cat-kep, #3b82f6); color: #fff; border-color: transparent; }
  .btn--primary:hover { filter: brightness(1.08); }
  .btn--ghost { background: var(--bg-input); color: var(--text); }
  .btn--ghost:hover { border-color: var(--cat-kep, #3b82f6); }
</style>
