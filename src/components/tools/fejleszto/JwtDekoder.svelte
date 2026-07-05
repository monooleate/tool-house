<script lang="ts">
  // ─── JWT dekóder (100% kliensoldali, kétnyelvű) — NEM validál aláírást ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      inLbl: "JWT token", inPh: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      header: "Fejléc (header)", payload: "Adattörzs (payload)",
      invalid: "Érvénytelen JWT (3, ponttal elválasztott rész kell)", empty: "Illessz be egy JWT tokent.",
      expLabel: "Lejárat (exp)", iatLabel: "Kiállítva (iat)", nbfLabel: "Érvényes ettől (nbf)",
      expired: "LEJÁRT", valid: "érvényes", notYet: "még nem érvényes",
      copy: "Másolás", copied: "Másolva!",
      warn: "⚠ A JWT dekódolása NEM jelent hitelesítést – az aláírás ellenőrzéséhez a titkos kulcs kell (az itt nem történik meg). A tartalom bárki számára olvasható.",
      hint: "A dekódolás a böngésződben történik – a token nem kerül szerverre.",
    },
    ro: {
      inLbl: "Token JWT", inPh: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      header: "Antet (header)", payload: "Corp de date (payload)",
      invalid: "JWT invalid (sunt necesare 3 părți separate prin punct)", empty: "Lipește un token JWT.",
      expLabel: "Expirare (exp)", iatLabel: "Emis (iat)", nbfLabel: "Valid de la (nbf)",
      expired: "EXPIRAT", valid: "valid", notYet: "încă nu e valid",
      copy: "Copiază", copied: "Copiat!",
      warn: "⚠ Decodarea JWT NU înseamnă autentificare – pentru verificarea semnăturii e nevoie de cheia secretă (nu se face aici). Conținutul e lizibil de oricine.",
      hint: "Decodarea are loc în browserul tău – tokenul nu ajunge pe server.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let input = $state("");
  let copied = $state("");

  function b64urlDecode(str: string): string {
    let s = str.replace(/-/g, "+").replace(/_/g, "/");
    const pad = s.length % 4;
    if (pad) s += "=".repeat(4 - pad);
    const bin = atob(s);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  const decoded = $derived.by(() => {
    const t = input.trim();
    if (!t) return { ok: true, header: "", payload: "", claims: null as any };
    if (typeof atob === "undefined") return { ok: true, header: "", payload: "", claims: null };
    const parts = t.split(".");
    if (parts.length < 2) return { ok: false, header: "", payload: "", claims: null };
    try {
      const header = JSON.stringify(JSON.parse(b64urlDecode(parts[0])), null, 2);
      const payloadObj = JSON.parse(b64urlDecode(parts[1]));
      const payload = JSON.stringify(payloadObj, null, 2);
      return { ok: true, header, payload, claims: payloadObj };
    } catch { return { ok: false, header: "", payload: "", claims: null }; }
  });

  function fmtTs(sec: number): string {
    try { return new Date(sec * 1000).toLocaleString(LANG === "ro" ? "ro-RO" : "hu-HU"); } catch { return String(sec); }
  }
  const now = $derived.by(() => (decoded.claims ? Math.floor(Date.now() / 1000) : 0));

  async function copy(text: string, which: string) {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); copied = which; setTimeout(() => (copied = ""), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card">
    <label class="lbl" for="jwt-in">{L.inLbl}</label>
    <textarea id="jwt-in" class="inp ta" rows="3" bind:value={input} placeholder={L.inPh}></textarea>
    <p class="warn">{L.warn}</p>
  </div>

  {#if !input.trim()}
    <div class="card"><p class="empty">{L.empty}</p></div>
  {:else if !decoded.ok}
    <div class="card"><p class="err">⚠ {L.invalid}</p></div>
  {:else}
    {#if decoded.claims}
      <div class="claims">
        {#if decoded.claims.exp !== undefined}
          <div class="claim" class:claim--bad={now >= decoded.claims.exp} class:claim--ok={now < decoded.claims.exp}>
            <span class="claim-k">{L.expLabel}</span><span class="claim-v">{fmtTs(decoded.claims.exp)}</span>
            <span class="claim-s">{now >= decoded.claims.exp ? `⛔ ${L.expired}` : `✓ ${L.valid}`}</span>
          </div>
        {/if}
        {#if decoded.claims.iat !== undefined}
          <div class="claim"><span class="claim-k">{L.iatLabel}</span><span class="claim-v">{fmtTs(decoded.claims.iat)}</span></div>
        {/if}
        {#if decoded.claims.nbf !== undefined}
          <div class="claim" class:claim--bad={now < decoded.claims.nbf}><span class="claim-k">{L.nbfLabel}</span><span class="claim-v">{fmtTs(decoded.claims.nbf)}</span>
            {#if now < decoded.claims.nbf}<span class="claim-s">⏳ {L.notYet}</span>{/if}</div>
        {/if}
      </div>
    {/if}
    <div class="grid2">
      <div class="card">
        <div class="out-head"><h3 class="legend">{L.header}</h3>
          <button type="button" class="btn btn--ghost" onclick={() => copy(decoded.header, "h")}>{copied === "h" ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button></div>
        <pre class="code"><code>{decoded.header}</code></pre>
      </div>
      <div class="card">
        <div class="out-head"><h3 class="legend">{L.payload}</h3>
          <button type="button" class="btn btn--primary" onclick={() => copy(decoded.payload, "p")}>{copied === "p" ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button></div>
        <pre class="code"><code>{decoded.payload}</code></pre>
      </div>
    </div>
  {/if}
  <p class="hint">{L.hint}</p>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-4); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .lbl { display: block; font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .8rem; font-family: var(--font-mono, monospace); word-break: break-all; }
  .inp:focus { outline: none; border-color: var(--cat-fejleszto, #06b6d4); box-shadow: 0 0 0 3px #06b6d422; }
  .ta { resize: vertical; }
  .warn { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--warning); line-height: 1.5; }

  .claims { display: flex; flex-direction: column; gap: var(--sp-2); }
  .claim { display: flex; align-items: center; gap: var(--sp-3); padding: var(--sp-2) var(--sp-4); background: var(--bg-card); border: 1px solid var(--border); border-left-width: 3px; border-radius: var(--r-md, 8px); font-size: .82rem; flex-wrap: wrap; }
  .claim--ok { border-left-color: var(--success); }
  .claim--bad { border-left-color: var(--error); }
  .claim-k { font-weight: 600; color: var(--text-muted); min-width: 130px; }
  .claim-v { font-family: var(--font-mono, monospace); color: var(--text); }
  .claim-s { margin-left: auto; font-weight: 700; font-size: .75rem; }

  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
  @media (max-width: 720px) { .grid2 { grid-template-columns: 1fr; } }
  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow: auto; max-height: 300px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre-wrap; word-break: break-word; }
  .err { margin: 0; padding: var(--sp-4); color: var(--error); font-size: .85rem; background: var(--bg-input); border: 1px solid var(--error); border-radius: var(--r-md, 8px); }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn--primary { background: var(--cat-fejleszto, #06b6d4); color: #fff; border-color: transparent; }
  .btn--primary:hover { filter: brightness(1.08); }
  .btn--ghost { background: var(--bg-input); color: var(--text); }
  .btn--ghost:hover { border-color: var(--cat-fejleszto, #06b6d4); }
</style>
