// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
// pnpm add @astrojs/sitemap – ha külső sitemapet is akarsz (opcionális,
// a src/pages/sitemap.xml.ts önmagában is elég)
// import sitemap from "@astrojs/sitemap";

// PUBLIC_SITE_LANG env változó határozza meg a nyelvet
// Alapértelmezett: "hu"
const SITE_LANG = process.env.PUBLIC_SITE_LANG ?? "hu";
const SITE_URL = process.env.PUBLIC_SITE_URL ?? "https://konvertalo.hu";

export default defineConfig({
  // Static Site Generation (SSG) – minden oldal pre-rendelt HTML
  output: "static",

  // Nyelv-specifikus site URL
  site: SITE_URL,

  integrations: [
    svelte(),
    // sitemap(),  // opcionális – ha az @astrojs/sitemap-et akarod
  ],

  // View Transitions – SPA-szerű navigáció, scroll kezeléssel
  // Egyedi oldalakra is alkalmazható: import { ViewTransitions } from "astro:transitions"
  // viewTransitions: true,  // Astro 4.x globálisan

  // Prefetch – hover-re előtölti a belső linkeket (gyorsabb navigáció)
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",  // hover esetén prefetch-el
  },

  build: {
    // CSS inline-olás – megszünteti a render-blocking CSS kéréseket
    inlineStylesheets: "always",
    // Assets prefix ha CDN-t használsz:
    // assetsPrefix: "https://cdn.konvertalo.hu",
  },

  vite: {
    // Worker bundling – OffscreenCanvas Workers
    worker: {
      format: "es",
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            svelte: ["svelte"],
          },
        },
      },
    },
    optimizeDeps: {
      include: ["pdf-lib", "pdfjs-dist", "js-yaml", "heic2any", "color-thief-ts"],
      exclude: ["jszip", "@jsquash/avif", "@jsquash/webp", "gifenc", "gifuct-js"],
    },
    // WASM fájlok kezelése
    assetsInclude: ["**/*.wasm"],
  },
});
