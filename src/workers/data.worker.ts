// ============================================================
// DATA WORKER
// CSV/JSON adatfeldolgozás Web Workerben
// ============================================================

export interface CsvParseMessage {
  type: "csv-parse";
  id: string;
  text: string;
  filename: string;
  options: {
    delimiter: "auto" | "," | ";" | "\t" | "|";
    hasHeader: boolean;
    autoType: boolean;     // számok/bool auto-detektálás
    previewRows?: number;  // csak preview-hoz, undefined = mind
  };
}

export interface CsvParseResult {
  id: string;
  filename: string;
  json: string;           // stringified JSON
  rowCount: number;
  colCount: number;
  headers: string[];
  detectedDelimiter: string;
  elapsedMs: number;
}

// ─── Delimiter detektálás ─────────────────────────────────────

function detectDelimiter(sample: string): string {
  const candidates = [",", ";", "\t", "|"];
  const counts: Record<string, number> = {};
  for (const c of candidates) {
    counts[c] = (sample.match(new RegExp("\\" + (c === "\t" ? "t" : c === "|" ? "\\|" : c), "g")) ?? []).length;
  }
  return candidates.reduce((a, b) => (counts[a] >= counts[b] ? a : b));
}

// ─── CSV parser (no deps) ─────────────────────────────────────

function parseCsv(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuote = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuote) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuote = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuote = true;
      } else if (ch === delimiter) {
        row.push(field);
        field = "";
      } else if (ch === "\n" || (ch === "\r" && next === "\n")) {
        if (ch === "\r") i++;
        row.push(field);
        field = "";
        if (row.some((f) => f !== "") || rows.length === 0) {
          rows.push(row);
        }
        row = [];
      } else {
        field += ch;
      }
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.length > 0 && r.some((f) => f !== ""));
}

// ─── Auto-type ────────────────────────────────────────────────

function autoTypeValue(val: string): unknown {
  const trimmed = val.trim();
  if (trimmed === "") return null;
  if (trimmed === "true" || trimmed === "TRUE") return true;
  if (trimmed === "false" || trimmed === "FALSE") return false;
  if (trimmed === "null" || trimmed === "NULL") return null;
  const num = Number(trimmed);
  if (!isNaN(num) && trimmed !== "") return num;
  return val;
}

// ─── TSV ↔ CSV ──────────────────────────────────────────────

export interface TsvCsvMessage {
  type: "tsv-to-csv";
  id: string;
  text: string;
  filename: string;
}

export interface CsvTsvMessage {
  type: "csv-to-tsv";
  id: string;
  text: string;
  filename: string;
}

// ─── CSV Clean ──────────────────────────────────────────────

export interface CsvCleanMessage {
  type: "csv-clean";
  id: string;
  text: string;
  filename: string;
  options: {
    removeEmpty: boolean;
    trimWhitespace: boolean;
    removeDuplicates: boolean;
    delimiter: string;
  };
}

// ─── CSV Split Column ───────────────────────────────────────

export interface CsvSplitColumnMessage {
  type: "csv-split-column";
  id: string;
  text: string;
  filename: string;
  options: {
    columnIndex: number;
    splitDelimiter: string;
    delimiter: string;
    hasHeader: boolean;
  };
}

// ─── Rows → CSV helper ─────────────────────────────────────

