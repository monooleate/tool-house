<script lang="ts">
  // ─── UUID generátor (v4, 100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      count: "Mennyiség", generate: "Újragenerálás",
      upper: "Nagybetűs", noDash: "Kötőjelek nélkül", quotes: "Idézőjelbe",
      output: "Generált UUID-k", copy: "Másolás", copied: "Másolva!",
      about: "v4 (véletlenszerű), kriptográfiailag biztonságos forrásból (crypto).",
      hint: "Az UUID-k a böngésződben, a Web Crypto API-val generálódnak – nem kerülnek szerverre.",
    },
    ro: {
      count: "Cantitate", generate: "Regenerează",
      upper: "Majuscule", noDash: "Fără cratime", quotes: "Între ghilimele",
      output: "UUID-uri generate", copy: "Copiază", copied: "Copiat!",
      about: "v4 (aleatoriu), dintr-o sursă criptografic sigură (crypto).",
      hint: "UUID-urile se generează în browserul tău, cu Web Crypto API – nu ajung pe server.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let count = $state(5);
  let upper = $state(false);
  let noDash = $state(false);
  let quotes = $state(false);
  let raw = $state<string[]>([]);
  let copied = $state(false);

  function uuidv4(): string {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = [...b].map((x) => x.toString(16).padStart(2, "0"));
    return `${h.slice(0, 4).join("")}-${h.slice(4, 6).join("")}-${h.slice(6, 8).join("")}-${h.slice(8, 10).join("")}-${h.slice(10, 16).join("")}`;
  }
  function generate() {
    const n = Math.max(1, Math.min(1000, Math.floor(count) || 1));
    if (typeof crypto === "undefined") return;
    raw = Array.from({ length: n }, () => uuidv4());
  }

  // Kliens-oldalon generál (mount + count változás) → nincs SSR-mismatch
  $effect(() => { count; generate(); });

  const output = $derived.by(() => {
    return raw.map((u) => {
      let s = u;
      if (upper) s = s.toUpperCase();
      if (noDash) s = s.replace(/-/g, "");
      if (quotes) s = `"${s}"`;
      return s;
    }).join("\n");
  });

  async function copy() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card controls">
    <div class="row">
      <div class="field cnt"><label class="lbl" for="uu-count">{L.count}</label><input id="uu-count" class="inp" type="number" min="1" max="1000" bind:value={count} /></div>
      <button type="button" class="btn btn--primary regen" onclick={generate}>🔄 {L.generate}</button>
    </div>
    <div class="opts">
      <label class="check"><input type="checkbox" bind:checked={upper} /><span>{L.upper}</span></label>
      <label class="check"><input type="checkbox" bind:checked={noDash} /><span>{L.noDash}</span></label>
      <label class="check"><input type="checkbox" bind:checked={quotes} /><span>{L.quotes}</span></label>
    </div>
    <p class="about">{L.about}</p>
  </div>

  <div class="card">
    <div class="out-head"><h3 class="legend">{L.output}{#if raw.length} · <span class="badge">{raw.length}</span>{/if}</h3>
      <button type="button" class="btn btn--primary" onclick={copy} disabled={!output}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button></div>
    <pre class="code"><code>{output}</code></pre>
    <p class="hint">{L.hint}</p>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .controls { display: flex; flex-direction: column; gap: var(--sp-4); }
  .row { display: flex; align-items: flex-end; gap: var(--sp-4); flex-wrap: wrap; }
  .field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .cnt { max-width: 140px; }
  .lbl { font-size: .8125rem; font-weight: 600; color: var(--text); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit; }
  .inp:focus { outline: none; border-color: var(--cat-fejleszto, #06b6d4); box-shadow: 0 0 0 3px #06b6d422; }
  .opts { display: flex; gap: var(--sp-5); flex-wrap: wrap; }
  .check { display: inline-flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; }
  .check input[type="checkbox"] { accent-color: var(--cat-fejleszto, #06b6d4); width: 16px; height: 16px; }
  .about { margin: 0; font-size: .75rem; color: var(--text-subtle); }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); flex-wrap: wrap; }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .badge { font-family: var(--font-mono, monospace); font-size: .72rem; font-weight: 700; color: var(--cat-fejleszto, #06b6d4); }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow: auto; max-height: 380px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .85rem; line-height: 1.7; color: var(--text); white-space: pre; }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-fejleszto, #06b6d4); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
  .regen { align-self: flex-end; }
</style>
