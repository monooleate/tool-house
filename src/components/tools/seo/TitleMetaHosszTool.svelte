<script lang="ts">
  import { ui } from "../../../lib/ui-labels.ts";
  // ─── State ────────────────────────────────────────────────
  let title = "";
  let metaDescription = "";
  let url = "https://example.com/pelda-oldal";

  // ─── Constants ────────────────────────────────────────────
  const TITLE_MAX_CHARS = 60;
  const TITLE_WARN_CHARS = 50;
  const META_MAX_CHARS = 160;
  const META_WARN_CHARS = 120;
  const TITLE_MAX_PX = 600;
  const AVG_CHAR_PX = 7; // Arial 16px átlagos karakterszélesség

  // ─── Reactive calculations ────────────────────────────────
  $: titleLen = title.length;
  $: metaLen = metaDescription.length;
  $: titlePx = Math.round(titleLen * AVG_CHAR_PX);
  $: metaPx = Math.round(metaLen * AVG_CHAR_PX);

  $: titleStatus = getStatus(titleLen, TITLE_WARN_CHARS, TITLE_MAX_CHARS);
  $: metaStatus = getStatus(metaLen, META_WARN_CHARS, META_MAX_CHARS);
  $: titlePxStatus = titlePx <= 520 ? "ok" : titlePx <= TITLE_MAX_PX ? "warn" : "over";

  // ─── SERP Preview ─────────────────────────────────────────
  $: serpTitle = title || ui.pageTitlePlaceholder;
  $: serpTitleTruncated = titlePx > TITLE_MAX_PX
    ? serpTitle.slice(0, Math.floor(TITLE_MAX_PX / AVG_CHAR_PX)) + "..."
    : serpTitle;
  $: serpMeta = metaDescription || ui.metaDescPreview;
  $: serpMetaTruncated = metaLen > META_MAX_CHARS
    ? serpMeta.slice(0, META_MAX_CHARS) + "..."
    : serpMeta;

  function getStatus(len: number, warn: number, max: number): "ok" | "warn" | "over" {
    if (len === 0) return "ok";
    if (len <= warn) return "ok";
    if (len <= max) return "warn";
    return "over";
  }

  function getStatusColor(status: "ok" | "warn" | "over"): string {
    if (status === "ok") return "var(--success)";
    if (status === "warn") return "var(--warning)";
    return "var(--error)";
  }

  function getBarWidth(current: number, max: number): number {
    return Math.min((current / max) * 100, 100);
  }
</script>

<!-- Title input -->
<div class="field-group">
  <label class="label" for="title-input">
    Title tag
  </label>
  <textarea
    id="title-input"
    class="textarea title-input"
    class:field--warn={titleStatus === "warn"}
    class:field--over={titleStatus === "over"}
    placeholder={ui.titleTagPlaceholder}
    bind:value={title}
    rows="2"
  ></textarea>
  <div class="counters">
    <div class="counter">
      <span class="counter__label">Karakterek:</span>
      <span class="counter__value" style="color: {getStatusColor(titleStatus)}">
        {titleLen} / {TITLE_MAX_CHARS}
      </span>
    </div>
    <div class="counter">
      <span class="counter__label">Pixel (becsült):</span>
      <span class="counter__value" style="color: {getStatusColor(titlePxStatus)}">
        ~{titlePx}px / {TITLE_MAX_PX}px
      </span>
    </div>
  </div>
  <div class="progress-track">
    <div
      class="progress-fill"
      style="width: {getBarWidth(titleLen, TITLE_MAX_CHARS)}%; background: {getStatusColor(titleStatus)}"
    ></div>
  </div>
</div>

<!-- Meta description input -->
<div class="field-group">
  <label class="label" for="meta-input">
    Meta description
  </label>
  <textarea
    id="meta-input"
    class="textarea meta-input"
    class:field--warn={metaStatus === "warn"}
    class:field--over={metaStatus === "over"}
    placeholder={ui.metaDescPlaceholder}
    bind:value={metaDescription}
    rows="3"
  ></textarea>
  <div class="counters">
    <div class="counter">
      <span class="counter__label">Karakterek:</span>
      <span class="counter__value" style="color: {getStatusColor(metaStatus)}">
        {metaLen} / {META_MAX_CHARS}
      </span>
    </div>
  </div>
  <div class="progress-track">
    <div
      class="progress-fill"
      style="width: {getBarWidth(metaLen, META_MAX_CHARS)}%; background: {getStatusColor(metaStatus)}"
    ></div>
  </div>
</div>

