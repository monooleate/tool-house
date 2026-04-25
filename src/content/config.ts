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
    toolSlug: z.string().optional(),
    category: z.enum([
      "calculator", "geometrie", "conversii",
      "finante", "sanatate", "timp",
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
