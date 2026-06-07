<script lang="ts">
  // ─── Generator de parole securizat (100% client-side, crypto.getRandomValues) ───
  type Mode = "aleatoriu" | "fraza" | "pin" | "pronuntabil";

  const MODES: Array<{ id: Mode; label: string; desc: string; icon: string }> = [
    { id: "aleatoriu",   label: "Aleatorie",    desc: "Caractere mixte, entropie maximă",        icon: "🎲" },
    { id: "fraza",       label: "Frază de acces", desc: "Cuvinte ușor de reținut (passphrase)",  icon: "💬" },
    { id: "pronuntabil", label: "Pronunțabilă", desc: "Silabe alternante, ușor de rostit",       icon: "🗣️" },
    { id: "pin",         label: "Cod PIN",       desc: "Doar cifre, pentru carduri / seifuri",   icon: "🔢" },
  ];

  // Seturi de caractere
  const SET_LOWER = "abcdefghijklmnopqrstuvwxyz";
  const SET_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const SET_DIGIT = "0123456789";
  const SET_SYMBOL = "!@#$%^&*()-_=+[]{};:,.?/";
  // Caractere ambigue (greu de distins vizual)
  const AMBIGUOUS = new Set("Il1O0o|`'\"{}[]()/\\".split(""));

  // Listă de cuvinte românești scurte (fără diacritice, pentru passphrase fiabil)
  const WORDS = [
    "munte", "soare", "apa", "carte", "masa", "floare", "padure", "rau", "cer", "stea",
    "luna", "vant", "ploaie", "zapada", "frunza", "iarba", "piatra", "nisip", "val", "lac",
    "casa", "cheie", "drum", "pod", "turn", "poarta", "fereastra", "gradina", "fantana", "moara",
    "vulpe", "ursul", "lupul", "cerbul", "soim", "delfin", "albina", "fluture", "greier", "randunica",
    "verde", "rosu", "albastru", "galben", "argint", "auriu", "negru", "alb", "violet", "coral",
    "lumina", "umbra", "ecou", "vis", "gand", "dor", "noroc", "putere", "liniste", "curaj",
    "munca", "joaca", "drumul", "calea", "zborul", "saltul", "pasul", "dansul", "cantec", "poveste",
    "toamna", "iarna", "vara", "primavara", "dimineata", "amiaza", "seara", "noapte", "zorii", "apus",
    "stejar", "brad", "salcie", "plopul", "artar", "castan", "nucul", "mesteacan", "tei", "frasin",
    "munte2", "fluviu", "deal", "vale", "campie", "cascada", "izvor", "ghetar", "creasta", "stanca",
    "comoara", "harta", "busola", "ancora", "catarg", "punte", "far", "corabie", "insula", "ocean",
    "scant", "tunet", "fulger", "curcubeu", "ceata", "roua", "bruma", "ger", "caldura", "racoare",
  ];

  const CONSONANTS = "bcdfghjklmnprstvz".split("");
  const VOWELS = "aeiou".split("");

  // ─── State ───
  let mode = $state<Mode>("aleatoriu");
  let length = $state<number>(16);
  let useLower = $state<boolean>(true);
  let useUpper = $state<boolean>(true);
  let useDigit = $state<boolean>(true);
  let useSymbol = $state<boolean>(true);
  let excludeAmbiguous = $state<boolean>(false);
  let requireEach = $state<boolean>(true);

  // passphrase
  let wordCount = $state<number>(4);
  let separator = $state<string>("-");
  let capitalizeWords = $state<boolean>(true);
  let appendNumber = $state<boolean>(true);

  // pronunțabil
  let pronLength = $state<number>(12);

  // pin
  let pinLength = $state<number>(6);

  // batch
  let batchCount = $state<number>(5);

  let passwords = $state<string[]>([]);
  let copiedIndex = $state<number>(-1);
  let warning = $state<string>("");

  // ─── Randomness sigur (rejection sampling, fără bias modulo) ───
  function randInt(max: number): number {
    if (max <= 0) return 0;
    const limit = Math.floor(0x100000000 / max) * max;
    const buf = new Uint32Array(1);
    let x = 0;
    do {
      crypto.getRandomValues(buf);
      x = buf[0];
    } while (x >= limit);
    return x % max;
  }

  function pick(pool: string): string {
    return pool[randInt(pool.length)];
  }

  function shuffle(arr: string[]): string[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = randInt(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ─── Construirea pool-ului pentru modul aleatoriu ───
  function buildPool(): string[] {
    const sets: string[] = [];
    if (useLower) sets.push(SET_LOWER);
    if (useUpper) sets.push(SET_UPPER);
    if (useDigit) sets.push(SET_DIGIT);
    if (useSymbol) sets.push(SET_SYMBOL);
    if (excludeAmbiguous) {
      return sets.map((s) => s.split("").filter((c) => !AMBIGUOUS.has(c)).join(""));
    }
    return sets;
  }

  function genRandom(): string {
    const sets = buildPool();
    if (sets.length === 0) return "";
    const full = sets.join("");
    const out: string[] = [];

    // garantăm cel puțin un caracter din fiecare set selectat
    if (requireEach && length >= sets.length) {
      for (const s of sets) out.push(pick(s));
    }
    while (out.length < length) out.push(pick(full));
    return shuffle(out).join("");
  }

  function genFraza(): string {
    const parts: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      let w = WORDS[randInt(WORDS.length)].replace(/2$/, "");
      if (capitalizeWords) w = w.charAt(0).toUpperCase() + w.slice(1);
      parts.push(w);
    }
    let pass = parts.join(separator);
    if (appendNumber) pass += separator + (10 + randInt(90));
    return pass;
  }

  function genPronuntabil(): string {
    let out = "";
    let upper = false;
    while (out.length < pronLength) {
      let c = pick(CONSONANTS) + pick(VOWELS);
      // ocazional o silabă închisă
      if (randInt(3) === 0 && out.length + 3 <= pronLength) c += pick(CONSONANTS);
      out += upper ? c.charAt(0).toUpperCase() + c.slice(1) : c;
      upper = !upper;
    }
    out = out.slice(0, pronLength);
    // adăugăm 2 cifre pentru robustețe
    return out + (10 + randInt(90));
  }

  function genPin(): string {
    let out = "";
    for (let i = 0; i < pinLength; i++) out += SET_DIGIT[randInt(10)];
    return out;
  }

  function generateOne(): string {
    if (mode === "aleatoriu") return genRandom();
    if (mode === "fraza") return genFraza();
    if (mode === "pronuntabil") return genPronuntabil();
    return genPin();
  }

  function generate() {
    warning = "";
    if (mode === "aleatoriu") {
      const sets = buildPool();
      if (sets.length === 0) {
        warning = "Selectează cel puțin un tip de caracter.";
        passwords = [];
        return;
      }
      if (requireEach && length < sets.length) {
        warning = `Lungimea (${length}) e mai mică decât numărul de tipuri selectate (${sets.length}) — nu se poate garanta câte unul din fiecare.`;
      }
    }
    const list: string[] = [];
    for (let i = 0; i < batchCount; i++) list.push(generateOne());
    passwords = list;
    copiedIndex = -1;
  }

  // mărimea pool-ului efectiv (pentru entropie)
  const poolSize = $derived.by((): number => {
    if (mode === "pin") return 10;
    if (mode === "fraza") return WORDS.length;
    if (mode === "pronuntabil") return 100; // aproximare conservatoare per silabă
    let n = 0;
    const sets = buildPool();
    for (const s of sets) n += s.length;
    return n;
  });

  // numărul de simboluri (pentru calculul entropiei)
  const symbolCount = $derived.by((): number => {
    if (mode === "pin") return pinLength;
    if (mode === "fraza") return wordCount;
    if (mode === "pronuntabil") return Math.ceil(pronLength / 2);
    return length;
  });

  const entropyBits = $derived.by((): number => {
    if (poolSize <= 1) return 0;
    return Math.round(symbolCount * Math.log2(poolSize));
  });

  // Clasificare tărie pe baza entropiei (recomandări NIST / practici curente)
  const strength = $derived.by((): { label: string; level: number; color: string } => {
    const e = entropyBits;
    if (e < 28) return { label: "Foarte slabă", level: 1, color: "#dc2626" };
    if (e < 36) return { label: "Slabă", level: 2, color: "#ea580c" };
    if (e < 60) return { label: "Rezonabilă", level: 3, color: "#ca8a04" };
    if (e < 128) return { label: "Puternică", level: 4, color: "#16a34a" };
    return { label: "Foarte puternică", level: 5, color: "#059669" };
  });

  // Estimare timp de spargere la 10^11 încercări/secundă (GPU offline modern)
  const crackTime = $derived.by((): string => {
    const guesses = Math.pow(2, entropyBits) / 2; // în medie jumătate din spațiu
    const perSec = 1e11;
    let s = guesses / perSec;
    if (s < 1) return "instantaneu";
    const units: Array<[number, string]> = [
      [60, "secunde"], [60, "minute"], [24, "ore"], [365, "zile"],
      [100, "ani"], [10, "secole"], [1e3, "milenii"],
    ];
    let val = s;
    let label = "secunde";
    for (const [factor, name] of units) {
      if (val < factor) { label = name; break; }
      val /= factor;
      label = name;
    }
    if (val > 1e9) return `${(val).toExponential(1)} ${label}`;
    return `${val < 10 ? val.toFixed(1) : Math.round(val).toLocaleString("ro-RO")} ${label}`;
  });

  async function copy(idx: number) {
    try {
      await navigator.clipboard.writeText(passwords[idx]);
      copiedIndex = idx;
      setTimeout(() => (copiedIndex = -1), 1500);
    } catch {}
  }

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(passwords.join("\n"));
      copiedIndex = -2;
      setTimeout(() => (copiedIndex = -1), 1500);
    } catch {}
  }

  // generăm la montare
  $effect(() => {
    if (passwords.length === 0) generate();
  });
