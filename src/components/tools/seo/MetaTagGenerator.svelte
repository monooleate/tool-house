<script lang="ts">
  // ─── Meta-tag generátor (100% kliensoldali, kétnyelvű build-idős) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      titleLbl: "Oldal címe (title)", titlePh: "Ingyenes online eszközök – Konvertalo.hu",
      descLbl: "Meta leírás (description)", descPh: "Rövid, figyelemfelkeltő összefoglaló az oldalról, kb. 150–160 karakterben.",
      canonicalLbl: "Canonical URL", canonicalPh: "https://pelda.hu/oldal/",
      robotsLbl: "Indexelés (robots)", authorLbl: "Szerző (author)", authorPh: "Kovács Anna",
      keywordsLbl: "Kulcsszavak (opcionális)", keywordsPh: "online eszköz, konvertáló, ingyenes",
      themeLbl: "Téma szín (theme-color)", langLbl: "Nyelv (lang)",
      viewportLbl: "Reszponzív viewport meta", charsetLbl: "UTF-8 charset meta",
      output: "Generált meta tagek", copy: "Másolás", copied: "Másolva!",
      chars: "karakter", ok: "ideális", warn: "kicsit hosszú", over: "túl hosszú", empty: "üres",
      hint: "Illeszd a <head> szakaszba. Csak a kitöltött mezők kerülnek a kimenetbe.",
      robotsOpts: [
        { v: "index, follow", l: "index, follow – normál (ajánlott)" },
        { v: "noindex, follow", l: "noindex, follow – ne indexelje, linkeket kövesse" },
        { v: "index, nofollow", l: "index, nofollow – indexelje, linkeket ne" },
        { v: "noindex, nofollow", l: "noindex, nofollow – teljes kizárás" },
      ],
    },
    ro: {
      titleLbl: "Titlul paginii (title)", titlePh: "Instrumente online gratuite – InstrumenteOnline",
      descLbl: "Meta descriere (description)", descPh: "Rezumat scurt și atractiv al paginii, în circa 150–160 de caractere.",
      canonicalLbl: "URL canonical", canonicalPh: "https://exemplu.ro/pagina/",
      robotsLbl: "Indexare (robots)", authorLbl: "Autor (author)", authorPh: "Ion Popescu",
      keywordsLbl: "Cuvinte cheie (opțional)", keywordsPh: "instrument online, convertor, gratuit",
      themeLbl: "Culoare temă (theme-color)", langLbl: "Limbă (lang)",
      viewportLbl: "Meta viewport responsiv", charsetLbl: "Meta charset UTF-8",
      output: "Meta tag-uri generate", copy: "Copiază", copied: "Copiat!",
      chars: "caractere", ok: "ideal", warn: "puțin cam lung", over: "prea lung", empty: "gol",
      hint: "Inserează în secțiunea <head>. Doar câmpurile completate ajung în rezultat.",
      robotsOpts: [
        { v: "index, follow", l: "index, follow – normal (recomandat)" },
        { v: "noindex, follow", l: "noindex, follow – neindexat, urmărește linkurile" },
        { v: "index, nofollow", l: "index, nofollow – indexat, fără urmărire linkuri" },
        { v: "noindex, nofollow", l: "noindex, nofollow – excludere completă" },
      ],
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let title = $state("");
  let description = $state("");
  let canonical = $state("");
  let robots = $state("index, follow");
  let author = $state("");
  let keywords = $state("");
  let themeColor = $state("#2563eb");
  let useTheme = $state(false);
  let pageLang = $state(LANG);
  let viewport = $state(true);
  let charset = $state(true);
  let copied = $state(false);

  const TITLE_MAX = 60;
  const DESC_MAX = 160;

  function esc(s: string): string {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function statusOf(len: number, max: number): "empty" | "ok" | "warn" | "over" {
    if (len === 0) return "empty";
    if (len <= max) return "ok";
    if (len <= max + max * 0.15) return "warn";
    return "over";
  }

  const titleStatus = $derived(statusOf(title.length, TITLE_MAX));
  const descStatus = $derived(statusOf(description.length, DESC_MAX));

  const output = $derived.by(() => {
    const lines: string[] = [];
    if (charset) lines.push(`<meta charset="UTF-8">`);
    if (viewport) lines.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
    if (title.trim()) lines.push(`<title>${esc(title.trim())}</title>`);
    if (description.trim()) lines.push(`<meta name="description" content="${esc(description.trim())}">`);
    if (canonical.trim()) lines.push(`<link rel="canonical" href="${esc(canonical.trim())}">`);
    if (robots) lines.push(`<meta name="robots" content="${robots}">`);
    if (author.trim()) lines.push(`<meta name="author" content="${esc(author.trim())}">`);
    if (keywords.trim()) lines.push(`<meta name="keywords" content="${esc(keywords.trim())}">`);
    if (useTheme && themeColor) lines.push(`<meta name="theme-color" content="${themeColor}">`);
    if (pageLang.trim()) lines.push(`<html lang="${esc(pageLang.trim())}">`);
    return lines.join("\n");
  });

  function colorFor(s: string): string {
    if (s === "ok") return "var(--success)";
    if (s === "warn") return "var(--warning)";
    if (s === "over") return "var(--error)";
    return "var(--text-subtle)";
  }
  function labelFor(s: string): string {
    return s === "ok" ? L.ok : s === "warn" ? L.warn : s === "over" ? L.over : L.empty;
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(output);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch {}
  }
</script>

<div class="tool">
  <div class="grid">
    <!-- Bal: űrlap -->
    <div class="card form">
      <div class="field">
        <label class="lbl" for="mt-title">{L.titleLbl}</label>
        <input id="mt-title" class="inp" type="text" bind:value={title} placeholder={L.titlePh} />
        <div class="meter">
          <span class="count" style={`color:${colorFor(titleStatus)}`}>{title.length}/{TITLE_MAX} {L.chars}</span>
          <span class="tag" style={`color:${colorFor(titleStatus)}`}>{labelFor(titleStatus)}</span>
        </div>
      </div>

      <div class="field">
        <label class="lbl" for="mt-desc">{L.descLbl}</label>
        <textarea id="mt-desc" class="inp ta" rows="3" bind:value={description} placeholder={L.descPh}></textarea>
        <div class="meter">
          <span class="count" style={`color:${colorFor(descStatus)}`}>{description.length}/{DESC_MAX} {L.chars}</span>
          <span class="tag" style={`color:${colorFor(descStatus)}`}>{labelFor(descStatus)}</span>
        </div>
      </div>

      <div class="field">
        <label class="lbl" for="mt-canon">{L.canonicalLbl}</label>
        <input id="mt-canon" class="inp" type="url" bind:value={canonical} placeholder={L.canonicalPh} />
      </div>

      <div class="field">
        <label class="lbl" for="mt-robots">{L.robotsLbl}</label>
        <select id="mt-robots" class="inp" bind:value={robots}>
          {#each L.robotsOpts as o}
            <option value={o.v}>{o.l}</option>
          {/each}
        </select>
      </div>

      <div class="row2">
        <div class="field">
          <label class="lbl" for="mt-author">{L.authorLbl}</label>
          <input id="mt-author" class="inp" type="text" bind:value={author} placeholder={L.authorPh} />
        </div>
        <div class="field">
          <label class="lbl" for="mt-lang">{L.langLbl}</label>
          <input id="mt-lang" class="inp" type="text" bind:value={pageLang} placeholder="hu" />
        </div>
      </div>

      <div class="field">
        <label class="lbl" for="mt-kw">{L.keywordsLbl}</label>
        <input id="mt-kw" class="inp" type="text" bind:value={keywords} placeholder={L.keywordsPh} />
      </div>

      <div class="row2">
        <label class="check">
          <input type="checkbox" bind:checked={useTheme} />
          <span>{L.themeLbl}</span>
          {#if useTheme}
            <input class="color" type="color" bind:value={themeColor} aria-label={L.themeLbl} />
          {/if}
        </label>
      </div>

      <div class="row2">
        <label class="check"><input type="checkbox" bind:checked={viewport} /><span>{L.viewportLbl}</span></label>
        <label class="check"><input type="checkbox" bind:checked={charset} /><span>{L.charsetLbl}</span></label>
      </div>
    </div>

    <!-- Jobb: kimenet -->
    <div class="card out">
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
  .inp {
    width: 100%; background: var(--bg-input); color: var(--text);
    border: 1px solid var(--border); border-radius: var(--r-md, 8px);
    padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit;
  }
  .inp:focus { outline: none; border-color: var(--cat-seo, #ec4899); box-shadow: 0 0 0 3px #ec489922; }
  .ta { resize: vertical; min-height: 68px; }

  .meter { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-2); }
  .count, .tag { font-family: var(--font-mono, monospace); font-size: .72rem; font-weight: 700; }
  .tag { text-transform: uppercase; letter-spacing: .04em; }

  .check { display: inline-flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; }
  .check input[type="checkbox"] { accent-color: var(--cat-seo, #ec4899); width: 16px; height: 16px; }
  .color { width: 40px; height: 26px; padding: 2px; border: 1px solid var(--border); border-radius: var(--r-md, 8px); background: var(--bg-input); cursor: pointer; }

  .out { position: sticky; top: var(--sp-4); }
  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow-x: auto; max-height: 420px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre; }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-seo, #ec4899); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
