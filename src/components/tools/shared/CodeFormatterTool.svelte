<script lang="ts">
  // ============================================================
  // CodeFormatterTool.svelte
  // Generikus kód formázó / minifikáló / validáló komponens
  // Nyelvek: yaml, xml, html, css, js
  // ============================================================
  import { downloadText } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  export let mode: "format" | "minify" | "validate";
  export let language: string; // "yaml", "xml", "html", "css", "js"
  export let placeholder: string = "";

  let input = "";
  let output = "";
  let copied = false;
  let processing = false;
  let isValid = false;
  let validationError = "";

  // ─── File extensions for download ─────────────────────────────
  const extMap: Record<string, string> = {
    yaml: "yaml",
    xml: "xml",
    html: "html",
    css: "css",
    js: "js",
  };

  // ─── YAML processing (async, dynamic import) ─────────────────
  async function processYaml(text: string): Promise<{ output: string; valid: boolean; error: string }> {
    const jsYaml = await import("js-yaml");
    try {
      const parsed = jsYaml.load(text);
      if (mode === "validate") {
        return { output: "", valid: true, error: "" };
      }
      // Format (YAML has no "minify" concept, format only)
      const formatted = jsYaml.dump(parsed, { indent: 2, lineWidth: 120 });
      return { output: formatted.trim(), valid: true, error: "" };
    } catch (e: any) {
      return { output: "", valid: false, error: e.message || String(e) };
    }
  }

  // ─── XML formatting ──────────────────────────────────────────
  function formatXml(xml: string, indent: string = "  "): string {
    let formatted = "";
    let pad = 0;
    const lines = xml.replace(/(>)(<)(\/*)/g, "$1\n$2$3").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.match(/^<\/\w/)) pad--;
      formatted += indent.repeat(Math.max(0, pad)) + trimmed + "\n";
      if (trimmed.match(/^<\w[^>]*[^\/]>$/) && !trimmed.match(/^<(br|hr|img|input|meta|link)/i)) pad++;
    }
    return formatted.trim();
  }

  function minifyXml(xml: string): string {
    return xml
      .replace(/>\s+</g, "><")
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim();
  }

  function validateXml(xml: string): { valid: boolean; error: string } {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    const errorNode = doc.querySelector("parsererror");
    if (errorNode) {
      return { valid: false, error: errorNode.textContent || "XML error" };
    }
    return { valid: true, error: "" };
  }

  // ─── HTML formatting ─────────────────────────────────────────
  function formatHtml(html: string, indent: string = "  "): string {
    let formatted = "";
    let pad = 0;
    const lines = html.replace(/(>)(<)(\/*)/g, "$1\n$2$3").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.match(/^<\/\w/)) pad--;
      formatted += indent.repeat(Math.max(0, pad)) + trimmed + "\n";
      if (
        trimmed.match(/^<\w[^>]*[^\/]>$/) &&
        !trimmed.match(/^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/i)
      ) {
        pad++;
      }
    }
    return formatted.trim();
  }

  function minifyHtml(html: string): string {
    return html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/>\s+</g, "><")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  // ─── CSS formatting ──────────────────────────────────────────
  function formatCss(css: string, indent: string = "  "): string {
    let formatted = "";
    let depth = 0;
    const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim();
    for (let i = 0; i < cleaned.length; i++) {
      const ch = cleaned[i];
      if (ch === "{") {
        formatted += " {\n";
        depth++;
        continue;
      }
      if (ch === "}") {
        depth--;
        formatted += indent.repeat(Math.max(0, depth)) + "}\n\n";
        continue;
      }
      if (ch === ";") {
        formatted += ";\n" + indent.repeat(depth);
        continue;
      }
      formatted += ch;
    }
    return formatted.replace(/\n\s*\n\s*\n/g, "\n\n").trim();
  }

  function minifyCss(css: string): string {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{}:;,])\s*/g, "$1")
      .replace(/;}/g, "}")
      .trim();
  }

  // ─── JavaScript formatting ───────────────────────────────────
  function formatJs(code: string, indent: string = "  "): string {
    let formatted = "";
    let depth = 0;
    let inString = false;
    let stringChar = "";
    let prevCh = "";

    for (let i = 0; i < code.length; i++) {
      const ch = code[i];

      if (inString) {
        formatted += ch;
        if (ch === stringChar && prevCh !== "\\") inString = false;
        prevCh = ch;
        continue;
      }

      if (ch === '"' || ch === "'" || ch === "`") {
        inString = true;
        stringChar = ch;
        formatted += ch;
        prevCh = ch;
        continue;
      }

      if (ch === "{" || ch === "[") {
        depth++;
        formatted += ch + "\n" + indent.repeat(depth);
      } else if (ch === "}" || ch === "]") {
        depth--;
        formatted += "\n" + indent.repeat(Math.max(0, depth)) + ch;
      } else if (ch === ";") {
        formatted += ";\n" + indent.repeat(depth);
      } else if (ch === ",") {
        formatted += ",\n" + indent.repeat(depth);
      } else {
        formatted += ch;
      }
      prevCh = ch;
    }
    return formatted.replace(/\n\s*\n\s*\n/g, "\n\n").trim();
  }

  function minifyJs(code: string): string {
    // Remove single-line comments (but not URLs)
    let result = code.replace(/(?<!:)\/\/.*$/gm, "");
    // Remove multi-line comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, "");
    // Collapse whitespace
    result = result.replace(/\s+/g, " ");
    // Remove spaces around operators (basic)
    result = result.replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, "$1");
    return result.trim();
  }

  // ─── Main processing ─────────────────────────────────────────
  async function process(text: string) {
    if (!text.trim()) {
      output = "";
      isValid = false;
      validationError = "";
      return;
    }

    processing = true;

    try {
      switch (language) {
        case "yaml": {
          const result = await processYaml(text);
          output = result.output;
          isValid = result.valid;
          validationError = result.error;
          break;
        }
        case "xml": {
          if (mode === "validate") {
            const result = validateXml(text);
            isValid = result.valid;
            validationError = result.error;
            output = "";
          } else if (mode === "format") {
            output = formatXml(text);
            isValid = true;
            validationError = "";
          } else {
            output = minifyXml(text);
            isValid = true;
            validationError = "";
          }
          break;
        }
        case "html": {
          if (mode === "format") {
            output = formatHtml(text);
          } else {
            output = minifyHtml(text);
          }
          isValid = true;
          validationError = "";
          break;
        }
        case "css": {
          if (mode === "format") {
            output = formatCss(text);
          } else {
            output = minifyCss(text);
          }
          isValid = true;
          validationError = "";
          break;
        }
        case "js": {
          if (mode === "format") {
            output = formatJs(text);
          } else {
            output = minifyJs(text);
          }
          isValid = true;
          validationError = "";
          break;
        }
      }
    } catch (e: any) {
      output = "";
      isValid = false;
      validationError = e.message || String(e);
    }

    processing = false;
  }

  // ─── Reactive processing ──────────────────────────────────────
  $: process(input);

  // ─── Actions ──────────────────────────────────────────────────
  async function copyOutput() {
    const textToCopy = mode === "validate" ? input : output;
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {}
  }

  function downloadOutput() {
    const textToDownload = mode === "validate" ? input : output;
    if (!textToDownload) return;
    const ext = extMap[language] || "txt";
    const prefix = mode === "minify" ? "min" : mode === "format" ? "formatted" : "validated";
    downloadText(textToDownload, `${prefix}.${ext}`);
  }

