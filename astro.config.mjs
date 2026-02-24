// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
// pnpm add @astrojs/sitemap – ha külső sitemapet is akarsz (opcionális,
// a src/pages/sitemap.xml.ts önmagában is elég)
// import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Static Site Generation (SSG) – minden oldal pre-rendelt HTML
  output: "static",

  // Állítsd be a végleges domain-t!
  site: "https://konvertalo.hu",

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
    // Inlining kisebb CSS assets a HTTP kérések csökkentéséhez
    inlineStylesheets: "auto",
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
      include: ["pdf-lib", "pdfjs-dist", "js-yaml"],
      exclude: ["jszip"],
    },
  },
});
