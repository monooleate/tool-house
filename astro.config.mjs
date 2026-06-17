// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { loadEnv } from "vite";
// pnpm add @astrojs/sitemap – ha külső sitemapet is akarsz (opcionális,
// a src/pages/sitemap.xml.ts önmagában is elég)
// import sitemap from "@astrojs/sitemap";

// PUBLIC_* env-ek feloldása robusztusan: CI-ban a shell env (process.env) hordozza
// (deploy.yml + cross-env), lokálisan viszont .env-ből jöhet. A process.env NEM
// tölti be automatikusan a .env-et a config szintjén, ezért loadEnv-vel is beolvassuk.
// Így a sitemap (Astro.site ← site:) soha nem esik vissza csendben a rossz domainre.
// (Lásd: src/pages/sitemap.xml.ts – ott szintén az Astro.site adja a base URL-t.)
const ENV = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "PUBLIC_");
const SITE_LANG = process.env.PUBLIC_SITE_LANG ?? ENV.PUBLIC_SITE_LANG ?? "hu";
const SITE_URL = process.env.PUBLIC_SITE_URL ?? ENV.PUBLIC_SITE_URL ?? "https://konvertalo.hu";

export default defineConfig({
  // Static Site Generation (SSG) – minden oldal pre-rendelt HTML
  output: "static",

  // Trailing slash: mindig legyen / a végén – Google ne kezelje duplikátumként
  trailingSlash: "always",

  // Nyelv-specifikus site URL
  site: SITE_URL,

  integrations: [
    svelte(),
    // sitemap(),  // opcionális – ha az @astrojs/sitemap-et akarod
  ],

  // Markdown pipeline: KaTeX képletek LaTeX-szintaxissal ($…$, $$…$$)
  // a math content collection-ökben. SSR render, nincs client JS (a KaTeX
  // CSS a BaseLayout-ban, conditional, csak math oldalakon).
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { output: "html", strict: "ignore", throwOnError: false }]],
  },

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