</script>

<div class="tool">
  <!-- Selector mod -->
  <fieldset class="card modes">
    <legend class="legend">Tipul parolei</legend>
    <div class="mode-grid">
      {#each MODES as m}
        <button
          type="button"
          class="mode-card"
          class:mode-card--active={mode === m.id}
          aria-pressed={mode === m.id}
          onclick={() => { mode = m.id; generate(); }}
        >
          <span class="mode-card__icon">{m.icon}</span>
          <span class="mode-card__label">{m.label}</span>
          <span class="mode-card__desc">{m.desc}</span>
        </button>
      {/each}
    </div>
  </fieldset>

  <!-- Opțiuni per mod -->
  <div class="card options">
    {#if mode === "aleatoriu"}
      <label class="slider-row">
        <span>Lungime: <strong>{length}</strong> caractere</span>
        <input type="range" min="6" max="64" step="1" bind:value={length} oninput={generate} />
      </label>
      <div class="toggle-grid">
        <label class="toggle"><input type="checkbox" bind:checked={useLower} onchange={generate} /> <span>Litere mici (a-z)</span></label>
        <label class="toggle"><input type="checkbox" bind:checked={useUpper} onchange={generate} /> <span>Litere mari (A-Z)</span></label>
        <label class="toggle"><input type="checkbox" bind:checked={useDigit} onchange={generate} /> <span>Cifre (0-9)</span></label>
        <label class="toggle"><input type="checkbox" bind:checked={useSymbol} onchange={generate} /> <span>Simboluri (!@#$…)</span></label>
        <label class="toggle"><input type="checkbox" bind:checked={excludeAmbiguous} onchange={generate} /> <span>Exclude caractere ambigue (I l 1 O 0)</span></label>
        <label class="toggle"><input type="checkbox" bind:checked={requireEach} onchange={generate} /> <span>Cel puțin unul din fiecare tip</span></label>
      </div>
    {:else if mode === "fraza"}
      <label class="slider-row">
        <span>Număr de cuvinte: <strong>{wordCount}</strong></span>
        <input type="range" min="3" max="8" step="1" bind:value={wordCount} oninput={generate} />
      </label>
      <div class="toggle-grid">
        <label class="toggle inline">
          <span>Separator</span>
          <select bind:value={separator} onchange={generate} class="select">
            <option value="-">cratimă ( - )</option>
            <option value=".">punct ( . )</option>
            <option value="_">underscore ( _ )</option>
            <option value=" ">spațiu</option>
            <option value="">fără</option>
          </select>
        </label>
        <label class="toggle"><input type="checkbox" bind:checked={capitalizeWords} onchange={generate} /> <span>Inițială majusculă</span></label>
        <label class="toggle"><input type="checkbox" bind:checked={appendNumber} onchange={generate} /> <span>Adaugă un număr la final</span></label>
      </div>
    {:else if mode === "pronuntabil"}
      <label class="slider-row">
        <span>Lungime: <strong>{pronLength}</strong> caractere</span>
        <input type="range" min="8" max="24" step="1" bind:value={pronLength} oninput={generate} />
      </label>
      <p class="hint">Silabe consoană-vocală alternante + 2 cifre — ușor de citit și rostit la telefon.</p>
    {:else}
      <label class="slider-row">
        <span>Lungime PIN: <strong>{pinLength}</strong> cifre</span>
        <input type="range" min="4" max="12" step="1" bind:value={pinLength} oninput={generate} />
      </label>
      <p class="hint">Pentru carduri, seifuri sau dispozitive. Evită datele de naștere și secvențele (1234).</p>
    {/if}

    <label class="slider-row batch">
      <span>Câte variante să generez: <strong>{batchCount}</strong></span>
      <input type="range" min="1" max="12" step="1" bind:value={batchCount} oninput={generate} />
    </label>
  </div>

  {#if warning}
    <div class="warn" role="alert">⚠️ {warning}</div>
  {/if}

  <!-- Indicator de tărie -->
  <div class="card strength-card">
    <div class="strength-head">
      <span class="strength-label" style={`color:${strength.color}`}>{strength.label}</span>
      <span class="strength-meta">{entropyBits} biți entropie · {poolSize.toLocaleString("ro-RO")} simboluri posibile</span>
    </div>
    <div class="meter" role="img" aria-label={`Tărie parolă: ${strength.label}`}>
      {#each [1, 2, 3, 4, 5] as seg}
        <span class="meter-seg" class:meter-seg--on={strength.level >= seg} style={strength.level >= seg ? `background:${strength.color}` : ""}></span>
      {/each}
    </div>
    <p class="crack">Timp estimat de spargere (atac offline, 10¹¹ încercări/sec): <strong style={`color:${strength.color}`}>{crackTime}</strong></p>
  </div>

  <!-- Rezultate -->
  <div class="card results">
    <div class="results-head">
      <h3 class="legend">Parole generate</h3>
      <div class="results-actions">
        <button type="button" class="btn btn--ghost" onclick={copyAll} disabled={passwords.length === 0}>
          {copiedIndex === -2 ? "✓ Copiat" : "📋 Copiază tot"}
        </button>
        <button type="button" class="btn btn--primary" onclick={generate}>🔄 Regenerează</button>
      </div>
    </div>
    <ul class="pw-list">
      {#each passwords as pw, i}
        <li class="pw-item">
          <code class="pw-text">{pw}</code>
          <button type="button" class="pw-copy" onclick={() => copy(i)} aria-label="Copiază parola">
            {copiedIndex === i ? "✓" : "📋"}
          </button>
        </li>
      {/each}
    </ul>
  </div>

  <p class="disclaimer">
    🔒 Toate parolele sunt generate <strong>local, în browserul tău</strong>, folosind <code>crypto.getRandomValues()</code> (generator criptografic sigur). Nimic nu este trimis, salvat sau înregistrat pe vreun server. Reîncarcă pagina și parolele dispar definitiv.
  </p>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--r-lg, 12px);
    padding: var(--sp-5);
  }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0 0 var(--sp-3); padding: 0; }

  /* Mode grid */
  .modes { padding: var(--sp-5); }
  .mode-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: var(--sp-3); }
  .mode-card {
    display: flex; flex-direction: column; gap: var(--sp-1);
    padding: var(--sp-4);
    background: var(--bg-input);
    border: 2px solid var(--border);
    border-radius: var(--r-md, 8px);
    cursor: pointer; text-align: left;
    transition: all var(--t-fast, 0.15s);
    color: var(--text);
  }
  .mode-card:hover { border-color: var(--cat-fejleszto); transform: translateY(-1px); }
  .mode-card--active {
    border-color: var(--cat-fejleszto);
    background: color-mix(in srgb, var(--cat-fejleszto) 10%, var(--bg-card));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-fejleszto) 25%, transparent);
  }
  .mode-card__icon { font-size: 1.4rem; }
  .mode-card__label { font-weight: 700; font-size: .95rem; }
  .mode-card__desc { font-size: .78rem; color: var(--text-muted); }

  /* Options */
  .options { display: flex; flex-direction: column; gap: var(--sp-4); }
  .slider-row { display: flex; flex-direction: column; gap: var(--sp-2); font-size: .9rem; color: var(--text); }
  .slider-row input[type="range"] { accent-color: var(--cat-fejleszto); }
  .slider-row.batch { border-top: 1px solid var(--border); padding-top: var(--sp-4); }
  .toggle-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--sp-3); }
  .toggle { display: flex; align-items: center; gap: var(--sp-2); font-size: .875rem; color: var(--text); cursor: pointer; }
  .toggle.inline { justify-content: space-between; }
  .toggle input[type="checkbox"] { accent-color: var(--cat-fejleszto); width: 18px; height: 18px; }
  .select {
    background: var(--bg-input); color: var(--text);
    border: 1px solid var(--border); border-radius: var(--r-md, 8px);
    padding: var(--sp-2) var(--sp-3); font-size: .875rem;
  }
  .hint { margin: 0; font-size: .8125rem; color: var(--text-muted); }

  .warn {
    background: color-mix(in srgb, #ea580c 8%, var(--bg-card));
    border: 1px solid color-mix(in srgb, #ea580c 35%, var(--border));
    color: #c2410c; border-radius: var(--r-md, 8px);
    padding: var(--sp-3) var(--sp-4); font-size: .8125rem;
  }

  /* Strength */
  .strength-head { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: var(--sp-2); }
  .strength-label { font-weight: 700; font-size: 1.05rem; }
  .strength-meta { font-size: .78rem; color: var(--text-muted); }
  .meter { display: flex; gap: 6px; margin: var(--sp-3) 0; }
  .meter-seg { flex: 1; height: 8px; border-radius: 4px; background: var(--border); transition: background var(--t-fast, .15s); }
  .crack { margin: 0; font-size: .8125rem; color: var(--text-muted); }

  /* Results */
  .results-head { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .results-head .legend { margin: 0; }
  .results-actions { display: flex; gap: var(--sp-2); }
  .pw-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--sp-2); }
  .pw-item {
    display: flex; align-items: center; gap: var(--sp-2);
    background: var(--bg-input);
    border: 1px solid var(--border);
    border-radius: var(--r-md, 8px);
    padding: var(--sp-2) var(--sp-3);
  }
  .pw-text {
    flex: 1; font-family: var(--font-mono, monospace);
    font-size: 1rem; color: var(--text);
    word-break: break-all; user-select: all;
  }
  .pw-copy {
    flex-shrink: 0;
    background: transparent; border: 1px solid var(--border);
    border-radius: var(--r-md, 8px); cursor: pointer;
    padding: var(--sp-2) var(--sp-3); color: var(--text);
    transition: all var(--t-fast, .15s);
  }
  .pw-copy:hover { border-color: var(--cat-fejleszto); }

  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: var(--sp-2);
    padding: var(--sp-3) var(--sp-4);
    border-radius: var(--r-md, 8px); font-weight: 600; font-size: .9rem;
    cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid transparent;
  }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-fejleszto); color: white; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
  .btn--ghost { background: var(--bg-input); border-color: var(--border); color: var(--text); }
  .btn--ghost:hover:not(:disabled) { border-color: var(--cat-fejleszto); }

  .disclaimer {
    font-size: .8125rem; color: var(--text-muted);
    background: color-mix(in srgb, var(--cat-fejleszto) 6%, var(--bg-card));
    border: 1px solid color-mix(in srgb, var(--cat-fejleszto) 30%, var(--border));
    border-radius: var(--r-md, 8px); padding: var(--sp-3) var(--sp-4); margin: 0;
  }
  .disclaimer code { font-family: var(--font-mono, monospace); font-size: .78rem; }
</style>
