// ============================================================
// house-ads.ts — a saját (house-ad) hirdetési réteg SSOT-olvasója.
// A src/config/house-ads.json-t olvassa, hiányzó/rossz mezőre DEFAULTTAL,
// így a JSON sosem tudja "elrontani" a rendert. A build-time nyelv
// (CURRENT_LANG) szerint az adott site (hu/ro) blokkját oldja fel — külön
// beállítás (placements) ÉS külön bannerek (creatives) nyelvenként.
// Mintája: mathSeo utils/erdeireka.ts + operex src/lib/banners.mjs.
// ============================================================
import raw from "../config/house-ads.json";
import { CURRENT_LANG, CURRENT_CONFIG } from "../i18n/index.ts";
import type { SupportedLang } from "../i18n/index.ts";

// ─── FŐKAPCSOLÓ (env) ───────────────────────────────────────
// A saját hirdetési réteg alapból KI van kapcsolva. Csak akkor jelenik meg
// (a JSON `enabled`-től függetlenül is ez a feltétel), ha a build-környezetben
// PUBLIC_HOUSE_ADS_ENABLED === "true". Ha az env hiányzik → false → semmi nem renderel.
// Oldalanként (HU/RO) külön deploy-env → oldalanként külön be/ki. Ez FÜGGETLEN a
// Google AdSense-től (azt a PUBLIC_ADSENSE_CLIENT_ID vezérli).
const ENV_ENABLED = import.meta.env.PUBLIC_HOUSE_ADS_ENABLED === "true";

// ─── Típusok ────────────────────────────────────────────────
export type HouseAdFormat = "leaderboard" | "rectangle";

export interface HouseAdPlacement {
  desktop: boolean;
  mobile: boolean;
  format: HouseAdFormat;
  showDelayMs?: number;   // csak anchor
  minPageviews?: number;  // csak interstitial
  delayMs?: number;       // csak interstitial
}

export type PlacementKey =
  | "articleTop"
  | "articleMiddle"
  | "articleBottom"
  | "anchorTop"
  | "anchorBottom"
  | "interstitial";

export interface HouseAdCreative {
  id: string;
  weight: number;
  href: string;
  headline: string;
  subline?: string;
  cta?: string;
  img?: string;
  imgMobile?: string;
  imgWidth?: number;
  imgHeight?: number;
  bgFrom: string;
  bgTo: string;
  accent: string;
  textOn: string;
}

export interface HouseAdConfig {
  enabled: boolean;
  placements: Record<PlacementKey, HouseAdPlacement>;
  creatives: HouseAdCreative[];
}

// ─── Defaultok (site-független) ─────────────────────────────
const PLACEMENT_DEFAULTS: Record<PlacementKey, HouseAdPlacement> = {
  articleTop:    { desktop: true,  mobile: true,  format: "leaderboard" },
  articleMiddle: { desktop: true,  mobile: true,  format: "leaderboard" },
  articleBottom: { desktop: true,  mobile: true,  format: "rectangle" },
  anchorTop:     { desktop: false, mobile: false, format: "leaderboard", showDelayMs: 1200 },
  anchorBottom:  { desktop: false, mobile: false, format: "leaderboard", showDelayMs: 1200 },
  interstitial:  { desktop: false, mobile: false, format: "rectangle", minPageviews: 2, delayMs: 4000 },
};

const FORMATS = new Set<HouseAdFormat>(["leaderboard", "rectangle"]);

// ─── Validátorok ────────────────────────────────────────────
const bool = (v: unknown, d: boolean) => (typeof v === "boolean" ? v : d);
const num = (v: unknown, d: number) => (typeof v === "number" && isFinite(v) ? v : d);
const str = (v: unknown, d: string) => (typeof v === "string" && v.length > 0 ? v : d);
const fmt = (v: unknown, d: HouseAdFormat) =>
  typeof v === "string" && FORMATS.has(v as HouseAdFormat) ? (v as HouseAdFormat) : d;

