<script lang="ts">
  // ─── UTM link builder (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      presets: "Gyors sablonok",
      urlLbl: "Cél URL", urlPh: "https://pelda.hu/landing/",
      source: "Kampányforrás (utm_source) *", sourcePh: "google, facebook, newsletter",
      medium: "Csatorna (utm_medium) *", mediumPh: "cpc, social, email",
      campaign: "Kampány neve (utm_campaign) *", campaignPh: "nyari_akcio_2026",
      term: "Kulcsszó (utm_term)", termPh: "futocipo (fizetett keresés)",
      content: "Tartalom (utm_content)", contentPh: "felso_banner, cta_gomb",
      output: "Generált kampány URL", copy: "Másolás", copied: "Másolva!",
      req: "A csillaggal jelölt mezők ajánlottak a méréshez.",
      hint: "Az UTM paraméterek a Google Analytics / Plausible számára jelzik, honnan érkezik a látogató. A kis- és nagybetűt külön kezelik – maradj végig kisbetűnél.",
      invalid: "Adj meg érvényes URL-t (https://…) és legalább egy paramétert.",
    },
    ro: {
      presets: "Șabloane rapide",
      urlLbl: "URL destinație", urlPh: "https://exemplu.ro/landing/",
      source: "Sursa campaniei (utm_source) *", sourcePh: "google, facebook, newsletter",
      medium: "Canal (utm_medium) *", mediumPh: "cpc, social, email",
      campaign: "Numele campaniei (utm_campaign) *", campaignPh: "reducere_vara_2026",
      term: "Cuvânt cheie (utm_term)", termPh: "adidasi (căutare plătită)",
      content: "Conținut (utm_content)", contentPh: "banner_sus, buton_cta",
      output: "URL de campanie generat", copy: "Copiază", copied: "Copiat!",
      req: "Câmpurile marcate cu asterisc sunt recomandate pentru măsurare.",
      hint: "Parametrii UTM îi spun Google Analytics / Plausible de unde vine vizitatorul. Literele mari și mici sunt tratate diferit – folosește peste tot litere mici.",
      invalid: "Introdu un URL valid (https://…) și cel puțin un parametru.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let baseUrl = $state("");
  let source = $state("");
  let medium = $state("");
  let campaign = $state("");
  let term = $state("");
  let content = $state("");
  let copied = $state(false);

  const params = $derived.by(() => {
    const p: [string, string][] = [];
    if (source.trim()) p.push(["utm_source", source.trim()]);
    if (medium.trim()) p.push(["utm_medium", medium.trim()]);
    if (campaign.trim()) p.push(["utm_campaign", campaign.trim()]);
    if (term.trim()) p.push(["utm_term", term.trim()]);
    if (content.trim()) p.push(["utm_content", content.trim()]);
    return p;
  });

  const output = $derived.by(() => {
    if (!baseUrl.trim() || params.length === 0) return "";
    try {
      const u = new URL(baseUrl.trim());
      for (const [k, v] of params) u.searchParams.set(k, v);
      return u.toString();
    } catch {
      // Nem teljes URL – kézi összefűzés encode-dal
      const qs = params.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&");
      const sep = baseUrl.includes("?") ? "&" : "?";
      return baseUrl.trim() + sep + qs;
    }
  });

  function preset(s: string, m: string) { source = s; medium = m; }

  async function copy() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="presets">
    <span class="presets-lbl">{L.presets}:</span>
    <button type="button" class="chip" onclick={() => preset("google", "cpc")}>Google Ads</button>
    <button type="button" class="chip" onclick={() => preset("facebook", "social")}>Facebook</button>
    <button type="button" class="chip" onclick={() => preset("instagram", "social")}>Instagram</button>
    <button type="button" class="chip" onclick={() => preset("newsletter", "email")}>Newsletter</button>
  </div>

  <div class="card form">
    <div class="field">
      <label class="lbl" for="utm-url">{L.urlLbl}</label>
      <input id="utm-url" class="inp" type="url" bind:value={baseUrl} placeholder={L.urlPh} />
    </div>
    <div class="row2">
      <div class="field">
        <label class="lbl" for="utm-source">{L.source}</label>
        <input id="utm-source" class="inp" type="text" bind:value={source} placeholder={L.sourcePh} />
      </div>
      <div class="field">
        <label class="lbl" for="utm-medium">{L.medium}</label>
        <input id="utm-medium" class="inp" type="text" bind:value={medium} placeholder={L.mediumPh} />
      </div>
    </div>
    <div class="field">
      <label class="lbl" for="utm-campaign">{L.campaign}</label>
      <input id="utm-campaign" class="inp" type="text" bind:value={campaign} placeholder={L.campaignPh} />
    </div>
    <div class="row2">
      <div class="field">
        <label class="lbl" for="utm-term">{L.term}</label>
        <input id="utm-term" class="inp" type="text" bind:value={term} placeholder={L.termPh} />
      </div>
      <div class="field">
        <label class="lbl" for="utm-content">{L.content}</label>
        <input id="utm-content" class="inp" type="text" bind:value={content} placeholder={L.contentPh} />
      </div>
    </div>
    <p class="req">{L.req}</p>
  </div>

  <div class="card out">
    <div class="out-head">
      <h3 class="legend">{L.output}</h3>
      <button type="button" class="btn btn--primary" onclick={copy} disabled={!output}>
        {copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}
      </button>
    </div>
    {#if output}
      <div class="url-out">{output}</div>
    {:else}
      <p class="empty">{L.invalid}</p>
    {/if}
    <p class="hint">{L.hint}</p>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .presets { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; }
  .presets-lbl { font-size: .8125rem; color: var(--text-muted); font-weight: 600; }
  .chip { background: var(--bg-input); border: 1px solid var(--border); border-radius: 999px; padding: var(--sp-1) var(--sp-3); font-size: .8125rem; color: var(--text); cursor: pointer; transition: all var(--t-fast, .15s); }
  .chip:hover { border-color: var(--cat-seo, #ec4899); color: var(--cat-seo, #ec4899); }

  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .form { display: flex; flex-direction: column; gap: var(--sp-4); }
  .field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
  @media (max-width: 520px) { .row2 { grid-template-columns: 1fr; } }

  .lbl { font-size: .8125rem; font-weight: 600; color: var(--text); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit; }
  .inp:focus { outline: none; border-color: var(--cat-seo, #ec4899); box-shadow: 0 0 0 3px #ec489922; }
  .req { margin: 0; font-size: .75rem; color: var(--text-subtle); }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .url-out { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--cat-seo, #ec4899); word-break: break-all; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-seo, #ec4899); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
