import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Una colección por tipo de contenido, con entradas por idioma bajo
// src/content/stories/<lang>/<slug>.md — filtra por `id.startsWith('en/')`
// o `'es/'` en las páginas que la consumen.
const stories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/stories" }),
  schema: ({ image }) =>
    z.object({
      tag: z.string(),
      title: z.string(),
      excerpt: z.string(),
      date: z.date(),
      featured: z.boolean().default(false),
      image: image(),
      imageAlt: z.string(),
    }),
});

export const collections = { stories };
