// Audit all RO math pages (conversii + calculator) for schema.org JSON-LD presence and validity
import { readFileSync } from "node:fs";
import { join } from "node:path";

const PAGE_GROUPS = [
  {
    category: "conversii",
    // NOTE: conversii now uses sub-categorized routing /conversii/<subcat>/<slug>/
    dist: "dist/conversii",
    pages: [
      // Fázis 1 + Fázis 4 (lungime)
      "lungime/cm-metri", "lungime/km-metri", "lungime/cm-inch",
      "lungime/picioare-cm", "lungime/inch-cm",
      // Fázis 1 + Fázis 4 (masa)
      "masa/kg-grame", "masa/kg-livre", "masa/tone-kg",
      // Fázis 1 + Fázis 4 (volum)
      "volum/litri-mililitri", "volum/litri-decilitri", "volum/litri-metri-cubi", "volum/galon-litri",
      // Fázis 1 (temperatură)
      "temperatura/celsius-fahrenheit",
      // Fázis 4 (suprafață)
      "suprafata/hectare-metri-patrati", "suprafata/ari-metri-patrati",
      // Fázis 4 + cleanup (densitate)
      "densitate/beton-greutate-volum", "densitate/densitate-kg-m3-g-cm3",
      "densitate/nisip-greutate-volum", "densitate/pietris-greutate-volum", "densitate/balast-greutate-volum",
    ],
  },
  {
    category: "calculator",
    dist: "dist/calculator",
    pages: [
      "procent-calculator", "ecuatie-grad-doi", "ecuatii-exponentiale", "medie-aritmetica", "regula-de-trei-simpla",
      // Fázis 4 cleanup (consum combustibil mutat din conversii)
      "consum-combustibil",
    ],
  },
  {
    category: "geometrie",
    dist: "dist/geometrie",
    pages: ["triunghi-dreptunghic", "functii-trigonometrice", "radiani-grade", "cerc-calculator", "dreptunghi-calculator"],
  },
  {
    category: "finante",
    dist: "dist/finante",
    pages: [
      "calculator-tva", "calculator-credit", "dobanda-compusa",
      "calculator-reducere", "marja-adaos", "calculator-salariu-ora",
    ],
  },
  {
    category: "sanatate",
    dist: "dist/sanatate",
    pages: [
      // Fázis 6
      "calculator-imc", "greutate-ideala", "calculator-calorii",
    ],
  },
  {
    category: "timp",
    dist: "dist/timp",
    pages: [
      // Fázis 7
      "diferenta-date",
      "craciun-numaratoare", "revelion-numaratoare", "pasti-numaratoare",
      "zi-de-nastere", "generator-numaratoare", "cate-zile-am",
      "bacalaureat-numaratoare",
    ],
  },
];

let totalSchemas = 0;
let totalErrors = 0;
let totalPages = 0;

for (const group of PAGE_GROUPS) {
  console.log(`\n\n========== Category: ${group.category} ==========`);
  for (const slug of group.pages) {
    totalPages++;
    const file = join(group.dist, slug, "index.html");
  let html;
  try {
    html = readFileSync(file, "utf-8");
  } catch (e) {
    console.error(`❌ ${slug}: file not found (${file})`);
    totalErrors++;
    continue;
  }

  // Extract all JSON-LD blocks
  const matches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]+?)<\/script>/g)];
  console.log(`\n=== ${slug} (${matches.length} schemas) ===`);

  for (const m of matches) {
    let json;
    try {
      json = JSON.parse(m[1]);
    } catch (e) {
      console.error(`  ❌ Invalid JSON: ${e.message.slice(0, 80)}`);
      totalErrors++;
      continue;
    }
    const type = Array.isArray(json["@type"]) ? json["@type"].join("+") : json["@type"];
    const lang = json.inLanguage || "?";
    const name = json.name || json.headline || "(no name)";
    console.log(`  ✓ @type=${type} | lang=${lang} | ${name.slice(0, 60)}`);

    // Validation checks
    if (!json["@context"]) console.log(`    ⚠️  missing @context`);
    if (!json["@type"]) console.log(`    ⚠️  missing @type`);

    if (type.includes("SoftwareApplication") || type.includes("WebApplication")) {
      if (!json.applicationCategory) console.log(`    ⚠️  no applicationCategory`);
      if (!json.operatingSystem) console.log(`    ⚠️  no operatingSystem`);
      if (!json.offers) console.log(`    ⚠️  no offers (free price?)`);
      if (json.offers?.priceCurrency && json.offers.priceCurrency !== "RON") {
        console.log(`    ⚠️  priceCurrency=${json.offers.priceCurrency} (expected RON for RO build)`);
      }
    }

    if (type === "FAQPage") {
      const qCount = (json.mainEntity || []).length;
      if (qCount < 1) console.log(`    ⚠️  no FAQ questions`);
      else console.log(`    → ${qCount} FAQ questions`);
    }

    if (type === "BreadcrumbList") {
      const items = json.itemListElement || [];
      if (items.length < 2) console.log(`    ⚠️  short breadcrumb`);
      else console.log(`    → ${items.length} breadcrumb items`);
    }

    if (type === "Article" || type === "TechArticle") {
      if (!json.datePublished) console.log(`    ⚠️  no datePublished`);
      if (!json.author) console.log(`    ⚠️  no author`);
    }

    totalSchemas++;
  }

  // Hreflang check (RO-only — should NOT have hu)
  const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)"/g)].map(m => m[1]);
  console.log(`  hreflangs: ${hreflangs.join(", ")}`);
  if (hreflangs.includes("hu")) {
    console.log(`    ⚠️  hu hreflang present (should be RO-only!)`);
    totalErrors++;
  }

  // Canonical
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  console.log(`  canonical: ${canonical}`);

  // OG image
  const ogImg = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  console.log(`  og:image: ${ogImg}`);
  }
}

console.log(`\n========================================`);
console.log(`Summary: ${totalSchemas} schemas across ${totalPages} pages, ${totalErrors} errors`);
