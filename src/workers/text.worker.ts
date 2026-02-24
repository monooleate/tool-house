// ============================================================
// TEXT WORKER
// Szöveg transzformációk Web Workerben
// ============================================================

export type TextOperation =
  | "slug"
  | "sort-lines"
  | "dedupe-lines"
  | "remove-empty-lines"
  | "trim-whitespace"
  | "remove-accents"
  | "remove-special-chars"
  | "find-replace"
  | "regex-replace"
  | "lowercase"
  | "uppercase"
  | "titlecase"
  | "camelcase"
  | "snakecase"
  | "pascalcase"
  | "kebabcase";

export interface TextMessage {
  type: "transform";
  id: string;
  operation: TextOperation;
  text: string;
  options?: Record<string, unknown>;
}

// ─── Magyar ékezet map ────────────────────────────────────────

const HU_MAP: Record<string, string> = {
  á: "a", Á: "A", é: "e", É: "E", í: "i", Í: "I",
  ó: "o", Ó: "O", ö: "o", Ö: "O", ő: "o", Ő: "O",
  ú: "u", Ú: "U", ü: "u", Ü: "U", ű: "u", Ű: "U",
};

function removeAccents(str: string): string {
  return str
    .split("")
    .map((c) => HU_MAP[c] ?? c)
    .join("")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// ─── Slug ─────────────────────────────────────────────────────

function toSlug(str: string): string {
  return removeAccents(str)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Case conversions ─────────────────────────────────────────

function toCamelCase(str: string): string {
  const words = toSlug(str).split("-");
  return words[0] + words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

function toPascalCase(str: string): string {
  return toSlug(str)
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function toSnakeCase(str: string): string {
  return toSlug(str).replace(/-/g, "_");
}

// ─── Line operations ──────────────────────────────────────────

function sortLines(text: string, direction: "asc" | "desc" = "asc"): string {
  const lines = text.split("\n");
  lines.sort((a, b) => a.localeCompare(b, "hu"));
  if (direction === "desc") lines.reverse();
  return lines.join("\n");
}

function dedupeLines(text: string, caseSensitive = true): string {
  const lines = text.split("\n");
  const seen = new Set<string>();
  return lines
    .filter((line) => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join("\n");
}

// ─── Special chars removal ───────────────────────────────────

function removeSpecialChars(text: string, keepAccents: boolean = false): string {
  if (keepAccents) {
    return text.replace(/[^\p{L}\p{N}\s.,!?;:\-()]/gu, "");
  }
  return text.replace(/[^a-zA-Z0-9\sáéíóöőúüűÁÉÍÓÖŐÚÜŰ.,!?;:\-()]/g, "");
}

// ─── Find & Replace ──────────────────────────────────────────

function findReplace(text: string, search: string, replace: string, caseSensitive: boolean, wholeWord: boolean): string {
  if (!search) return text;
  let escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (wholeWord) escapedSearch = `\\b${escapedSearch}\\b`;
  const flags = caseSensitive ? "g" : "gi";
  return text.replace(new RegExp(escapedSearch, flags), replace);
}

// ─── Regex Replace ───────────────────────────────────────────

function regexReplace(text: string, pattern: string, replacement: string, flags: string): string {
  const re = new RegExp(pattern, flags);
  return text.replace(re, replacement);
}

// ─── Transform dispatcher ─────────────────────────────────────

function transform(op: TextOperation, text: string, options: Record<string, unknown> = {}): string {
  switch (op) {
    case "slug":             return toSlug(text);
    case "sort-lines":       return sortLines(text, (options.direction as "asc" | "desc") ?? "asc");
    case "dedupe-lines":     return dedupeLines(text, (options.caseSensitive as boolean) ?? true);
    case "remove-empty-lines": return text.split("\n").filter((l) => l.trim() !== "").join("\n");
    case "trim-whitespace":  return text.split("\n").map((l) => l.trim()).join("\n");
    case "remove-accents":   return removeAccents(text);
    case "remove-special-chars": return removeSpecialChars(text, (options.keepAccents as boolean) ?? false);
    case "find-replace":     return findReplace(text, (options.search as string) ?? "", (options.replace as string) ?? "", (options.caseSensitive as boolean) ?? true, (options.wholeWord as boolean) ?? false);
    case "regex-replace":    return regexReplace(text, (options.pattern as string) ?? "", (options.replacement as string) ?? "", (options.flags as string) ?? "g");
    case "lowercase":        return text.toLowerCase();
    case "uppercase":        return text.toUpperCase();
    case "titlecase":        return text.replace(/\b\w/g, (c) => c.toUpperCase());
    case "camelcase":        return toCamelCase(text);
    case "snakecase":        return toSnakeCase(text);
    case "pascalcase":       return toPascalCase(text);
    case "kebabcase":        return toSlug(text);
    default:                 throw new Error(`Ismeretlen művelet: ${op}`);
  }
}

self.addEventListener("message", (event: MessageEvent<TextMessage>) => {
  const msg = event.data;
  const t0 = performance.now();

  try {
    const result = transform(msg.operation, msg.text, msg.options ?? {});
    self.postMessage({
      type: "result",
      id: msg.id,
      result,
      elapsedMs: Math.round(performance.now() - t0),
    });
  } catch (err) {
    self.postMessage({
      type: "error",
      id: msg.id,
      error: err instanceof Error ? err.message : String(err),
    });
  }
});
