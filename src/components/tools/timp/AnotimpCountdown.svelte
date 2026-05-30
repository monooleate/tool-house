<script lang="ts">
  // ============================================================
  // AnotimpCountdown.svelte — Numărătoare inversă până la un anotimp.
  // Componentă PARAMETRIZATĂ: folosită de 4 pagini (primăvară/vară/toamnă/iarnă)
  // prin componentProps din tool-registry.
  // Ținta = INSTANTUL astronomic real (echinocțiu/solstițiu), calculat cu
  // algoritmul Meeus (astro-seasons.ts) — corect ±minute, nu fix pe 20/21/22.
  //   props: nume, emoji, season ("primavara"|"vara"|"toamna"|"iarna"), panaLa
  // ============================================================
  import CountdownBase from "./CountdownBase.svelte";
  import { seasonInstant, type Season } from "../../../lib/astro-seasons.ts";

  let {
    nume = "Vară",
    emoji = "☀️",
    season = "vara" as Season,
    panaLa = "vară",
  }: {
    nume?: string;
    emoji?: string;
    season?: Season;
    panaLa?: string;
  } = $props();

  const CELEBRATION_MS = 24 * 60 * 60 * 1000;

  function getTargetDate(now: Date): Date {
    const y = now.getFullYear();
    const thisYear = seasonInstant(y, season);
    if (now.getTime() >= thisYear.getTime() && now.getTime() < thisYear.getTime() + CELEBRATION_MS) {
      return thisYear;
    }
    return now.getTime() < thisYear.getTime() ? thisYear : seasonInstant(y + 1, season);
  }

  function progressPercent(now: Date, target: Date): number {
    const targetY = target.getFullYear();
    const jan1 = new Date(targetY, 0, 1);
    const total = target.getTime() - jan1.getTime();
    const elapsed = now.getTime() - jan1.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  function progressLabel(zile: number): string {
    if (zile === 0) return `A început ${panaLa}!`;
    if (zile === 1) return `1 zi până la ${panaLa}`;
    return `${zile} zile până la ${panaLa}`;
  }

  function mathFact(zile: number, ore: number, min: number, _sec: number): string {
    const totalOre = zile * 24 + ore;
    const totalMin = totalOre * 60 + min;
    return `Până la ${panaLa}: ${zile} zile = ${totalOre.toLocaleString("ro-RO")} ore = ${totalMin.toLocaleString("ro-RO")} minute.`;
  }
</script>

<CountdownBase
  name={nume}
  {emoji}
  {getTargetDate}
  {progressLabel}
  {progressPercent}
  {mathFact}
  celebrationMessage={`${emoji} A început ${panaLa}! ${emoji}`}
/>
