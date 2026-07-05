<script lang="ts">
  // ─── JSON ↔ XML konverter (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      j2x: "JSON → XML", x2j: "XML → JSON",
      inLbl: "Bemenet", outLbl: "Eredmény", copy: "Másolás", copied: "Másolva!",
      invalidJson: "Érvénytelen JSON", invalidXml: "Érvénytelen XML", empty: "Illessz be adatot a konvertáláshoz.",
      jsonPh: '{\n  "konyv": {\n    "cim": "Egri csillagok",\n    "ev": 1901\n  }\n}',
      xmlPh: '<konyv>\n  <cim>Egri csillagok</cim>\n  <ev>1901</ev>\n</konyv>',
      hint: "A konverzió józan alapértelmezéseket használ (ismételt elem → tömb). Minden a böngésződben.",
    },
    ro: {
      j2x: "JSON → XML", x2j: "XML → JSON",
      inLbl: "Intrare", outLbl: "Rezultat", copy: "Copiază", copied: "Copiat!",
      invalidJson: "JSON invalid", invalidXml: "XML invalid", empty: "Lipește date pentru conversie.",
      jsonPh: '{\n  "carte": {\n    "titlu": "Baltagul",\n    "an": 1930\n  }\n}',
      xmlPh: '<carte>\n  <titlu>Baltagul</titlu>\n  <an>1930</an>\n</carte>',
      hint: "Conversia folosește valori implicite rezonabile (element repetat → tablou). Totul în browserul tău.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let dir = $state<"j2x" | "x2j">("j2x");
  let input = $state("");
  let copied = $state(false);

  function esc(s: any): string {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function j2x(v: any, tag: string, depth: number): string {
    const pad = "  ".repeat(depth);
    if (Array.isArray(v)) return v.map((item) => j2x(item, tag, depth)).join("\n");
    if (v && typeof v === "object") {
      const inner = Object.entries(v).map(([k, val]) => j2x(val, k, depth + 1)).join("\n");
      return `${pad}<${tag}>\n${inner}\n${pad}</${tag}>`;
    }
    return `${pad}<${tag}>${esc(v)}</${tag}>`;
  }
  function x2j(node: Element): any {
    const els = Array.from(node.children);
    if (els.length === 0) {
      const txt = (node.textContent ?? "").trim();
      if (txt === "") return "";
      if (txt === "true") return true;
      if (txt === "false") return false;
      if (txt !== "" && !isNaN(Number(txt))) return Number(txt);
      return txt;
    }
    const obj: Record<string, any> = {};
    for (const c of els) {
      const val = x2j(c);
      const name = c.tagName;
      if (name in obj) {
        if (!Array.isArray(obj[name])) obj[name] = [obj[name]];
        obj[name].push(val);
      } else obj[name] = val;
    }
    return obj;
  }

  const result = $derived.by(() => {
    const t = input.trim();
    if (!t) return { ok: true, text: "", err: "" };
    if (dir === "j2x") {
      try {
        const data = JSON.parse(t);
        const rootTag = data && typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 1 ? Object.keys(data)[0] : "root";
        const body = rootTag === "root" ? j2x(data, "root", 0) : j2x((data as any)[rootTag], rootTag, 0);
        return { ok: true, text: `<?xml version="1.0" encoding="UTF-8"?>\n${body}`, err: "" };
      } catch { return { ok: false, text: "", err: L.invalidJson }; }
    } else {
      if (typeof DOMParser === "undefined") return { ok: true, text: "", err: "" };
      try {
        const doc = new DOMParser().parseFromString(t, "application/xml");
        if (doc.querySelector("parsererror") || !doc.documentElement) return { ok: false, text: "", err: L.invalidXml };
        const root = doc.documentElement;
        return { ok: true, text: JSON.stringify({ [root.tagName]: x2j(root) }, null, 2), err: "" };
      } catch { return { ok: false, text: "", err: L.invalidXml }; }
    }
  });

  async function copy() {
    if (!result.text) return;
    try { await navigator.clipboard.writeText(result.text); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="seg-wrap">
    <div class="seg" role="group">
      <button type="button" class:seg--active={dir === "j2x"} onclick={() => (dir = "j2x")}>{L.j2x}</button>
      <button type="button" class:seg--active={dir === "x2j"} onclick={() => (dir = "x2j")}>{L.x2j}</button>
    </div>
  </div>

  <div class="grid2">
    <div class="card"><label class="lbl" for="jx-in">{L.inLbl}</label>
      <textarea id="jx-in" class="inp ta" rows="10" bind:value={input} placeholder={dir === "j2x" ? L.jsonPh : L.xmlPh}></textarea></div>
    <div class="card">
      <div class="out-head"><h3 class="legend">{L.outLbl}</h3>
        <button type="button" class="btn btn--primary" onclick={copy} disabled={!result.text}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button></div>
      {#if result.err}<p class="err">⚠ {result.err}</p>
      {:else if result.text}<pre class="code"><code>{result.text}</code></pre>
      {:else}<p class="empty">{L.empty}</p>{/if}
    </div>
  </div>
  <p class="hint">{L.hint}</p>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-4); }
  .seg-wrap { display: flex; }
  .seg { display: inline-flex; border: 1px solid var(--border); border-radius: var(--r-md, 8px); overflow: hidden; }
  .seg button { background: var(--bg-input); color: var(--text-muted); border: none; border-right: 1px solid var(--border); padding: var(--sp-2) var(--sp-4); font-size: .8125rem; cursor: pointer; }
  .seg button:last-child { border-right: none; }
  .seg button.seg--active { background: var(--cat-fejleszto, #06b6d4); color: #fff; font-weight: 600; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
  @media (max-width: 720px) { .grid2 { grid-template-columns: 1fr; } }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .lbl { display: block; font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .85rem; font-family: var(--font-mono, monospace); }
  .inp:focus { outline: none; border-color: var(--cat-fejleszto, #06b6d4); box-shadow: 0 0 0 3px #06b6d422; }
  .ta { resize: vertical; }
  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow: auto; max-height: 360px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre; }
  .err { margin: 0; padding: var(--sp-4); color: var(--error); font-size: .85rem; background: var(--bg-input); border: 1px solid var(--error); border-radius: var(--r-md, 8px); }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-fejleszto, #06b6d4); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
