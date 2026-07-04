<script lang="ts">
  // ─── URL normalizáló (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      inputLbl: "URL-ek (soronként egy)",
      inputPh: "HTTP://Www.Pelda.hu/Oldal/?b=2&a=1#szakasz",
      optHttps: "https kényszerítése", optWww: "www eltávolítása",
      optSlash: "Utolsó / eltávolítása", optFrag: "Fragment (#…) eltávolítása",
      optSort: "Query paraméterek rendezése", optLower: "Kisbetűsítés (host)",
      output: "Normalizált URL-ek", copy: "Másolás", copied: "Másolva!",
      empty: "Illessz be egy vagy több URL-t.",
      hint: "A host mindig kisbetűs lesz és a felesleges portok (:80, :443) eltűnnek. A hibás sorokat változatlanul hagyja.",
    },
    ro: {
      inputLbl: "URL-uri (câte unul pe rând)",
      inputPh: "HTTP://Www.Exemplu.ro/Pagina/?b=2&a=1#sectiune",
      optHttps: "Forțează https", optWww: "Elimină www",
      optSlash: "Elimină / final", optFrag: "Elimină fragment (#…)",
      optSort: "Sortează parametrii query", optLower: "Litere mici (host)",
      output: "URL-uri normalizate", copy: "Copiază", copied: "Copiat!",
      empty: "Lipește unul sau mai multe URL-uri.",
      hint: "Host-ul devine mereu cu litere mici și porturile inutile (:80, :443) dispar. Rândurile invalide rămân neschimbate.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let input = $state("");
  let forceHttps = $state(true);
  let removeWww = $state(false);
  let removeSlash = $state(true);
  let removeFrag = $state(true);
  let sortQuery = $state(false);
  let copied = $state(false);

  const output = $derived.by(() => {
    return input.split("\n").map((line) => {
      const t = line.trim();
      if (!t) return "";
      try {
        const u = new URL(t);
        if (forceHttps && u.protocol === "http:") u.protocol = "https:";
        if (removeWww) u.hostname = u.hostname.replace(/^www\./i, "");
        if (removeFrag) u.hash = "";
        if (sortQuery) {
          const entries = [...u.searchParams.entries()].sort((a, b) => a[0].localeCompare(b[0]));
          u.search = new URLSearchParams(entries).toString();
        }
        if (removeSlash && u.pathname.length > 1 && u.pathname.endsWith("/")) {
          u.pathname = u.pathname.replace(/\/+$/, "");
        }
        return u.toString();
      } catch {
        return t;
      }
    }).join("\n");
  });

  async function copy() {
    if (!output.trim()) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card">
    <label class="lbl" for="url-in">{L.inputLbl}</label>
    <textarea id="url-in" class="inp ta" rows="4" bind:value={input} placeholder={L.inputPh}></textarea>
    <div class="opts">
      <label class="check"><input type="checkbox" bind:checked={forceHttps} /><span>{L.optHttps}</span></label>
      <label class="check"><input type="checkbox" bind:checked={removeWww} /><span>{L.optWww}</span></label>
      <label class="check"><input type="checkbox" bind:checked={removeSlash} /><span>{L.optSlash}</span></label>
      <label class="check"><input type="checkbox" bind:checked={removeFrag} /><span>{L.optFrag}</span></label>
      <label class="check"><input type="checkbox" bind:checked={sortQuery} /><span>{L.optSort}</span></label>
    </div>
  </div>

  <div class="card">
    <div class="out-head">
      <h3 class="legend">{L.output}</h3>
      <button type="button" class="btn btn--primary" onclick={copy} disabled={!output.trim()}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>
    </div>
    {#if output.trim()}
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
  .opts { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2) var(--sp-4); margin-top: var(--sp-3); }
  @media (max-width: 520px) { .opts { grid-template-columns: 1fr; } }
  .check { display: flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; }
  .check input[type="checkbox"] { accent-color: var(--cat-seo, #ec4899); width: 16px; height: 16px; }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow-x: auto; max-height: 320px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre-wrap; word-break: break-all; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-seo, #ec4899); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
