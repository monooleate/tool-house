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

// ─── HTML-escape (a nem-matek szövegrészekhez) ───────────────
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ─── Vegyes próza + KaTeX renderelés ─────────────────────────
// Prózaszövegben inline ($…$) és blokk ($$…$$) LaTeX képleteket
// renderel build-időben, a köztes szöveget HTML-escape-eli. A .ts
// adat-fájlokból (probleme-matematica) érkező enunț/rezolvare
// stringekhez, ahol nincs markdown-pipeline (remark-math). Ha nincs
// `$` a szövegben, egyszerűen az escape-elt szöveget adja vissza.
export function renderMixed(text: string): string {
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    out += escapeHtml(text.slice(last, m.index));
    if (m[1] != null) out += renderMath(m[1], { displayMode: true });
    else out += renderMath(m[2] as string, { displayMode: false });
    last = re.lastIndex;
  }
  out += escapeHtml(text.slice(last));
  return out;
}
