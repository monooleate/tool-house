<script lang="ts">
  // ─── Számrendszer-váltó (100% kliensoldali, kétnyelvű build-idős) ───
  // Bármelyik mezőt írod (BIN/OCT/DEC/HEX), a többi élőben frissül.
  // BigInt → tetszőlegesen nagy egész (hex címek, maszkok). Egyetlen igazságforrás:
  // az utoljára szerkesztett mező (text + base); minden más ebből derived.
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  type Dict = {
    heading: string;
    invalid: string;
    bitsLabel: (n: number) => string;
    grouped: string;
    customBase: string;
    copy: string;
    copied: string;
    empty: string;
    rows: { bin: string; oct: string; dec: string; hex: string };
  };

  const DICT: Record<"hu" | "ro", Dict> = {
    hu: {
      heading: "Szám bármely számrendszerben",
      invalid: "Érvénytelen számjegy ehhez a számrendszerhez",
      bitsLabel: (n) => `${n} bit`,
      grouped: "Bináris csoportosítva",
      customBase: "Egyéni alap",
      copy: "Másolás",
      copied: "Másolva!",
      empty: "Írj be egy számot bármelyik mezőbe…",
      rows: { bin: "Bináris (2)", oct: "Oktális (8)", dec: "Decimális (10)", hex: "Hexadecimális (16)" },
    },
    ro: {
      heading: "Număr în orice bază numerică",
      invalid: "Cifră invalidă pentru această bază",
      bitsLabel: (n) => `${n} biți`,
      grouped: "Binar grupat",
      customBase: "Bază personalizată",
      copy: "Copiază",
      copied: "Copiat!",
      empty: "Introdu un număr în oricare câmp…",
      rows: { bin: "Binar (2)", oct: "Octal (8)", dec: "Zecimal (10)", hex: "Hexazecimal (16)" },
    },
  };

  const L = DICT[LANG] ?? DICT.hu;
  const locale = LANG === "ro" ? "ro-RO" : "hu-HU";

  const FIXED: Array<{ base: number; label: string }> = [
    { base: 2, label: L.rows.bin },
    { base: 8, label: L.rows.oct },
    { base: 10, label: L.rows.dec },
    { base: 16, label: L.rows.hex },
  ];

  // ─── Parse / format ────────────────────────────────────────
  function parseInBase(str: string, base: number): bigint | null {
    let s = str.trim();
    if (s === "") return null;
    let neg = false;
    if (s[0] === "-") { neg = true; s = s.slice(1); }
    s = s.toLowerCase().replace(/[\s_]/g, "");
    if (base === 16 && s.startsWith("0x")) s = s.slice(2);
    if (base === 2 && s.startsWith("0b")) s = s.slice(2);
    if (base === 8 && s.startsWith("0o")) s = s.slice(2);
    if (s === "") return null;
    const B = BigInt(base);
    let v = 0n;
    for (const ch of s) {
      const d = parseInt(ch, 36);
      if (Number.isNaN(d) || d >= base) return null;
      v = v * B + BigInt(d);
    }
    return neg ? -v : v;
  }

  function formatBase(v: bigint, base: number): string {
    const neg = v < 0n;
    const s = (neg ? -v : v).toString(base).toUpperCase();
    return neg ? "-" + s : s;
  }

  // ─── State ─────────────────────────────────────────────────
  let text = $state("255");
  let activeBase = $state(10);
  let customBase = $state(36);
  let copiedKey = $state("");

  const value = $derived.by((): bigint | null => parseInBase(text, activeBase));
  const isInvalid = $derived(value === null && text.trim() !== "");

  function display(base: number): string {
    if (base === activeBase) return text;
    if (value === null) return "";
    return formatBase(value, base);
  }

  function onInput(base: number, e: Event) {
    activeBase = base;
    text = (e.target as HTMLInputElement).value;
  }

  const bitLength = $derived.by((): number => {
    if (value === null) return 0;
    const mag = value < 0n ? -value : value;
    return mag === 0n ? 1 : mag.toString(2).length;
  });

  const groupedBinary = $derived.by((): string => {
    if (value === null) return "";
    const neg = value < 0n;
    let b = (neg ? -value : value).toString(2);
    const pad = (4 - (b.length % 4)) % 4;
    b = "0".repeat(pad) + b;
    const groups = b.match(/.{1,4}/g) ?? [];
    return (neg ? "-" : "") + groups.join(" ");
  });

  const customValue = $derived(value === null ? "" : formatBase(value, customBase));

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
  <div class="card rows-card">
    <h2 class="legend">{L.heading}</h2>

    {#each FIXED as row}
      <div class="row" class:row--err={isInvalid && activeBase === row.base}>
        <label class="row__label" for={`base-${row.base}`}>{row.label}</label>
        <div class="row__field">
          <input
            id={`base-${row.base}`}
            class="row__input"
            type="text"
            inputmode={row.base === 10 ? "numeric" : "text"}
            spellcheck="false"
            autocomplete="off"
            value={display(row.base)}
            oninput={(e) => onInput(row.base, e)}
            placeholder="0"
          />
          <button
            type="button"
            class="row__copy"
            onclick={() => copy(String(row.base), display(row.base))}
            disabled={!display(row.base)}
            aria-label={L.copy}
          >
            {copiedKey === String(row.base) ? "✓" : "📋"}
          </button>
        </div>
      </div>
    {/each}

    {#if isInvalid}
      <p class="err-msg" role="alert">⚠️ {L.invalid}</p>
    {/if}

    <!-- Egyéni alap (read-only kimenet) -->
    <div class="row row--custom">
      <div class="row__label row__label--custom">
        <span>{L.customBase}</span>
        <select class="base-select" bind:value={customBase} aria-label={L.customBase}>
          {#each Array.from({ length: 35 }, (_, i) => i + 2) as b}
            <option value={b}>{b}</option>
          {/each}
        </select>
      </div>
      <div class="row__field">
        <input class="row__input row__input--ro" type="text" readonly value={customValue} placeholder="0" />
        <button
          type="button"
          class="row__copy"
          onclick={() => copy("custom", customValue)}
          disabled={!customValue}
          aria-label={L.copy}
        >
          {copiedKey === "custom" ? "✓" : "📋"}
        </button>
      </div>
    </div>
  </div>

  <!-- Info -->
  {#if value !== null}
    <div class="info-row">
      <span class="chip">{L.bitsLabel(bitLength)}</span>
      <span class="chip chip--mono">{L.grouped}: {groupedBinary}</span>
    </div>
  {:else}
    <p class="hint">{L.empty}</p>
  {/if}
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

  .rows-card { display: flex; flex-direction: column; gap: var(--sp-3); }
  .row { display: grid; grid-template-columns: 180px 1fr; align-items: center; gap: var(--sp-3); }
  @media (max-width: 560px) { .row { grid-template-columns: 1fr; gap: var(--sp-1); } }
  .row__label { font-size: .875rem; font-weight: 600; color: var(--text); }
  .row__field { display: flex; gap: var(--sp-2); }
  .row__input {
    flex: 1; min-width: 0;
    font-family: var(--font-mono, monospace); font-size: 1rem;
    background: var(--bg-input); color: var(--text);
    border: 1px solid var(--border); border-radius: var(--r-md, 8px);
    padding: var(--sp-3) var(--sp-3); letter-spacing: .02em;
  }
  .row__input:focus { outline: none; border-color: var(--cat-fejleszto); }
  .row__input--ro { background: var(--bg-card); color: var(--cat-fejleszto); }
  .row--err .row__input { border-color: #dc2626; }

  .row__copy {
    flex-shrink: 0;
    background: transparent; border: 1px solid var(--border);
    border-radius: var(--r-md, 8px); cursor: pointer;
    padding: var(--sp-2) var(--sp-3); color: var(--text);
    transition: border-color var(--t-fast, .15s);
  }
  .row__copy:hover:not(:disabled) { border-color: var(--cat-fejleszto); }
  .row__copy:disabled { opacity: .4; cursor: not-allowed; }

  .row--custom { border-top: 1px solid var(--border); padding-top: var(--sp-3); margin-top: var(--sp-1); }
  .row__label--custom { display: flex; align-items: center; gap: var(--sp-2); }
  .base-select {
    background: var(--bg-input); color: var(--text);
    border: 1px solid var(--border); border-radius: var(--r-md, 8px);
    padding: var(--sp-1) var(--sp-2); font-size: .8125rem;
  }

  .err-msg {
    margin: 0; font-size: .8125rem; color: #c2410c;
    background: color-mix(in srgb, #ea580c 8%, var(--bg-card));
    border: 1px solid color-mix(in srgb, #ea580c 35%, var(--border));
    border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3);
  }

  .info-row { display: flex; flex-wrap: wrap; gap: var(--sp-2); }
  .chip {
    font-size: .8125rem; color: var(--text-muted);
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3);
  }
  .chip--mono { font-family: var(--font-mono, monospace); color: var(--text); }
  .hint { margin: 0; font-size: .8125rem; color: var(--text-muted); }
</style>
