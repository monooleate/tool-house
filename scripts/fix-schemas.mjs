// Fix schema.org markup in math markdown frontmatters:
// 1. Add `author` to articleSchema
// 2. Add `offers` + `url` + `inLanguage` to softwareSchema
// 3. Convert faqPageSchema from non-standard (question1/answer1) to standard `mainEntity` array
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src/content/math/ro";

function* walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith(".md")) yield p;
  }
}

const SITE_URL = "https://instrumenteonline.ro";

let changedFiles = 0;

for (const file of walk(ROOT)) {
  let s = readFileSync(file, "utf-8");
  let changed = false;

  // 1. Add author to articleSchema
  if (s.includes('articleSchema:') && !s.match(/articleSchema:[\s\S]+?"author"/)) {
    s = s.replace(
      /("inLanguage": "ro")\n(softwareSchema:)/,
      `$1\n  "author":\n    "@type": "Organization"\n    "@id": "${SITE_URL}/#organization"\n    "name": "InstrumenteOnline"\n    "url": "${SITE_URL}"\n  "publisher":\n    "@type": "Organization"\n    "@id": "${SITE_URL}/#organization"\n    "name": "InstrumenteOnline"\n    "url": "${SITE_URL}"\n$2`
    );
    changed = true;
  }

  // 2. Add offers + url + inLanguage to softwareSchema (after featureList)
  if (s.includes('softwareSchema:') && !s.match(/softwareSchema:[\s\S]+?"offers"/)) {
    // Read the toolSlug from frontmatter to build url
    const slugMatch = s.match(/^toolSlug: "([^"]+)"/m);
    const slug = slugMatch ? slugMatch[1] : "";
    const url = `${SITE_URL}/conversii/${slug}/`;

    s = s.replace(
      /(softwareSchema:[\s\S]+?"featureList": "[^"]+")\n(faqPageSchema:)/,
      `$1\n  "url": "${url}"\n  "inLanguage": "ro"\n  "isAccessibleForFree": true\n  "offers":\n    "@type": "Offer"\n    "price": "0"\n    "priceCurrency": "RON"\n    "availability": "https://schema.org/InStock"\n  "publisher":\n    "@type": "Organization"\n    "name": "InstrumenteOnline"\n    "url": "${SITE_URL}"\n$2`
    );
    changed = true;
  }

  // 3. Convert faqPageSchema from question1/answer1 → mainEntity array
  if (s.includes('faqPageSchema:') && s.match(/faqPageSchema:[\s\S]+?"question1"/)) {
    const faqBlockMatch = s.match(/(faqPageSchema:\n  "@context": "https:\/\/schema\.org"\n  "@type": "FAQPage"\n)([\s\S]+?)(\n---)/);
    if (faqBlockMatch) {
      const qaText = faqBlockMatch[2];
      // Parse question1, answer1, question2, answer2, ...
      const qPattern = /"question(\d+)": "([^"]+)"\n\s*"answer\d+": "([^"]+)"/g;
      const items = [];
      for (const m of qaText.matchAll(qPattern)) {
        const q = m[2].replaceAll('"', '\\"');
        const a = m[3].replaceAll('"', '\\"');
        items.push(
          `    - "@type": "Question"\n      "name": "${q}"\n      "acceptedAnswer":\n        "@type": "Answer"\n        "text": "${a}"`
        );
      }
      const newBlock = `${faqBlockMatch[1]}  "mainEntity":\n${items.join("\n")}${faqBlockMatch[3]}`;
      s = s.replace(faqBlockMatch[0], newBlock);
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(file, s, "utf-8");
    console.log(`✓ Fixed: ${file}`);
    changedFiles++;
  } else {
    console.log(`- Skipped (already OK): ${file}`);
  }
}

console.log(`\nFixed ${changedFiles} files.`);
