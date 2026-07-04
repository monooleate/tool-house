<script lang="ts">
  // ─── UTM / tracking paraméter eltávolító (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      inputLbl: "URL-ek (soronként egy)",
      inputPh: "https://pelda.hu/oldal?utm_source=hirlevel&utm_medium=email&fbclid=abc123",
      trackingLbl: "Tracking paraméterek is (fbclid, gclid, mc_cid…), nem csak utm_*",
      output: "Tiszta URL-ek", copy: "Másolás", copied: "Másolva!",
      removed: "eltávolított paraméter", empty: "Illessz be egy vagy több URL-t.",
      hint: "Minden feldolgozás a böngésződben történik. A hibás sorokat változatlanul hagyja.",
    },
    ro: {
      inputLbl: "URL-uri (câte unul pe rând)",
      inputPh: "https://exemplu.ro/pagina?utm_source=newsletter&utm_medium=email&fbclid=abc123",
      trackingLbl: "Și parametrii de tracking (fbclid, gclid, mc_cid…), nu doar utm_*",
      output: "URL-uri curate", copy: "Copiază", copied: "Copiat!",
      removed: "parametri eliminați", empty: "Lipește unul sau mai multe URL-uri.",
      hint: "Toată procesarea are loc în browserul tău. Rândurile invalide rămân neschimbate.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  const TRACKING = new Set([
    "fbclid", "gclid", "gclsrc", "dclid", "wbraid", "gbraid", "msclkid", "twclid", "yclid",
    "mc_cid", "mc_eid", "_ga", "_gl", "igshid", "igsh", "vero_id", "vero_conv",
    "oly_anon_id", "oly_enc_id", "hsa_cam", "hsa_grp", "hsa_ad", "hsa_src", "hsa_tgt",
    "hsa_kw", "hsa_mt", "hsa_net", "hsa_ver", "__hstc", "__hssc", "__hsfp", "_hsenc",
    "_hsmi", "mkt_tok", "ref", "ref_src", "ref_url", "spm", "scm",
  ]);

  let input = $state("");
  let includeTracking = $state(true);
  let copied = $state(false);

  const result = $derived.by(() => {
    const lines = input.split("\n");
    let removedCount = 0;
    const out = lines.map((line) => {
      const t = line.trim();
      if (!t) return "";
      try {
        const u = new URL(t);
        const toDelete: string[] = [];
        for (const key of u.searchParams.keys()) {
          const k = key.toLowerCase();
          if (k.startsWith("utm_") || (includeTracking && TRACKING.has(k))) toDelete.push(key);
        }
        removedCount += toDelete.length;
        toDelete.forEach((k) => u.searchParams.delete(k));
        return u.toString();
      } catch {
        return t; // hibás sor változatlan
      }
    });
    return { text: out.join("\n"), removed: removedCount };
  });

  async function copy() {
    if (!result.text.trim()) return;
    try { await navigator.clipboard.writeText(result.text); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card">
    <label class="lbl" for="utm-in">{L.inputLbl}</label>
    <textarea id="utm-in" class="inp ta" rows="5" bind:value={input} placeholder={L.inputPh}></textarea>
    <label class="check"><input type="checkbox" bind:checked={includeTracking} /><span>{L.trackingLbl}</span></label>
  </div>

  <div class="card">
    <div class="out-head">
      <h3 class="legend">{L.output}{#if input.trim()} · <span class="badge">{result.removed} {L.removed}</span>{/if}</h3>
      <button type="button" class="btn btn--primary" onclick={copy} disabled={!result.text.trim()}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>
    </div>
    {#if result.text.trim()}
      <pre class="code"><code>{result.text}</code></pre>
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
  .ta { resize: vertical; min-height: 110px; }
  .check { display: flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; margin-top: var(--sp-3); }
  .check input[type="checkbox"] { accent-color: var(--cat-seo, #ec4899); width: 16px; height: 16px; }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); flex-wrap: wrap; }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .badge { font-family: var(--font-mono, monospace); font-size: .72rem; font-weight: 700; color: var(--cat-seo, #ec4899); }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow-x: auto; max-height: 320px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre-wrap; word-break: break-all; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-seo, #ec4899); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
