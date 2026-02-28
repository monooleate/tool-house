// ============================================================
// Romanian translations – ADAT (data) category tools
// Slugs remain Hungarian; user-facing text is Romanian.
// ============================================================

export const ADAT_RO: Record<string, { slug: string; title: string; h1: string; description: string; keywords: string[] }> = {
  "csv-json": {
    slug: "convertor-csv-json",
    title: "Convertor CSV → JSON online | Gratuit",
    h1: "Convertor CSV → JSON",
    description: "Convertește fișiere CSV în JSON în browser, fără server. Auto-detectare delimitator, opțiune header, previzualizare.",
    keywords: ["csv json", "convertor csv", "csv to json online", "convertor date", "csv în json gratuit"],
  },
  "json-csv": {
    slug: "convertor-json-csv",
    title: "Convertor JSON → CSV online | Gratuit",
    h1: "Convertor JSON → CSV",
    description: "Convertește array JSON în tabel CSV în browser, cu alegere delimitator. Fără server, datele rămân private.",
    keywords: ["json csv", "json to csv", "convertor json", "csv export", "json în csv online"],
  },
  "tsv-csv": {
    slug: "convertor-tsv-csv",
    title: "Convertor TSV → CSV online | Gratuit",
    h1: "Convertor TSV → CSV",
    description: "Convertește fișiere TSV (tab-separated) în CSV (comma-separated) în browser. Fără server, rapid și privat.",
    keywords: ["tsv csv", "tsv to csv", "convertor tsv", "tab separated csv", "tsv în csv online"],
  },
  "csv-tsv": {
    slug: "convertor-csv-tsv",
    title: "Convertor CSV → TSV online | Gratuit",
    h1: "Convertor CSV → TSV",
    description: "Convertește fișiere CSV în format TSV (tab-separated) în browser. Fără server, procesare rapidă și privată.",
    keywords: ["csv tsv", "csv to tsv", "convertor csv tsv", "csv tab conversion", "csv în tsv online"],
  },
  "csv-tisztitas": {
    slug: "curatare-csv",
    title: "Curățare date CSV online | Rânduri goale, duplicate",
    h1: "Curățare date CSV",
    description: "Ștergere rânduri goale, normalizare spații și eliminare duplicate din CSV. În browser, fără încărcare pe server.",
    keywords: ["curățare csv", "csv clean", "csv data cleaning", "csv rânduri goale", "ștergere duplicate csv"],
  },
  "fejlec-atnevezes": {
    slug: "redenumire-antete-csv",
    title: "Redenumire antete CSV online | Header rename",
    h1: "Redenumire antete CSV",
    description: "Redenumește antetele coloanelor CSV cu editor vizual. Încărcare, editare, descărcare – totul în browser.",
    keywords: ["redenumire antet csv", "csv header rename", "csv column rename", "editare antete csv online"],
  },
  "oszlopok-kivalasztasa": {
    slug: "selectare-coloane-csv",
    title: "Selectare coloane CSV online | Column select",
    h1: "Selectare coloane CSV",
    description: "Păstrează sau elimină coloane din CSV cu checkbox-uri. În browser, fără server, rapid și privat.",
    keywords: ["selectare coloane csv", "csv column select", "csv column filter", "extragere coloane csv online"],
  },
  "sorok-szurese": {
    slug: "filtrare-randuri-csv",
    title: "Filtrare rânduri CSV online | Row filter",
    h1: "Filtrare rânduri CSV",
    description: "Filtrează rânduri CSV după condiții: conține, egal, mai mare, mai mic, nu este gol. În browser, privat.",
    keywords: ["filtrare csv", "csv row filter", "csv filter online", "filtrare rânduri csv", "csv filter rows"],
  },
  "oszlop-szetvalasztas": {
    slug: "separare-coloana-csv",
    title: "Separare coloană CSV online | Column split",
    h1: "Separare coloană CSV",
    description: "Împarte o coloană CSV în mai multe coloane pe baza unui delimitator. Detectare automată a numărului de coloane.",
    keywords: ["separare coloană csv", "csv column split", "csv split column", "despărțire coloană csv online"],
  },
  "ertekek-normalizalasa": {
    slug: "normalizare-valori-csv",
    title: "Normalizare valori CSV online | Min-Max, Z-score",
    h1: "Normalizare valori CSV",
    description: "Normalizează coloane numerice pe scara 0–1 (Min-Max) sau z-score. Detectare automată coloane numerice.",
    keywords: ["normalizare csv", "csv normalize", "min-max normalizare", "z-score csv", "normalizare date online"],
  },
  "tomeges-konvertalas-zip": {
    slug: "conversie-masa-csv-zip",
    title: "Conversie în masă CSV/JSON în ZIP | Batch",
    h1: "Conversie în masă a datelor",
    description: "Convertește mai multe fișiere CSV în JSON simultan, cu descărcare ZIP. În browser, fără server, procesare batch.",
    keywords: ["batch csv json", "conversie în masă csv", "bulk csv json", "csv batch convert zip", "convertor batch online"],
  },
};
