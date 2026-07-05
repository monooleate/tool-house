<script lang="ts">
  // ─── JSON → JSON Schema generátor (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      inLbl: "JSON minta", outLbl: "JSON Schema (draft-07)",
      required: "Minden mező kötelező (required)",
      inPh: '{\n  "id": 42,\n  "nev": "Anna",\n  "aktiv": true,\n  "cimkek": ["a", "b"]\n}',
      copy: "Másolás", copied: "Másolva!", invalid: "Érvénytelen JSON", empty: "Illessz be egy JSON mintát.",
      hint: "A séma a minta típusaiból következtet. Tömböknél az első elem a minta. Minden a böngésződben.",
    },
    ro: {
      inLbl: "Exemplu JSON", outLbl: "JSON Schema (draft-07)",
      required: "Toate câmpurile obligatorii (required)",
      inPh: '{\n  "id": 42,\n  "nume": "Ana",\n  "activ": true,\n  "etichete": ["a", "b"]\n}',
      copy: "Copiază", copied: "Copiat!", invalid: "JSON invalid", empty: "Lipește un exemplu JSON.",
      hint: "Schema deduce din tipurile exemplului. La tablouri, primul element e modelul. Totul în browser.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let input = $state("");
  let requiredAll = $state(true);
  let copied = $state(false);

  function infer(v: any): any {
    if (v === null) return { type: "null" };
    if (Array.isArray(v)) return v.length === 0 ? { type: "array", items: {} } : { type: "array", items: infer(v[0]) };
    const t = typeof v;
    if (t === "object") {
      const properties: Record<string, any> = {};
      const req: string[] = [];
      for (const k of Object.keys(v)) { properties[k] = infer(v[k]); req.push(k); }
      const node: any = { type: "object", properties };
      if (requiredAll && req.length) node.required = req;
      return node;
    }
    if (t === "number") return { type: Number.isInteger(v) ? "integer" : "number" };
    if (t === "boolean") return { type: "boolean" };
    return { type: "string" };
  }

  const result = $derived.by(() => {
    const t = input.trim();
    if (!t) return { ok: true, text: "" };
    try {
      const data = JSON.parse(t);
      const schema = { $schema: "http://json-schema.org/draft-07/schema#", ...infer(data) };
      return { ok: true, text: JSON.stringify(schema, null, 2) };
    } catch { return { ok: false, text: "" }; }
  });

  async function copy() {
    if (!result.text) return;
    try { await navigator.clipboard.writeText(result.text); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="grid2">
    <div class="card">
      <label class="lbl" for="js-in">{L.inLbl}</label>
      <textarea id="js-in" class="inp ta" rows="10" bind:value={input} placeholder={L.inPh}></textarea>
      <label class="check"><input type="checkbox" bind:checked={requiredAll} /><span>{L.required}</span></label>
    </div>
    <div class="card">
      <div class="out-head"><h3 class="legend">{L.outLbl}</h3>
        <button type="button" class="btn btn--primary" onclick={copy} disabled={!result.text}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button></div>
      {#if !input.trim()}<p class="empty">{L.empty}</p>
      {:else if !result.ok}<p class="err">⚠ {L.invalid}</p>
      {:else}<pre class="code"><code>{result.text}</code></pre>{/if}
    </div>
  </div>
  <p class="hint">{L.hint}</p>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-4); }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
  @media (max-width: 720px) { .grid2 { grid-template-columns: 1fr; } }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .lbl { display: block; font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .85rem; font-family: var(--font-mono, monospace); }
  .inp:focus { outline: none; border-color: var(--cat-fejleszto, #06b6d4); box-shadow: 0 0 0 3px #06b6d422; }
  .ta { resize: vertical; }
  .check { display: inline-flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; margin-top: var(--sp-3); }
  .check input[type="checkbox"] { accent-color: var(--cat-fejleszto, #06b6d4); width: 16px; height: 16px; }
  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow: auto; max-height: 380px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre; }
  .err { margin: 0; padding: var(--sp-4); color: var(--error); font-size: .85rem; background: var(--bg-input); border: 1px solid var(--error); border-radius: var(--r-md, 8px); }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-fejleszto, #06b6d4); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
