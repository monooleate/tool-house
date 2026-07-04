<script lang="ts">
  // ─── Sitemap URL ellenőrző (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      inputLbl: "XML sitemap tartalma",
      inputPh: '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://pelda.hu/</loc><lastmod>2026-07-01</lastmod></url>\n</urlset>',
      results: "URL-ek", count: "URL", indexNote: "Ez egy sitemap-index – az alábbi al-sitemapokra mutat:",
      lastmod: "módosítva", priority: "prioritás",
      copy: "URL-ek másolása", copied: "Másolva!",
      err: "⚠ Érvénytelen XML – ellenőrizd a beillesztett tartalmat.",
      empty: "Illeszd be egy XML sitemap tartalmát.",
      hint: "Az elemzés a böngésződben történik – a sitemap nem kerül szerverre. Nagy sitemapokat is kezel.",
    },
    ro: {
      inputLbl: "Conținutul sitemap XML",
      inputPh: '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://exemplu.ro/</loc><lastmod>2026-07-01</lastmod></url>\n</urlset>',
      results: "URL-uri", count: "URL", indexNote: "Acesta este un sitemap-index – indică următoarele sub-sitemapuri:",
      lastmod: "modificat", priority: "prioritate",
      copy: "Copiază URL-urile", copied: "Copiat!",
      err: "⚠ XML invalid – verifică conținutul lipit.",
      empty: "Lipește conținutul unui sitemap XML.",
      hint: "Analiza are loc în browserul tău – sitemap-ul nu ajunge pe server. Funcționează și cu sitemapuri mari.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let input = $state("");
  let copied = $state(false);

  const parsed = $derived.by(() => {
    const xml = input.trim();
    if (!xml || typeof DOMParser === "undefined") return { ok: true, isIndex: false, items: [] as { loc: string; lastmod: string; priority: string }[] };
    try {
      const doc = new DOMParser().parseFromString(xml, "application/xml");
      if (doc.querySelector("parsererror")) return { ok: false, isIndex: false, items: [] };
      const urlNodes = [...doc.getElementsByTagName("url")];
      const smNodes = [...doc.getElementsByTagName("sitemap")];
      const nodes = urlNodes.length ? urlNodes : smNodes;
      const items = nodes.map((n) => ({
        loc: n.getElementsByTagName("loc")[0]?.textContent?.trim() ?? "",
        lastmod: n.getElementsByTagName("lastmod")[0]?.textContent?.trim() ?? "",
        priority: n.getElementsByTagName("priority")[0]?.textContent?.trim() ?? "",
      })).filter((i) => i.loc);
      return { ok: true, isIndex: urlNodes.length === 0 && smNodes.length > 0, items };
    } catch {
      return { ok: false, isIndex: false, items: [] };
    }
  });

  async function copy() {
    const text = parsed.items.map((i) => i.loc).join("\n");
    if (!text) return;
    try { await navigator.clipboard.writeText(text); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card">
    <label class="lbl" for="sm-in">{L.inputLbl}</label>
    <textarea id="sm-in" class="inp ta mono" rows="7" bind:value={input} placeholder={L.inputPh}></textarea>
  </div>

  <div class="card">
    <div class="out-head">
      <h3 class="legend">{L.results}{#if parsed.items.length} · <span class="badge">{parsed.items.length} {L.count}</span>{/if}</h3>
      {#if parsed.items.length}<button type="button" class="btn btn--primary" onclick={copy}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>{/if}
    </div>
    {#if !input.trim()}
      <p class="empty">{L.empty}</p>
    {:else if !parsed.ok}
      <p class="err">{L.err}</p>
    {:else}
      {#if parsed.isIndex}<p class="note">{L.indexNote}</p>{/if}
      <ul class="list">
        {#each parsed.items as it}
          <li class="item">
            <code class="item-loc">{it.loc}</code>
            {#if it.lastmod || it.priority}
              <span class="item-meta">
                {#if it.lastmod}<span>{L.lastmod}: {it.lastmod}</span>{/if}
                {#if it.priority}<span>{L.priority}: {it.priority}</span>{/if}
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
    <p class="hint">{L.hint}</p>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .lbl { display: block; font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .82rem; }
  .inp:focus { outline: none; border-color: var(--cat-seo, #ec4899); box-shadow: 0 0 0 3px #ec489922; }
  .mono { font-family: var(--font-mono, monospace); }
  .ta { resize: vertical; }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); flex-wrap: wrap; }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .badge { font-family: var(--font-mono, monospace); font-size: .72rem; font-weight: 700; color: var(--cat-seo, #ec4899); }
  .note { margin: 0 0 var(--sp-3); font-size: .8rem; color: var(--text-muted); }
  .list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--sp-1); max-height: 380px; overflow-y: auto; }
  .item { display: flex; flex-direction: column; gap: 2px; padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); background: var(--bg-input); }
  .item-loc { font-family: var(--font-mono, monospace); font-size: .8rem; color: var(--text); word-break: break-all; }
  .item-meta { display: flex; gap: var(--sp-4); font-size: .72rem; color: var(--text-subtle); }
  .err { margin: 0; padding: var(--sp-4); color: var(--error); font-size: .8125rem; background: var(--bg-input); border: 1px solid var(--error); border-radius: var(--r-md, 8px); }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn--primary { background: var(--cat-seo, #ec4899); color: #fff; border-color: transparent; }
  .btn--primary:hover { filter: brightness(1.08); }
</style>
