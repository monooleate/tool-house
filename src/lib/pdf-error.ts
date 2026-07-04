// ============================================================
// pdf-error.ts
// A pdf-lib / pdf.js nyers (jellemzően angol) hibaüzeneteit
// lokalizált, felhasználóbarát szövegre fordítja, hogy a
// HU/RO felület ne mutasson angol DOMException/technikai szöveget.
// ============================================================

import { ui } from "./ui-labels.ts";

/**
 * Egységes, lokalizált PDF-hibaüzenet.
 * - Titkosított / jelszóval védett PDF → "távolítsd el a védelmet".
 * - Minden más betöltési/feldolgozási hiba → általános betöltési hiba.
 */
export function mapPdfError(err: unknown): string {
  const name = (err as { name?: string } | null)?.name ?? "";
  const raw = err instanceof Error ? err.message : String(err ?? "");
  const msg = raw.toLowerCase();

  if (
    name === "PasswordException" ||
    msg.includes("password") ||
    msg.includes("encrypt")
  ) {
    return ui.pdfEncryptedError;
  }

  return ui.pdfLoadError;
}
