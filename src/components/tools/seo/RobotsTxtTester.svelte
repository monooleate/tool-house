<script lang="ts">
  // ─── robots.txt ellenőrző / tesztelő (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      robotsLbl: "robots.txt tartalma",
      robotsPh: "User-agent: *\nDisallow: /admin/\nAllow: /admin/public/\n\nSitemap: https://pelda.hu/sitemap.xml",
      uaLbl: "User-agent", pathsLbl: "Tesztelendő URL-ek vagy útvonalak (soronként egy)",
      pathsPh: "/admin/beallitasok\n/admin/public/kep.jpg\nhttps://pelda.hu/blog/cikk/",
      results: "Eredmény", allowed: "Engedélyezett", blocked: "Tiltott",
      byRule: "szabály", noRule: "nincs egyező szabály (alapból engedélyezett)",
      empty: "Illeszd be a robots.txt-t és add meg a tesztelendő útvonalakat.",
      hint: "A Google-féle „leghosszabb egyező szabály nyer” logikát követi, wildcard (*) és sorvég ($) támogatással. Semmi nem kerül szerverre.",
    },
    ro: {
      robotsLbl: "Conținutul robots.txt",
      robotsPh: "User-agent: *\nDisallow: /admin/\nAllow: /admin/public/\n\nSitemap: https://exemplu.ro/sitemap.xml",
      uaLbl: "User-agent", pathsLbl: "URL-uri sau căi de testat (câte una pe rând)",
      pathsPh: "/admin/setari\n/admin/public/imagine.jpg\nhttps://exemplu.ro/blog/articol/",
      results: "Rezultat", allowed: "Permis", blocked: "Interzis",
      byRule: "regula", noRule: "nicio regulă potrivită (permis implicit)",
      empty: "Lipește robots.txt-ul și adaugă căile de testat.",
      hint: "Urmează logica Google „câștigă cea mai lungă regulă potrivită”, cu suport wildcard (*) și sfârșit de linie ($). Nimic nu ajunge pe server.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let robots = $state("");
  let ua = $state("Googlebot");
  let paths = $state("");

  type Rule = { type: "allow" | "disallow"; path: string };
  type Group = { agents: string[]; rules: Rule[] };

  function parseRobots(txt: string): Group[] {
    const groups: Group[] = [];
    let current: Group | null = null;
    let lastWasAgent = false;
    for (let raw of txt.split("\n")) {
      const line = raw.replace(/#.*/, "").trim();
      if (!line) continue;
      const idx = line.indexOf(":");
      if (idx < 0) continue;
      const field = line.slice(0, idx).trim().toLowerCase();
      const value = line.slice(idx + 1).trim();
      if (field === "user-agent") {
        if (!lastWasAgent || !current) { current = { agents: [], rules: [] }; groups.push(current); }
        current.agents.push(value.toLowerCase());
        lastWasAgent = true;
      } else if (field === "allow" || field === "disallow") {
        if (current) { current.rules.push({ type: field, path: value }); lastWasAgent = false; }
      } else {
        lastWasAgent = false;
      }
    }
    return groups;
  }

  function selectGroup(groups: Group[], agent: string): Group | null {
    const a = agent.toLowerCase();
    let best: Group | null = null, bestLen = -1, star: Group | null = null;
    for (const g of groups) {
      for (const name of g.agents) {
        if (name === "*") { if (!star) star = g; }
        else if (a.includes(name) && name.length > bestLen) { best = g; bestLen = name.length; }
      }
    }
    return best || star;
  }

  function ruleToRegex(rule: string): RegExp {
    let anchored = false, r = rule;
    if (r.endsWith("$")) { anchored = true; r = r.slice(0, -1); }
    let out = "";
    for (const ch of r) {
      if (ch === "*") out += ".*";
      else if (".+?^${}()|[]\\".includes(ch)) out += "\\" + ch;
      else out += ch;
    }
    return new RegExp("^" + out + (anchored ? "$" : ""));
  }

  function evaluate(group: Group | null, path: string): { allowed: boolean; rule: Rule | null } {
    if (!group) return { allowed: true, rule: null };
    let bestRule: Rule | null = null, bestLen = -1;
    for (const r of group.rules) {
      if (r.path === "") continue; // üres Disallow = nincs korlát
      if (ruleToRegex(r.path).test(path)) {
        const len = r.path.replace(/\$$/, "").length;
        if (len > bestLen || (len === bestLen && r.type === "allow")) { bestRule = r; bestLen = len; }
      }
    }
    if (!bestRule) return { allowed: true, rule: null };
    return { allowed: bestRule.type === "allow", rule: bestRule };
  }

  function toPath(u: string): string {
    try { const url = new URL(u); return url.pathname + url.search; } catch { return u.startsWith("/") ? u : "/" + u; }
  }

  const results = $derived.by(() => {
    if (!robots.trim() || !paths.trim()) return [];
    const groups = parseRobots(robots);
    const group = selectGroup(groups, ua.trim() || "*");
    return paths.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
      const p = toPath(line);
      const { allowed, rule } = evaluate(group, p);
      return { url: line, allowed, rule };
    });
  });
