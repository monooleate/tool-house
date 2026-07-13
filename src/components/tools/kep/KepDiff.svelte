<script lang="ts">
  // ─── Kép-diff / összehasonlító (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      dropA: "Első kép (A)", dropB: "Második kép (B)", browse: "húzd ide vagy kattints",
      threshold: "Érzékenységi küszöb", result: "Különbség", changed: "eltérő pixel",
      diffView: "A piros terület mutatja az eltéréseket.", empty: "Tölts fel két képet az összehasonlításhoz.",
      download: "Diff letöltése", identical: "A két kép azonos a küszöb felett.",
      hint: "A képeket az A méretére igazítja. Minden feldolgozás a böngésződben – a képek nem kerülnek szerverre.",
    },
    ro: {
      dropA: "Prima imagine (A)", dropB: "A doua imagine (B)", browse: "trage aici sau dă clic",
      threshold: "Prag de sensibilitate", result: "Diferență", changed: "pixeli diferiți",
      diffView: "Zona roșie arată diferențele.", empty: "Încarcă două imagini pentru comparare.",
      download: "Descarcă diff", identical: "Cele două imagini sunt identice peste prag.",
      hint: "Imaginile sunt aduse la dimensiunea A. Toată procesarea în browser – imaginile nu ajung pe server.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let srcA = $state("");
  let srcB = $state("");
  let threshold = $state(25);
  let percent = $state<number | null>(null);
  let canvas = $state<HTMLCanvasElement>();

  function loadInto(setter: (v: string) => void, f: File | undefined) {
    if (!f || !f.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setter((e.target?.result as string) ?? "");
    reader.readAsDataURL(f);
  }

  $effect(() => {
    const sa = srcA, sb = srcB, th = threshold;
    if (!sa || !sb || !canvas || typeof document === "undefined") { percent = null; return; }
    const ia = new Image(), ib = new Image();
    let loaded = 0;
    const done = () => {
      if (++loaded < 2 || !canvas) return;
      const w = ia.width, h = ia.height;
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const off = document.createElement("canvas");
      off.width = w; off.height = h;
      const octx = off.getContext("2d");
      if (!octx) return;
      ctx.drawImage(ia, 0, 0, w, h);
      const a = ctx.getImageData(0, 0, w, h);
      octx.drawImage(ib, 0, 0, w, h);
      const b = octx.getImageData(0, 0, w, h).data;
      const out = ctx.createImageData(w, h);
      let changed = 0;
      for (let i = 0; i < a.data.length; i += 4) {
        const d = (Math.abs(a.data[i] - b[i]) + Math.abs(a.data[i + 1] - b[i + 1]) + Math.abs(a.data[i + 2] - b[i + 2])) / 3;
        if (d > th) {
          out.data[i] = 255; out.data[i + 1] = 40; out.data[i + 2] = 40; out.data[i + 3] = 255;
          changed++;
        } else {
          const g = (a.data[i] + a.data[i + 1] + a.data[i + 2]) / 3;
          const v = Math.round(g * 0.25 + 190);
          out.data[i] = out.data[i + 1] = out.data[i + 2] = v; out.data[i + 3] = 255;
        }
      }
      ctx.putImageData(out, 0, 0);
      percent = (changed / (w * h)) * 100;
    };
    ia.onload = done; ib.onload = done;
    ia.src = sa; ib.src = sb;
  });

  function download() {
    if (!canvas || percent === null) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "diff.png"; a.click();
      URL.revokeObjectURL(a.href);
    });
  }
</script>

<div class="tool">
  <div class="drops">
    {#each [{ lbl: L.dropA, src: srcA, set: (v: string) => (srcA = v) }, { lbl: L.dropB, src: srcB, set: (v: string) => (srcB = v) }] as slot}
      <div class="dz">
        <input class="dz-input" type="file" accept="image/*" onchange={(e) => loadInto(slot.set, (e.target as HTMLInputElement).files?.[0])} />
        {#if slot.src}<img class="thumb" src={slot.src} alt={slot.lbl} />{:else}
          <div class="dz-inner"><span class="dz-icon">🖼️</span><span class="dz-label">{slot.lbl}</span><span class="dz-sub">{L.browse}</span></div>{/if}
      </div>
    {/each}
  </div>

  {#if srcA && srcB}
    <div class="card">
      <div class="field"><label class="lbl" for="df-t">{L.threshold}: <strong>{threshold}</strong></label><input id="df-t" type="range" min="0" max="120" bind:value={threshold} /></div>
    </div>
    <div class="card">
      <div class="out-head"><h3 class="legend">{L.result}
        {#if percent !== null}· <span class="badge">{percent.toFixed(2)}% {L.changed}</span>{/if}</h3>
        <button type="button" class="btn btn--primary" onclick={download}>⬇ {L.download}</button></div>
      {#if percent === 0}<p class="identical">✓ {L.identical}</p>{/if}
      <div class="canvas-wrap"><canvas bind:this={canvas}></canvas></div>
      <p class="diff-note">{L.diffView}</p>
    </div>
  {:else}
    <div class="card"><p class="empty">{L.empty}</p></div>
  {/if}
  <p class="hint">{L.hint}</p>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-4); }
  .drops { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
  @media (max-width: 560px) { .drops { grid-template-columns: 1fr; } }
  .dz { position: relative; border: 2px dashed var(--border); border-radius: var(--r-lg, 12px); background: var(--bg-input); min-height: 160px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .dz-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; z-index: 2; }
  .dz-inner { display: flex; flex-direction: column; align-items: center; gap: var(--sp-2); pointer-events: none; padding: var(--sp-5); }
  .dz-icon { font-size: 1.75rem; }
  .dz-label { font-size: .875rem; font-weight: 600; color: var(--text); }
  .dz-sub { font-size: .75rem; color: var(--text-subtle); }
  .thumb { max-width: 100%; max-height: 200px; height: auto; display: block; }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .lbl { font-size: .8125rem; font-weight: 600; color: var(--text); }
  input[type="range"] { accent-color: var(--cat-kep, #3b82f6); }
  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); flex-wrap: wrap; }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .badge { font-family: var(--font-mono, monospace); font-size: .75rem; font-weight: 700; color: var(--cat-kep, #3b82f6); }
  .canvas-wrap { display: flex; align-items: center; justify-content: center; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-3); }
  canvas { max-width: 100%; max-height: 460px; height: auto; }
  .identical { margin: 0 0 var(--sp-3); padding: var(--sp-3); text-align: center; color: var(--success); font-weight: 600; font-size: .85rem; background: var(--bg-input); border-radius: var(--r-md, 8px); }
  .diff-note { margin: var(--sp-3) 0 0; font-size: .78rem; color: var(--text-subtle); }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; }
  .hint { margin: 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn--primary { background: var(--cat-kep, #3b82f6); color: #fff; border-color: transparent; }
  .btn--primary:hover { filter: brightness(1.08); }
</style>
