#!/usr/bin/env node
/**
 * Migrate conversii markdown frontmatter to 3-segment URLs.
 *
 * - Adds `subcategory: <hub>` field
 * - Updates `canonical` from /conversii/{slug}/ → /conversii/{subcat}/{slug}/
 * - Updates `articleSchema.url`, `softwareSchema.url`, `softwareSchema."@id"`,
 *   `softwareSchema.mainEntityOfPage."@id"` if they reference the old URL
 * - Updates inline links inside markdown body (e.g. /conversii/cm-metri/ → /conversii/lungime/cm-metri/)
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src/content/math/ro/conversii";

// Mapping: tool slug → subcat slug (must match conversii-hubs.ts)
const TOOL_TO_SUBCAT = {
  // lungime
  "cm-metri": "lungime", "km-metri": "lungime", "cm-inch": "lungime",
  "inch-cm": "lungime", "picioare-cm": "lungime",
  // masa
  "kg-grame": "masa", "kg-livre": "masa", "tone-kg": "masa",
  // volum
  "litri-mililitri": "volum", "litri-decilitri": "volum",
  "litri-metri-cubi": "volum", "galon-litri": "volum",
  // suprafata
  "hectare-metri-patrati": "suprafata", "ari-metri-patrati": "suprafata",
  // temperatura
  "celsius-fahrenheit": "temperatura",
  // densitate
  "beton-greutate-volum": "densitate", "nisip-greutate-volum": "densitate",
  "pietris-greutate-volum": "densitate", "balast-greutate-volum": "densitate",
  "densitate-kg-m3-g-cm3": "densitate",
};

const BASE = "https://instrumenteonline.ro";

function migrateFile(filepath, subcat, slug) {
  const original = readFileSync(filepath, "utf8");
  let content = original;

  // 1) Add `subcategory:` field after `category: "conversii"` if missing
  if (!/^subcategory:\s/m.test(content)) {
    content = content.replace(
      /^(category:\s*"?conversii"?\s*)$/m,
      `$1\nsubcategory: "${subcat}"`
    );
  }

  // 2) Replace 2-segment URLs with 3-segment URLs
  //    /conversii/{slug}/  →  /conversii/{subcat}/{slug}/
  //    Only for slugs in our mapping
  for (const [knownSlug, knownSubcat] of Object.entries(TOOL_TO_SUBCAT)) {
    // Already-migrated 3-segment URL? Skip.
    const re2 = new RegExp(
      `(?<!/${knownSubcat})/conversii/${knownSlug}/`,
      "g"
    );
    content = content.replace(re2, `/conversii/${knownSubcat}/${knownSlug}/`);
  }

  // 3) Also update bare canonical without trailing slash (ID forms)
  for (const [knownSlug, knownSubcat] of Object.entries(TOOL_TO_SUBCAT)) {
    const re = new RegExp(
      `(?<!/${knownSubcat})/conversii/${knownSlug}(?=[#"\\s])`,
      "g"
    );
    content = content.replace(re, `/conversii/${knownSubcat}/${knownSlug}`);
  }

  if (content !== original) {
    writeFileSync(filepath, content, "utf8");
    return true;
  }
  return false;
}

let count = 0;
for (const subcat of readdirSync(ROOT)) {
  const subcatPath = join(ROOT, subcat);
  if (!statSync(subcatPath).isDirectory()) continue;

  for (const file of readdirSync(subcatPath)) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    const filepath = join(subcatPath, file);

    // Only migrate if this is a known tool slug (skip instant-answer pages later)
    if (TOOL_TO_SUBCAT[slug] !== undefined && TOOL_TO_SUBCAT[slug] !== subcat) {
      console.warn(`⚠ ${slug} is in folder ${subcat} but mapping says ${TOOL_TO_SUBCAT[slug]}`);
    }

    const changed = migrateFile(filepath, subcat, slug);
    if (changed) {
      console.log(`✔ ${subcat}/${file}`);
      count++;
    } else {
      console.log(`· ${subcat}/${file} (no changes)`);
    }
  }
}

console.log(`\n${count} files migrated.`);
