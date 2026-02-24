#!/usr/bin/env node
// scripts/gen-pages.mjs
// ============================================================
// Automatikus Astro page generálás a tool-registry alapján.
// Minden tool-hoz létrehozza a megfelelő .astro fájlt,
// ha az még nem létezik (nem írja felül a manuális oldalakat).
//
// Futtatás:
//   node scripts/gen-pages.mjs
//   node scripts/gen-pages.mjs --force   # felülírja a meglévőket is
//   node scripts/gen-pages.mjs --dry-run # csak kilistázza
// ============================================================

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, "..");
const PAGES_DIR = join(ROOT, "src", "pages");
const REGISTRY  = join(ROOT, "src", "lib", "tool-registry.ts");

const FORCE   = process.argv.includes("--force");
const DRY_RUN = process.argv.includes("--dry-run");

// ─── Tool adatok kinyerése a registry TS fájlból ────────────
// Egyszerű regex alapú parse – nem teljes TS parser,
// de a registry strukturált formátuma miatt elegendő.
function extractTools(src) {
  const tools = [];
  // Minden { slug: "...", category: "...", ... } blokkot megkeresi
  const blockRe = /\{[^{}]*slug:\s*"([^"]+)"[^{}]*category:\s*"([^"]+)"[^{}]*\}/gs;
  let match;
  while ((match = blockRe.exec(src)) !== null) {
    const block = match[0];
    const get   = (key) => {
      const m = new RegExp(`${key}:\\s*"([^"]+)"`).exec(block);
      return m ? m[1] : null;
    };
    const slug      = get("slug");
    const category  = get("category");
    const status    = get("status") ?? "coming-soon";
    const component = get("component");
    if (slug && category) tools.push({ slug, category, status, component });
  }
  return tools;
}

// ─── Astro page template generálás ──────────────────────────
function activeTemplate(cat, slug, component) {
  return `---
import ToolLayout from "../../layouts/ToolLayout.astro";
import ${component} from "../../components/tools/${cat}/${component}.svelte";
import { getToolBySlug } from "../../lib/tool-registry.ts";

const tool = getToolBySlug("${cat}", "${slug}")!;
---

<ToolLayout tool={tool}>
  <${component} client:visible />
</ToolLayout>
`;
}

function comingSoonTemplate(cat, slug) {
  return `---
import ToolLayout from "../../layouts/ToolLayout.astro";
import { getToolBySlug } from "../../lib/tool-registry.ts";

const tool = getToolBySlug("${cat}", "${slug}")!;
---

<ToolLayout tool={tool}>
  <!-- Coming soon: component not yet implemented -->
</ToolLayout>
`;
}

// ─── Futtatás ───────────────────────────────────────────────
const src   = readFileSync(REGISTRY, "utf-8");
const tools = extractTools(src);

console.log(`\n📋 EszközTár – Page Generator`);
console.log(`   Registry: ${tools.length} tool találva`);
console.log(`   Mode: ${DRY_RUN ? "DRY RUN" : FORCE ? "FORCE (felülír)" : "SAFE (nem ír felül)"}\n`);

let created = 0;
let skipped = 0;
let updated = 0;

for (const { slug, category, status, component } of tools) {
  const dir      = join(PAGES_DIR, category);
  const filepath = join(dir, `${slug}.astro`);
  const exists   = existsSync(filepath);

  const isActive  = status === "active" && component;
  const template  = isActive
    ? activeTemplate(category, slug, component)
    : comingSoonTemplate(category, slug);

  const action = !exists ? "CREATE" : FORCE ? "UPDATE" : "SKIP";
  const icon   = action === "CREATE" ? "✅" : action === "UPDATE" ? "♻️ " : "⏭️ ";
  const label  = `${icon} [${action}] /${category}/${slug}.astro`;

  if (DRY_RUN) {
    console.log(label + (isActive ? ` (component: ${component})` : " (coming-soon)"));
    continue;
  }

  if (action === "SKIP") {
    skipped++;
    continue;
  }

  mkdirSync(dir, { recursive: true });
  writeFileSync(filepath, template, "utf-8");

  if (action === "CREATE") { created++; console.log(label); }
  else                      { updated++; console.log(label); }
}

if (!DRY_RUN) {
  console.log(`\n📊 Összesítő:`);
  console.log(`   ✅ Létrehozva: ${created}`);
  if (FORCE) console.log(`   ♻️  Frissítve: ${updated}`);
  console.log(`   ⏭️  Kihagyva: ${skipped}`);
  console.log(`\n✨ Kész! Futtasd: pnpm dev\n`);
} else {
  console.log(`\n💡 Dry run – semmi sem változott. Futtasd --force nélkül az élesítéshez.\n`);
}
