// ============================================================
// IndexNow build-time auto-submit — konvertalo.hu (HU) + instrumenteonline.ro (RO)
// ------------------------------------------------------------
// Astro integration: az `astro:build:done` hookban kiszámolja a
// legutóbbi deploy óta TÉNYLEGESEN változott URL-eket (git diff:
// Netlify CACHED_COMMIT_REF..COMMIT_REF), és beküldi őket az
// IndexNow-ba (Bing/Yandex). Production buildben fut, nyelvenként
// az adott domain URL-jeivel (PUBLIC_SITE_LANG + PUBLIC_SITE_URL).
//
// Kulcsfájl: public/<KEY>.txt → https://<host>/<KEY>.txt (a public/
// mindkét buildbe bekerül → a kulcs mindkét domain gyökerén él).
// Kézi/egyszeri beküldés továbbra is: scripts/indexnow-submit.mjs
//
// Gate-ek (bármelyik → skip, build SOHA nem törik el):
//   - PUBLIC_SITE_LANG nem "hu" és nem "ro" → skip
//   - CONTEXT !== "production" (Netlify preview/branch/local kihagyva),
//     kivéve INDEXNOW_FORCE=1
//   - nincs CACHED_COMMIT_REF baseline (első build) → skip
//
// URL-leképezés a változott forrásfájlokból (a `pages` validáció úgyis
// kiszűri a bizonytalan találatokat → sosem megy ki 404-es URL):
//   - src/content/math/<lang>/**/<slug>.md  → /<...>/<slug>/   (longform/instant)
//   - src/lib/tool-registry.ts  (diff)       → /<cat>/<slug>/   (főleg HU base-meta)
//   - src/lib/i18n/<lang>-tools-*.ts (diff)  → a változott slug → egyező page (RO tool-meta)
//   - src/i18n/<lang>.json (diff, cat_meta)  → /<localizált-kategória>/
//   - src/pages/index.astro                   → /
//
// Env kapcsolók teszthez:
//   INDEXNOW_FORCE=1   → prod-gate megkerülése
//   INDEXNOW_DRYRUN=1  → kiszámol + logol, de NEM POST-ol
// ============================================================
import { execSync } from "node:child_process";

const KEY = "3f1a55c5e4f3296e9b3a22ef8a589d01";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS = 500; // circuit-breaker: e fölött gyanús a mapping → skip
const SUPPORTED_LANGS = new Set(["hu", "ro"]);

// RO kategória-id → URL path-szegmens (lokalizált); a többi azonos.
const RO_CAT_PATH = { adat: "date", fajl: "fisiere", fejleszto: "dezvoltator", szoveg: "text", szinek: "culori" };
function catPath(lang, cat) { return lang === "ro" ? (RO_CAT_PATH[cat] ?? cat) : cat; }

function sh(cmd) {
  return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
}
function commitExists(ref) {
  // `git cat-file -e <ref>` (NEM `<ref>^{commit}`): a `^{...}` a Windows cmd.exe-ben
  // elromlik (a ^ escape-karakter). A CACHED/COMMIT_REF mindig commit-SHA, így az
  // objektum-létezés ellenőrzése elég, és cross-platform működik (cmd.exe + sh).
  try { sh(`git cat-file -e ${ref}`); return true; } catch { return false; }
}

/** A Netlify diff-range (from..to) feloldása, shallow-clone kezeléssel. */
export function resolveRange() {
  const to = (process.env.COMMIT_REF || "HEAD").trim();
  const from = (process.env.CACHED_COMMIT_REF || "").trim();
  if (!from) return null; // nincs baseline (első build)
  if (!commitExists(from) || !commitExists(to)) {
    try { sh(`git fetch --depth=100 origin ${from} ${to}`); } catch { /* ignore */ }
  }
  if (!commitExists(from) || !commitExists(to)) return null;
  return `${from} ${to}`;
}

export function changedFiles(range) {
  try {
    return sh(`git diff --name-only ${range}`).split("\n").map(s => s.trim()).filter(Boolean);
  } catch { return []; }
}

