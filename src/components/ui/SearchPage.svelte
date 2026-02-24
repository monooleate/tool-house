<script lang="ts">
  // ============================================================
  // SearchPage.svelte – Dedikált keresőoldal komponens
  // URL ?q= paraméterből indul, interaktív szűrés
  // ============================================================
  import { onMount } from "svelte";
  import { getAllTools, getCategoryInfo, CATEGORIES } from "../../lib/tool-registry.ts";

  const allTools = getAllTools();
  const activeTools = allTools.filter(t => t.status === "active");

  let query = "";
  let inputEl: HTMLInputElement;

  // URL-ből olvassuk a kezdő query-t
  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) query = q;
    inputEl?.focus();
  });

  // ─── Keresés ────────────────────────────────────────────────
  $: results = query.trim().length < 1
    ? activeTools
    : allTools.filter(t => {
        const q = query.toLowerCase();
        return (
          t.h1.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.keywords.some(k => k.includes(q)) ||
          t.category.includes(q)
        );
      });

  // URL frissítése query változásakor (history replace, nem push)
  $: if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    if (query.trim()) {
      url.searchParams.set("q", query.trim());
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState({}, "", url.toString());
  }

  // Kategória stat a találatokból
  $: resultsByCategory = (() => {
    const counts: Record<string, number> = {};
    for (const r of results) {
      counts[r.category] = (counts[r.category] || 0) + 1;
    }
    return counts;
  })();
</script>

<div class="search-page">
  <!-- Search input -->
  <div class="sp-input-wrap">
    <svg class="sp-search-icon" width="22" height="22" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
    <input
      bind:this={inputEl}
      bind:value={query}
      type="search"
      placeholder="Keresés név, leírás vagy kulcsszó alapján…"
      class="sp-input"
      autocomplete="off"
      spellcheck="false"
      aria-label="Keresés az eszközök között"
    />
    {#if query}
      <button
        type="button"
        class="sp-clear"
        on:click={() => { query = ""; inputEl?.focus(); }}
        aria-label="Keresés törlése"
      >✕</button>
    {/if}
  </div>

  <!-- Status -->
  <div class="sp-status">
    {#if query.trim()}
      <span class="sp-status__count">{results.length} találat</span>
      <span class="sp-status__query">erre: <strong>{query}</strong></span>
    {:else}
      <span class="sp-status__count">{activeTools.length} elérhető eszköz</span>
    {/if}

    <!-- Category pills for results -->
    {#if results.length > 0}
      <div class="sp-cats">
        {#each CATEGORIES as cat}
          {#if resultsByCategory[cat.id]}
            <span class="sp-cat-pill" style="--cat-c: {cat.color}">
              {cat.icon} {cat.label}
              <span class="sp-cat-pill__n">{resultsByCategory[cat.id]}</span>
            </span>
          {/if}
        {/each}
      </div>
    {/if}
  </div>

  <!-- Results -->
  {#if results.length === 0}
    <div class="sp-empty">
      <div class="sp-empty__icon">🔍</div>
      <p class="sp-empty__text">Nincs találat erre: <strong>{query}</strong></p>
      <p class="sp-empty__hint">Próbálj rövidebb kulcsszót, vagy böngészd a kategóriákat lent.</p>
      <div class="sp-empty__cats">
        {#each CATEGORIES as cat}
          <a href={`/${cat.id}`} class="sp-empty__cat-link">{cat.icon} {cat.label}</a>
        {/each}
      </div>
    </div>
  {:else}
    <div class="sp-grid">
      {#each results as tool (tool.slug)}
        {@const cat = getCategoryInfo(tool.category)}
        <a href={`/${tool.category}/${tool.slug}`} class="sp-card" class:sp-card--coming={tool.status === "coming-soon"}>
          <div class="sp-card__top">
            <span class="sp-card__cat" style="color: {cat?.color}">{cat?.icon} {cat?.label}</span>
            {#if tool.status === "coming-soon"}
              <span class="sp-card__badge">Hamarosan</span>
            {/if}
          </div>
          <div class="sp-card__title">{tool.h1}</div>
          <p class="sp-card__desc">{tool.description}</p>
          <span class="sp-card__cta">
            {tool.status === "active" ? "Megnyitás" : "Részletek"}
            <span class="sp-card__arrow">→</span>
          </span>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
/* Input */
.sp-input-wrap {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: var(--r-lg);
  padding: var(--sp-4) var(--sp-5);
  transition: border-color 180ms ease;
}

.sp-input-wrap:focus-within {
  border-color: var(--accent);
}

.sp-search-icon {
  color: var(--text-muted);
  flex-shrink: 0;
}

.sp-input {
  flex: 1;
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--text);
  background: transparent;
  border: none;
  outline: none;
  min-width: 0;
}

.sp-input::placeholder { color: var(--text-subtle); }
.sp-input::-webkit-search-cancel-button { display: none; }

.sp-clear {
  all: unset;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-subtle);
  padding: var(--sp-1) var(--sp-2);
  border-radius: var(--r-sm);
  transition: all 150ms ease;
}
.sp-clear:hover {
  color: var(--text);
  background: var(--bg-input);
}

/* Status bar */
.sp-status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--sp-2) var(--sp-4);
  margin: var(--sp-5) 0;
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

.sp-status__count {
  font-weight: 700;
  color: var(--text);
}

.sp-status__query {
  color: var(--text-muted);
}

.sp-status__query strong {
  color: var(--accent);
}

.sp-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-left: auto;
}

.sp-cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--cat-c);
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--r-full);
  padding: 2px 8px;
}

.sp-cat-pill__n {
  font-weight: 700;
  opacity: 0.7;
}

/* Empty state */
.sp-empty {
  text-align: center;
  padding: var(--sp-12) var(--sp-4);
}

.sp-empty__icon { font-size: 3rem; margin-bottom: var(--sp-4); }

.sp-empty__text {
  font-size: 1.125rem;
  color: var(--text);
  margin-bottom: var(--sp-2);
}

.sp-empty__hint {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: var(--sp-6);
}

.sp-empty__cats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--sp-2);
}

.sp-empty__cat-link {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: var(--sp-2) var(--sp-3);
  text-decoration: none;
  transition: all 150ms ease;
}

.sp-empty__cat-link:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-subtle);
}

/* Results grid */
.sp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: var(--sp-4);
}

/* Card */
.sp-card {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  padding: var(--sp-5);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  text-decoration: none;
  transition: all 180ms ease;
  position: relative;
  overflow: hidden;
}

.sp-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-subtle), transparent 60%);
  opacity: 0;
  transition: opacity 180ms ease;
}

.sp-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.sp-card:hover::before { opacity: 1; }

.sp-card--coming { opacity: 0.6; }
.sp-card--coming:hover { opacity: 0.8; }

.sp-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.sp-card__cat {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.sp-card__badge {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--text-subtle);
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--r-full);
  padding: 1px 8px;
}

.sp-card__title {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  position: relative;
}

.sp-card__desc {
  font-size: 0.8125rem;
  color: var(--text-muted);
  max-width: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
  flex: 1;
}

.sp-card__cta {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent);
  margin-top: auto;
  position: relative;
}

.sp-card__arrow {
  display: inline-block;
  transition: transform 180ms ease;
}

.sp-card:hover .sp-card__arrow {
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .sp-grid {
    grid-template-columns: 1fr;
  }
  .sp-cats { display: none; }
}
</style>
