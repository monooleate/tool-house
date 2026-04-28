<script lang="ts">
  // ============================================================
  // BacalaureatCountdown.svelte — Numărătoare inversă Bacalaureat RO
  // Port: math reference VissszaszamlaErettsegi.tsx, RO-localizat pentru BAC RO.
  // Bacalaureatul în România se desfășoară în iunie (sesiunea de vară,
  //   ~15-29 iunie) și septembrie (sesiunea de toamnă).
  // Folosim a 3-a luni din iunie ca țintă (ziua tipică a primei probe).
  // Auto-advance: după ~14 zile celebrare (acoperă întreaga sesiune scrisă +
  //   probele orale) trece la BAC anul școlar următor.
  // ============================================================
  import CountdownBase from "./CountdownBase.svelte";

  // 14 zile celebration window — acoperă întreaga sesiune BAC scrisă + orală
  const CELEBRATION_MS = 14 * 24 * 60 * 60 * 1000;

  function thirdMondayOfJune(year: number): Date {
    // Găsește prima luni din iunie, apoi adaugă 14 zile
    const d = new Date(year, 5, 1);
    const dayOfWeek = d.getDay(); // 0=Du, 1=Lu, ...
    const offsetToMonday = (1 - dayOfWeek + 7) % 7;
    d.setDate(1 + offsetToMonday + 14);
    return d;
  }

  function getTargetDate(now: Date): Date {
    const y = now.getFullYear();
    const thisYear = thirdMondayOfJune(y);
    // În fereastra de celebrare a BAC din anul curent (2 săpt. de probe)?
    if (now.getTime() >= thisYear.getTime() && now.getTime() < thisYear.getTime() + CELEBRATION_MS) {
      return thisYear;
    }
    // În rest: dacă BAC-ul anului ăsta e încă în viitor → țintă curentă; altfel → anul viitor.
    return now < thisYear ? thisYear : thirdMondayOfJune(y + 1);
  }

  function progressPercent(now: Date, target: Date): number {
    // Anul școlar începe ~13 sept anul anterior (an_target - 1, lună 8 = sept)
    const start = new Date(target.getFullYear() - 1, 8, 13);
    const total = target.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  function progressLabel(zile: number): string {
    if (zile === 0) return "Mult succes la BAC!";
    if (zile <= 30) return `${zile} ${zile === 1 ? "zi" : "zile"} — sprint final!`;
    if (zile <= 90) return `${zile} zile — perioada de pregătire intensă`;
    return `${zile} zile până la Bacalaureat`;
  }

  function motivation(zile: number): string {
    if (zile === 0) return "Astăzi e ziua! Respiră adânc, ai învățat — acum doar să arăți ce știi.";
    if (zile <= 7) return "Ultima săptămână! Recapitulare ușoară, somn bun, fără stres.";
    if (zile <= 30) return "30 zile = 720 ore. Cu 4 ore/zi de studiu efectiv = ~120 ore productive. Suficient pentru recapitulare!";
    if (zile <= 90) return "3 luni = ~90 zile. Plan: 1/3 recapitulare română, 1/3 matematică/profil, 1/3 simulări.";
    return "Începe cu un plan: împarte materia în săptămâni. 1 mod recapitulat / săptămână = 30+ moduri / an.";
  }

  function mathFact(zile: number, ore: number, _min: number, _sec: number): string {
    const target = getTargetDate(new Date());
    const totalOre = zile * 24 + ore;
    const studyOre = Math.floor(zile * 4); // 4 ore/zi de studiu efectiv
    return `BAC ${target.getFullYear()}: ~${target.getDate()} iunie. Mai sunt ${zile} zile = ${totalOre.toLocaleString("ro-RO")} ore total, din care ~${studyOre.toLocaleString("ro-RO")} ore de studiu efectiv (4h/zi). ${motivation(zile)}`;
  }
</script>

<CountdownBase
  name="Bacalaureat (sesiunea de vară)"
  emoji="🎓"
  {getTargetDate}
  {progressLabel}
  {progressPercent}
  {mathFact}
  celebrationMessage="🎓 Mult succes la BAC! 🎓"
/>
