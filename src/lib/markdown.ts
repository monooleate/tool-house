// ============================================================
// markdown.ts – Megosztott Markdown → HTML parser
// CommonMark + GFM részhalmaz (táblázatok, task list, kódblokk)
// Biztonságos: minden szövegcsomópont HTML-escape-elve renderelődik.
// ============================================================

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

// Privát Unicode (PUA) markerek — felhasználói szövegben nem fordulnak elő
const STASH_OPEN = "";
const STASH_CLOSE = "";
const STASH_RE = new RegExp(STASH_OPEN + "(\\d+)" + STASH_CLOSE, "g");

function renderInline(s: string): string {
  const codeStash: string[] = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => {
    codeStash.push(`<code>${escapeHtml(c)}</code>`);
    return STASH_OPEN + (codeStash.length - 1) + STASH_CLOSE;
  });
  s = escapeHtml(s);
  // Csak biztonságos URL sémák engedélyezettek (javascript:, data:, vbscript: blokkolva)
  const isSafeUrl = (u: string): boolean => {
    const trimmed = u.trim().toLowerCase();
    if (/^(javascript|vbscript|data|file):/i.test(trimmed)) return false;
    return true;
  };
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (_, alt, src, title) => {
    if (!isSafeUrl(src)) return "";
    const t = title ? ` title="${title}"` : "";
    return `<img src="${src}" alt="${alt}" loading="lazy"${t} />`;
  });
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, url) => {
    if (!isSafeUrl(url)) return text;
    const isExternal = /^https?:\/\//i.test(url);
    const ext = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${url}"${ext}>${text}</a>`;
  });
  s = s.replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>");
  s = s.replace(/___([^_]+)___/g, "<strong><em>$1</em></strong>");
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  s = s.replace(/(?<![\w*])\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>");
  s = s.replace(/(?<![\w_])_([^_\n]+)_(?!_)/g, "<em>$1</em>");
  s = s.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  s = s.replace(STASH_RE, (_, i) => codeStash[Number(i)] || "");
  return s;
}

export function mdToHtml(md: string): string {
  if (!md) return "";
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;

  type ListFrame = { type: "ul" | "ol"; indent: number };
  const listStack: ListFrame[] = [];
  const closeAllLists = () => {
    while (listStack.length) {
      const f = listStack.pop()!;
      out.push(`</${f.type}>`);
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    const fenceMatch = /^(\s*)(```|~~~)\s*([\w+-]*)\s*$/.exec(line);
    if (fenceMatch) {
      closeAllLists();
      const fence = fenceMatch[2];
      const lang = fenceMatch[3];
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !new RegExp(`^\\s*${fence}\\s*$`).test(lines[i])) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      const langClass = lang ? ` class="language-${escapeHtml(lang)}"` : "";
      const langBadge = lang ? `<span class="md-codelang">${escapeHtml(lang)}</span>` : "";
      out.push(`<pre>${langBadge}<code${langClass}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    if (/^\s*$/.test(line)) {
      closeAllLists();
      i++;
      continue;
    }

    if (/^\s{0,3}(?:-\s*){3,}$|^\s{0,3}(?:\*\s*){3,}$|^\s{0,3}(?:_\s*){3,}$/.test(line)) {
      closeAllLists();
      out.push("<hr />");
      i++;
      continue;
    }

    const h = /^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (h) {
      closeAllLists();
      const level = h[1].length;
      const text = h[2];
      const id = slugify(text);
      out.push(`<h${level} id="${id}">${renderInline(text)}</h${level}>`);
      i++;
      continue;
    }

    if (/^\s{0,3}>\s?/.test(line)) {
      closeAllLists();
      const buf: string[] = [];
      while (i < lines.length && /^\s{0,3}>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s{0,3}>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${mdToHtml(buf.join("\n"))}</blockquote>`);
      continue;
    }

    if (
      i + 1 < lines.length &&
      /^\s*\|?.*\|.*\|?\s*$/.test(line) &&
      /^\s*\|?\s*:?-{3,}:?(\s*\|\s*:?-{3,}:?)+\s*\|?\s*$/.test(lines[i + 1])
    ) {
      closeAllLists();
      const splitRow = (r: string) =>
        r
          .replace(/^\s*\|/, "")
          .replace(/\|\s*$/, "")
          .split("|")
          .map(c => c.trim());
      const header = splitRow(line);
      const aligns = splitRow(lines[i + 1]).map(c => {
        const left = c.startsWith(":");
        const right = c.endsWith(":");
        if (left && right) return "center";
        if (right) return "right";
        if (left) return "left";
        return "";
      });
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && /^\s*\|?.*\|.*\|?\s*$/.test(lines[i]) && lines[i].trim() !== "") {
        rows.push(splitRow(lines[i]));
        i++;
      }
      const ths = header
        .map((h, j) => {
          const a = aligns[j] ? ` style="text-align:${aligns[j]}"` : "";
          return `<th${a}>${renderInline(h)}</th>`;
        })
        .join("");
      const trs = rows
        .map(
          r =>
            "<tr>" +
            r
              .map((c, j) => {
                const a = aligns[j] ? ` style="text-align:${aligns[j]}"` : "";
                return `<td${a}>${renderInline(c)}</td>`;
              })
              .join("") +
            "</tr>"
        )
        .join("");
      out.push(`<div class="md-tablewrap"><table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`);
      continue;
    }

    const li = /^(\s*)([-*+]|\d+\.)\s+(.*)$/.exec(line);
    if (li) {
      const indent = li[1].length;
      const marker = li[2];
      const content = li[3];
      const type: "ul" | "ol" = /^\d+\./.test(marker) ? "ol" : "ul";

      while (listStack.length && listStack[listStack.length - 1].indent > indent) {
        const f = listStack.pop()!;
        out.push(`</${f.type}>`);
      }
      if (
        !listStack.length ||
        listStack[listStack.length - 1].indent < indent ||
        listStack[listStack.length - 1].type !== type
      ) {
        if (listStack.length && listStack[listStack.length - 1].indent === indent) {
          const f = listStack.pop()!;
          out.push(`</${f.type}>`);
        }
        out.push(`<${type}>`);
        listStack.push({ type, indent });
      }

      const task = /^\[([ xX])\]\s+(.*)$/.exec(content);
      if (task) {
        const checked = task[1].toLowerCase() === "x";
        out.push(
          `<li class="md-task"><input type="checkbox" disabled${checked ? " checked" : ""} /> ${renderInline(task[2])}</li>`
        );
      } else {
        out.push(`<li>${renderInline(content)}</li>`);
      }
      i++;
      continue;
    }

    closeAllLists();
    const para: string[] = [line];
    i++;
    while (
      i < lines.length &&
      !/^\s*$/.test(lines[i]) &&
      !/^\s{0,3}(#{1,6})\s+/.test(lines[i]) &&
      !/^\s{0,3}>\s?/.test(lines[i]) &&
      !/^(\s*)([-*+]|\d+\.)\s+/.test(lines[i]) &&
      !/^(\s*)(```|~~~)/.test(lines[i]) &&
      !/^\s{0,3}(?:-\s*){3,}$|^\s{0,3}(?:\*\s*){3,}$|^\s{0,3}(?:_\s*){3,}$/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    const joined = para
      .map((l, idx) =>
        idx < para.length - 1 && /( {2,}|\\)$/.test(l) ? l.replace(/( {2,}|\\)$/, "") + "<br />" : l
      )
      .join("\n");
    out.push(`<p>${renderInline(joined)}</p>`);
  }

  closeAllLists();
  return out.join("\n");
}