// Csak http(s) linket engedünk (biztonság: nincs javascript:/data: cél).
function safeHref(v: unknown, fallback: string): string {
  if (typeof v !== "string") return fallback;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:" ? v : fallback;
  } catch {
    return fallback;
  }
}

function resolvePlacement(key: PlacementKey, src: any): HouseAdPlacement {
  const def = PLACEMENT_DEFAULTS[key];
  const p = src && typeof src === "object" ? src : {};
  const out: HouseAdPlacement = {
    desktop: bool(p.desktop, def.desktop),
    mobile: bool(p.mobile, def.mobile),
    format: fmt(p.format, def.format),
  };
  if ("showDelayMs" in def) out.showDelayMs = num(p.showDelayMs, def.showDelayMs!);
  if ("minPageviews" in def) out.minPageviews = num(p.minPageviews, def.minPageviews!);
  if ("delayMs" in def) out.delayMs = num(p.delayMs, def.delayMs!);
  return out;
}

function resolveCreative(src: any, i: number): HouseAdCreative | null {
  if (!src || typeof src !== "object") return null;
  const headline = str(src.headline, "");
  const href = safeHref(src.href, "");
  // headline VAGY kép + érvényes href nélkül a tétel használhatatlan → kihagyjuk.
  if (!href || (!headline && !src.img)) return null;
  const c: HouseAdCreative = {
    id: str(src.id, `creative-${i}`),
    weight: Math.max(0, num(src.weight, 1)),
    href,
    headline,
    subline: typeof src.subline === "string" ? src.subline : undefined,
    cta: str(src.cta, "Tovább"),
    bgFrom: str(src.bgFrom, "#007a5c"),
    bgTo: str(src.bgTo, "#005e45"),
    accent: str(src.accent, "#ffffff"),
    textOn: str(src.textOn, "#eafff8"),
  };
  if (typeof src.img === "string" && src.img.length > 0) {
    c.img = src.img;
    if (typeof src.imgMobile === "string") c.imgMobile = src.imgMobile;
    c.imgWidth = num(src.imgWidth, 0) || undefined;
    c.imgHeight = num(src.imgHeight, 0) || undefined;
  }
  return c;
}

// ─── A feloldott config az AKTUÁLIS site-hoz ────────────────
export function getHouseAdConfig(lang: SupportedLang = CURRENT_LANG): HouseAdConfig {
  const site = (raw as any)?.[lang] && typeof (raw as any)[lang] === "object" ? (raw as any)[lang] : {};
  const placementsSrc = site.placements && typeof site.placements === "object" ? site.placements : {};
  const placements = {} as Record<PlacementKey, HouseAdPlacement>;
  for (const key of Object.keys(PLACEMENT_DEFAULTS) as PlacementKey[]) {
    placements[key] = resolvePlacement(key, placementsSrc[key]);
  }
  const creatives = Array.isArray(site.creatives)
    ? site.creatives.map(resolveCreative).filter((c: HouseAdCreative | null): c is HouseAdCreative => c !== null)
    : [];

  // A réteg csak akkor aktív, ha (1) a FŐKAPCSOLÓ env be van kapcsolva,
  // (2) az adott site JSON-ban engedélyezett, és (3) van legalább 1 érvényes kreatív.
  const enabled = ENV_ENABLED && bool(site.enabled, false) && creatives.length > 0;

  return { enabled, placements, creatives };
}

// A kliens-motornak inline átadott, minimalizált config (a docs `_`-kulcsok nélkül).
// UTM-forrás a site-hoz (utm_source=konvertalo.hu | instrumenteonline.ro).
export function getHouseAdEngineData() {
  const cfg = getHouseAdConfig();
  const host = (() => {
    try {
      return new URL(CURRENT_CONFIG.siteUrl).hostname;
    } catch {
      return CURRENT_CONFIG.siteName;
    }
  })();
  return { cfg, utmSource: host };
}