function rowsToCsv(rows: string[][], delimiter: string): string {
  return rows
    .map((row) =>
      row
        .map((f) => {
          if (
            f.includes(delimiter) ||
            f.includes('"') ||
            f.includes("\n") ||
            f.includes("\r")
          ) {
            return '"' + f.replace(/"/g, '""') + '"';
          }
          return f;
        })
        .join(delimiter)
    )
    .join("\n");
}

// ─── JSON → CSV ──────────────────────────────────────────────

export interface JsonToCsvMessage {
  type: "json-to-csv";
  id: string;
  json: string;
  filename: string;
  options: {
    delimiter: string;
    includeHeader: boolean;
  };
}

export interface JsonToCsvResult {
  id: string;
  filename: string;
  csv: string;
  rowCount: number;
  colCount: number;
  headers: string[];
  elapsedMs: number;
}

function escapeCsvField(value: string, delimiter: string): string {
  if (value.includes(delimiter) || value.includes('"') || value.includes("\n") || value.includes("\r")) {
    return '"' + value.replace(/"/g, '""') + '"';
  }
  return value;
}

function jsonToCsv(jsonStr: string, delimiter: string, includeHeader: boolean): { csv: string; rowCount: number; colCount: number; headers: string[] } {
  const data: unknown[] = JSON.parse(jsonStr);

  if (!Array.isArray(data)) {
    throw new Error("A JSON-nak objektumok tömbjének kell lennie (array of objects).");
  }

  if (data.length === 0) {
    throw new Error("A JSON tömb üres.");
  }

  // Collect all unique keys across all objects
  const headerSet = new Set<string>();
  for (const item of data) {
    if (typeof item === "object" && item !== null) {
      for (const key of Object.keys(item)) {
        headerSet.add(key);
      }
    }
  }
  const headers = Array.from(headerSet);

  const lines: string[] = [];

  if (includeHeader) {
    lines.push(headers.map((h) => escapeCsvField(h, delimiter)).join(delimiter));
  }

  for (const item of data) {
    const obj = item as Record<string, unknown>;
    const row = headers.map((h) => {
      const val = obj[h];
      if (val === null || val === undefined) return "";
      return escapeCsvField(String(val), delimiter);
    });
    lines.push(row.join(delimiter));
  }

  return {
    csv: lines.join("\n"),
    rowCount: data.length,
    colCount: headers.length,
    headers,
  };
}

// ─── Main handler ─────────────────────────────────────────────

type WorkerMessage =
  | CsvParseMessage
  | JsonToCsvMessage
  | TsvCsvMessage
  | CsvTsvMessage
  | CsvCleanMessage
  | CsvSplitColumnMessage;

self.addEventListener("message", async (event: MessageEvent<WorkerMessage>) => {
  const msg = event.data;
  const t0 = performance.now();

  try {
    // ─── TSV → CSV ──────────────────────────────────────────
    if (msg.type === "tsv-to-csv") {
      const rows = parseCsv(msg.text, "\t");
      if (rows.length === 0) throw new Error("Üres vagy érvénytelen TSV fájl.");
      const csv = rowsToCsv(rows, ",");
      const colCount = rows.length > 0 ? rows[0].length : 0;

      self.postMessage({
        type: "result",
        id: msg.id,
        filename: msg.filename,
        csv,
        rowCount: rows.length,
        colCount,
        elapsedMs: Math.round(performance.now() - t0),
      });
      return;
    }

    // ─── CSV → TSV ──────────────────────────────────────────
    if (msg.type === "csv-to-tsv") {
      const sample = msg.text.slice(0, 2000);
      const detectedDelimiter = detectDelimiter(sample);
      const rows = parseCsv(msg.text, detectedDelimiter);
      if (rows.length === 0) throw new Error("Üres vagy érvénytelen CSV fájl.");
      const tsv = rowsToCsv(rows, "\t");
      const colCount = rows.length > 0 ? rows[0].length : 0;

      self.postMessage({
        type: "result",
        id: msg.id,
        filename: msg.filename,
        csv: tsv,
        rowCount: rows.length,
        colCount,
        elapsedMs: Math.round(performance.now() - t0),
      });
      return;
    }

    // ─── CSV Clean ──────────────────────────────────────────
    if (msg.type === "csv-clean") {
      const { options } = msg;
      const delimiter = options.delimiter || ",";
      const rows = parseCsv(msg.text, delimiter);
      if (rows.length === 0) throw new Error("Üres vagy érvénytelen CSV fájl.");

      const originalCount = rows.length;
      let cleaned = [...rows];

      // Trim whitespace
      if (options.trimWhitespace) {
        cleaned = cleaned.map((row) => row.map((f) => f.trim()));
      }

      // Remove empty rows (all fields empty)
      if (options.removeEmpty) {
        cleaned = cleaned.filter((row) => row.some((f) => f.trim() !== ""));
      }

      // Remove duplicate rows
      if (options.removeDuplicates) {
        const seen = new Set<string>();
        const unique: string[][] = [];
        for (const row of cleaned) {
          const key = JSON.stringify(row);
          if (!seen.has(key)) {
            seen.add(key);
            unique.push(row);
          }
        }
        cleaned = unique;
      }

      const csv = rowsToCsv(cleaned, delimiter);
      const removedCount = originalCount - cleaned.length;
      const colCount = cleaned.length > 0 ? cleaned[0].length : 0;

      self.postMessage({
        type: "result",
        id: msg.id,
        filename: msg.filename,
        csv,
        rowCount: cleaned.length,
        colCount,
        removedCount,
        elapsedMs: Math.round(performance.now() - t0),
      });
      return;
    }

    // ─── CSV Split Column ───────────────────────────────────
    if (msg.type === "csv-split-column") {
      const { options } = msg;
      const delimiter = options.delimiter || ",";
      const rows = parseCsv(msg.text, delimiter);
      if (rows.length === 0) throw new Error("Üres vagy érvénytelen CSV fájl.");

      const colIdx = options.columnIndex;
      const splitDel = options.splitDelimiter;

      // Determine max split parts across all rows
      const startRow = options.hasHeader ? 1 : 0;
      let maxParts = 1;
      for (let i = startRow; i < rows.length; i++) {
        const val = rows[i][colIdx] ?? "";
        const parts = val.split(splitDel);
        if (parts.length > maxParts) maxParts = parts.length;
      }

      // Build new rows
      const result: string[][] = [];
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const newRow: string[] = [];

        for (let j = 0; j < row.length; j++) {
          if (j === colIdx) {
            if (i === 0 && options.hasHeader) {
              // Generate split header names
              for (let p = 0; p < maxParts; p++) {
                newRow.push(row[j] + "_" + (p + 1));
              }
            } else {
              const parts = row[j].split(splitDel);
              for (let p = 0; p < maxParts; p++) {
                newRow.push(parts[p] !== undefined ? parts[p].trim() : "");
              }
            }
          } else {
            newRow.push(row[j]);
          }
        }
        result.push(newRow);
      }

      const csv = rowsToCsv(result, delimiter);
      const colCount = result.length > 0 ? result[0].length : 0;

      self.postMessage({
        type: "result",
        id: msg.id,
        filename: msg.filename,
        csv,
        rowCount: result.length,
        colCount,
        elapsedMs: Math.round(performance.now() - t0),
      });
      return;
    }

    if (msg.type === "json-to-csv") {
      const { json, options } = msg;
      const result = jsonToCsv(json, options.delimiter, options.includeHeader);

      const response: JsonToCsvResult = {
        id: msg.id,
        filename: msg.filename,
        csv: result.csv,
        rowCount: result.rowCount,
        colCount: result.colCount,
        headers: result.headers,
        elapsedMs: Math.round(performance.now() - t0),
      };

      self.postMessage({ type: "result", ...response });
      return;
    }

    if (msg.type !== "csv-parse") return;

    const { text, options } = msg;

    const sample = text.slice(0, 2000);
    const delimiter =
      options.delimiter === "auto" ? detectDelimiter(sample) : options.delimiter;

    const rows = parseCsv(text, delimiter);
    if (rows.length === 0) throw new Error("Üres vagy érvénytelen CSV fájl.");

    let headers: string[];
    let dataRows: string[][];

    if (options.hasHeader) {
      headers = rows[0];
      dataRows = rows.slice(1);
    } else {
      headers = rows[0].map((_, i) => `col${i + 1}`);
      dataRows = rows;
    }

    const limit = options.previewRows !== undefined ? options.previewRows : dataRows.length;
    const sliced = dataRows.slice(0, limit);

    const records = sliced.map((row) => {
      const obj: Record<string, unknown> = {};
      headers.forEach((h, i) => {
        const raw = row[i] ?? "";
        obj[h] = options.autoType ? autoTypeValue(raw) : raw;
      });
      return obj;
    });

    const result: CsvParseResult = {
      id: msg.id,
      filename: msg.filename,
      json: JSON.stringify(records, null, 2),
      rowCount: dataRows.length,
      colCount: headers.length,
      headers,
      detectedDelimiter: delimiter,
      elapsedMs: Math.round(performance.now() - t0),
    };

    self.postMessage({ type: "result", ...result });
  } catch (err) {
    self.postMessage({
      type: "error",
      id: msg.id,
      filename: msg.filename,
      error: err instanceof Error ? err.message : String(err),
    });
  }
});