function gitDiff(range, file) {
  try { return sh(`git diff -U30 ${range} -- ${file}`); } catch { return ""; }
}

/** tool-registry.ts diff → URL path-ek. A registry TÖBBNYIRE egy-sor-per-tool,
 *  így a slug+category ugyanazon a változott soron van. Többsoros objektumoknál
 *  a legutóbb látott slug/category (context sorokból), kategória-módosításnál a
 *  legutóbb látott id. A bizonytalan találatokat a `pages` validáció úgyis kiszűri. */
export function mapRegistryDiff(range, paths, lang) {
  const diff = gitDiff(range, "src/lib/tool-registry.ts");
  if (!diff) return;
  let lastId = null, lastSlug = null, lastCat = null;
  let inTools = false;
  for (const raw of diff.split("\n")) {
    if (/^(\+\+\+|---|@@|diff |index )/.test(raw)) continue;
    const marker = raw[0];
    const line = raw.slice(1);
    const sm = line.match(/\bslug:\s*"([^"]+)"/);
    const cm = line.match(/\bcategory:\s*"([^"]+)"/);
    const im = line.match(/\bid:\s*"([^"]+)"/);
    if (sm) { lastSlug = sm[1]; inTools = true; }
    if (cm) lastCat = cm[1];
    if (im) lastId = im[1];
    const changed = marker === "+" || marker === "-";
    if (!changed) continue;
    if (sm && cm) { paths.add(`/${catPath(lang, cm[1])}/${sm[1]}/`); continue; } // egy-soros tool
    if (inTools && lastSlug && lastCat) { paths.add(`/${catPath(lang, lastCat)}/${lastSlug}/`); continue; } // többsoros tool
    if (lastId) paths.add(`/${catPath(lang, lastId)}/`); // kategória-hub
  }
}

/** <lang>.json diff → URL path-ek (csak a felismert kulcsok; a globális label/nav
 *  kulcsokat szándékosan kihagyjuk, mert az egész site-ra hatnának). */
export function mapJsonDiff(range, paths, lang) {
  const diff = gitDiff(range, `src/i18n/${lang}.json`);
  if (!diff) return;
  for (const raw of diff.split("\n")) {
    if (!(raw[0] === "+" || raw[0] === "-")) continue;
    if (/^(\+\+\+|---)/.test(raw)) continue;
    const km = raw.slice(1).match(/"([a-zA-Z0-9_.]+)"\s*:/);
    if (!km) continue;
    const key = km[1];
    if (key.startsWith("homepage.") || key.startsWith("home.")) paths.add("/");
    else {
      const cm = key.match(/^cat_meta\.([a-z]+)_/);
      if (cm) paths.add(`/${catPath(lang, cm[1])}/`);
    }
  }
}

/** <lang>-tools-*.ts (RO tool-meta) diff → változott tool-slug-ok halmaza.
 *  A slug az entry ELSŐ mezője, így a nála lejjebb változott description/keywords
 *  a „legutóbb látott slug"-hoz tartozik. A slug→URL-t a hook a `pages` alapján
 *  oldja fel (utolsó path-szegmens egyezés), így a lokalizált kategória-út nem
 *  kell ide. */
export function mapToolI18nSlugs(range, file, slugs) {
  const diff = gitDiff(range, file);
  if (!diff) return;
  let lastSlug = null;
  for (const raw of diff.split("\n")) {
    if (/^(\+\+\+|---|@@|diff |index )/.test(raw)) continue;
    const marker = raw[0];
    const line = raw.slice(1);
    const sm = line.match(/\bslug:\s*"([^"]+)"/);
    if (sm) lastSlug = sm[1];
    const changed = marker === "+" || marker === "-";
    if (changed && lastSlug) slugs.add(lastSlug);
  }
}

/** Változott fájlok → {paths, slugs}. `paths` konkrét URL-path-ek, `slugs`
 *  a RO tool-slug-ok (a hook a `pages` alapján oldja fel URL-lé). */
