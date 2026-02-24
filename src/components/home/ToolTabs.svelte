<script lang="ts">
  // ============================================================
  // ToolTabs.svelte – Főoldal kategória tab-os eszközlista
  // Interaktív szűrés kategóriánként, smooth animáció
  // Edge-hover auto-scroll a tab sávon
  // ============================================================
  import { onMount } from "svelte";

  export let categories: Array<{
    id: string;
    label: string;
    icon: string;
    color: string;
  }> = [];

  export let tools: Array<{
    slug: string;
    category: string;
    h1: string;
    description: string;
    status: string;
  }> = [];

  let activeTab = "pdf";
  let animating = false;

  // Scroll state
  let tabsBarEl: HTMLDivElement;
  let canScrollLeft = false;
  let canScrollRight = false;
  let scrollInterval: ReturnType<typeof setInterval> | null = null;

  $: filteredTools = activeTab === "all"
    ? tools.filter(t => t.status === "active")
    : tools.filter(t => t.status === "active" && t.category === activeTab);

  $: catMap = Object.fromEntries(categories.map(c => [c.id, c]));

  function setTab(id: string) {
    if (id === activeTab) return;
    animating = true;
    activeTab = id;
    setTimeout(() => { animating = false; }, 50);
  }

  $: tabCounts = (() => {
    const counts: Record<string, number> = { all: tools.filter(t => t.status === "active").length };
    for (const cat of categories) {
      counts[cat.id] = tools.filter(t => t.status === "active" && t.category === cat.id).length;
    }
    return counts;
  })();

  // ─── Scroll detection ─────────────────────────────────────
  function checkScroll() {
    if (!tabsBarEl) return;
    canScrollLeft = tabsBarEl.scrollLeft > 2;
    canScrollRight = tabsBarEl.scrollLeft < tabsBarEl.scrollWidth - tabsBarEl.clientWidth - 2;
  }

  // ─── Edge-hover auto-scroll ────────────────────────────────
  const EDGE_ZONE = 60; // px from edge to trigger scroll
  const SCROLL_SPEED = 3; // px per frame

  function handleMouseMove(e: MouseEvent) {
    if (!tabsBarEl) return;
    const rect = tabsBarEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const w = rect.width;

    // Clear any existing interval
    stopAutoScroll();

    if (x < EDGE_ZONE && canScrollLeft) {
      // Left edge – scroll left
      const intensity = 1 - (x / EDGE_ZONE);
      startAutoScroll(-SCROLL_SPEED * (1 + intensity * 3));
    } else if (x > w - EDGE_ZONE && canScrollRight) {
      // Right edge – scroll right
      const intensity = 1 - ((w - x) / EDGE_ZONE);
      startAutoScroll(SCROLL_SPEED * (1 + intensity * 3));
    }
  }

  function startAutoScroll(speed: number) {
    scrollInterval = setInterval(() => {
      if (!tabsBarEl) return;
      tabsBarEl.scrollLeft += speed;
      checkScroll();
    }, 16);
  }

  function stopAutoScroll() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  }

  function handleMouseLeave() {
    stopAutoScroll();
  }

  // ─── Arrow button scroll ──────────────────────────────────
  function scrollBy(dir: number) {
    if (!tabsBarEl) return;
    tabsBarEl.scrollBy({ left: dir * 180, behavior: "smooth" });
    // Recheck after animation
    setTimeout(checkScroll, 350);
  }

  onMount(() => {
    checkScroll();
    // Observe resize
    const ro = new ResizeObserver(checkScroll);
    ro.observe(tabsBarEl);
    return () => {
      ro.disconnect();
      stopAutoScroll();
    };
  });
</script>