</script>

<div class="tool">
  <div class="io-grid">
    <!-- Input pane -->
    <div class="io-pane">
      <div class="pane-header">
        <span class="label">{ui.input}</span>
        <button class="btn btn--ghost btn--sm" on:click={() => input = ""} disabled={!input}>{ui.delete}</button>
      </div>
      <textarea
        class="textarea textarea--code"
        rows="16"
        bind:value={input}
        {placeholder}
        spellcheck="false"
      ></textarea>
    </div>

    <!-- Output pane (format / minify only) -->
    {#if mode !== "validate"}
      <div class="io-pane">
        <div class="pane-header">
          <span class="label">{ui.result}</span>
          <div class="output-actions">
            <button class="btn btn--outline btn--sm" on:click={copyOutput} disabled={!output}>
              {copied ? `\u2713 ${ui.copied}` : ui.copy}
            </button>
            <button class="btn btn--ghost btn--sm" on:click={downloadOutput} disabled={!output}>{ui.download}</button>
          </div>
        </div>
        <textarea
          class="textarea textarea--code textarea--out"
          rows="16"
          value={output}
          readonly
          spellcheck="false"
        ></textarea>
      </div>
    {/if}
  </div>

  <!-- Size stats (format / minify) -->
  {#if input.trim() && output && mode !== "validate"}
    <div class="size-stats">
      <span>{ui.input}: <strong>{input.length.toLocaleString(ui.locale)}</strong> {ui.chars}</span>
      <span class="size-stats__sep">→</span>
      <span>{ui.output}: <strong>{output.length.toLocaleString(ui.locale)}</strong> {ui.chars}</span>
      {#if mode === "minify" && input.length > 0}
        <span class="saving">−{Math.round((1 - output.length / input.length) * 100)}%</span>
      {/if}
    </div>
  {/if}

  <!-- Validation result (validate mode) -->
  {#if mode === "validate"}
    <div
      class="validation-result"
      class:valid={isValid && input.trim()}
      class:invalid={!isValid && input.trim()}
    >
      {#if !input.trim()}
        {ui.pasteCodeValidation}
      {:else if processing}
        {ui.checking}
      {:else if isValid}
        <span class="valid-icon">\u2713</span> {ui.valid} {language.toUpperCase()}
      {:else}
        <span class="invalid-icon">\u2717</span> {ui.error}: {validationError}
      {/if}
    </div>
  {/if}
</div>

<style>
.tool {
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
}

.io-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-5);
}

@media (max-width: 700px) {
  .io-grid {
    grid-template-columns: 1fr;
  }
}

.io-pane {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.pane-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.output-actions {
  display: flex;
  gap: var(--sp-2);
}

.textarea--code {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.5;
  tab-size: 2;
}

.textarea--out {
  background: var(--bg-card);
  color: var(--accent);
}

.size-stats {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
}

.size-stats strong {
  color: var(--text);
}

.size-stats__sep {
  color: var(--accent);
  font-weight: 700;
}

.saving {
  color: var(--accent);
  font-weight: 700;
  background: var(--accent-subtle);
  padding: 1px 6px;
  border-radius: var(--r-sm);
}

.validation-result {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--r-md);
  color: var(--text-muted);
}

.validation-result.valid {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.validation-result.invalid {
  background: rgba(239, 68, 68, 0.08);
  color: var(--error, #ef4444);
}

.valid-icon,
.invalid-icon {
  font-weight: 700;
}
</style>
