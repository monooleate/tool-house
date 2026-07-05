<script lang="ts">
  // ─── JSON Viewer – összecsukható fa (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      inputLbl: "JSON",
      inputPh: '{\n  "termek": "alma",\n  "ar": 250,\n  "cimkek": ["bio", "hazai"],\n  "raktar": { "db": 12, "elerheto": true }\n}',
      expandAll: "Összes kinyitása", collapseAll: "Összes becsukása",
      invalid: "Érvénytelen JSON", empty: "Illessz be JSON-t a fa-nézethez.",
      items: "elem", copyPath: "Útvonal másolva:",
      hint: "Kattints egy sorra az útvonala (pl. termek.raktar.db) másolásához. Minden feldolgozás a böngésződben.",
    },
    ro: {
      inputLbl: "JSON",
      inputPh: '{\n  "produs": "măr",\n  "pret": 250,\n  "etichete": ["bio", "local"],\n  "stoc": { "buc": 12, "disponibil": true }\n}',
      expandAll: "Extinde tot", collapseAll: "Restrânge tot",
      invalid: "JSON invalid", empty: "Lipește JSON pentru vizualizarea arborescentă.",
      items: "elemente", copyPath: "Cale copiată:",
      hint: "Dă clic pe un rând pentru a copia calea lui (ex. produs.stoc.buc). Toată procesarea are loc în browserul tău.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  type Row = { depth: number; key: string; isIndex: boolean; path: string; jsPath: string; type: string; hasChildren: boolean; childCount: number; preview: string };

  let input = $state("");
  let collapsed = $state<string[]>([]);
  let toast = $state("");

  const parsed = $derived.by(() => {
    const t = input.trim();
    if (!t) return { ok: true, rows: [] as Row[] };
    try {
      const data = JSON.parse(t);
      const rows: Row[] = [];
      walk(data, "", "root", 0, "$", "", true, rows);
      return { ok: true, rows };
    } catch {
      return { ok: false, rows: [] as Row[] };
    }
  });

  function typeOf(v: any): string {
    if (v === null) return "null";
    if (Array.isArray(v)) return "array";
    return typeof v;
  }
  function preview(v: any, type: string): string {
    if (type === "string") return `"${v}"`;
    if (type === "array") return `[${v.length}]`;
    if (type === "object") return `{${Object.keys(v).length}}`;
    return String(v);
  }
  function walk(v: any, key: string, key0: string, depth: number, path: string, jsBase: string, isIndex: boolean, out: Row[]) {
    const type = typeOf(v);
    const hasChildren = (type === "object" || type === "array") && (type === "array" ? v.length : Object.keys(v).length) > 0;
    const childCount = hasChildren ? (type === "array" ? v.length : Object.keys(v).length) : 0;
    const jsPath = depth === 0 ? "" : isIndex ? `${jsBase}[${key}]` : jsBase ? `${jsBase}.${key}` : key;
    out.push({ depth, key: depth === 0 ? "" : key, isIndex, path, jsPath, type, hasChildren, childCount, preview: preview(v, type) });
    if (hasChildren) {
      if (type === "array") v.forEach((c: any, i: number) => walk(c, String(i), "", depth + 1, `${path}/${i}`, jsPath, true, out));
      else for (const k of Object.keys(v)) walk(v[k], k, "", depth + 1, `${path}/${k}`, jsPath, false, out);
    }
  }

  function isHidden(path: string): boolean {
    for (const c of collapsed) if (path !== c && path.startsWith(c + "/")) return true;
    return false;
  }
  function toggle(path: string) {
    collapsed = collapsed.includes(path) ? collapsed.filter((c) => c !== path) : [...collapsed, path];
  }
  function expandAll() { collapsed = []; }
  function collapseAll() { collapsed = parsed.rows.filter((r) => r.hasChildren && r.depth > 0).map((r) => r.path); }

  async function copyPath(r: Row) {
    if (!r.jsPath) return;
    try { await navigator.clipboard.writeText(r.jsPath); toast = `${L.copyPath} ${r.jsPath}`; setTimeout(() => (toast = ""), 1800); } catch {}
  }
</script>

<div class="tool">
  <div class="card">
    <label class="lbl" for="jv-in">{L.inputLbl}</label>
    <textarea id="jv-in" class="inp ta" rows="6" bind:value={input} placeholder={L.inputPh}></textarea>
  </div>

  <div class="card">
    {#if !input.trim()}
      <p class="empty">{L.empty}</p>
    {:else if !parsed.ok}
      <p class="err">⚠ {L.invalid}</p>
    {:else}
      <div class="tree-head">
        <span class="badge">{parsed.rows.length} {L.items}</span>
        <div class="actions">
          <button type="button" class="mini" onclick={expandAll}>{L.expandAll}</button>
          <button type="button" class="mini" onclick={collapseAll}>{L.collapseAll}</button>
        </div>
      </div>
      <div class="tree">
        {#each parsed.rows as r (r.path)}
          {#if !isHidden(r.path)}
            <div class="row" style={`padding-left:${r.depth * 16}px`} onclick={() => copyPath(r)} role="button" tabindex="-1">
              {#if r.hasChildren}
                <button type="button" class="tog" onclick={(e) => { e.stopPropagation(); toggle(r.path); }}>{collapsed.includes(r.path) ? "▶" : "▼"}</button>
              {:else}<span class="tog tog--leaf"></span>{/if}
              {#if r.key !== ""}<span class="k">{r.isIndex ? `[${r.key}]` : r.key}</span><span class="colon">:</span>{/if}
              {#if r.hasChildren && collapsed.includes(r.path)}
                <span class="v v--muted">{r.type === "array" ? `[ … ${r.childCount} ]` : `{ … ${r.childCount} }`}</span>
              {:else if r.hasChildren}
                <span class="v v--bracket">{r.type === "array" ? "[" : "{"}</span>
              {:else}
                <span class="v v--{r.type}">{r.preview}</span>
              {/if}
            </div>
          {/if}
        {/each}
      </div>
      {#if toast}<p class="toast">✓ {toast}</p>{/if}
    {/if}
    <p class="hint">{L.hint}</p>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .lbl { display: block; font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .85rem; font-family: var(--font-mono, monospace); }
  .inp:focus { outline: none; border-color: var(--cat-fejleszto, #06b6d4); box-shadow: 0 0 0 3px #06b6d422; }
  .ta { resize: vertical; }

  .tree-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--sp-3); flex-wrap: wrap; gap: var(--sp-2); }
  .badge { font-family: var(--font-mono, monospace); font-size: .72rem; font-weight: 700; color: var(--cat-fejleszto, #06b6d4); }
  .actions { display: flex; gap: var(--sp-2); }
  .mini { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: 2px var(--sp-2); font-size: .75rem; color: var(--text-muted); cursor: pointer; }
  .mini:hover { border-color: var(--cat-fejleszto, #06b6d4); color: var(--cat-fejleszto, #06b6d4); }

  .tree { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.7; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-3); max-height: 460px; overflow: auto; }
  .row { display: flex; align-items: center; gap: 4px; border-radius: 4px; cursor: pointer; white-space: nowrap; }
  .row:hover { background: color-mix(in srgb, var(--cat-fejleszto, #06b6d4) 10%, transparent); }
  .tog { flex-shrink: 0; width: 14px; background: none; border: none; color: var(--text-subtle); cursor: pointer; font-size: .6rem; padding: 0; }
  .tog--leaf { cursor: default; }
  .k { color: var(--cat-fejleszto, #06b6d4); font-weight: 600; }
  .colon { color: var(--text-subtle); margin-right: 4px; }
  .v--string { color: #16a34a; }
  .v--number { color: #7c3aed; }
  .v--boolean { color: #ea580c; }
  .v--null { color: #dc2626; }
  .v--muted { color: var(--text-subtle); }
  .v--bracket { color: var(--text-muted); }
  .dark .v--string { color: #4ade80; }
  .dark .v--number { color: #a78bfa; }

  .err { margin: 0; padding: var(--sp-4); color: var(--error); font-size: .85rem; background: var(--bg-input); border: 1px solid var(--error); border-radius: var(--r-md, 8px); }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .toast { margin: var(--sp-3) 0 0; font-size: .78rem; color: var(--success); font-family: var(--font-mono, monospace); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }
</style>