export function mapChangedFiles(files, range, lang) {
  const paths = new Set();
  const slugs = new Set();
  const mdRe = new RegExp(`^src/content/math/${lang}/(.+)\\.md$`);
  for (const f of files) {
    const m = f.match(mdRe);
    if (m) { paths.add(`/${m[1]}/`); continue; }
    if (f === "src/pages/index.astro") paths.add("/");
    if (/^src\/lib\/i18n\/[a-z]+-tools-[a-z-]+\.ts$/.test(f) && f.startsWith(`src/lib/i18n/${lang}-tools-`)) {
      mapToolI18nSlugs(range, f, slugs);
    }
  }
  if (files.includes("src/lib/tool-registry.ts")) mapRegistryDiff(range, paths, lang);
  if (files.includes(`src/i18n/${lang}.json`)) mapJsonDiff(range, paths, lang);
  return { paths, slugs };
}

function normalizePath(pathname) {
  let p = pathname.startsWith("/") ? pathname : "/" + pathname;
  if (!p.endsWith("/")) p += "/";
  return p.replace(/index\.html\/$/, ""); // "/x/index.html/" ritka eset
}
function lastSegment(p) {
  const t = p.replace(/\/+$/, "");
  const i = t.lastIndexOf("/");
  return i >= 0 ? t.slice(i + 1) : t;
}

export default function indexNow() {
  return {
    name: "indexnow-submit",
    hooks: {
      "astro:build:done": async ({ pages, logger }) => {
        const log = logger ?? console;
        try {
          const lang = process.env.PUBLIC_SITE_LANG ?? "hu";
          if (!SUPPORTED_LANGS.has(lang)) { log.info?.(`[indexnow] skip: nem támogatott nyelv (${lang})`); return; }
          const isProd = process.env.CONTEXT === "production" || process.env.INDEXNOW_FORCE === "1";
          if (!isProd) { log.info?.("[indexnow] skip: nem production (CONTEXT=" + process.env.CONTEXT + ")"); return; }

          const siteUrl = (process.env.PUBLIC_SITE_URL ?? "https://konvertalo.hu").replace(/\/$/, "");
          const host = new URL(siteUrl).host;

          const range = resolveRange();
          if (!range) { log.info?.("[indexnow] skip: nincs CACHED_COMMIT_REF baseline"); return; }
          const files = changedFiles(range);
          if (!files.length) { log.info?.("[indexnow] skip: nincs változott fájl (" + range + ")"); return; }

          const { paths, slugs } = mapChangedFiles(files, range, lang);

          // Validáció a ténylegesen buildelt oldalak ellen (a bizonytalan mapping kiszűrése)
          const valid = new Set((pages ?? []).map(p => normalizePath(p.pathname)));
          valid.add("/");

          // RO tool-slug-ok feloldása a valós page-ekhez (utolsó path-szegmens egyezés)
          if (slugs.size) {
            for (const vp of valid) if (slugs.has(lastSegment(vp))) paths.add(vp);
          }

          const urlList = [...paths].filter(p => valid.has(p)).map(p => siteUrl + p);

          if (!urlList.length) { log.info?.("[indexnow] skip: nincs beküldhető URL a diffből"); return; }
          if (urlList.length > MAX_URLS) {
            log.warn?.(`[indexnow] skip: ${urlList.length} URL (> ${MAX_URLS}) — valószínű mapping-hiba`);
            return;
          }

          if (process.env.INDEXNOW_DRYRUN === "1") {
            log.info?.(`[indexnow] DRYRUN (${host}) — ${urlList.length} URL:\n  ` + urlList.join("\n  "));
            return;
          }

          const res = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({ host, key: KEY, keyLocation: `${siteUrl}/${KEY}.txt`, urlList }),
          });
          log.info?.(`[indexnow] ${res.status} ${res.statusText} — ${urlList.length} URL beküldve (${host})`);
        } catch (e) {
          (log.warn ?? console.warn)("[indexnow] kihagyva (hiba): " + (e?.message ?? e));
        }
      },
    },
  };
}
