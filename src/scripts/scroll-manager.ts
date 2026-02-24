// src/scripts/scroll-manager.ts
// Scroll kezelés Astro View Transitions-szel
// Forward nav → tetejére görget | Back/forward → elmenti és visszaállítja a pozíciót

const SCROLL_KEY = (path: string) => `scroll:${path}`;

function saveScroll(path: string): void {
  try {
    if (window.scrollY > 0) {
      sessionStorage.setItem(SCROLL_KEY(path), String(Math.round(window.scrollY)));
    } else {
      sessionStorage.removeItem(SCROLL_KEY(path));
    }
  } catch {}
}

function restoreOrReset(path: string, isTraversal: boolean): void {
  if (!isTraversal) {
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }
  try {
    const saved = sessionStorage.getItem(SCROLL_KEY(path));
    if (saved !== null) {
      window.scrollTo({ top: parseInt(saved, 10), behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  } catch {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

// ─── Astro View Transitions path ──────────────────────────────
// astro:before-swap: oldal vált → elmenti az aktuális scroll-t
// astro:after-swap: új oldal betölt → visszaállítja vagy reseteli

let lastPath     = window.location.pathname;
let isTraversal  = false; // back/forward navigáció-e?

document.addEventListener("astro:before-preparation", (e) => {
  // Az Astro 4.x event-en van navigationType info
  const event = e as CustomEvent & { navigationType?: string };
  isTraversal = event.navigationType === "traverse";
  saveScroll(lastPath);
});

document.addEventListener("astro:after-swap", () => {
  restoreOrReset(window.location.pathname, isTraversal);
  lastPath    = window.location.pathname;
  isTraversal = false;
});

// ─── Fallback: ha nincs View Transitions ─────────────────────
if (!("startViewTransition" in document)) {
  history.scrollRestoration = "manual";

  let popstateDetected = false;

  window.addEventListener("popstate", () => {
    popstateDetected = true;
  });

  // Oldal elhagyása előtt elmentjük a scroll pozíciót
  window.addEventListener("pagehide", () => {
    saveScroll(window.location.pathname);
  });

  // DOMContentLoaded – visszaállítjuk vagy resetelünk
  document.addEventListener("DOMContentLoaded", () => {
    if (popstateDetected) {
      restoreOrReset(window.location.pathname, true);
      popstateDetected = false;
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  });
}
