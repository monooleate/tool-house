<script lang="ts">
  // ============================================================
  // SearchOverlay.svelte
  // Gyors tool kereső overlay (Cmd/Ctrl+K rövidítéssel)
  // Statikus keresés – nincs backend, nincs API call
  // ============================================================
  import { onMount, onDestroy } from "svelte";
  import { getAllTools, getCategoryInfo } from "../../lib/tool-registry.ts";

  export let open = false;

  const allTools = getAllTools();
  let query      = "";
  let inputEl: HTMLInputElement;
  let selectedIdx = 0;

  // ─── Filtered results ─────────────────────────────────────
  $: results = query.trim().length < 1
    ? allTools.filter(t => t.status === "active").slice(0, 8)
    : allTools
        .filter(t => {
          const q = query.toLowerCase();
          return (
            t.h1.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            t.keywords.some(k => k.includes(q)) ||
            t.category.includes(q)
          );
        })
        .slice(0, 12);

  $: if (results) selectedIdx = 0;

  // ─── Keyboard navigation ──────────────────────────────────
  function onKeydown(e: KeyboardEvent) {
    if (!open) return;

    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIdx = Math.min(selectedIdx + 1, results.length - 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIdx = Math.max(selectedIdx - 1, 0);
    } else if (e.key === "Enter" && results[selectedIdx]) {
      const tool = results[selectedIdx];
      navigate(tool.category, tool.slug);
    }
  }

  function navigate(category: string, slug: string) {
    window.location.href = `/${category}/${slug}`;
  }

  function close() {
    open = false;
    query = "";
  }

  // ─── Global Cmd+K / Ctrl+K ────────────────────────────────
  function onGlobalKey(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      open = !open;
      if (open) {
        // micro delay hogy az input megjelenjen
        setTimeout(() => inputEl?.focus(), 50);
      }
    }
    if (e.key === "Escape" && open) close();
  }

  // ─── Toggle from external button ──────────────────────────
  function onToggleSearch() {
    open = !open;
    if (open) {
      setTimeout(() => inputEl?.focus(), 50);
    }
  }

  onMount(() => {
    window.addEventListener("keydown", onGlobalKey);
    window.addEventListener("toggle-search", onToggleSearch);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", onGlobalKey);
    window.removeEventListener("toggle-search", onToggleSearch);
  });

  // Focus trap + auto-focus on open
  $: if (open && inputEl) {
    setTimeout(() => inputEl?.focus(), 50);
  }

  // Scroll selected into view
  let listEl: HTMLUListElement;
  $: if (listEl && results[selectedIdx]) {
    const item = listEl.children[selectedIdx] as HTMLElement;
    item?.scrollIntoView({ block: "nearest" });
  }
</script>

<svelte:window on:keydown={onKeydown}/>

{#if open}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="overlay-backdrop" on:click={close} aria-hidden="true"></div>

  <!-- Dialog -->
  <div
    class="search-dialog"
    role="dialog"
    aria-modal="true"
    aria-label="Eszköz keresés"
  >
    <!-- Input -->
    <div class="search-input-row">
      <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        bind:this={inputEl}
        bind:value={query}
        type="search"
        placeholder="Keresés az eszközök között…"
        class="search-input"
        autocomplete="off"
        spellcheck="false"
        aria-label="Keresés"
        aria-autocomplete="list"
        aria-controls="search-results"
        aria-activedescendant={results[selectedIdx] ? `result-${selectedIdx}` : undefined}
      />
      <button type="button" class="search-esc" on:click={close} aria-label="Bezárás"><kbd>Esc</kbd></button>
    </div>

    <!-- Results -->
    <ul
      bind:this={listEl}
      id="search-results"
      class="search-results"
      role="listbox"
      aria-label="Keresési eredmények"
    >
      {#if results.length === 0}
        <li class="search-empty">
          <span>Nincs találat: <strong>{query}</strong></span>
        </li>
      {:else}
        {#each results as tool, i (tool.slug)}
          {@const cat = getCategoryInfo(tool.category)}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li
            id="result-{i}"
            class="search-result"
            class:search-result--selected={i === selectedIdx}
            class:search-result--inactive={tool.status === "coming-soon"}
            role="option"
            aria-selected={i === selectedIdx}
            on:click={() => navigate(tool.category, tool.slug)}
            on:mouseenter={() => (selectedIdx = i)}
          >
            <span class="result-icon" aria-hidden="true" style={`color: ${cat?.color}`}>
              {cat?.icon}
            </span>
            <div class="result-body">
              <span class="result-title">{tool.h1}</span>
              <span class="result-cat">{cat?.label}</span>
            </div>
            {#if tool.status === "coming-soon"}
              <span class="result-soon">Hamarosan</span>
            {:else}
              <span class="result-arrow" aria-hidden="true">→</span>
            {/if}
          </li>
        {/each}
      {/if}
    </ul>

    <!-- Footer hint -->
    <div class="search-footer" aria-hidden="true">
      <span><kbd>↑↓</kbd> navigáció</span>
      <span><kbd>↵</kbd> megnyitás</span>
      <span><kbd>Esc</kbd> bezárás</span>
      <span class="search-footer__total">{allTools.length} eszköz</span>
    </div>
  </div>
{/if}

<style>
/* Backdrop */
.overlay-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  animation: fade-in 150ms ease;
}

@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-in { from { opacity: 0; transform: translateY(-16px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

/* Dialog */
.search-dialog {
  position: fixed;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 201;
  width: min(640px, calc(100vw - 32px));
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
  overflow: hidden;
  animation: slide-in 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Input row */
.search-input-row {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
}

.search-icon { color: var(--text-muted); flex-shrink: 0; }

.search-input {
  flex: 1;
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text);
  background: transparent;
  border: none;
  outline: none;
  min-width: 0;
}

.search-input::placeholder { color: var(--text-subtle); }
.search-input::-webkit-search-cancel-button { display: none; }

.search-esc {
  all: unset;
  display: inline-flex;
  cursor: pointer;
  flex-shrink: 0;
}
.search-esc kbd {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-subtle);
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  padding: 2px 6px;
  transition: all var(--t-fast);
}
.search-esc:hover kbd { color: var(--text); border-color: var(--accent); }

/* Results list */
.search-results {
  list-style: none;
  padding: var(--sp-2) 0;
  margin: 0;
  max-height: 380px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.search-empty {
  padding: var(--sp-6) var(--sp-5);
  color: var(--text-muted);
  font-size: 0.9rem;
  text-align: center;
}

.search-result {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-5);
  cursor: pointer;
  transition: background var(--t-fast);
}

.search-result--selected {
  background: var(--accent-subtle);
}

.search-result--inactive { opacity: 0.55; }

.result-icon {
  font-size: 1.25rem;
  width: 28px;
  text-align: center;
  flex-shrink: 0;
}

.result-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.result-title {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-cat {
  font-size: 0.75rem;
  color: var(--text-subtle);
  font-family: var(--font-mono);
}

.result-arrow {
  color: var(--accent);
  font-family: var(--font-mono);
  opacity: 0;
  transition: opacity var(--t-fast);
}

.search-result--selected .result-arrow { opacity: 1; }

.result-soon {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-subtle);
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--r-full);
  padding: 1px 6px;
  white-space: nowrap;
}

/* Footer */
.search-footer {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  padding: var(--sp-3) var(--sp-5);
  border-top: 1px solid var(--border);
  background: var(--bg-input);
}

.search-footer span {
  display: flex;
  align-items: center;
  gap: var(--sp-1);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-subtle);
}

.search-footer__total { margin-left: auto; }

kbd {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1px 5px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
}
</style>
