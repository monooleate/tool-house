<script lang="ts">
  // ─── Lorem Ipsum generátor (100% kliensoldali, kétnyelvű, determinisztikus) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      amount: "Mennyiség", unit: "Egység",
      paragraphs: "bekezdés", sentences: "mondat", words: "szó",
      startClassic: "Klasszikus kezdés („Lorem ipsum dolor sit amet…”)",
      output: "Generált szöveg", copy: "Másolás", copied: "Másolva!",
      chars: "karakter", wordsC: "szó",
    },
    ro: {
      amount: "Cantitate", unit: "Unitate",
      paragraphs: "paragrafe", sentences: "propoziții", words: "cuvinte",
      startClassic: "Început clasic („Lorem ipsum dolor sit amet…”)",
      output: "Text generat", copy: "Copiază", copied: "Copiat!",
      chars: "caractere", wordsC: "cuvinte",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis quasi architecto beatae vitae dicta explicabo nemo ipsam quia voluptas aspernatur aut odit fugit sed quia consequuntur magni dolores eos ratione sequi nesciunt neque porro quisquam dolorem adipisci numquam eius modi tempora incidunt magnam quaerat".split(" ");
  const START = "lorem ipsum dolor sit amet consectetur adipiscing elit".split(" ");

  let amount = $state(3);
  let unit = $state<"paragraphs" | "sentences" | "words">("paragraphs");
  let classic = $state(true);
  let copied = $state(false);

  // Determinisztikus szóválasztás (index-alapú, nincs Math.random → nincs SSR-mismatch)
  function word(i: number): string { return WORDS[i % WORDS.length]; }
  function sentence(seed: number): string {
    const len = 8 + (seed * 7) % 9; // 8–16 szó
    const parts: string[] = [];
    for (let i = 0; i < len; i++) parts.push(word(seed * 13 + i * 7));
    let s = parts.join(" ");
    s = s.charAt(0).toUpperCase() + s.slice(1);
    // vessző beszúrás a közepére a természetességért
    if (len > 10) { const c = Math.floor(len / 2); const w = parts.slice(0, c).join(" "); const rest = parts.slice(c).join(" "); s = (w.charAt(0).toUpperCase() + w.slice(1)) + ", " + rest; }
    return s + ".";
  }
  function paragraph(seed: number, sentenceCount: number): string {
    const arr: string[] = [];
    for (let i = 0; i < sentenceCount; i++) arr.push(sentence(seed * 5 + i));
    return arr.join(" ");
  }

  const output = $derived.by(() => {
    const n = Math.max(1, Math.min(100, Math.floor(amount) || 1));
    if (unit === "words") {
      const arr: string[] = [];
      for (let i = 0; i < n; i++) arr.push(classic && i < START.length ? START[i] : word(i * 11 + 3));
      let s = arr.join(" ");
      return s.charAt(0).toUpperCase() + s.slice(1) + ".";
    }
    if (unit === "sentences") {
      const arr: string[] = [];
      for (let i = 0; i < n; i++) arr.push(i === 0 && classic ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit." : sentence(i + 2));
      return arr.join(" ");
    }
    // paragraphs
    const arr: string[] = [];
    for (let i = 0; i < n; i++) {
      let p = paragraph(i + 1, 4 + (i * 3) % 3);
      if (i === 0 && classic) p = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + p;
      arr.push(p);
    }
    return arr.join("\n\n");
  });

  const wordCount = $derived(output.trim() ? output.trim().split(/\s+/).length : 0);

  async function copy() {
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card controls">
    <div class="field amount">
      <label class="lbl" for="li-amount">{L.amount}</label>
      <input id="li-amount" class="inp" type="number" min="1" max="100" bind:value={amount} />
    </div>
    <div class="field">
      <span class="lbl">{L.unit}</span>
      <div class="seg" role="group">
        <button type="button" class:seg--active={unit === "paragraphs"} onclick={() => (unit = "paragraphs")}>{L.paragraphs}</button>
        <button type="button" class:seg--active={unit === "sentences"} onclick={() => (unit = "sentences")}>{L.sentences}</button>
        <button type="button" class:seg--active={unit === "words"} onclick={() => (unit = "words")}>{L.words}</button>
      </div>
    </div>
    <label class="check"><input type="checkbox" bind:checked={classic} /><span>{L.startClassic}</span></label>
  </div>

  <div class="card">
    <div class="out-head">
      <h3 class="legend">{L.output} · <span class="badge">{wordCount} {L.wordsC} · {output.length} {L.chars}</span></h3>
      <button type="button" class="btn btn--primary" onclick={copy}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>
    </div>
    <div class="out-text">{output}</div>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .controls { display: flex; flex-direction: column; gap: var(--sp-4); }
  .field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .amount { max-width: 140px; }
  .lbl { font-size: .8125rem; font-weight: 600; color: var(--text); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit; }
  .inp:focus { outline: none; border-color: var(--cat-szoveg, #f59e0b); box-shadow: 0 0 0 3px #f59e0b22; }

  .seg { display: inline-flex; border: 1px solid var(--border); border-radius: var(--r-md, 8px); overflow: hidden; width: fit-content; }
  .seg button { background: var(--bg-input); color: var(--text-muted); border: none; padding: var(--sp-2) var(--sp-4); font-size: .8125rem; cursor: pointer; }
  .seg button.seg--active { background: var(--cat-szoveg, #f59e0b); color: #fff; font-weight: 600; }
  .check { display: inline-flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; }
  .check input[type="checkbox"] { accent-color: var(--cat-szoveg, #f59e0b); width: 16px; height: 16px; }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); flex-wrap: wrap; }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .badge { font-family: var(--font-mono, monospace); font-size: .72rem; font-weight: 700; color: var(--cat-szoveg, #f59e0b); }
  .out-text { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); font-size: .9rem; line-height: 1.65; color: var(--text); white-space: pre-wrap; max-height: 420px; overflow-y: auto; }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn--primary { background: var(--cat-szoveg, #f59e0b); color: #fff; border-color: transparent; }
  .btn--primary:hover { filter: brightness(1.08); }
</style>
