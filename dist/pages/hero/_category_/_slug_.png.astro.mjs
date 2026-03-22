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
    const desc = tool.description.length > 100 ? tool.description.slice(0, 97) + "..." : tool.description;
    const features = [
      "Szervermentes feldolgozas",
      "Azonnali eredmeny",
      "100% privat",
      "Ingyenes"
    ];
    const element = h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#141413",
          fontFamily: "'Space Mono'",
          position: "relative",
          overflow: "hidden"
        }
      },
      // Felső szín csík
      h("div", { style: {
        display: "flex",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        height: "4px",
        background: `linear-gradient(90deg, ${catColor}, #00c896)`
      } }),
      // Fő tartalom
      h(
        "div",
        { style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: "1",
          padding: "48px 60px",
          gap: "28px"
        } },
        // Kategória badge
        h(
          "div",
          { style: {
            display: "flex",
            alignItems: "center",
            gap: "12px"
          } },
          h("span", { style: { fontSize: "36px", lineHeight: "1" } }, cat.icon),
          h("span", { style: {
            fontSize: "15px",
            color: catColor,
            fontWeight: "700",
            letterSpacing: "0.12em",
            textTransform: "uppercase"
          } }, cat.label)
        ),
        // Tool cím
        h("div", { style: {
          display: "flex",
          fontSize: tool.h1.length > 30 ? "42px" : "50px",
          fontWeight: "700",
          color: "#f0f0e8",
          lineHeight: "1.15",
          letterSpacing: "-0.02em",
          maxWidth: "850px"
        } }, tool.h1),
        // Leírás
        h("div", { style: {
          display: "flex",
          fontSize: "18px",
          color: "#9e9e8e",
          lineHeight: "1.5",
          maxWidth: "750px"
        } }, desc),
        // Feature grid
        h(
          "div",
          { style: {
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "8px"
          } },
          ...features.map(
            (f) => h(
              "div",
              { style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: "#1e1e1c",
                border: "1px solid #2a2a26",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#b0b0a0"
              } },
              h("span", { style: { color: "#00c896", fontSize: "14px" } }, "✓"),
              h("span", {}, f)
            )
          )
        )
      ),
      // Lábléc
      h(
        "div",
        { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px 36px"
        } },
        h("span", { style: {
          fontSize: "20px",
          fontWeight: "700",
          color: "#00c896"
        } }, "⚡ Konvertalo.hu"),
        h("span", { style: {
          fontSize: "13px",
          color: "#6b6b5e"
        } }, "konvertalo.hu")
      )
    );
    const svg = await satori(element, {
      width: 1200,
      height: 675,
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
    console.error("[HERO] Generálási hiba:", msg);
    return new Response(`Hero image generation failed:
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
