import { c as getCategoryInfo, d as getAllTools } from '../../../chunks/tool-registry_BYgjEAb5.mjs';
export { r as renderers } from '../../../chunks/_@astro-renderers_BTphoX3x.mjs';

const getStaticPaths = () => {
  return getAllTools().map((tool) => ({
    params: { category: tool.category, slug: tool.slug },
    props: { tool }
  }));
};
let spaceMono700 = null;
async function getFont() {
  if (spaceMono700) return spaceMono700;
  const res = await fetch(
    "https://fonts.gstatic.com/s/spacemono/v17/i7dMIFZifjKcF5UAWdDRaPpZYFI.ttf"
  );
  spaceMono700 = await res.arrayBuffer();
  return spaceMono700;
}
const CAT_COLORS = {
  kep: "#3b82f6",
  pdf: "#ef4444",
  adat: "#8b5cf6",
  szoveg: "#f59e0b",
  fejleszto: "#06b6d4",
  markdown: "#10b981",
  html: "#f97316",
  excel: "#22c55e",
  fajl: "#64748b",
  seo: "#ec4899"
};
function h(type, props, ...children) {
  return { type, props: { ...props, children: children.length === 1 ? children[0] : children } };
}
const GET = async ({ props }) => {
  try {
    const { tool } = props;
    const cat = getCategoryInfo(tool.category);
    const catColor = CAT_COLORS[tool.category] ?? "#00c896";
    const fontData = await getFont();
    const { default: satori } = await import('satori');
    const { Resvg } = await import('@resvg/resvg-js');
    const desc = tool.description.length > 110 ? tool.description.slice(0, 107) + "…" : tool.description;
    const element = h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "#0f0f0e",
          fontFamily: "'Space Mono'",
          position: "relative"
        }
      },
      // Bal felső sarok – sáv
      h("div", { style: {
        display: "flex",
        position: "absolute",
        left: "0",
        top: "0",
        bottom: "0",
        width: "6px",
        background: catColor
      } }),
      // Fejléc – kategória + státusz badge
      h(
        "div",
        { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        } },
        h(
          "div",
          { style: {
            display: "flex",
            alignItems: "center",
            gap: "14px"
          } },
          h("span", { style: { fontSize: "44px", lineHeight: "1" } }, cat.icon),
          h("span", { style: {
            fontSize: "18px",
            color: catColor,
            fontWeight: "700",
            letterSpacing: "0.1em",
            textTransform: "uppercase"
          } }, cat.label)
        ),
        tool.status === "active" ? h("div", { style: {
          fontSize: "14px",
          color: "#00c896",
          background: "#00c89618",
          border: "1px solid #00c89650",
          borderRadius: "999px",
          padding: "6px 16px",
          fontWeight: "700",
          letterSpacing: "0.06em",
          textTransform: "uppercase"
        } }, "✓ Aktív") : h("div", { style: {
          fontSize: "14px",
          color: "#9e9e8e",
          background: "#2a2a2618",
          border: "1px solid #2a2a26",
          borderRadius: "999px",
          padding: "6px 16px"
        } }, "Hamarosan")
      ),
      // Cím
      h("div", { style: {
        display: "flex",
        fontSize: tool.h1.length > 35 ? "46px" : "58px",
        fontWeight: "700",
        color: "#f0f0e8",
        lineHeight: "1.1",
        letterSpacing: "-0.02em",
        maxWidth: "900px"
      } }, tool.h1),
      // Leírás
      h("div", { style: {
        display: "flex",
        fontSize: "22px",
        color: "#9e9e8e",
        lineHeight: "1.5",
        maxWidth: "820px"
      } }, desc),
      // Lábléc – brand + trust badge-ek
      h(
        "div",
        { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        } },
        h("span", { style: {
          fontSize: "24px",
          fontWeight: "700",
          color: "#00c896"
        } }, "⚡ Konvertalo.hu"),
        h(
          "div",
          { style: { display: "flex", gap: "12px" } },
          ...["🔒 Privát", "⚡ Azonnali", "🆓 Ingyenes"].map(
            (label) => h("span", { style: {
              fontSize: "14px",
              color: "#6b6b5e",
              background: "#1a1a18",
              border: "1px solid #2a2a26",
              borderRadius: "999px",
              padding: "4px 12px"
            } }, label)
          )
        )
      )
    );
    const svg = await satori(element, {
      width: 1200,
      height: 630,
      fonts: [{
        name: "Space Mono",
        data: fontData,
        weight: 700,
        style: "normal"
      }]
    });
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: 1200 }
    });
    const png = resvg.render().asPng();
    return new Response(png, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=2592000, immutable"
      }
    });
  } catch (err) {
    const msg = err?.stack || err?.message || String(err);
    console.error("[OG] Generálási hiba:", msg);
    return new Response(`OG image generation failed:
${msg}`, { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  getStaticPaths
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
