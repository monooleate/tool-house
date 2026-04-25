// ============================================================
// KaTeX SSR helper – build-idős képlet-renderelés, nincs client JS
// ============================================================
// A katex.renderToString a build során fut (Astro SSG), a kimenet
// statikus HTML: <span class="katex">…</span>. A CSS és a fontok
// self-hosted módon /katex/ alatt érhetők el.

import katex from "katex";

export interface KatexOptions {
  displayMode?: boolean;
  throwOnError?: boolean;
}

export function renderMath(tex: string, opts: KatexOptions = {}): string {
  return katex.renderToString(tex, {
    displayMode: opts.displayMode ?? false,
    throwOnError: opts.throwOnError ?? false,
    output: "html",
    strict: "ignore",
  });
}

export function renderMathBlock(tex: string): string {
  return `<div class="katex-display">${renderMath(tex, { displayMode: true })}</div>`;
}