<div class="tool-tabs">
  <!-- Tab bar wrapper with scroll arrows and fade masks -->
  <div
    class="tabs-wrapper"
    class:can-scroll-left={canScrollLeft}
    class:can-scroll-right={canScrollRight}
  >
    {#if canScrollLeft}
      <button
        class="scroll-arrow scroll-arrow--left"
        on:click={() => scrollBy(-1)}
        aria-label="Tabok görgetése balra"
      >‹</button>
    {/if}

    <div
      class="tabs-bar"
      role="tablist"
      tabindex="0"
      aria-label="Kategória szűrő"
      bind:this={tabsBarEl}
      on:scroll={checkScroll}
      on:mousemove={handleMouseMove}
      on:mouseleave={handleMouseLeave}
    >
      <button
        class="tab"
        class:tab--active={activeTab === "all"}
        role="tab"
        aria-selected={activeTab === "all"}
        on:click={() => setTab("all")}
      >
        <span class="tab__icon">🔧</span>
        <span class="tab__label">Összes</span>
        <span class="tab__count">{tabCounts.all}</span>
      </button>
      {#each categories as cat}
        {#if tabCounts[cat.id] > 0}
          <button
            class="tab"
            class:tab--active={activeTab === cat.id}
            role="tab"
            aria-selected={activeTab === cat.id}
            on:click={() => setTab(cat.id)}
            style="--tab-color: {cat.color}"
          >
            <span class="tab__icon">{cat.icon}</span>
            <span class="tab__label">{cat.label}</span>
            <span class="tab__count">{tabCounts[cat.id]}</span>
          </button>
        {/if}
      {/each}
    </div>

    {#if canScrollRight}
      <button
        class="scroll-arrow scroll-arrow--right"
        on:click={() => scrollBy(1)}
        aria-label="Tabok görgetése jobbra"
      >›</button>
    {/if}
  </div>

  <!-- Tool grid -->
  <div class="tools-grid" class:tools-grid--animating={animating} role="tabpanel">
    {#each filteredTools as tool (tool.slug)}
      {@const cat = catMap[tool.category]}
      <a href={`/${tool.category}/${tool.slug}`} class="tool-card">
        <div class="tool-card__header">
          <span class="tool-card__cat" style="color: {cat?.color}">{cat?.icon} {cat?.label}</span>
        </div>
        <div class="tool-card__title">{tool.h1}</div>
        <p class="tool-card__desc">{tool.description}</p>
        <span class="tool-card__cta">Megnyitás <span class="tool-card__arrow">→</span></span>
      </a>
    {/each}
  </div>

  <!-- Result count -->
  <div class="tools-footer">
    <span class="tools-count">
      {filteredTools.length} eszköz
      {#if activeTab !== "all"}
        a <strong>{catMap[activeTab]?.label}</strong> kategóriában
      {/if}
    </span>
  </div>
</div>

<style>
/* Tabs wrapper with fade masks */
.tabs-wrapper {
  position: relative;
  margin-bottom: var(--sp-6);
}

/* Fade masks via pseudo-elements */
.tabs-wrapper.can-scroll-left::before,
.tabs-wrapper.can-scroll-right::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 48px;
  z-index: 2;
  pointer-events: none;
  transition: opacity 200ms ease;
}

.tabs-wrapper.can-scroll-left::before {
  left: 0;
  background: linear-gradient(90deg, var(--bg, #0f0f0e), transparent);
}

.tabs-wrapper.can-scroll-right::after {
  right: 0;
  background: linear-gradient(270deg, var(--bg, #0f0f0e), transparent);
}

/* Scroll arrow buttons */
.scroll-arrow {
  all: unset;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-full);
  color: var(--text-muted);
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 150ms ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.scroll-arrow:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-subtle);
}

.scroll-arrow--left { left: 4px; }
.scroll-arrow--right { right: 4px; }

/* Tab bar */
.tabs-bar {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: var(--sp-1) 0 var(--sp-4);
  border-bottom: 1px solid var(--border);
  scroll-behavior: smooth;
}
.tabs-bar::-webkit-scrollbar { display: none; }

.tab {
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--r-md);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition: all 150ms ease;
  border: 1px solid transparent;
  flex-shrink: 0;
}

.tab:hover {
  background: var(--bg-input);
  color: var(--text);
}

.tab--active {
  background: var(--accent-subtle);
  color: var(--accent);
  border-color: var(--accent)40;
}

.tab__icon { font-size: 1rem; line-height: 1; }

.tab__count {
  font-size: 0.65rem;
  font-weight: 700;
  background: var(--bg-input);
  padding: 1px 6px;
  border-radius: var(--r-full);
  color: var(--text-subtle);
}

.tab--active .tab__count {
  background: var(--accent)20;
  color: var(--accent);
}

/* Tools grid */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: var(--sp-4);
  transition: opacity 120ms ease;
}

.tools-grid--animating {
  opacity: 0.4;
}

/* Tool card */
.tool-card {
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

.tool-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-subtle), transparent 60%);
  opacity: 0;
  transition: opacity 180ms ease;
}

.tool-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.03);
}

.tool-card:hover::before {
  opacity: 1;
}

.tool-card__header {
  position: relative;
}

.tool-card__cat {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.tool-card__title {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  position: relative;
}

.tool-card__desc {
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

.tool-card__cta {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent);
  margin-top: auto;
  position: relative;
}

.tool-card__arrow {
  display: inline-block;
  transition: transform 180ms ease;
}

.tool-card:hover .tool-card__arrow {
  transform: translateX(4px);
}

/* Footer */
.tools-footer {
  margin-top: var(--sp-5);
  text-align: center;
}

.tools-count {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-subtle);
}

.tools-count strong {
  color: var(--text);
}

/* Mobile: smaller tabs */
@media (max-width: 640px) {
  .tab__label { display: none; }
  .tab { padding: var(--sp-2); }
}
</style>
