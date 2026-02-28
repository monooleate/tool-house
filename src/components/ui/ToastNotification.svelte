<script lang="ts">
  // ============================================================
  // ToastNotification.svelte
  // Lightweight toast – tool akciókhoz (letöltés kész, hiba, stb.)
  // Használat: import { showToast } from "../ui/ToastNotification.svelte"
  //            showToast("Letöltés kész!", "success")
  // ============================================================
  import { writable } from "svelte/store";
  import { ui } from "../../lib/ui-labels.ts";

  type ToastType = "success" | "error" | "info" | "warning";

  interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration: number;
  }

  const toasts = writable<Toast[]>([]);

  export function showToast(message: string, type: ToastType = "info", duration = 3500): void {
    const id = crypto.randomUUID();
    toasts.update(list => [...list, { id, message, type, duration }]);
    setTimeout(() => {
      toasts.update(list => list.filter(t => t.id !== id));
    }, duration);
  }

  function dismiss(id: string) {
    toasts.update(list => list.filter(t => t.id !== id));
  }

  const ICONS: Record<ToastType, string> = {
    success: "✓",
    error:   "✕",
    warning: "⚠",
    info:    "ℹ",
  };
</script>

<div class="toast-container" aria-live="polite" aria-atomic="false">
  {#each $toasts as toast (toast.id)}
    <div
      class="toast toast--{toast.type}"
      role="status"
      aria-label={toast.message}
    >
      <span class="toast__icon" aria-hidden="true">{ICONS[toast.type]}</span>
      <span class="toast__message">{toast.message}</span>
      <button
        class="toast__close"
        on:click={() => dismiss(toast.id)}
        aria-label={ui.closeNotification}
      >×</button>
    </div>
  {/each}
</div>

<style>
.toast-container {
  position: fixed;
  bottom: var(--sp-6);
  right: var(--sp-6);
  z-index: 300;
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  max-width: 380px;
  pointer-events: none;
}

@keyframes toast-in {
  from { opacity: 0; transform: translateX(100%) scale(0.9); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-lg);
  animation: toast-in 250ms cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: all;
  border-left: 3px solid;
}

.toast--success { border-left-color: var(--success); }
.toast--error   { border-left-color: var(--error); }
.toast--warning { border-left-color: var(--warning); }
.toast--info    { border-left-color: var(--info); }

.toast__icon {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.toast--success .toast__icon { color: var(--success); }
.toast--error   .toast__icon { color: var(--error); }
.toast--warning .toast__icon { color: var(--warning); }
.toast--info    .toast__icon { color: var(--info); }

.toast__message {
  font-size: 0.875rem;
  color: var(--text);
  flex: 1;
}

.toast__close {
  background: none;
  border: none;
  color: var(--text-subtle);
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0 4px;
  flex-shrink: 0;
  transition: color var(--t-fast);
}

.toast__close:hover { color: var(--text); }

@media (max-width: 480px) {
  .toast-container {
    bottom: var(--sp-4);
    right: var(--sp-4);
    left: var(--sp-4);
    max-width: none;
  }
}
</style>
