// ============================================================
// DOWNLOAD HELPERS
// Blob letöltés, ZIP csomagolás (fflate alapú)
// ============================================================

/**
 * Blob letöltése a böngészőben.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Uint8Array letöltése.
 */
export function downloadUint8Array(
  data: Uint8Array,
  filename: string,
  mimeType: string = "application/octet-stream"
): void {
  const blob = new Blob([data], { type: mimeType });
  downloadBlob(blob, filename);
}

/**
 * Szöveg letöltése.
 */
export function downloadText(text: string, filename: string, mimeType = "text/plain;charset=utf-8"): void {
  const blob = new Blob([text], { type: mimeType });
  downloadBlob(blob, filename);
}

/**
 * JSON letöltése.
 */
export function downloadJson(data: unknown, filename: string): void {
  downloadText(JSON.stringify(data, null, 2), filename, "application/json");
}

// ─── ZIP helper (fflate-tal) ──────────────────────────────────

export interface ZipEntry {
  filename: string;
  data: Uint8Array;
}

/**
 * Több fájl ZIP-be csomagolása és letöltése.
 * Dinamikusan importálja az fflate könyvtárat.
 */
export async function downloadZip(entries: ZipEntry[], zipFilename: string = "letoltes.zip"): Promise<void> {
  const { zipSync } = await import("fflate");

  const files: Record<string, Uint8Array> = {};
  for (const entry of entries) {
    files[entry.filename] = entry.data;
  }

  const zipped = zipSync(files, { level: 6 });
  const blob = new Blob([zipped], { type: "application/zip" });
  downloadBlob(blob, zipFilename);
}

/**
 * Fájl nevének kiterjesztés-csere segédlete.
 */
export function replaceExtension(filename: string, newExt: string): string {
  const dotIndex = filename.lastIndexOf(".");
  const base = dotIndex !== -1 ? filename.slice(0, dotIndex) : filename;
  return `${base}.${newExt.replace(/^\./, "")}`;
}

/**
 * Fájlméret formázása olvasható stringgé.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Méretcsökkentés százalékban.
 */
export function calcSavingPercent(originalSize: number, newSize: number): number {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - newSize) / originalSize) * 100);
}
