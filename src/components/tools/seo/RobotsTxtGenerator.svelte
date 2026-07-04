<script lang="ts">
  // ─── robots.txt generátor (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      presets: "Gyors sablonok",
      pAll: "Minden engedélyezve", pWp: "WordPress", pNone: "Semmi indexelés",
      agentLbl: "User-agent (melyik botra vonatkozik)",
      disallow: "Tiltott útvonalak (Disallow)", allow: "Engedélyezett útvonalak (Allow)",
      pathPh: "/admin/", allowPh: "/nyilvanos/",
      addDis: "Tiltás hozzáadása", addAll: "Engedély hozzáadása",
      crawl: "Crawl-delay (mp, opcionális)", sitemap: "Sitemap URL",
      sitemapPh: "https://pelda.hu/sitemap.xml",
      blockAi: "AI botok tiltása (GPTBot, CCBot, Google-Extended, ClaudeBot…)",
      output: "Generált robots.txt", copy: "Másolás", copied: "Másolva!", download: "Letöltés",
      hint: "Töltsd fel a webhelyed gyökerébe: pelda.hu/robots.txt. A robots.txt kérés, nem garancia – bizalmas tartalmat ne csak ezzel védj.",
    },
    ro: {
      presets: "Șabloane rapide",
      pAll: "Tot permis", pWp: "WordPress", pNone: "Fără indexare",
      agentLbl: "User-agent (pentru care bot se aplică)",
      disallow: "Căi interzise (Disallow)", allow: "Căi permise (Allow)",
      pathPh: "/admin/", allowPh: "/public/",
      addDis: "Adaugă interdicție", addAll: "Adaugă permisiune",
      crawl: "Crawl-delay (sec, opțional)", sitemap: "URL sitemap",
      sitemapPh: "https://exemplu.ro/sitemap.xml",
      blockAi: "Blochează boții AI (GPTBot, CCBot, Google-Extended, ClaudeBot…)",
      output: "robots.txt generat", copy: "Copiază", copied: "Copiat!", download: "Descarcă",
      hint: "Încarcă în rădăcina site-ului: exemplu.ro/robots.txt. robots.txt este o cerere, nu o garanție – nu proteja conținut confidențial doar cu el.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  const AI_BOTS = ["GPTBot", "ChatGPT-User", "CCBot", "Google-Extended", "anthropic-ai", "ClaudeBot", "PerplexityBot", "Bytespider"];

  let agent = $state("*");
  let disallow = $state<string[]>(["/admin/"]);
  let allow = $state<string[]>([]);
  let crawlDelay = $state("");
  let sitemap = $state("");
  let blockAi = $state(false);
  let copied = $state(false);

  function preset(kind: "all" | "wp" | "none") {
    agent = "*";
    if (kind === "all") { disallow = []; allow = ["/"]; }
    else if (kind === "wp") { disallow = ["/wp-admin/"]; allow = ["/wp-admin/admin-ajax.php"]; }
    else { disallow = ["/"]; allow = []; }
  }

  function addDis() { disallow = [...disallow, ""]; }
  function addAll() { allow = [...allow, ""]; }
  function setDis(i: number, v: string) { disallow = disallow.map((p, idx) => (idx === i ? v : p)); }
  function setAll(i: number, v: string) { allow = allow.map((p, idx) => (idx === i ? v : p)); }
  function delDis(i: number) { disallow = disallow.filter((_, idx) => idx !== i); }
  function delAll(i: number) { allow = allow.filter((_, idx) => idx !== i); }

  const output = $derived.by(() => {
    const lines: string[] = [];
    lines.push(`User-agent: ${agent.trim() || "*"}`);
    for (const p of disallow) if (p.trim()) lines.push(`Disallow: ${p.trim()}`);
    for (const p of allow) if (p.trim()) lines.push(`Allow: ${p.trim()}`);
    if (crawlDelay.trim() && !Number.isNaN(Number(crawlDelay))) lines.push(`Crawl-delay: ${crawlDelay.trim()}`);

    if (blockAi) {
      for (const bot of AI_BOTS) {
        lines.push("");
        lines.push(`User-agent: ${bot}`);
        lines.push("Disallow: /");
      }
    }
    if (sitemap.trim()) { lines.push(""); lines.push(`Sitemap: ${sitemap.trim()}`); }
    return lines.join("\n");
  });

  async function copy() {
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
  function download() {
    const blob = new Blob([output], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "robots.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  }
</script>

<div class="tool">
  <div class="presets">
    <span class="presets-lbl">{L.presets}:</span>
    <button type="button" class="chip" onclick={() => preset("all")}>{L.pAll}</button>
    <button type="button" class="chip" onclick={() => preset("wp")}>{L.pWp}</button>
    <button type="button" class="chip" onclick={() => preset("none")}>{L.pNone}</button>
  </div>

  <div class="grid">
    <div class="card form">
      <div class="field">
        <label class="lbl" for="rb-agent">{L.agentLbl}</label>
        <input id="rb-agent" class="inp" type="text" bind:value={agent} placeholder="*" />
      </div>

      <div class="field">
        <div class="list-head"><span class="lbl">{L.disallow}</span>
          <button type="button" class="mini" onclick={addDis}>+ {L.addDis}</button>
        </div>
        {#each disallow as p, i}
          <div class="path-row">
            <input class="inp" type="text" value={p} placeholder={L.pathPh} oninput={(e) => setDis(i, (e.target as HTMLInputElement).value)} />
            <button type="button" class="del" onclick={() => delDis(i)} aria-label="×">✕</button>
          </div>
        {/each}
      </div>

      <div class="field">
        <div class="list-head"><span class="lbl">{L.allow}</span>
          <button type="button" class="mini" onclick={addAll}>+ {L.addAll}</button>
        </div>
        {#each allow as p, i}
          <div class="path-row">
            <input class="inp" type="text" value={p} placeholder={L.allowPh} oninput={(e) => setAll(i, (e.target as HTMLInputElement).value)} />
            <button type="button" class="del" onclick={() => delAll(i)} aria-label="×">✕</button>
          </div>
        {/each}
      </div>

      <div class="row2">
        <div class="field">
          <label class="lbl" for="rb-crawl">{L.crawl}</label>
          <input id="rb-crawl" class="inp" type="number" min="0" bind:value={crawlDelay} placeholder="10" />
        </div>
        <div class="field">
          <label class="lbl" for="rb-sitemap">{L.sitemap}</label>
          <input id="rb-sitemap" class="inp" type="url" bind:value={sitemap} placeholder={L.sitemapPh} />
        </div>
      </div>

      <label class="check"><input type="checkbox" bind:checked={blockAi} /><span>{L.blockAi}</span></label>
    </div>

    <div class="card out">
      <div class="out-head">
        <h3 class="legend">{L.output}</h3>
        <div class="actions">
          <button type="button" class="btn btn--ghost" onclick={download} disabled={!output}>⬇ {L.download}</button>
          <button type="button" class="btn btn--primary" onclick={copy} disabled={!output}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>
        </div>
      </div>
      <pre class="code"><code>{output || "…"}</code></pre>
      <p class="hint">{L.hint}</p>
    </div>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .presets { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; }
  .presets-lbl { font-size: .8125rem; color: var(--text-muted); font-weight: 600; }
  .chip { background: var(--bg-input); border: 1px solid var(--border); border-radius: 999px; padding: var(--sp-1) var(--sp-3); font-size: .8125rem; color: var(--text); cursor: pointer; transition: all var(--t-fast, .15s); }
  .chip:hover { border-color: var(--cat-seo, #ec4899); color: var(--cat-seo, #ec4899); }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); align-items: start; }
  @media (max-width: 780px) { .grid { grid-template-columns: 1fr; } }

  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .form { display: flex; flex-direction: column; gap: var(--sp-4); }
  .field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
  @media (max-width: 520px) { .row2 { grid-template-columns: 1fr; } }

  .lbl { font-size: .8125rem; font-weight: 600; color: var(--text); }
  .list-head { display: flex; align-items: center; justify-content: space-between; }
  .mini { background: transparent; border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: 2px var(--sp-2); font-size: .75rem; color: var(--text-muted); cursor: pointer; }
  .mini:hover { border-color: var(--cat-seo, #ec4899); color: var(--cat-seo, #ec4899); }

  .path-row { display: grid; grid-template-columns: 1fr 32px; gap: var(--sp-2); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit; }
  .inp:focus { outline: none; border-color: var(--cat-seo, #ec4899); box-shadow: 0 0 0 3px #ec489922; }
  .del { background: transparent; border: 1px solid var(--border); border-radius: var(--r-md, 8px); cursor: pointer; color: var(--text-muted); }
  .del:hover { border-color: #dc2626; color: #dc2626; }

  .check { display: inline-flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; }
  .check input[type="checkbox"] { accent-color: var(--cat-seo, #ec4899); width: 16px; height: 16px; }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); flex-wrap: wrap; }
  .actions { display: flex; gap: var(--sp-2); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow-x: auto; max-height: 420px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre; }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-seo, #ec4899); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
  .btn--ghost { background: var(--bg-input); color: var(--text); }
  .btn--ghost:hover:not(:disabled) { border-color: var(--cat-seo, #ec4899); }
</style>
