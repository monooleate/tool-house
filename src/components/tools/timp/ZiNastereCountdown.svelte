<script lang="ts">
  // ============================================================
  // ZiNastereCountdown.svelte — Numărătoare inversă zi de naștere
  // Port: math reference VissszaszamlaSzuletesnap.tsx, RO-localizat.
  // Date-picker pentru data nașterii → calculează următoarea aniversare.
  // URL-share: ?data=YYYY-MM-DD pentru link partajabil.
  // ============================================================
  import CountdownBase from "./CountdownBase.svelte";
  import { onMount } from "svelte";

  let dateInput = $state("");
  let copied = $state(false);

  onMount(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const datum = params.get("data");
      if (datum) dateInput = datum;
    }
  });

  // 24h celebration window — ziua aniversării completă
  const CELEBRATION_MS = 24 * 60 * 60 * 1000;

  let birthDate = $derived.by((): Date | null => {
    if (!dateInput) return null;
    const d = new Date(dateInput + "T00:00:00");
    return Number.isNaN(d.getTime()) ? null : d;
  });

  // Target reactiv la fiecare tick; auto-advance la aniversarea următoare după 24h
  function getTargetDate(now: Date): Date | null {
    if (!birthDate) return null;
    const thisYear = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (now.getTime() >= thisYear.getTime() && now.getTime() < thisYear.getTime() + CELEBRATION_MS) {
      return thisYear;
    }
    if (now < thisYear) return thisYear;
    return new Date(now.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  }

  let varsta = $derived.by((): { ani: number; zile: number } | null => {
    if (!birthDate) return null;
    const now = new Date();
    let ani = now.getFullYear() - birthDate.getFullYear();
    const m = now.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) ani--;
    const zile = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    return { ani: Math.max(0, ani), zile: Math.max(0, zile) };
  });

  function progressPercent(now: Date, target: Date): number {
    const prev = new Date(target);
    prev.setFullYear(target.getFullYear() - 1);
    const total = target.getTime() - prev.getTime();
    const elapsed = now.getTime() - prev.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  function progressLabel(zile: number): string {
    if (zile === 0) return "La mulți ani!";
    return `${zile} ${zile === 1 ? "zi" : "zile"} până la ziua ta`;
  }

  function mathFact(zile: number, _ore: number, _min: number, _sec: number): string {
    if (!birthDate || !varsta) return `${zile} zile până la următoarea aniversare. Adaugă data ta de naștere pentru detalii personalizate.`;
    return `Ai ${varsta.ani} ani (${varsta.zile.toLocaleString("ro-RO")} zile trăite). În ${zile} zile vei împlini ${varsta.ani + 1} ani.`;
  }

  function copyShareLink() {
    if (typeof window === "undefined" || !dateInput) return;
    const url = new URL(window.location.href);
    url.searchParams.set("data", dateInput);
    navigator.clipboard?.writeText(url.toString()).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 2000);
    });
  }
</script>

<CountdownBase
  name={birthDate ? "Următoarea zi de naștere" : "Zi de naștere"}
  emoji="🎂"
  {getTargetDate}
  {progressLabel}
  {progressPercent}
  {mathFact}
  celebrationMessage="🎂 La mulți ani! 🎂"
  showShare={false}
>
  {#snippet extraContent()}
    <div class="zin">
      <label for="zin-date" class="zin__label">🎂 Data ta de naștere</label>
      <input
        id="zin-date"
        type="date"
        class="zin__input"
        value={dateInput}
        oninput={(e) => (dateInput = (e.target as HTMLInputElement).value)}
      />
      {#if birthDate}
        <button type="button" class="zin__share" onclick={copyShareLink}>
          {copied ? "✓ Link copiat!" : "🔗 Copiază link partajabil (cu data)"}
        </button>
      {/if}
    </div>
  {/snippet}
</CountdownBase>

<style>
  .zin {
    display: flex; flex-direction: column; gap: var(--sp-2);
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .zin__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 600; }
  .zin__input {
    width: 100%; padding: var(--sp-3);
    background: var(--bg-card); border: 2px solid var(--border);
    border-radius: var(--r-md); color: var(--text);
    font-family: var(--font-mono); font-size: 1rem; outline: none;
    transition: border-color var(--t-fast);
  }
  .zin__input:focus {
    border-color: var(--cat-timp, #f97316);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-timp, #f97316) 18%, transparent);
  }
  .zin__share {
    padding: 8px 12px; font-size: 0.8125rem; font-weight: 700;
    background: color-mix(in srgb, var(--cat-timp, #f97316) 12%, var(--bg-card));
    color: var(--cat-timp, #f97316);
    border: 1px solid color-mix(in srgb, var(--cat-timp, #f97316) 30%, transparent);
    border-radius: var(--r-md); cursor: pointer;
    transition: all var(--t-fast);
  }
  .zin__share:hover {
    background: var(--cat-timp, #f97316); color: #fff;
  }
</style>
