<script lang="ts">
  // ============================================================
  // ZiuaNationalaCountdown.svelte — Numărătoare inversă 1 Decembrie
  // Ziua Națională a României (Marea Unire, 1 Decembrie 1918).
  // Sărbătoare legală (Codul Muncii art. 139).
  // Efect: confetti tricolor (albastru/galben/roșu).
  // Auto-advance: după 24h celebrare trece la anul următor.
  // ============================================================
  import CountdownBase from "./CountdownBase.svelte";

  // 24h celebration window — 1 decembrie este o singură zi de sărbătoare legală
  const CELEBRATION_MS = 24 * 60 * 60 * 1000;

  function getTargetDate(now: Date): Date {
    const y = now.getFullYear();
    const thisYear = new Date(y, 11, 1); // 1 decembrie (luna 11 = decembrie)
    if (now.getTime() >= thisYear.getTime() && now.getTime() < thisYear.getTime() + CELEBRATION_MS) {
      return thisYear;
    }
    return now < thisYear ? thisYear : new Date(y + 1, 11, 1);
  }

  function progressPercent(now: Date, target: Date): number {
    const targetY = target.getFullYear();
    const jan1 = new Date(targetY, 0, 1);
    const total = target.getTime() - jan1.getTime();
    const elapsed = now.getTime() - jan1.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  function progressLabel(zile: number): string {
    if (zile === 0) return "La mulți ani, România!";
    if (zile === 1) return "1 zi până la 1 Decembrie";
    return `${zile} zile până la 1 Decembrie`;
  }

  function mathFact(zile: number, ore: number, min: number, _sec: number): string {
    const totalOre = zile * 24 + ore;
    const totalMin = totalOre * 60 + min;
    return `Până la 1 Decembrie: ${zile} zile = ${totalOre.toLocaleString("ro-RO")} ore = ${totalMin.toLocaleString("ro-RO")} minute. Ziua Națională a României marchează Marea Unire de la 1918 și este sărbătoare legală.`;
  }

  // Confetti tricolor — culori în ordinea drapelului RO
  const TRICOLOR = ["#002B7F", "#FCD116", "#CE1126"]; // albastru, galben, roșu
</script>

<CountdownBase
  name="1 Decembrie"
  emoji="🇷🇴"
  {getTargetDate}
  {progressLabel}
  {progressPercent}
  {mathFact}
  celebrationMessage="🇷🇴 La mulți ani, România! 🇷🇴"
>
  {#snippet effectOverlay()}
    <div class="tricolor" aria-hidden="true">
      {#each Array(21) as _, i}
        <span
          class="tricolor__bit"
          style="left: {(i * 4.6) + (i % 5)}%; background: {TRICOLOR[i % 3]}; animation-delay: -{(i * 0.4) % 9}s; animation-duration: {7 + (i % 4)}s;"
        ></span>
      {/each}
    </div>
  {/snippet}
</CountdownBase>

<style>
  .tricolor { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
  .tricolor__bit {
    position: absolute; top: -8%;
    width: 7px; height: 11px;
    border-radius: 1px;
    opacity: 0.7;
    animation: tricolorfall linear infinite;
  }
  @keyframes tricolorfall {
    0% { transform: translateY(-8%) translateX(0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.7; }
    100% { transform: translateY(112%) translateX(24px) rotate(540deg); opacity: 0; }
  }
</style>
