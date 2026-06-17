// ============================================================
// Konvertálás timing konfiguráció
// Minden érték ms-ban. 0 = azonnali (eredeti viselkedés).
// Eszközönként felülírható a tool-registry-ben.
// ============================================================

export interface TimingConfig {
  /** Fájl feltöltése után mennyi ms telik el mire a Konvertálás gomb aktív lesz. */
  delayBeforeConvert: number;

  /** Konverzió befejezése után mennyi ms telik el mire a Letöltés gomb aktív lesz. */
  delayBeforeDownload: number;

  /** Legyen-e vizuálisan látható visszaszámláló a gombokon? */
  showCountdown: boolean;

  /** AdSense placeholder megjelenjen-e? */
  showAdSlot: boolean;
}

/** Globális alapértékek – minden tool ezt örökli ha nem ír felül */
export const DEFAULT_TIMING: TimingConfig = {
  delayBeforeConvert:  3000,
  delayBeforeDownload: 3000,
  showCountdown:       true,
  showAdSlot:          false,  // Manuális slot aktiváláshoz: lásd internal-docs/adsense-manual-slots.md
};

/** Eszközönkénti felülírás – csak a különböző értékeket kell megadni */
export const TOOL_TIMING: Record<string, Partial<TimingConfig>> = {
  // Szöveg eszközöknél nincs delay – azonnali feedback
  "slug-generator":             { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "sorok-rendezese":            { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "ismetlodok-torlese":         { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "ures-sorok-torlese":         { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "whitespace-tisztitas":       { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "ekezetek-eltavolitasa":      { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "specialis-karakterek-torlese": { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "karaktercsere":              { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "kereses-csere":              { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "regex-kereses-csere":        { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "kisbetu-nagybetu":           { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "case-konverter":             { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  // Fejlesztő kódolók – azonnali
  "json-formazas":              { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "json-minimalas":             { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "json-ellenorzes":            { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "base64-kodolo-dekodolo":     { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "url-kodolo-dekodolo":        { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "html-entity-kodolo-dekodolo": { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  // SEO eszközök – azonnali
  "title-meta-hossz":           { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  // Fájl info – azonnali
  "fajl-informacio":            { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "hash-ellenorzo":             { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  // PDF v2 – szöveg kinyerés azonnali
  "szoveg-kinyerese":           { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "tomoritese":                 { delayBeforeConvert: 3000, delayBeforeDownload: 3000 },
  // Kép eszközök – azonnali feedback
  "kep-base64":                 { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "szin-paletta":               { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "svg-optimalizalo":           { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  "exif-terkep":                { delayBeforeConvert: 0, delayBeforeDownload: 0 },
};

/** Visszaadja az adott tool timing config-ját (merged globális + egyedi) */
export function getTimingConfig(toolSlug: string): TimingConfig {
  const override = TOOL_TIMING[toolSlug] ?? {};
  return { ...DEFAULT_TIMING, ...override };
}
