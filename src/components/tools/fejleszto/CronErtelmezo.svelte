<script lang="ts">
  // ─── Cron kifejezés magyarázó (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      inLbl: "Cron kifejezés (5 mező: perc óra nap hónap hét-napja)",
      presets: "Sablonok", pEvery: "Percenként", pHour: "Óránként", pDay: "Naponta éjfélkor", pWeekday: "Hétköznap 9:00", pWeek: "Hetente (vasárnap)",
      fields: "Mezők", minute: "Perc", hour: "Óra", dom: "Nap (hónap)", month: "Hónap", dow: "Hét napja",
      any: "minden", every: "-ként", range: "tartomány", list: "lista",
      next: "Következő futások", invalid: "Érvénytelen cron (pontosan 5, szóközzel elválasztott mező kell)", empty: "Illessz be egy cron kifejezést.",
      days: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],
      months: ["jan", "feb", "márc", "ápr", "máj", "jún", "júl", "aug", "szep", "okt", "nov", "dec"],
      hint: "A cron a szerveridőt/a böngésződ időzónáját használja. Az UTC-hez igazítsd a szervered zónájához.",
    },
    ro: {
      inLbl: "Expresie cron (5 câmpuri: minut oră zi lună zi-săptămână)",
      presets: "Șabloane", pEvery: "În fiecare minut", pHour: "În fiecare oră", pDay: "Zilnic la miezul nopții", pWeekday: "Zilele lucrătoare 9:00", pWeek: "Săptămânal (duminică)",
      fields: "Câmpuri", minute: "Minut", hour: "Oră", dom: "Zi (lună)", month: "Lună", dow: "Ziua săptămânii",
      any: "oricare", every: " la fiecare", range: "interval", list: "listă",
      next: "Următoarele execuții", invalid: "Cron invalid (sunt necesare exact 5 câmpuri separate prin spațiu)", empty: "Lipește o expresie cron.",
      days: ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"],
      months: ["ian", "feb", "mar", "apr", "mai", "iun", "iul", "aug", "sep", "oct", "nov", "dec"],
      hint: "Cron folosește ora serverului/fusul orar al browserului tău. Pentru UTC, ajustează la zona serverului.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let input = $state("0 9 * * 1-5");
  let nowTs = $state(0);
  $effect(() => { nowTs = Date.now(); });

  const fields = $derived.by(() => {
    const parts = input.trim().split(/\s+/);
    if (parts.length !== 5) return null;
    return parts;
  });

  function inList(spec: string, value: number): boolean {
    for (const part of spec.split(",")) {
      let range = part, step = 1;
      if (part.includes("/")) { const [r, s] = part.split("/"); range = r; step = Number(s) || 1; }
      let lo: number, hi: number;
      if (range === "*") { lo = -Infinity; hi = Infinity; }
      else if (range.includes("-")) { const [a, b] = range.split("-").map(Number); lo = a; hi = b; }
      else { lo = hi = Number(range); }
      if (range === "*") { if ((value - 0) % step === 0) return true; continue; }
      if (value >= lo && value <= hi && (value - lo) % step === 0) return true;
    }
    return false;
  }

  function describe(spec: string, kind: "min" | "hour" | "dom" | "month" | "dow"): string {
    if (spec === "*") return L.any;
    if (spec.startsWith("*/")) return `${spec.slice(2)}${L.every}`;
    if (kind === "dow" && /^\d(-\d)?$/.test(spec)) {
      if (spec.includes("-")) { const [a, b] = spec.split("-").map(Number); return `${L.days[a % 7]}–${L.days[b % 7]}`; }
      return L.days[Number(spec) % 7];
    }
    if (kind === "month" && /^\d{1,2}$/.test(spec)) return L.months[(Number(spec) - 1) % 12];
    return spec;
  }

  const next = $derived.by(() => {
    if (!fields || nowTs === 0) return [] as Date[];
    const [mi, ho, dom, mo, dow] = fields;
    const runs: Date[] = [];
    const d = new Date(nowTs);
    d.setSeconds(0, 0);
    d.setMinutes(d.getMinutes() + 1);
    for (let i = 0; i < 527040 && runs.length < 5; i++) {
      if (inList(mi, d.getMinutes()) && inList(ho, d.getHours()) && inList(dom, d.getDate()) && inList(mo, d.getMonth() + 1) && inList(dow, d.getDay())) {
        runs.push(new Date(d));
      }
      d.setMinutes(d.getMinutes() + 1);
    }
    return runs;
  });

  function fmt(d: Date): string {
    return d.toLocaleString(LANG === "ro" ? "ro-RO" : "hu-HU", { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  }
  function preset(v: string) { input = v; }
</script>

<div class="tool">
  <div class="presets">
    <span class="presets-lbl">{L.presets}:</span>
    <button type="button" class="chip" onclick={() => preset("* * * * *")}>{L.pEvery}</button>
    <button type="button" class="chip" onclick={() => preset("0 * * * *")}>{L.pHour}</button>
    <button type="button" class="chip" onclick={() => preset("0 0 * * *")}>{L.pDay}</button>
    <button type="button" class="chip" onclick={() => preset("0 9 * * 1-5")}>{L.pWeekday}</button>
    <button type="button" class="chip" onclick={() => preset("0 0 * * 0")}>{L.pWeek}</button>
  </div>

  <div class="card">
    <label class="lbl" for="cr-in">{L.inLbl}</label>
    <input id="cr-in" class="inp mono" type="text" bind:value={input} placeholder="0 9 * * 1-5" />
  </div>

  {#if !input.trim()}
    <div class="card"><p class="empty">{L.empty}</p></div>
  {:else if !fields}
    <div class="card"><p class="err">⚠ {L.invalid}</p></div>
  {:else}
    <div class="card">
      <h3 class="legend">{L.fields}</h3>
      <div class="fgrid">
        <div class="fcell"><span class="fk">{L.minute}</span><code class="fv">{fields[0]}</code><span class="fd">{describe(fields[0], "min")}</span></div>
        <div class="fcell"><span class="fk">{L.hour}</span><code class="fv">{fields[1]}</code><span class="fd">{describe(fields[1], "hour")}</span></div>
        <div class="fcell"><span class="fk">{L.dom}</span><code class="fv">{fields[2]}</code><span class="fd">{describe(fields[2], "dom")}</span></div>
        <div class="fcell"><span class="fk">{L.month}</span><code class="fv">{fields[3]}</code><span class="fd">{describe(fields[3], "month")}</span></div>
        <div class="fcell"><span class="fk">{L.dow}</span><code class="fv">{fields[4]}</code><span class="fd">{describe(fields[4], "dow")}</span></div>
      </div>
    </div>
    <div class="card">
      <h3 class="legend">{L.next}</h3>
      <ul class="next">
        {#each next as r}<li class="nrow"><span class="ndot"></span><code>{fmt(r)}</code></li>{/each}
      </ul>
    </div>
  {/if}
  <p class="hint">{L.hint}</p>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-4); }
  .presets { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; }
  .presets-lbl { font-size: .8125rem; color: var(--text-muted); font-weight: 600; }
  .chip { background: var(--bg-input); border: 1px solid var(--border); border-radius: 999px; padding: var(--sp-1) var(--sp-3); font-size: .8rem; color: var(--text); cursor: pointer; transition: all var(--t-fast, .15s); }
  .chip:hover { border-color: var(--cat-fejleszto, #06b6d4); color: var(--cat-fejleszto, #06b6d4); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .lbl { display: block; font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-3); font-size: 1rem; font-family: inherit; }
  .mono { font-family: var(--font-mono, monospace); letter-spacing: .05em; }
  .inp:focus { outline: none; border-color: var(--cat-fejleszto, #06b6d4); box-shadow: 0 0 0 3px #06b6d422; }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0 0 var(--sp-3); }

  .fgrid { display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--sp-2); }
  @media (max-width: 640px) { .fgrid { grid-template-columns: 1fr 1fr; } }
  .fcell { display: flex; flex-direction: column; gap: 4px; align-items: center; text-align: center; padding: var(--sp-3) var(--sp-2); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); }
  .fk { font-size: .68rem; text-transform: uppercase; letter-spacing: .04em; color: var(--text-subtle); }
  .fv { font-family: var(--font-mono, monospace); font-size: 1rem; font-weight: 700; color: var(--cat-fejleszto, #06b6d4); }
  .fd { font-size: .72rem; color: var(--text-muted); }

  .next { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--sp-2); }
  .nrow { display: flex; align-items: center; gap: var(--sp-3); font-family: var(--font-mono, monospace); font-size: .85rem; color: var(--text); }
  .ndot { width: 8px; height: 8px; border-radius: 50%; background: var(--cat-fejleszto, #06b6d4); flex-shrink: 0; }
  .err { margin: 0; padding: var(--sp-4); color: var(--error); font-size: .85rem; background: var(--bg-input); border: 1px solid var(--error); border-radius: var(--r-md, 8px); }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: 0; font-size: .75rem; color: var(--text-subtle); }
</style>
