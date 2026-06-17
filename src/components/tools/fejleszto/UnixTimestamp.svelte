<script lang="ts">
  // ─── Unix timestamp ↔ dátum (100% kliensoldali, kétnyelvű build-idős) ───
  // A komponens kliens-szigetként hidratál (DynamicTool), így a Date/Intl a
  // látogató saját időzónáját és nyelvét használja. Nyelv: PUBLIC_SITE_LANG.
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";
  const locale = LANG === "ro" ? "ro-RO" : "hu-HU";

  type Dict = {
    currentTs: string;
    tsToDate: string;
    dateToTs: string;
    now: string;
    tsPlaceholder: string;
    invalidTs: string;
    invalidDate: string;
    localTime: string;
    utcTime: string;
    iso: string;
    weekday: string;
    relative: string;
    dateInput: string;
    tsSeconds: string;
    tsMillis: string;
    copy: string;
    copied: string;
    unitSec: string;
    unitMs: string;
  };

  const DICT: Record<"hu" | "ro", Dict> = {
    hu: {
      currentTs: "Aktuális Unix timestamp",
      tsToDate: "Timestamp → dátum",
      dateToTs: "Dátum → timestamp",
      now: "Most",
      tsPlaceholder: "pl. 1750000000",
      invalidTs: "Érvénytelen időbélyeg",
      invalidDate: "Érvénytelen dátum",
      localTime: "Helyi idő",
      utcTime: "UTC idő",
      iso: "ISO 8601",
      weekday: "A hét napja",
      relative: "Relatív",
      dateInput: "Dátum és idő (helyi)",
      tsSeconds: "Timestamp (másodperc)",
      tsMillis: "Timestamp (ezredmásodperc)",
      copy: "Másolás",
      copied: "Másolva!",
      unitSec: "másodperc",
      unitMs: "ezredmp.",
    },
    ro: {
      currentTs: "Timestamp Unix curent",
      tsToDate: "Timestamp → dată",
      dateToTs: "Dată → timestamp",
      now: "Acum",
      tsPlaceholder: "ex. 1750000000",
      invalidTs: "Timestamp invalid",
      invalidDate: "Dată invalidă",
      localTime: "Ora locală",
      utcTime: "Ora UTC",
      iso: "ISO 8601",
      weekday: "Ziua săptămânii",
      relative: "Relativ",
      dateInput: "Data și ora (local)",
      tsSeconds: "Timestamp (secunde)",
      tsMillis: "Timestamp (milisecunde)",
      copy: "Copiază",
      copied: "Copiat!",
      unitSec: "secunde",
      unitMs: "milisec.",
    },
  };

  const L = DICT[LANG] ?? DICT.hu;

  const pad = (n: number) => String(n).padStart(2, "0");
  function toLocalInput(d: Date): string {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  // ─── State ─────────────────────────────────────────────────
  let now = $state(Date.now());
  let tsInput = $state(String(Math.floor(Date.now() / 1000)));
  let unit = $state<"s" | "ms">("s");
  let dtInput = $state(toLocalInput(new Date()));
  let copiedKey = $state("");

  // Élő óra (1 mp-enként)
  $effect(() => {
    const id = setInterval(() => (now = Date.now()), 1000);
    return () => clearInterval(id);
  });

  // ─── Timestamp → dátum ─────────────────────────────────────
  const tsDate = $derived.by((): Date | null => {
    const s = tsInput.trim();
    if (s === "" || !/^-?\d+$/.test(s)) return null;
    const ms = unit === "s" ? Number(s) * 1000 : Number(s);
    const d = new Date(ms);
    return Number.isNaN(d.getTime()) ? null : d;
  });

  function fmt(d: Date, opts: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(locale, opts).format(d);
  }

  function relativeTime(ms: number): string {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    const diffSec = Math.round((ms - now) / 1000);
    const abs = Math.abs(diffSec);
    const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
      ["year", 31536000], ["month", 2592000], ["day", 86400],
      ["hour", 3600], ["minute", 60], ["second", 1],
    ];
    for (const [u, sec] of units) {
      if (abs >= sec || u === "second") return rtf.format(Math.round(diffSec / sec), u);
    }
    return "";
  }

  const tsOut = $derived.by(() => {
    const d = tsDate;
    if (!d) return null;
    return {
      local: fmt(d, { dateStyle: "long", timeStyle: "medium" }),
      utc: fmt(d, { dateStyle: "long", timeStyle: "medium", timeZone: "UTC" }),
      iso: d.toISOString(),
      weekday: fmt(d, { weekday: "long" }),
      relative: relativeTime(d.getTime()),
    };
  });

  function setNow() {
    unit = "s";
    tsInput = String(Math.floor(Date.now() / 1000));
  }

  // ─── Dátum → timestamp ─────────────────────────────────────
  const dtDate = $derived.by((): Date | null => {
    if (!dtInput) return null;
    const d = new Date(dtInput);
    return Number.isNaN(d.getTime()) ? null : d;
  });
  const dtSeconds = $derived(dtDate ? String(Math.floor(dtDate.getTime() / 1000)) : "");
  const dtMillis = $derived(dtDate ? String(dtDate.getTime()) : "");

  // Élő aktuális timestamp
  const currentSec = $derived(Math.floor(now / 1000));

  async function copy(key: string, val: string) {
    if (!val) return;
    try {
      await navigator.clipboard.writeText(val);
      copiedKey = key;
      setTimeout(() => (copiedKey = ""), 1500);
    } catch {}
  }
