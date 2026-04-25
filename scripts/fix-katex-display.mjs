// Convert single-line `$$...$$` to multi-line for remark-math v6 display mode.
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

let total = 0;
for (const file of walk(ROOT)) {
  let s = readFileSync(file, "utf-8");
  // Match: ^$$<inner>$$$ on a single line — convert to multi-line block
  const re = /^\$\$([^\n]+?)\$\$$/gm;
  let count = 0;
  s = s.replace(re, (_m, inner) => {
    count++;
    return `$$\n${inner.trim()}\n$$`;
  });
  if (count > 0) {
    writeFileSync(file, s, "utf-8");
    console.log(`${file}: ${count} formulas converted`);
    total += count;
  }
}
console.log(`Total: ${total} display formulas converted`);
