// scripts/verify-graph.mjs
// Phase 4 verifikáció: a buildelt HTML-ben (dist/) egységes @graph ellenőrzése.
// Használat: node scripts/verify-graph.mjs <distDir> <PERSON_ID>
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = process.argv[2] || "dist";
const PERSON_ID = process.argv[3] || "https://jmeszaros.dev/#person";

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
}

function dangling(graph) {
  const ids = new Set(graph.map((n) => n["@id"]).filter(Boolean));
  const refs = [];
  const w = (o) => {
    if (Array.isArray(o)) return o.forEach(w);
    if (o && typeof o === "object") {
      const k = Object.keys(o);
      if (k.length === 1 && k[0] === "@id") refs.push(o["@id"]);
      else for (const key of k) if (key !== "@id") w(o[key]);
    }
  };
  w(graph);
  return [...new Set(refs.filter((r) => !ids.has(r)))];
}

const files = walk(DIST);
let pass = 0, fail = 0, noGraph = 0;
const failures = [];
const typeHisto = {};
let homepageSiblings = null, aboutSiblings = null;

for (const f of files) {
  const html = readFileSync(f, "utf8");
  const graphs = [...html.matchAll(/<script type="application\/ld\+json" id="graph"[^>]*>([\s\S]*?)<\/script>/g)];
  const allLd = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>/g)].length;
  const legacy = allLd - graphs.length;
  const rel = f.replace(DIST, "").replace(/\\/g, "/");

  if (graphs.length === 0) { noGraph++; continue; } // 404 stb. – külön számoljuk

  const ok = (c, m) => { if (c) pass++; else { fail++; failures.push(`❌ ${rel}: ${m}`); } };
  ok(graphs.length === 1, `pontosan 1 id=graph (got ${graphs.length})`);
  ok(legacy === 0, `0 legacy ld+json (got ${legacy})`);

  let g;
  try { g = JSON.parse(graphs[0][1].replace(/\\u003c/g, "<"))["@graph"]; }
  catch (e) { fail++; failures.push(`❌ ${rel}: JSON parse: ${e.message}`); continue; }

  const d = dangling(g);
  ok(d.length === 0, `lógó @id-ref: ${JSON.stringify(d)}`);

  const person = g.find((n) => n["@type"] === "Person");
  ok(person && person["@id"] === PERSON_ID, `Person @id=PERSON_ID (got ${person && person["@id"]})`);
  ok(g.some((n) => n["@type"] === "Organization"), "Organization node jelen");
  ok(g.some((n) => n["@type"] === "WebSite"), "WebSite node jelen");
  ok(g.some((n) => Array.isArray(n["@type"]) ? n["@type"].includes("WebPage") : (typeof n["@type"]==="string" && (n["@type"]==="WebPage"||n["@type"].endsWith("Page")||n["@type"]==="ItemPage"))), "WebPage(-szerű) node jelen");

  for (const n of g) {
    const ts = Array.isArray(n["@type"]) ? n["@type"].join("+") : n["@type"];
    typeHisto[ts] = (typeHisto[ts] || 0) + 1;
  }

  // sibling-ellenőrzés főoldal + about
  const sibOrgs = g.filter((n) => n["@type"] === "Organization").map((n) => n["@id"]);
  if (rel === "/index.html") homepageSiblings = sibOrgs;
  if (rel.includes("despre-noi") || rel.includes("rolunk")) aboutSiblings = sibOrgs;
}

console.log("=== TÍPUS-HISZTOGRAM (node-előfordulás) ===");
for (const [k, v] of Object.entries(typeHisto).sort((a, b) => b[1] - a[1])) console.log(`  ${v.toString().padStart(5)}  ${k}`);
console.log("\n=== SIBLING-LINKELÉS ===");
console.log("  Főoldal Organization @id-k:", JSON.stringify(homepageSiblings));
console.log("  About   Organization @id-k:", JSON.stringify(aboutSiblings));
if (failures.length) { console.log("\n=== HIBÁK (max 40) ==="); failures.slice(0, 40).forEach((l) => console.log("  " + l)); }
console.log(`\nHTML fájl: ${files.length} | graph-os oldal: ${files.length - noGraph} | graph nélkül (404 stb.): ${noGraph}`);
console.log(`RESULT: ${pass} PASS, ${fail} FAIL`);
process.exit(fail > 0 ? 1 : 0);
