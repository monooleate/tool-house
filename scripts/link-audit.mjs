// Ad-hoc internal-link + orphan audit over dist/ (RO build).
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const DIST = "dist";
const ORIGIN = "https://instrumenteonline.ro";

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const allFiles = walk(DIST);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));

const toPosix = (f) => relative(DIST, f).split("\\").join("/");
function fileToUrl(f) {
  const rel = toPosix(f);
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"index.html".length);
  if (rel === "404.html") return "/404";
  return "/" + rel;
}
const pageUrls = new Set(htmlFiles.map(fileToUrl));
const fileUrls = new Set(allFiles.map((f) => "/" + toPosix(f)));

function norm(href) {
  let h = href.trim();
  if (h.startsWith(ORIGIN)) h = h.slice(ORIGIN.length) || "/";
  h = h.split("#")[0].split("?")[0];
  return h;
}

const incoming = new Map();
for (const u of pageUrls) incoming.set(u, 0);
const broken = [];
const linkRe = /href\s*=\s*"([^"]+)"/g;

for (const f of htmlFiles) {
  const fromUrl = fileToUrl(f);
  const html = readFileSync(f, "utf8");
  const seen = new Set();
  let m;
  while ((m = linkRe.exec(html))) {
    let h = norm(m[1]);
    if (!h.startsWith("/") || h.startsWith("//")) continue;
    const hasExt = /\.[a-z0-9]{2,12}$/i.test(h);
    let valid;
    if (hasExt) {
      valid = fileUrls.has(h);
    } else {
      const withSlash = h.endsWith("/") ? h : h + "/";
      valid = pageUrls.has(withSlash) || pageUrls.has(h);
      h = withSlash;
    }
    if (!valid) { broken.push({ from: fromUrl, href: h }); continue; }
    if (!hasExt && pageUrls.has(h) && h !== fromUrl && !seen.has(h)) {
      incoming.set(h, (incoming.get(h) || 0) + 1);
      seen.add(h);
    }
  }
}

const orphans = [...incoming.entries()]
  .filter(([u, c]) => c === 0 && u !== "/" && u !== "/404")
  .map(([u]) => u)
  .sort();

const brokenUniq = [...new Map(broken.map((b) => [b.from + " -> " + b.href, b])).values()];

console.log("=== TOTAL PAGES:", pageUrls.size, "===");
console.log("\n=== BROKEN INTERNAL LINKS:", brokenUniq.length, "===");
const byHref = {};
for (const b of brokenUniq) (byHref[b.href] ||= []).push(b.from);
for (const [href, froms] of Object.entries(byHref).sort()) {
  console.log(`  X ${href}  (de la ${froms.length}: ${froms.slice(0, 4).join(", ")}${froms.length > 4 ? " ..." : ""})`);
}
console.log("\n=== ORPHAN PAGES (0 inbound internal links):", orphans.length, "===");
for (const o of orphans) console.log("  ! " + o);