</script>

<div class="tool">
  <!-- Élő aktuális timestamp -->
  <div class="card now-card">
    <div class="now-card__body">
      <span class="now-card__label">{L.currentTs}</span>
      <span class="now-card__value">{currentSec}</span>
    </div>
    <button type="button" class="btn btn--ghost" onclick={() => copy("now", String(currentSec))}>
      {copiedKey === "now" ? `✓ ${L.copied}` : `📋 ${L.copy}`}
    </button>
  </div>

  <!-- Timestamp → dátum -->
  <div class="card">
    <h2 class="legend">{L.tsToDate}</h2>
    <div class="ts-input-row">
      <input
        class="input mono"
        type="text"
        inputmode="numeric"
        spellcheck="false"
        autocomplete="off"
        bind:value={tsInput}
        placeholder={L.tsPlaceholder}
        aria-label={L.tsToDate}
      />
      <div class="unit-toggle" role="group" aria-label="unit">
        <button type="button" class:unit--active={unit === "s"} onclick={() => (unit = "s")}>{L.unitSec}</button>
        <button type="button" class:unit--active={unit === "ms"} onclick={() => (unit = "ms")}>{L.unitMs}</button>
      </div>
      <button type="button" class="btn btn--primary" onclick={setNow}>⏱ {L.now}</button>
    </div>

    {#if tsInput.trim() === ""}
      <p class="hint">{L.tsPlaceholder}</p>
    {:else if !tsOut}
      <p class="err-msg" role="alert">⚠️ {L.invalidTs}</p>
    {:else}
      <dl class="out-list">
        <div class="out"><dt>{L.localTime}</dt><dd>{tsOut.local} <button class="mini-copy" onclick={() => copy("local", tsOut.local)} aria-label={L.copy}>{copiedKey === "local" ? "✓" : "📋"}</button></dd></div>
        <div class="out"><dt>{L.utcTime}</dt><dd>{tsOut.utc} <button class="mini-copy" onclick={() => copy("utc", tsOut.utc)} aria-label={L.copy}>{copiedKey === "utc" ? "✓" : "📋"}</button></dd></div>
        <div class="out"><dt>{L.iso}</dt><dd class="mono">{tsOut.iso} <button class="mini-copy" onclick={() => copy("iso", tsOut.iso)} aria-label={L.copy}>{copiedKey === "iso" ? "✓" : "📋"}</button></dd></div>
        <div class="out"><dt>{L.weekday}</dt><dd>{tsOut.weekday}</dd></div>
        <div class="out"><dt>{L.relative}</dt><dd>{tsOut.relative}</dd></div>
      </dl>
    {/if}
  </div>

  <!-- Dátum → timestamp -->
  <div class="card">
    <h2 class="legend">{L.dateToTs}</h2>
    <label class="field-label" for="dt-in">{L.dateInput}</label>
    <input id="dt-in" class="input" type="datetime-local" step="1" bind:value={dtInput} />

    {#if !dtDate}
      <p class="err-msg" role="alert">⚠️ {L.invalidDate}</p>
    {:else}
      <dl class="out-list">
        <div class="out"><dt>{L.tsSeconds}</dt><dd class="mono">{dtSeconds} <button class="mini-copy" onclick={() => copy("dts", dtSeconds)} aria-label={L.copy}>{copiedKey === "dts" ? "✓" : "📋"}</button></dd></div>
        <div class="out"><dt>{L.tsMillis}</dt><dd class="mono">{dtMillis} <button class="mini-copy" onclick={() => copy("dtms", dtMillis)} aria-label={L.copy}>{copiedKey === "dtms" ? "✓" : "📋"}</button></dd></div>
      </dl>
    {/if}
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--r-lg, 12px);
    padding: var(--sp-5);
  }
  .legend { font-size: .9375rem; font-weight: 600; color: var(--text); margin: 0 0 var(--sp-4); }
  .mono { font-family: var(--font-mono, monospace); }

  /* Aktuális timestamp */
  .now-card { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); flex-wrap: wrap; }
  .now-card__body { display: flex; flex-direction: column; }
  .now-card__label { font-size: .78rem; color: var(--text-muted); }
  .now-card__value { font-size: 1.6rem; font-weight: 700; color: var(--cat-fejleszto); font-family: var(--font-mono, monospace); font-variant-numeric: tabular-nums; }

  .input {
    width: 100%; box-sizing: border-box;
    font-size: 1rem; background: var(--bg-input); color: var(--text);
    border: 1px solid var(--border); border-radius: var(--r-md, 8px);
    padding: var(--sp-3); color-scheme: light dark;
  }
  .input:focus { outline: none; border-color: var(--cat-fejleszto); }
  .input.mono { font-family: var(--font-mono, monospace); }

  .ts-input-row { display: flex; gap: var(--sp-2); flex-wrap: wrap; align-items: stretch; margin-bottom: var(--sp-3); }
  .ts-input-row .input { flex: 1; min-width: 160px; }

  .unit-toggle { display: inline-flex; border: 1px solid var(--border); border-radius: var(--r-md, 8px); overflow: hidden; }
  .unit-toggle button {
    background: var(--bg-input); color: var(--text-muted); border: none;
    padding: var(--sp-2) var(--sp-3); font-size: .8125rem; cursor: pointer;
  }
  .unit-toggle button.unit--active { background: var(--cat-fejleszto); color: #fff; font-weight: 600; }

  .field-label { display: block; font-size: .8125rem; color: var(--text-muted); margin-bottom: var(--sp-2); }

  .out-list { display: flex; flex-direction: column; gap: var(--sp-2); margin: var(--sp-3) 0 0; }
  .out { display: grid; grid-template-columns: 130px 1fr; gap: var(--sp-3); align-items: baseline; }
  @media (max-width: 520px) { .out { grid-template-columns: 1fr; gap: 0; } }
  .out dt { font-size: .8125rem; color: var(--text-muted); }
  .out dd { margin: 0; font-size: .9375rem; color: var(--text); word-break: break-word; }

  .mini-copy {
    background: transparent; border: none; cursor: pointer;
    color: var(--text-subtle); padding: 0 var(--sp-1); font-size: .8125rem;
  }
  .mini-copy:hover { color: var(--cat-fejleszto); }

  .err-msg {
    margin: var(--sp-2) 0 0; font-size: .8125rem; color: #c2410c;
    background: color-mix(in srgb, #ea580c 8%, var(--bg-card));
    border: 1px solid color-mix(in srgb, #ea580c 35%, var(--border));
    border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3);
  }
  .hint { margin: var(--sp-2) 0 0; font-size: .8125rem; color: var(--text-muted); }

  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: var(--sp-2);
    padding: var(--sp-2) var(--sp-4);
    border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem;
    cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border);
    white-space: nowrap;
  }
  .btn--primary { background: var(--cat-fejleszto); color: #fff; border-color: transparent; }
  .btn--primary:hover { filter: brightness(1.08); }
  .btn--ghost { background: var(--bg-input); color: var(--text); }
  .btn--ghost:hover { border-color: var(--cat-fejleszto); }
</style>
