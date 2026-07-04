// ============================================================
// Astro Content Collections konfiguráció (Astro 5 Content Layer API)
// ─── math/ro/* : hosszú RO longform tartalmak matematikai témákban
// ============================================================
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const schemaObjectSchema = z.record(z.any()).optional();

const mathCollection = defineCollection({
  // Astro 5: új Content Layer API
  loader: glob({ pattern: "**/*.md", base: "./src/content/math" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Ha a tartalom egy létező tool oldalának long-form kiegészítője. */
    toolSlug: z.string().optional(),
    /** Ha a tartalom egy „instant-answer" programmatic SEO oldal (hidden, nincs a navigációban). */
    instantSlug: z.string().optional(),
    /** Conversii sub-kategória (lungime/masa/volum/suprafata/temperatura/densitate). */
    subcategory: z.enum([
      "lungime", "masa", "volum",
      "suprafata", "temperatura", "densitate", "viteza", "date",
    ]).optional(),
    category: z.enum([
      "calculator", "geometrie", "conversii",
      "finante", "sanatate", "timp",
      "fejleszto", "szinek", "seo", "szoveg",
    ]),
    published_at: z.string(),
    refreshed_at: z.string().optional(),
    heroImage: z.string().optional(),
    articleSchema: schemaObjectSchema,
    softwareSchema: schemaObjectSchema,
    faqPageSchema: schemaObjectSchema,
    separatePage: z.boolean().default(false),
  }),
});

export const collections = {
  math: mathCollection,
};
