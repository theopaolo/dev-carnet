import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const collections = {
  cours: defineCollection({
    // Un cours = un dossier avec index.md (page d'accueil du cours) et des chapitres.
    // ids : "docker", "documentation", "documentation/01-pourquoi-documenter"
    loader: glob({
      pattern: "**/[^_]*.md",
      base: "./src/cours",
      generateId: ({ entry }) => entry.replace(/\.md$/, "").replace(/\/index$/, ""),
    }),
    schema: z.object({
      title: z.string(),
      publishedAt: z.string().date(),
      updatedAt: z.string().date(),
      // Ordre dans la barre latérale
      order: z.number().default(0),
      // Page réservée à l'enseignant : ni construite, ni listée
      hidden: z.boolean().default(false),
    }).refine((page) => page.updatedAt >= page.publishedAt, {
      message: "La mise à jour ne peut pas précéder la publication.",
      path: ["updatedAt"],
    }),
  }),
};
