<script lang="ts">
  // ============================================================
  // PastiCountdown.svelte — Numărătoare inversă Paști ortodox
  // Port: math reference VissszaszamlaHusvet.tsx (era catolic),
  //       refăcut pentru Paștele ORTODOX (calendar Iulian + 13 zile).
  // Algoritm Meeus pentru Paști iulian, apoi conversie iulian → gregorian
  // adăugând 13 zile (valabil pentru anii 1900-2099).
  // Auto-advance: după 48h celebrare (acoperă Duminica + Lunea Luminată,
  //   ambele sărbători legale RO) trece la Paștele anului viitor.
  // ============================================================
  import CountdownBase from "./CountdownBase.svelte";

  // 48h celebration — Duminica Învierii + A doua zi de Paști (Lunea Luminată)
  const CELEBRATION_MS = 48 * 60 * 60 * 1000;

  // Meeus Julian algorithm — Easter date pe calendar iulian
  function pastiOrtodox(year: number): Date {
    const a = year % 4;
    const b = year % 7;
    const c = year % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const julianMonth = Math.floor((d + e + 114) / 31); // 3 (martie) sau 4 (aprilie)
    const julianDay = ((d + e + 114) % 31) + 1;
    // Conversie iulian → gregorian: +13 zile (1900-2099)
    const date = new Date(year, julianMonth - 1, julianDay);
    date.setDate(date.getDate() + 13);
    return date;
  }

  function getTargetDate(now: Date): Date {
    const y = now.getFullYear();
    const thisYear = pastiOrtodox(y);
    // În fereastra de celebrare a Paștelui din anul curent? Păstrează țința.
    if (now.getTime() >= thisYear.getTime() && now.getTime() < thisYear.getTime() + CELEBRATION_MS) {
      return thisYear;
    }
    // În rest: dacă Paștele anului ăsta e încă în viitor → țintă curentă; altfel → anul viitor.
    return now < thisYear ? thisYear : pastiOrtodox(y + 1);
  }

  function progressPercent(now: Date, target: Date): number {
    const prev = pastiOrtodox(target.getFullYear() - 1);
    const total = target.getTime() - prev.getTime();
    const elapsed = now.getTime() - prev.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  function progressLabel(zile: number): string {
    if (zile === 0) return "Hristos a înviat!";
    return `${zile} ${zile === 1 ? "zi" : "zile"} până la Paști`;
  }

  function mathFact(zile: number, ore: number, _min: number, _sec: number): string {
    const target = getTargetDate(new Date());
    const totalOre = zile * 24 + ore;
    return `Paști ortodox ${target.getFullYear()}: ${target.getDate()} ${["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"][target.getMonth()]} (algoritm Meeus, calendar iulian + 13 zile). Sărbătoare mobilă! Mai sunt ${zile} zile = ${totalOre.toLocaleString("ro-RO")} ore.`;
  }
</script>

<CountdownBase
  name="Paști ortodox"
  emoji="🐣"
  {getTargetDate}
  {progressLabel}
  {progressPercent}
  {mathFact}
  celebrationMessage="🐣 Hristos a înviat! 🐣"
/>
