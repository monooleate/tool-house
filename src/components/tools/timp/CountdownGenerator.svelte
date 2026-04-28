<script lang="ts">
  // ============================================================
  // CountdownGenerator.svelte — generator de numărători personalizate
  // Port: math reference VissszaszamlaSajat.tsx, RO-localizat.
  // Utilizator: setează nume + data + emoji → numărătoare live + URL partajabil
  //   ?nume=Concert&data=2026-09-15T20:00&emoji=🎵
  // ============================================================
  import CountdownBase from "./CountdownBase.svelte";
  import { onMount } from "svelte";

  let eventName = $state("Eveniment important");
  let eventDate = $state("");
  let eventTime = $state("12:00");
  let eventEmoji = $state("🎉");
  let copied = $state(false);

  const PRESET_EMOJI = ["🎉", "🎂", "🎵", "✈️", "💍", "🎓", "🏖️", "🚗", "📚", "🎮", "🎬", "⚽"];

  onMount(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const n = params.get("nume");
    const d = params.get("data");
    const e = params.get("emoji");
    if (n) eventName = n;
    if (e) eventEmoji = e;
    if (d) {
      // Format așteptat: YYYY-MM-DD sau YYYY-MM-DDTHH:MM
      const parts = d.split("T");
      eventDate = parts[0];
      if (parts[1]) eventTime = parts[1].substring(0, 5);
    } else {
      // Default: peste 30 zile
      const def = new Date();
      def.setDate(def.getDate() + 30);
      eventDate = def.toISOString().split("T")[0];
    }
  });

  // Eveniment one-time — nu auto-advance (user-defined). Țintă pură din state-ul reactiv.
  function getTargetDate(_now: Date): Date | null {
    if (!eventDate) return null;
    const iso = eventDate + "T" + (eventTime || "00:00") + ":00";
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  function progressPercent(now: Date, target: Date): number {
    // 30 de zile înainte de eveniment ca punct de referință
    const start = new Date(target);
    start.setDate(start.getDate() - 30);
    const total = target.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  function progressLabel(zile: number): string {
    if (zile === 0) return `Astăzi: ${eventName}!`;
    return `${zile} ${zile === 1 ? "zi" : "zile"} până la ${eventName}`;
  }

  function mathFact(zile: number, ore: number, _min: number, _sec: number): string {
    const totalOre = zile * 24 + ore;
    const totalMin = totalOre * 60;
    return `${eventName}: mai sunt ${zile} zile = ${totalOre.toLocaleString("ro-RO")} ore = ${totalMin.toLocaleString("ro-RO")} minute. Distribuie linkul cu prietenii pentru a urmări împreună!`;
  }

  function copyShareLink() {
    if (typeof window === "undefined" || !eventDate) return;
    const url = new URL(window.location.href);
    url.searchParams.set("nume", eventName);
    url.searchParams.set("data", eventDate + "T" + (eventTime || "00:00"));
    url.searchParams.set("emoji", eventEmoji);
    navigator.clipboard?.writeText(url.toString()).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 2000);
    });
  }
</script>

<CountdownBase
  name={eventName}
  emoji={eventEmoji}
  {getTargetDate}
  {progressLabel}
  {progressPercent}
  {mathFact}
  celebrationMessage="🎉 A sosit ziua! 🎉"
  showShare={false}
>
  {#snippet extraContent()}
    <div class="gen">
      <div class="gen__row">
        <div class="gen__field">
          <label for="gen-nume" class="gen__label">Nume eveniment</label>
          <input
            id="gen-nume"
            type="text"
            class="gen__input"
            value={eventName}
            oninput={(e) => (eventName = (e.target as HTMLInputElement).value)}
            placeholder="ex. Concert Rock"
          />
        </div>
        <div class="gen__field gen__field--small">
          <label class="gen__label">Emoji</label>
          <div class="gen__emoji-row">
            {#each PRESET_EMOJI as e}
              <button
                type="button"
                class="gen__emoji-btn"
                class:is-active={eventEmoji === e}
                onclick={() => (eventEmoji = e)}
                aria-label="Selectează emoji {e}"
              >{e}</button>
            {/each}
          </div>
        </div>
      </div>

      <div class="gen__row">
        <div class="gen__field">
          <label for="gen-data" class="gen__label">Data</label>
          <input id="gen-data" type="date" class="gen__input" value={eventDate} oninput={(e) => (eventDate = (e.target as HTMLInputElement).value)} />
        </div>
        <div class="gen__field">
          <label for="gen-ora" class="gen__label">Ora</label>
          <input id="gen-ora" type="time" class="gen__input" value={eventTime} oninput={(e) => (eventTime = (e.target as HTMLInputElement).value)} />
        </div>
      </div>

      <button type="button" class="gen__share" onclick={copyShareLink}>
        {copied ? "✓ Link copiat!" : "🔗 Copiază link partajabil cu evenimentul"}
      </button>
    </div>
  {/snippet}
</CountdownBase>

<style>
  .gen {
    display: flex; flex-direction: column; gap: var(--sp-3);
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .gen__row { display: grid; grid-template-columns: 1fr auto; gap: var(--sp-3); align-items: end; }
  @media (max-width: 640px) { .gen__row { grid-template-columns: 1fr; } }
  .gen__field { display: flex; flex-direction: column; gap: 4px; }
  .gen__field--small { min-width: 0; }
  .gen__label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
  .gen__input {
    padding: var(--sp-3);
    background: var(--bg-card); border: 2px solid var(--border);
    border-radius: var(--r-md); color: var(--text);
    font-family: var(--font-mono); font-size: 0.9375rem; outline: none;
    transition: border-color var(--t-fast);
  }
  .gen__input:focus {
    border-color: var(--cat-timp, #f97316);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-timp, #f97316) 18%, transparent);
  }
  .gen__emoji-row { display: flex; flex-wrap: wrap; gap: 4px; }
  .gen__emoji-btn {
    padding: 6px 10px; font-size: 1rem;
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: var(--r-md); cursor: pointer;
    transition: all var(--t-fast);
  }
  .gen__emoji-btn:hover { border-color: var(--cat-timp, #f97316); }
  .gen__emoji-btn.is-active {
    border-color: var(--cat-timp, #f97316);
    background: color-mix(in srgb, var(--cat-timp, #f97316) 12%, var(--bg));
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--cat-timp, #f97316) 18%, transparent);
  }
  .gen__share {
    padding: 8px 12px; font-size: 0.8125rem; font-weight: 700;
    background: color-mix(in srgb, var(--cat-timp, #f97316) 12%, var(--bg-card));
    color: var(--cat-timp, #f97316);
    border: 1px solid color-mix(in srgb, var(--cat-timp, #f97316) 30%, transparent);
    border-radius: var(--r-md); cursor: pointer;
    transition: all var(--t-fast);
  }
  .gen__share:hover { background: var(--cat-timp, #f97316); color: #fff; }
</style>
