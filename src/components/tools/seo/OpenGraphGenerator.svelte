<script lang="ts">
  // ─── Open Graph generátor (100% kliensoldali, kétnyelvű build-idős) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      titleLbl: "og:title – cím", titlePh: "Cikk vagy oldal címe",
      descLbl: "og:description – leírás", descPh: "Rövid összefoglaló, ami a megosztásnál megjelenik.",
      urlLbl: "og:url – az oldal URL-je", urlPh: "https://pelda.hu/cikk/",
      imageLbl: "og:image – megosztási kép URL", imagePh: "https://pelda.hu/kep.jpg",
      typeLbl: "og:type – típus", siteLbl: "og:site_name – oldal neve", sitePh: "Az oldalad neve",
      localeLbl: "og:locale – nyelv", preview: "Előnézet (Facebook / LinkedIn)",
      output: "Generált Open Graph tagek", copy: "Másolás", copied: "Másolva!",
      noImg: "Nincs kép megadva", hint: "Ajánlott képméret: 1200 × 630 px (1.91:1). Illeszd a <head> szakaszba.",
      types: [
        { v: "website", l: "website – általános oldal" },
        { v: "article", l: "article – cikk / blogbejegyzés" },
        { v: "product", l: "product – termék" },
        { v: "profile", l: "profile – profil" },
        { v: "video.other", l: "video – videó" },
      ],
    },
    ro: {
      titleLbl: "og:title – titlu", titlePh: "Titlul articolului sau al paginii",
      descLbl: "og:description – descriere", descPh: "Rezumat scurt, care apare la partajare.",
      urlLbl: "og:url – URL-ul paginii", urlPh: "https://exemplu.ro/articol/",
      imageLbl: "og:image – URL imagine de partajare", imagePh: "https://exemplu.ro/imagine.jpg",
      typeLbl: "og:type – tip", siteLbl: "og:site_name – numele site-ului", sitePh: "Numele site-ului tău",
      localeLbl: "og:locale – limbă", preview: "Previzualizare (Facebook / LinkedIn)",
      output: "Tag-uri Open Graph generate", copy: "Copiază", copied: "Copiat!",
      noImg: "Nicio imagine specificată", hint: "Dimensiune recomandată: 1200 × 630 px (1.91:1). Inserează în secțiunea <head>.",
      types: [
        { v: "website", l: "website – pagină generală" },
        { v: "article", l: "article – articol / postare de blog" },
        { v: "product", l: "product – produs" },
        { v: "profile", l: "profile – profil" },
        { v: "video.other", l: "video – videoclip" },
      ],
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let ogTitle = $state("");
  let ogDesc = $state("");
  let ogUrl = $state("");
  let ogImage = $state("");
  let ogType = $state("website");
  let ogSite = $state("");
  let ogLocale = $state(LANG === "ro" ? "ro_RO" : "hu_HU");
  let copied = $state(false);
  let imgError = $state(false);

  function esc(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  const domain = $derived.by(() => {
    try { return new URL(ogUrl).hostname.replace(/^www\./, ""); } catch { return ogUrl ? ogUrl : "pelda.hu"; }
  });

  const output = $derived.by(() => {
    const lines: string[] = [];
    if (ogTitle.trim()) lines.push(`<meta property="og:title" content="${esc(ogTitle.trim())}">`);
    if (ogDesc.trim()) lines.push(`<meta property="og:description" content="${esc(ogDesc.trim())}">`);
    if (ogUrl.trim()) lines.push(`<meta property="og:url" content="${esc(ogUrl.trim())}">`);
    if (ogImage.trim()) lines.push(`<meta property="og:image" content="${esc(ogImage.trim())}">`);
    if (ogType) lines.push(`<meta property="og:type" content="${ogType}">`);
    if (ogSite.trim()) lines.push(`<meta property="og:site_name" content="${esc(ogSite.trim())}">`);
    if (ogLocale.trim()) lines.push(`<meta property="og:locale" content="${esc(ogLocale.trim())}">`);
    return lines.join("\n");
  });

  $effect(() => { ogImage; imgError = false; });

  async function copy() {
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="grid">
    <div class="card form">
      <div class="field">
        <label class="lbl" for="og-title">{L.titleLbl}</label>
        <input id="og-title" class="inp" type="text" bind:value={ogTitle} placeholder={L.titlePh} />
      </div>
      <div class="field">
        <label class="lbl" for="og-desc">{L.descLbl}</label>
        <textarea id="og-desc" class="inp ta" rows="2" bind:value={ogDesc} placeholder={L.descPh}></textarea>
      </div>
      <div class="field">
        <label class="lbl" for="og-url">{L.urlLbl}</label>
        <input id="og-url" class="inp" type="url" bind:value={ogUrl} placeholder={L.urlPh} />
      </div>
      <div class="field">
        <label class="lbl" for="og-image">{L.imageLbl}</label>
        <input id="og-image" class="inp" type="url" bind:value={ogImage} placeholder={L.imagePh} />
      </div>
      <div class="row2">
        <div class="field">
          <label class="lbl" for="og-type">{L.typeLbl}</label>
          <select id="og-type" class="inp" bind:value={ogType}>
            {#each L.types as t}<option value={t.v}>{t.l}</option>{/each}
          </select>
        </div>
        <div class="field">
          <label class="lbl" for="og-locale">{L.localeLbl}</label>
          <input id="og-locale" class="inp" type="text" bind:value={ogLocale} placeholder="hu_HU" />
        </div>
      </div>
      <div class="field">
        <label class="lbl" for="og-site">{L.siteLbl}</label>
        <input id="og-site" class="inp" type="text" bind:value={ogSite} placeholder={L.sitePh} />
      </div>
    </div>

    <div class="card out">
      <h3 class="legend">{L.preview}</h3>
      <div class="fb-card">
        <div class="fb-img">
          {#if ogImage.trim() && !imgError}
            <img src={ogImage} alt="" onerror={() => (imgError = true)} />
          {:else}
            <div class="fb-img__ph"><span>🖼️</span><small>{L.noImg}</small></div>
          {/if}
        </div>
        <div class="fb-meta">
          <div class="fb-domain">{domain}</div>
          <div class="fb-title">{ogTitle || L.titlePh}</div>
          <div class="fb-desc">{ogDesc || L.descPh}</div>
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

  /* Facebook/LinkedIn kártya */
  .fb-card { border: 1px solid var(--border); border-radius: var(--r-md, 8px); overflow: hidden; background: var(--bg-input); margin-bottom: var(--sp-5); }
  .fb-img { aspect-ratio: 1.91 / 1; background: var(--bg); display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .fb-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .fb-img__ph { display: flex; flex-direction: column; align-items: center; gap: var(--sp-2); color: var(--text-subtle); }
  .fb-img__ph span { font-size: 2rem; }
  .fb-img__ph small { font-size: .75rem; }
  .fb-meta { padding: var(--sp-3) var(--sp-4); border-top: 1px solid var(--border); }
  .fb-domain { font-size: .72rem; text-transform: uppercase; letter-spacing: .03em; color: var(--text-subtle); margin-bottom: 2px; }
  .fb-title { font-size: .95rem; font-weight: 700; color: var(--text); line-height: 1.3; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .fb-desc { font-size: .8125rem; color: var(--text-muted); line-height: 1.4; margin-top: 2px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow-x: auto; max-height: 300px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre; }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-seo, #ec4899); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
