// src/pages/og/probleme-matematica/[slug].png.ts
// ============================================================
// OG-kép generálás a „Probleme de matematică pe clase" oldalakhoz
// Satori + Resvg, 1200×630 PNG. RO-only (getStaticPaths [] HU-n).
//   • slug = "index"    → hub OG  (/og/probleme-matematica/index.png)
//   • slug = "clasa-8"  → osztály OG (/og/probleme-matematica/clasa-8.png)
// Design: text-alapú (nincs emoji-függőség), RO branding.
// ============================================================
import type { APIRoute, GetStaticPaths } from "astro";
import { HUB, GRADES } from "../../../lib/content/ro/probleme-matematica.ts";
import { CURRENT_LANG } from "../../../i18n/index.ts";

const EDU_COLOR = "#4f46e5"; // indigo – educational
const BRAND = "InstrumenteOnline.ro";

export const getStaticPaths: GetStaticPaths = () => {
  if (CURRENT_LANG !== "ro") return [];
  return [
    { params: { slug: "index" }, props: { kind: "hub" as const } },
    ...GRADES.map((g) => ({
      params: { slug: g.slug },
      props: { kind: "grade" as const, grade: g },
    })),
  ];
};

// ─── Font cache ──────────────────────────────────────────────
let spaceMono700: ArrayBuffer | null = null;
async function getFont(): Promise<ArrayBuffer> {
  if (spaceMono700) return spaceMono700;
  const res = await fetch(
    "https://fonts.gstatic.com/s/spacemono/v17/i7dMIFZifjKcF5UAWdDRaPpZYFI.ttf"
  );
  spaceMono700 = await res.arrayBuffer();
  return spaceMono700;
}

// ─── JSX-szerű builder (Satori) ──────────────────────────────
function h(type: string, props: Record<string, unknown>, ...children: unknown[]): Record<string, unknown> {
  return { type, props: { ...props, children: children.length === 1 ? children[0] : children } };
}

function pill(label: string, color: string): Record<string, unknown> {
  return h("span", {
    style: {
      fontSize: "16px", color, background: `${color}18`,
      border: `1px solid ${color}50`, borderRadius: "999px",
      padding: "6px 18px", fontWeight: "700", letterSpacing: "0.06em",
      textTransform: "uppercase",
    },
  }, label);
}

export const GET: APIRoute = async ({ props }) => {
  try {
    const p = props as
      | { kind: "hub" }
      | { kind: "grade"; grade: (typeof GRADES)[number] };
    const fontData = await getFont();

    const { default: satori } = await import("satori");
    const { Resvg } = await import("@resvg/resvg-js");

    let eyebrow: string;
    let title: string;
    let subtitle: string;
    let badge: string | null;

    if (p.kind === "hub") {
      eyebrow = "PROBLEME DE MATEMATICĂ";
      title = "Probleme rezolvate pe clase";
      const total = GRADES.reduce((s, g) => s + g.exercises.length, 0);
      subtitle = `${total} de probleme rezolvate pas cu pas · clasele V–XII`;
      badge = "GRATUIT";
    } else {
      eyebrow = `PROBLEME DE MATEMATICĂ · ${p.grade.cycle.toUpperCase()}`;
      title = p.grade.label;
      subtitle = `${p.grade.exercises.length} probleme rezolvate pas cu pas`;
      badge = p.grade.examBadge; // Evaluarea Națională / Bacalaureat / null
    }

    const element = h("div", {
      style: {
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "space-between", padding: "56px 64px",
        background: "#0f0f0e", fontFamily: "'Space Mono'", position: "relative",
      },
    },
      // Bal színsáv
      h("div", { style: { display: "flex", position: "absolute", left: "0", top: "0", bottom: "0", width: "8px", background: EDU_COLOR } }),

      // Fejléc: eyebrow + badge
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
        h("span", { style: { fontSize: "20px", color: EDU_COLOR, fontWeight: "700", letterSpacing: "0.08em" } }, eyebrow),
        badge ? pill(badge, "#00c896") : h("span", {}, ""),
      ),

      // Cím
      h("div", { style: {
        display: "flex", fontSize: title.length > 24 ? "62px" : "78px",
        fontWeight: "700", color: "#f0f0e8", lineHeight: "1.08",
        letterSpacing: "-0.02em", maxWidth: "1000px",
      } }, title),

      // Alcím
      h("div", { style: { display: "flex", fontSize: "26px", color: "#9e9e8e", lineHeight: "1.45", maxWidth: "900px" } }, subtitle),

      // Lábléc: brand + trust
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
        h("span", { style: { fontSize: "26px", fontWeight: "700", color: "#00c896" } }, BRAND),
        h("div", { style: { display: "flex", gap: "12px" } },
          ...["Gratuit", "Pas cu pas", "Programa RO"].map((label) =>
            h("span", { style: {
              fontSize: "16px", color: "#6b6b5e", background: "#1a1a18",
              border: "1px solid #2a2a26", borderRadius: "999px", padding: "5px 14px",
            } }, label)
          ),
        ),
      ),
    );

    const svg = await satori(element, {
      width: 1200, height: 630,
      fonts: [{ name: "Space Mono", data: fontData, weight: 700, style: "normal" }],
    });

    const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
    const png = resvg.render().asPng();

    return new Response(png, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=2592000, immutable",
      },
    });
  } catch (err: any) {
    const msg = err?.stack || err?.message || String(err);
    console.error("[OG probleme] Generálási hiba:", msg);
    return new Response(`OG image generation failed:\n${msg}`, { status: 500 });
  }
};