</script>

<div class="tool">
  <div class="card">
    <label class="lbl" for="rt-robots">{L.robotsLbl}</label>
    <textarea id="rt-robots" class="inp ta mono" rows="6" bind:value={robots} placeholder={L.robotsPh}></textarea>
    <div class="row">
      <label class="lbl inline" for="rt-ua">{L.uaLbl}</label>
      <input id="rt-ua" class="inp" type="text" bind:value={ua} placeholder="Googlebot" />
    </div>
    <label class="lbl" for="rt-paths">{L.pathsLbl}</label>
    <textarea id="rt-paths" class="inp ta mono" rows="4" bind:value={paths} placeholder={L.pathsPh}></textarea>
  </div>

  <div class="card">
    <h3 class="legend">{L.results}</h3>
    {#if results.length}
      <ul class="res">
        {#each results as r}
          <li class="res-row" class:res-row--ok={r.allowed} class:res-row--no={!r.allowed}>
            <span class="res-ico">{r.allowed ? "✅" : "🚫"}</span>
            <div class="res-body">
              <code class="res-url">{r.url}</code>
              <span class="res-status">{r.allowed ? L.allowed : L.blocked}
                {#if r.rule}<span class="res-rule"> · {L.byRule}: <code>{r.rule.type === "allow" ? "Allow" : "Disallow"}: {r.rule.path}</code></span>
                {:else}<span class="res-rule"> · {L.noRule}</span>{/if}
              </span>
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="empty">{L.empty}</p>
    {/if}
    <p class="hint">{L.hint}</p>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .lbl { display: block; font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }
  .lbl.inline { margin: 0; white-space: nowrap; }
  .row { display: flex; align-items: center; gap: var(--sp-3); margin: var(--sp-3) 0; }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit; }
  .inp:focus { outline: none; border-color: var(--cat-seo, #ec4899); box-shadow: 0 0 0 3px #ec489922; }
  .mono { font-family: var(--font-mono, monospace); }
  .ta { resize: vertical; }

  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0 0 var(--sp-3); }
  .res { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--sp-2); }
  .res-row { display: flex; gap: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--border); border-left-width: 3px; border-radius: var(--r-md, 8px); background: var(--bg-input); }
  .res-row--ok { border-left-color: var(--success); }
  .res-row--no { border-left-color: var(--error); }
  .res-ico { flex-shrink: 0; }
  .res-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .res-url { font-family: var(--font-mono, monospace); font-size: .82rem; color: var(--text); word-break: break-all; }
  .res-status { font-size: .78rem; color: var(--text-muted); }
  .res-rule code { font-family: var(--font-mono, monospace); font-size: .74rem; color: var(--text-subtle); }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }
</style>
