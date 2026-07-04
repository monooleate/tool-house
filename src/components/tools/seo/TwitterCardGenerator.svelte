<script lang="ts">
  // ─── Twitter/X Card generátor (100% kliensoldali, kétnyelvű build-idős) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      cardLbl: "twitter:card – kártyatípus",
      titleLbl: "twitter:title – cím", titlePh: "Cikk vagy oldal címe",
      descLbl: "twitter:description – leírás", descPh: "Rövid összefoglaló a megosztáshoz.",
      imageLbl: "twitter:image – kép URL", imagePh: "https://pelda.hu/kep.jpg",
      siteLbl: "twitter:site – oldal fiók (@)", sitePh: "@oldalad",
      creatorLbl: "twitter:creator – szerző fiók (@)", creatorPh: "@szerzo",
      preview: "Előnézet (X / Twitter)",
      output: "Generált Twitter Card tagek", copy: "Másolás", copied: "Másolva!",
      noImg: "Nincs kép megadva",
      hint: "A summary_large_image nagy képet mutat (2:1, min. 300×157 px). Illeszd a <head> szakaszba.",
      cards: [
        { v: "summary_large_image", l: "summary_large_image – nagy kép" },
        { v: "summary", l: "summary – kis, négyzetes kép" },
      ],
    },
    ro: {
      cardLbl: "twitter:card – tipul cardului",
      titleLbl: "twitter:title – titlu", titlePh: "Titlul articolului sau al paginii",
      descLbl: "twitter:description – descriere", descPh: "Rezumat scurt pentru partajare.",
      imageLbl: "twitter:image – URL imagine", imagePh: "https://exemplu.ro/imagine.jpg",
      siteLbl: "twitter:site – contul site-ului (@)", sitePh: "@site-ul-tau",
      creatorLbl: "twitter:creator – contul autorului (@)", creatorPh: "@autor",
      preview: "Previzualizare (X / Twitter)",
      output: "Tag-uri Twitter Card generate", copy: "Copiază", copied: "Copiat!",
      noImg: "Nicio imagine specificată",
      hint: "summary_large_image afișează o imagine mare (2:1, min. 300×157 px). Inserează în secțiunea <head>.",
      cards: [
        { v: "summary_large_image", l: "summary_large_image – imagine mare" },
        { v: "summary", l: "summary – imagine mică, pătrată" },
      ],
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let card = $state("summary_large_image");
  let twTitle = $state("");
  let twDesc = $state("");
  let twImage = $state("");
  let twSite = $state("");
  let twCreator = $state("");
  let copied = $state(false);
  let imgError = $state(false);

  function esc(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function normHandle(h: string): string {
    const t = h.trim();
    if (!t) return "";
    return t.startsWith("@") ? t : "@" + t;
  }

  const output = $derived.by(() => {
    const lines: string[] = [];
    if (card) lines.push(`<meta name="twitter:card" content="${card}">`);
    if (twTitle.trim()) lines.push(`<meta name="twitter:title" content="${esc(twTitle.trim())}">`);
    if (twDesc.trim()) lines.push(`<meta name="twitter:description" content="${esc(twDesc.trim())}">`);
    if (twImage.trim()) lines.push(`<meta name="twitter:image" content="${esc(twImage.trim())}">`);
    if (twSite.trim()) lines.push(`<meta name="twitter:site" content="${esc(normHandle(twSite))}">`);
    if (twCreator.trim()) lines.push(`<meta name="twitter:creator" content="${esc(normHandle(twCreator))}">`);
    return lines.join("\n");
  });

  $effect(() => { twImage; imgError = false; });

  async function copy() {
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="grid">
    <div class="card form">
      <div class="field">
        <label class="lbl" for="tw-card">{L.cardLbl}</label>
        <select id="tw-card" class="inp" bind:value={card}>
          {#each L.cards as c}<option value={c.v}>{c.l}</option>{/each}
        </select>
      </div>
      <div class="field">
        <label class="lbl" for="tw-title">{L.titleLbl}</label>
        <input id="tw-title" class="inp" type="text" bind:value={twTitle} placeholder={L.titlePh} />
      </div>
      <div class="field">
        <label class="lbl" for="tw-desc">{L.descLbl}</label>
        <textarea id="tw-desc" class="inp ta" rows="2" bind:value={twDesc} placeholder={L.descPh}></textarea>
      </div>
      <div class="field">
        <label class="lbl" for="tw-image">{L.imageLbl}</label>
        <input id="tw-image" class="inp" type="url" bind:value={twImage} placeholder={L.imagePh} />
      </div>
      <div class="row2">
        <div class="field">
          <label class="lbl" for="tw-site">{L.siteLbl}</label>
          <input id="tw-site" class="inp" type="text" bind:value={twSite} placeholder={L.sitePh} />
        </div>
        <div class="field">
          <label class="lbl" for="tw-creator">{L.creatorLbl}</label>
          <input id="tw-creator" class="inp" type="text" bind:value={twCreator} placeholder={L.creatorPh} />
        </div>
      </div>
    </div>

    <div class="card out">
      <h3 class="legend">{L.preview}</h3>
      <div class="tw-card" class:tw-card--small={card === "summary"}>
        <div class="tw-img">
          {#if twImage.trim() && !imgError}
            <img src={twImage} alt="" onerror={() => (imgError = true)} />
          {:else}
            <div class="tw-img__ph"><span>🖼️</span></div>
          {/if}
        </div>
        <div class="tw-meta">
          <div class="tw-title">{twTitle || L.titlePh}</div>
          <div class="tw-desc">{twDesc || L.descPh}</div>
          <div class="tw-domain">{normHandle(twSite) || "@oldal"}</div>
        </div>
      </div>

      <div class="out-head">
        <h3 class="legend">{L.output}</h3>
        <button type="button" class="btn btn--primary" onclick={copy} disabled={!output}>
          {copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}
        </button>
      </div>
      <pre class="code"><code>{output || "…"}</code></pre>
      <p class="hint">{L.hint}</p>
    </div>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); align-items: start; }
  @media (max-width: 780px) { .grid { grid-template-columns: 1fr; } }

  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .form { display: flex; flex-direction: column; gap: var(--sp-4); }
  .field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
  @media (max-width: 520px) { .row2 { grid-template-columns: 1fr; } }

  .lbl { font-size: .8125rem; font-weight: 600; color: var(--text); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit; }
  .inp:focus { outline: none; border-color: var(--cat-seo, #ec4899); box-shadow: 0 0 0 3px #ec489922; }
  .ta { resize: vertical; min-height: 56px; }

  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0 0 var(--sp-3); }

  /* X/Twitter kártya (summary_large_image) */
  .tw-card { border: 1px solid var(--border); border-radius: 16px; overflow: hidden; background: var(--bg-input); margin-bottom: var(--sp-5); }
  .tw-img { aspect-ratio: 2 / 1; background: var(--bg); display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .tw-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .tw-img__ph { color: var(--text-subtle); font-size: 2rem; }
  .tw-meta { padding: var(--sp-3) var(--sp-4); }
  .tw-title { font-size: .9rem; font-weight: 600; color: var(--text); line-height: 1.3; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
  .tw-desc { font-size: .8125rem; color: var(--text-muted); line-height: 1.4; margin-top: 2px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .tw-domain { font-size: .78rem; color: var(--text-subtle); margin-top: var(--sp-2); }
  /* summary = kis négyzetes kép balra */
  .tw-card--small { display: grid; grid-template-columns: 96px 1fr; }
  .tw-card--small .tw-img { aspect-ratio: 1 / 1; border-right: 1px solid var(--border); }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow-x: auto; max-height: 280px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre; }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-seo, #ec4899); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
