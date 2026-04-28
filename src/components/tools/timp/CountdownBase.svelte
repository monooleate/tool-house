<script lang="ts">
  // ============================================================
  // CountdownBase.svelte — shared countdown UI (Fázis 7)
  // Port: math reference islands/visszaszamlalo/CountdownBase.tsx
  // Renders: emoji + name + target date + 4 flip digits (zile/ore/min/sec)
  //          + progress bar + math fact + share buttons + optional effect overlay
  // Used by: Craciun, Revelion, Pasti, ZiNastere, CountdownGenerator, Bacalaureat.
  // ============================================================

  import { onMount, onDestroy } from "svelte";

  type Snippet = import("svelte").Snippet;

  type Props = {
    name: string;
    emoji: string;
    /**
     * Callback evaluated REACTIVELY at every tick. Should return the
     * NEXT future occurrence (with optional celebration window for the
     * just-passed event). Returning `null` disables the countdown.
     * Annual events naturally auto-advance to next year when this fires.
     */
    getTargetDate: (now: Date) => Date | null;
    progressLabel: (zile: number) => string;
    progressPercent: (now: Date, target: Date) => number;
    mathFact: (zile: number, ore: number, min: number, sec: number) => string;
    celebrationMessage?: string;
    isCelebrating?: boolean;
    showShare?: boolean;
    effectOverlay?: Snippet;
    extraContent?: Snippet;
    headerExtra?: Snippet;
  };

  let {
    name,
    emoji,
    getTargetDate,
    progressLabel,
    progressPercent,
    mathFact,
    celebrationMessage = "🎉 A sosit ziua! 🎉",
    isCelebrating = false,
    showShare = true,
    effectOverlay,
    extraContent,
    headerExtra,
  }: Props = $props();

  type TimeLeft = { zile: number; ore: number; min: number; sec: number; total: number };

  let now = $state(new Date());
  let interval: ReturnType<typeof setInterval> | null = null;

  onMount(() => {
    now = new Date();
    interval = setInterval(() => (now = new Date()), 1000);
  });
  onDestroy(() => {
    if (interval !== null) clearInterval(interval);
  });

  // Recomputed each tick — when target passes (with optional celebration
  // window), the wrapper's getTargetDate() returns the next future date.
  let targetDate = $derived(getTargetDate(now));

  let timeLeft = $derived.by((): TimeLeft => {
    if (!targetDate) return { zile: 0, ore: 0, min: 0, sec: 0, total: 0 };
    const total = targetDate.getTime() - now.getTime();
    if (total <= 0) return { zile: 0, ore: 0, min: 0, sec: 0, total: 0 };
    return {
      zile: Math.floor(total / (1000 * 60 * 60 * 24)),
      ore: Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      min: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
      sec: Math.floor((total % (1000 * 60)) / 1000),
      total,
    };
  });

  let progress = $derived.by((): number => {
    if (!targetDate) return 0;
    return progressPercent(now, targetDate);
  });

  let factText = $derived.by((): string => {
    return mathFact(timeLeft.zile, timeLeft.ore, timeLeft.min, timeLeft.sec);
  });

  let dateLabel = $derived.by((): string => {
    if (!targetDate) return "—";
    return targetDate.toLocaleDateString("ro-RO", {
      year: "numeric", month: "long", day: "numeric", weekday: "long",
    });
  });

  let showCelebration = $derived(isCelebrating || (timeLeft.total <= 0 && targetDate !== null));

  function pad(n: number, len = 2): string {
    return String(n).padStart(len, "0");
  }

  function shareUrl(channel: "copy" | "facebook" | "x" | "whatsapp") {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const text = `${name} — ${timeLeft.zile} zile rămase`;
    if (channel === "copy") {
      navigator.clipboard?.writeText(url).then(() => {
        copied = true;
        setTimeout(() => (copied = false), 2000);
      });
      return;
    }
    let target = "";
    if (channel === "facebook") target = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    if (channel === "x") target = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    if (channel === "whatsapp") target = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`;
    window.open(target, "_blank", "noopener,noreferrer");
  }
  let copied = $state(false);
</script>

<div class="cd">
  {#if effectOverlay}
    <div class="cd__effect" aria-hidden="true">{@render effectOverlay()}</div>
  {/if}

  <div class="cd__header">
    <div class="cd__emoji" aria-hidden="true">{emoji}</div>
    <h2 class="cd__name">{name}</h2>
    <p class="cd__date">{dateLabel}</p>
    {#if headerExtra}{@render headerExtra()}{/if}
  </div>

  {#if showCelebration && celebrationMessage}
    <div class="cd__celebrate">{celebrationMessage}</div>
  {/if}

  <div
    class="cd__digits"
    role="timer"
    aria-live="polite"
    aria-atomic="true"
    aria-label="{timeLeft.zile} zile, {timeLeft.ore} ore, {timeLeft.min} minute, {timeLeft.sec} secunde"
  >
    <div class="cd__digit">
      <span class="cd__digit-num">{timeLeft.zile}</span>
      <span class="cd__digit-lbl">zile</span>
    </div>
    <div class="cd__digit">
      <span class="cd__digit-num">{pad(timeLeft.ore)}</span>
      <span class="cd__digit-lbl">ore</span>
    </div>
    <div class="cd__digit">
      <span class="cd__digit-num">{pad(timeLeft.min)}</span>
      <span class="cd__digit-lbl">min</span>
    </div>
    <div class="cd__digit">
      <span class="cd__digit-num">{pad(timeLeft.sec)}</span>
      <span class="cd__digit-lbl">sec</span>
    </div>
  </div>

  <div class="cd__progress">
    <div class="cd__progress-track">
      <div class="cd__progress-fill" style="width: {progress.toFixed(1)}%"></div>
    </div>
    <div class="cd__progress-row">
      <span class="cd__progress-lbl">{progressLabel(timeLeft.zile)}</span>
      <span class="cd__progress-pct">{progress.toFixed(1)}%</span>
    </div>
  </div>

  <div class="cd__fact">
    <span class="cd__fact-icon" aria-hidden="true">💡</span>
    <span>{factText}</span>
  </div>

  {#if extraContent}{@render extraContent()}{/if}

  {#if showShare}
    <div class="cd__share">
      <span class="cd__share-lbl">Distribuie:</span>
      <button type="button" class="cd__share-btn" onclick={() => shareUrl("facebook")} aria-label="Distribuie pe Facebook">📘 Facebook</button>
      <button type="button" class="cd__share-btn" onclick={() => shareUrl("x")} aria-label="Distribuie pe X (Twitter)">𝕏</button>
      <button type="button" class="cd__share-btn" onclick={() => shareUrl("whatsapp")} aria-label="Distribuie pe WhatsApp">💬 WhatsApp</button>
      <button type="button" class="cd__share-btn cd__share-btn--copy" onclick={() => shareUrl("copy")} aria-label="Copiază linkul">
        {copied ? "✓ Copiat!" : "🔗 Copiază link"}
      </button>
    </div>
  {/if}
</div>

<style>
  .cd {
    position: relative;
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --cd-accent: var(--cat-timp, #f97316);
    overflow: hidden;
  }
  .cd__effect {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
  }
  .cd__header,
  .cd__celebrate,
  .cd__digits,
  .cd__progress,
  .cd__fact,
  .cd__share { position: relative; z-index: 1; }

  .cd__header {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    text-align: center;
  }
  .cd__emoji { font-size: 2.5rem; line-height: 1; }
  .cd__name {
    margin: 0; font-size: 1.25rem; font-weight: 800; color: var(--cd-accent);
  }
  .cd__date {
    margin: 0; font-size: 0.875rem; color: var(--text-muted);
    font-variant: small-caps; letter-spacing: 0.02em;
  }
  .cd__celebrate {
    text-align: center; font-size: 1.5rem; font-weight: 800;
    padding: var(--sp-3); color: var(--cd-accent);
    background: color-mix(in srgb, var(--cd-accent) 12%, var(--bg));
    border: 2px solid color-mix(in srgb, var(--cd-accent) 35%, transparent);
    border-radius: var(--r-md);
  }

  .cd__digits {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: var(--sp-2);
  }
  @media (max-width: 480px) {
    .cd__digits { gap: 6px; }
  }
  .cd__digit {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    padding: var(--sp-3) var(--sp-2);
    background: color-mix(in srgb, var(--cd-accent) 8%, var(--bg));
    border: 1px solid color-mix(in srgb, var(--cd-accent) 25%, transparent);
    border-radius: var(--r-md);
  }
  .cd__digit-num {
    font-family: var(--font-mono); font-size: clamp(1.5rem, 5vw, 2.25rem);
    font-weight: 800; color: var(--cd-accent); line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .cd__digit-lbl {
    font-size: 0.6875rem; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700;
  }

  .cd__progress { display: flex; flex-direction: column; gap: 4px; }
  .cd__progress-track {
    height: 8px; background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--r-full); overflow: hidden;
  }
  .cd__progress-fill {
    height: 100%;
    background: linear-gradient(to right, color-mix(in srgb, var(--cd-accent) 70%, transparent), var(--cd-accent));
    transition: width 0.6s ease;
  }
  .cd__progress-row {
    display: flex; justify-content: space-between;
    font-size: 0.75rem; color: var(--text-muted);
  }
  .cd__progress-pct { font-family: var(--font-mono); font-weight: 700; color: var(--cd-accent); }

  .cd__fact {
    display: flex; align-items: flex-start; gap: var(--sp-2);
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md);
    font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;
  }
  .cd__fact-icon { flex-shrink: 0; }

  .cd__share {
    display: flex; flex-wrap: wrap; gap: var(--sp-2); align-items: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .cd__share-lbl { font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }
  .cd__share-btn {
    padding: 6px 12px; font-size: 0.75rem; font-weight: 600;
    background: var(--bg); color: var(--text);
    border: 1px solid var(--border); border-radius: var(--r-md);
    cursor: pointer; transition: all var(--t-fast);
  }
  .cd__share-btn:hover {
    border-color: var(--cd-accent);
    background: color-mix(in srgb, var(--cd-accent) 10%, var(--bg));
  }
  .cd__share-btn--copy {
    background: color-mix(in srgb, var(--cd-accent) 12%, var(--bg));
    color: var(--cd-accent); font-weight: 700;
  }
</style>
