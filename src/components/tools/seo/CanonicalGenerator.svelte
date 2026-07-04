<script lang="ts">
  // ─── Canonical tag generátor (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      inputLbl: "URL-ek (soronként egy)",
      inputPh: "https://pelda.hu/termek/cipo/\nhttps://pelda.hu/blog/cikk/",
      output: "Canonical tagek", copy: "Másolás", copied: "Másolva!",
      empty: "Illessz be egy vagy több URL-t.",
      warnRel: "⚠ Nem abszolút URL – a canonical mindig teljes (https://…) cím legyen.",
      hint: "Illeszd a tageket az oldalak <head> szakaszába. Minden oldal a saját canonical URL-jét kapja.",
    },
    ro: {
      inputLbl: "URL-uri (câte unul pe rând)",
      inputPh: "https://exemplu.ro/produs/pantof/\nhttps://exemplu.ro/blog/articol/",
      output: "Tag-uri canonical", copy: "Copiază", copied: "Copiat!",
      empty: "Lipește unul sau mai multe URL-uri.",
      warnRel: "⚠ URL non-absolut – canonical trebuie să fie mereu adresa completă (https://…).",
      hint: "Inserează tag-urile în secțiunea <head> a paginilor. Fiecare pagină primește propriul URL canonical.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let input = $state("");
  let copied = $state(false);

  function esc(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function isAbsolute(s: string): boolean {
    return /^https?:\/\//i.test(s);
  }

  const lines = $derived(input.split("\n").map((l) => l.trim()).filter(Boolean));
  const output = $derived(lines.map((u) => `<link rel="canonical" href="${esc(u)}">`).join("\n"));
  const hasRelative = $derived(lines.some((u) => !isAbsolute(u)));

  async function copy() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card">
    <label class="lbl" for="can-in">{L.inputLbl}</label>
    <textarea id="can-in" class="inp ta" rows="4" bind:value={input} placeholder={L.inputPh}></textarea>
    {#if hasRelative}<p class="warn">{L.warnRel}</p>{/if}
  </div>

  <div class="card">
    <div class="out-head">
      <h3 class="legend">{L.output}</h3>
      <button type="button" class="btn btn--primary" onclick={copy} disabled={!output}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>
    </div>
    {#if output}
      <pre class="code"><code>{output}</code></pre>
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
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: var(--font-mono, monospace); }
  .inp:focus { outline: none; border-color: var(--cat-seo, #ec4899); box-shadow: 0 0 0 3px #ec489922; }
  .ta { resize: vertical; min-height: 92px; }
  .warn { margin: var(--sp-3) 0 0; font-size: .78rem; color: var(--warning); }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow-x: auto; max-height: 320px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-seo, #ec4899); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