<!-- URL input -->
<div class="field-group field-group--url">
  <label class="label" for="url-input">
    URL <span class="label-opt">(opcionális, a SERP előnézethez)</span>
  </label>
  <input
    id="url-input"
    type="text"
    class="input"
    placeholder="https://example.com/pelda-oldal"
    bind:value={url}
  />
</div>

<!-- SERP Preview -->
<div class="serp-section">
  <h2 class="section-title">SERP előnézet</h2>
  <p class="serp-hint">Így jelenne meg a Google keresési találatokban (közelítő nézet):</p>

  <div class="serp-card">
    <div class="serp-url">{url || "https://example.com"}</div>
    <div class="serp-title">{serpTitleTruncated}</div>
    <div class="serp-meta">{serpMetaTruncated}</div>
  </div>
</div>

<!-- Summary cards -->
<div class="summary-grid">
  <div class="summary-card" style="--status-color: {getStatusColor(titleStatus)}">
    <div class="summary-card__icon">
      {#if titleStatus === "ok"}&#x2705;
      {:else if titleStatus === "warn"}&#x26A0;&#xFE0F;
      {:else}&#x274C;{/if}
    </div>
    <div class="summary-card__content">
      <div class="summary-card__title">Title tag</div>
      <div class="summary-card__text">
        {#if titleLen === 0}{ui.enterTitle}
        {:else if titleStatus === "ok"}Tökéletes hosszúság!
        {:else if titleStatus === "warn"}Elfogadható, de közelíted a limitet
        {:else}{titleLen - TITLE_MAX_CHARS} karakterrel túl hosszú – a Google csonkolni fogja{/if}
      </div>
    </div>
  </div>

  <div class="summary-card" style="--status-color: {getStatusColor(metaStatus)}">
    <div class="summary-card__icon">
      {#if metaStatus === "ok"}&#x2705;
      {:else if metaStatus === "warn"}&#x26A0;&#xFE0F;
      {:else}&#x274C;{/if}
    </div>
    <div class="summary-card__content">
      <div class="summary-card__title">Meta description</div>
      <div class="summary-card__text">
        {#if metaLen === 0}{ui.enterMetaDesc}
        {:else if metaStatus === "ok"}Ideális hosszúság!
        {:else if metaStatus === "warn"}Elfogadható – még nem csonkolja a Google
        {:else}{metaLen - META_MAX_CHARS} karakterrel túl hosszú – csonkolódni fog{/if}
      </div>
    </div>
  </div>
</div>

<style>
/* Field groups */
.field-group {
  margin-bottom: var(--sp-6);
}

.field-group--url {
  margin-bottom: var(--sp-8);
}

.title-input {
  min-height: auto;
  resize: vertical;
}

.meta-input {
  min-height: auto;
  resize: vertical;
}

.field--warn {
  border-color: var(--warning);
}

.field--warn:focus {
  border-color: var(--warning);
  box-shadow: 0 0 0 3px #f59e0b20;
}

.field--over {
  border-color: var(--error);
}

.field--over:focus {
  border-color: var(--error);
  box-shadow: 0 0 0 3px #ef444420;
}

.label-opt {
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  color: var(--text-subtle);
  font-size: 0.7rem;
}

/* Counters */
.counters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-4);
  margin-top: var(--sp-2);
  margin-bottom: var(--sp-2);
}

.counter {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

.counter__label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.counter__value {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
}

/* SERP Preview */
.serp-section {
  margin-bottom: var(--sp-8);
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: var(--sp-3);
}

.serp-hint {
  font-size: 0.875rem;
  margin-bottom: var(--sp-4);
}

.serp-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: var(--sp-5) var(--sp-6);
  max-width: 640px;
}

.serp-url {
  font-family: Arial, sans-serif;
  font-size: 0.8125rem;
  color: #4d5156;
  margin-bottom: var(--sp-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dark .serp-url { color: #bdc1c6; }

.serp-title {
  font-family: Arial, sans-serif;
  font-size: 1.25rem;
  color: #1a0dab;
  line-height: 1.3;
  margin-bottom: var(--sp-2);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  cursor: pointer;
}

.dark .serp-title { color: #8ab4f8; }

.serp-title:hover { text-decoration: underline; }

.serp-meta {
  font-family: Arial, sans-serif;
  font-size: 0.875rem;
  line-height: 1.58;
  color: #4d5156;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.dark .serp-meta { color: #bdc1c6; }

/* Summary */
.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-4);
}

@media (max-width: 600px) {
  .summary-grid { grid-template-columns: 1fr; }
}

.summary-card {
  display: flex;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 3px solid var(--status-color, var(--border));
  border-radius: var(--r-md);
}

.summary-card__icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.summary-card__title {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: var(--sp-1);
}

.summary-card__text {
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.5;
}
</style>
