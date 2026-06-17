<script lang="ts">
  // ─── Szó- és karakterszámláló (100% kliensoldali, kétnyelvű build-idős) ───
  // A nyelvet a PUBLIC_SITE_LANG env dönti el build-időben (HU/RO külön deploy),
  // ugyanúgy mint a ui-labels.ts-ben. A számlálási logika nyelvfüggetlen.
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  type Dict = {
    inputLabel: string;
    placeholder: string;
    clear: string;
    copyStats: string;
    copied: string;
    words: string;
    characters: string;
    charactersNoSpaces: string;
    sentences: string;
    paragraphs: string;
    lines: string;
    readingTime: string;
    speakingTime: string;
    perMinute: (n: number) => string;
    minShort: string;
    secShort: string;
    limitsTitle: string;
    limitsHint: string;
    remaining: string;
    over: string;
    topWordsTitle: string;
    topWordsHint: string;
    occurrences: string;
    statsHeading: string;
    locale: string;
  };

  const DICT: Record<"hu" | "ro", Dict> = {
    hu: {
      inputLabel: "Szöveg",
      placeholder: "Illeszd be vagy írd ide a szöveget…",
      clear: "Törlés",
      copyStats: "Statisztika másolása",
      copied: "Másolva!",
      words: "Szavak",
      characters: "Karakterek",
      charactersNoSpaces: "Karakter (szóköz nélkül)",
      sentences: "Mondatok",
      paragraphs: "Bekezdések",
      lines: "Sorok",
      readingTime: "Olvasási idő",
      speakingTime: "Beszédidő",
      perMinute: (n) => `~${n} szó/perc`,
      minShort: "perc",
      secShort: "mp",
      limitsTitle: "Karakterkorlátok",
      limitsHint: "Hogyan fér bele a szöveged a gyakori limitekbe (szóközökkel együtt).",
      remaining: "maradt",
      over: "túllépve",
      topWordsTitle: "Leggyakoribb szavak",
      topWordsHint: "A kötőszavak és névelők kiszűrve.",
      occurrences: "előfordulás",
      statsHeading: "Statisztika",
      locale: "hu-HU",
    },
    ro: {
      inputLabel: "Text",
      placeholder: "Lipește sau scrie textul aici…",
      clear: "Șterge tot",
      copyStats: "Copiază statistica",
      copied: "Copiat!",
      words: "Cuvinte",
      characters: "Caractere",
      charactersNoSpaces: "Caractere (fără spații)",
      sentences: "Propoziții",
      paragraphs: "Paragrafe",
      lines: "Rânduri",
      readingTime: "Timp de citire",
      speakingTime: "Timp de vorbire",
      perMinute: (n) => `~${n} cuvinte/min`,
      minShort: "min",
      secShort: "sec",
      limitsTitle: "Limite de caractere",
      limitsHint: "Cum se încadrează textul tău în limitele uzuale (cu spații).",
      remaining: "rămase",
      over: "depășit cu",
      topWordsTitle: "Cele mai frecvente cuvinte",
      topWordsHint: "Cuvintele de legătură și articolele sunt excluse.",
      occurrences: "apariții",
      statsHeading: "Statistică",
      locale: "ro-RO",
    },
  };

  const L = DICT[LANG] ?? DICT.hu;

  // Karakterkorlátok (szóközökkel) — a leggyakrabban keresett limitek.
  const LIMITS: Array<{ key: string; label: string; max: number }> = [
    { key: "title", label: LANG === "ro" ? "Titlu SEO" : "SEO cím", max: 60 },
    { key: "meta", label: LANG === "ro" ? "Meta description" : "Meta leírás", max: 160 },
    { key: "tweet", label: "X / Tweet", max: 280 },
  ];

  // Stopszavak — a leggyakoribb szavak listájából kiszűrve, hogy értelmes szavak maradjanak.
  const STOPWORDS: Record<"hu" | "ro", Set<string>> = {
    hu: new Set(
      "a az egy és s is hogy nem de meg el ki be fel le csak már még mint ez az ezt azt ennek annak volt van lesz lett ha vagy sem majd mi te ő ők én ti mlink nincs sok minden semmi itt ott így úgy amely aki ami amikor mert hát no ezen azon"
        .split(/\s+/),
    ),
    ro: new Set(
      "si în in la de cu un o care sa să pe din nu este sunt ca al ale lui mai dar sau ce se pentru fie prin fără fara după dupa și a ai au am ne le îi ii lor său sau ei ea el noi voi tot toate acest această aceasta acel acea cum când cand unde"
        .split(/\s+/),
    ),
  };

  let text = $state("");

  // ─── Számlálók ─────────────────────────────────────────────
  const charCount = $derived([...text].length);
  const charNoSpaces = $derived(text.replace(/\s/g, "").length);
  const wordCount = $derived.by(() => {
    const t = text.trim();
    return t ? t.split(/\s+/).length : 0;
  });
  const sentenceCount = $derived.by(() => {
    const parts = text.split(/[.!?…]+/).map((s) => s.trim()).filter(Boolean);
    return parts.length;
  });
  const paragraphCount = $derived.by(() => {
    if (!text.trim()) return 0;
    return text.split(/\n\s*\n/).filter((p) => p.trim()).length;
  });
  const lineCount = $derived(text === "" ? 0 : text.split(/\r\n|\r|\n/).length);

  const readingSec = $derived((wordCount / 200) * 60); // ~200 szó/perc olvasás
  const speakingSec = $derived((wordCount / 130) * 60); // ~130 szó/perc beszéd

  function fmtTime(sec: number): string {
    if (!sec) return `0 ${L.secShort}`;
    if (sec < 60) return `${Math.ceil(sec)} ${L.secShort}`;
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return s ? `${m} ${L.minShort} ${s} ${L.secShort}` : `${m} ${L.minShort}`;
  }

  const topWords = $derived.by(() => {
    const tokens = text.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || [];
    const stop = STOPWORDS[LANG] ?? STOPWORDS.hu;
    const freq = new Map<string, number>();
    for (const tok of tokens) {
      if (tok.length < 2 || stop.has(tok)) continue;
      freq.set(tok, (freq.get(tok) ?? 0) + 1);
    }
    return [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));
  });

  const maxTopCount = $derived(topWords.length ? topWords[0].count : 0);

  // ─── Fő statisztika kártyák ────────────────────────────────
  const stats = $derived([
    { key: "words", label: L.words, value: wordCount.toLocaleString(L.locale), primary: true },
    { key: "chars", label: L.characters, value: charCount.toLocaleString(L.locale), primary: true },
    { key: "charsNs", label: L.charactersNoSpaces, value: charNoSpaces.toLocaleString(L.locale), primary: false },
    { key: "sentences", label: L.sentences, value: sentenceCount.toLocaleString(L.locale), primary: false },
    { key: "paragraphs", label: L.paragraphs, value: paragraphCount.toLocaleString(L.locale), primary: false },
    { key: "lines", label: L.lines, value: lineCount.toLocaleString(L.locale), primary: false },
  ]);

  let copied = $state(false);
  async function copyStats() {
    const lines = [
      `${L.words}: ${wordCount}`,
      `${L.characters}: ${charCount}`,
      `${L.charactersNoSpaces}: ${charNoSpaces}`,
      `${L.sentences}: ${sentenceCount}`,
      `${L.paragraphs}: ${paragraphCount}`,
      `${L.lines}: ${lineCount}`,
      `${L.readingTime}: ${fmtTime(readingSec)}`,
      `${L.speakingTime}: ${fmtTime(speakingSec)}`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch {}
  }

  function clear() {
    text = "";
  }
</script>

<div class="tool">
  <!-- Bevitel -->
  <div class="card input-card">
    <div class="input-head">
      <label class="legend" for="szo-input">{L.inputLabel}</label>
      <div class="input-actions">
        <button type="button" class="btn btn--ghost" onclick={copyStats} disabled={!text}>
          {copied ? `✓ ${L.copied}` : `📋 ${L.copyStats}`}
        </button>
        <button type="button" class="btn btn--ghost" onclick={clear} disabled={!text}>
          ✕ {L.clear}
        </button>
      </div>
    </div>
    <textarea
      id="szo-input"
      class="textarea"
      rows="9"
      placeholder={L.placeholder}
      bind:value={text}
      aria-label={L.inputLabel}
    ></textarea>
  </div>

  <!-- Fő statisztika -->
  <div class="stats-grid" role="group" aria-label={L.statsHeading}>
    {#each stats as s}
      <div class="stat" class:stat--primary={s.primary}>
        <span class="stat__value">{s.value}</span>
        <span class="stat__label">{s.label}</span>
      </div>
    {/each}
  </div>

  <!-- Idő-becslések -->
  <div class="time-row">
    <div class="time-card">
      <span class="time-card__icon" aria-hidden="true">📖</span>
      <div class="time-card__body">
        <span class="time-card__label">{L.readingTime}</span>
        <span class="time-card__value">{fmtTime(readingSec)}</span>
      </div>
      <span class="time-card__note">{L.perMinute(200)}</span>
    </div>
    <div class="time-card">
      <span class="time-card__icon" aria-hidden="true">🗣️</span>
      <div class="time-card__body">
        <span class="time-card__label">{L.speakingTime}</span>
        <span class="time-card__value">{fmtTime(speakingSec)}</span>
      </div>
      <span class="time-card__note">{L.perMinute(130)}</span>
    </div>
  </div>

  <!-- Karakterkorlátok -->
  <div class="card limits-card">
    <div class="limits-head">
      <h3 class="legend">{L.limitsTitle}</h3>
      <p class="hint">{L.limitsHint}</p>
    </div>
    <ul class="limits-list">
      {#each LIMITS as lim}
        {@const used = charCount}
        {@const pct = Math.min(100, (used / lim.max) * 100)}
        {@const over = used > lim.max}
        <li class="limit">
          <div class="limit__head">
            <span class="limit__label">{lim.label} <span class="limit__max">({lim.max})</span></span>
            <span class="limit__count" class:limit__count--over={over}>
              {used} / {lim.max}
              <span class="limit__delta">
                · {over ? `${L.over} ${used - lim.max}` : `${lim.max - used} ${L.remaining}`}
              </span>
            </span>
          </div>
          <div class="limit__bar">
            <span
              class="limit__fill"
              class:limit__fill--over={over}
              style={`width:${pct}%`}
            ></span>
          </div>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Leggyakoribb szavak -->
  {#if topWords.length > 0}
    <div class="card topwords-card">
      <div class="limits-head">
        <h3 class="legend">{L.topWordsTitle}</h3>
        <p class="hint">{L.topWordsHint}</p>
      </div>
      <ul class="tw-list">
        {#each topWords as tw}
          <li class="tw">
            <span class="tw__word">{tw.word}</span>
            <span class="tw__bar">
              <span class="tw__fill" style={`width:${maxTopCount ? (tw.count / maxTopCount) * 100 : 0}%`}></span>
            </span>
            <span class="tw__count">{tw.count} {L.occurrences}</span>
          </li>
        {/each}
      </ul>
    </div>
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
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; padding: 0; }
  .hint { margin: var(--sp-1) 0 0; font-size: .8125rem; color: var(--text-muted); }

  /* Bevitel */
  .input-head {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: var(--sp-2); margin-bottom: var(--sp-3);
  }
  .input-actions { display: flex; gap: var(--sp-2); }
  .textarea {
    width: 100%; box-sizing: border-box;
    font-family: var(--font-body); font-size: .9375rem; line-height: 1.6;
    background: var(--bg-input); color: var(--text);
    border: 1px solid var(--border); border-radius: var(--r-md, 8px);
    padding: var(--sp-4); resize: vertical; min-height: 160px;
  }
  .textarea:focus { outline: none; border-color: var(--cat-fejleszto); }

  /* Statisztika rács */
  .stats-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--sp-3);
  }
  .stat {
    display: flex; flex-direction: column; gap: var(--sp-1);
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: var(--r-md, 8px); padding: var(--sp-4) var(--sp-4);
    text-align: center; align-items: center;
  }
  .stat--primary {
    border-color: color-mix(in srgb, var(--cat-fejleszto) 35%, var(--border));
    background: color-mix(in srgb, var(--cat-fejleszto) 6%, var(--bg-card));
  }
  .stat__value {
    font-size: 1.6rem; font-weight: 700; color: var(--text);
    font-variant-numeric: tabular-nums; line-height: 1.1;
  }
  .stat--primary .stat__value { color: var(--cat-fejleszto); }
  .stat__label { font-size: .78rem; color: var(--text-muted); }

  /* Idő-kártyák */
  .time-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3);
  }
  @media (max-width: 560px) { .time-row { grid-template-columns: 1fr; } }
  .time-card {
    display: flex; align-items: center; gap: var(--sp-3);
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: var(--r-md, 8px); padding: var(--sp-4);
  }
  .time-card__icon { font-size: 1.5rem; flex-shrink: 0; }
  .time-card__body { display: flex; flex-direction: column; }
  .time-card__label { font-size: .78rem; color: var(--text-muted); }
  .time-card__value { font-size: 1.15rem; font-weight: 700; color: var(--text); }
  .time-card__note { margin-left: auto; font-size: .72rem; color: var(--text-subtle); white-space: nowrap; }

  /* Limitek */
  .limits-head { margin-bottom: var(--sp-4); }
  .limits-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--sp-4); }
  .limit__head { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: var(--sp-1); margin-bottom: var(--sp-2); }
  .limit__label { font-size: .875rem; font-weight: 600; color: var(--text); }
  .limit__max { color: var(--text-subtle); font-weight: 400; }
  .limit__count { font-size: .8125rem; color: var(--text-muted); font-variant-numeric: tabular-nums; }
  .limit__count--over { color: #dc2626; font-weight: 700; }
  .limit__delta { color: var(--text-subtle); }
  .limit__count--over .limit__delta { color: #dc2626; }
  .limit__bar { height: 8px; background: var(--bg-input); border-radius: 4px; overflow: hidden; }
  .limit__fill { display: block; height: 100%; background: var(--cat-fejleszto); border-radius: 4px; transition: width var(--t-fast, .15s); }
  .limit__fill--over { background: #dc2626; }

  /* Leggyakoribb szavak */
  .tw-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--sp-2); }
  .tw { display: grid; grid-template-columns: minmax(80px, 1fr) 2fr auto; align-items: center; gap: var(--sp-3); }
  .tw__word { font-weight: 600; color: var(--text); font-size: .875rem; word-break: break-all; }
  .tw__bar { height: 8px; background: var(--bg-input); border-radius: 4px; overflow: hidden; }
  .tw__fill { display: block; height: 100%; background: color-mix(in srgb, var(--cat-fejleszto) 70%, var(--accent)); border-radius: 4px; }
  .tw__count { font-size: .78rem; color: var(--text-muted); white-space: nowrap; font-variant-numeric: tabular-nums; }

  /* Gombok */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: var(--sp-2);
    padding: var(--sp-2) var(--sp-3);
    border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem;
    cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border);
    background: var(--bg-input); color: var(--text);
  }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--ghost:hover:not(:disabled) { border-color: var(--cat-fejleszto); }
</style>
