import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { readdirSync, readFileSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { privateCourses } from "./lib/private-courses.mjs";

// Un cours = un dossier avec index.md (page d'accueil du cours) et des chapitres.
// ids : "docker", "documentation", "documentation/01-pourquoi-documenter"
const pages = glob({
  pattern: [
    "**/[^_]*.md",
    ...(import.meta.env.DEV && import.meta.env.SHOW_PRIVATE_COURSES === "true"
      ? []
      : privateCourses.map((id) => `!${id}/**`)),
  ],
  base: "./src/cours",
  generateId: ({ entry }) => entry.replace(/\.md$/, "").replace(/\/index$/, ""),
});

// Une ligne « <!-- include stories-backlog/_user-stories.md --> » est remplacée par ce fichier
// (chemin depuis src/cours) avant le rendu. Les fichiers en _ ne sont pas des pages.
const root = join(process.cwd(), "src/cours");
const tag = (file: string) => `<!-- include ${file} -->`;
const include = (md: string) =>
  md.replace(/^<!-- include (\S+) -->$/gm, (_, file) =>
    readFileSync(join(root, file), "utf8").trim(),
  );

export const collections = {
  cours: defineCollection({
    loader: {
      ...pages,
      load: (context) => {
        // En dev, modifier un fichier inclus recharge les pages qui l'incluent
        context.watcher?.on("change", (changed) => {
          if (!changed.startsWith(root) || !basename(changed).startsWith("_")) return;
          for (const page of readdirSync(root, { recursive: true, encoding: "utf8" })) {
            const path = join(root, page);
            if (
              page.endsWith(".md") &&
              readFileSync(path, "utf8").includes(tag(relative(root, changed)))
            )
              context.watcher?.emit("change", path);
          }
        });
        return pages.load({
          ...context,
          // Rendu, recherche (c.body) et cache portent sur le Markdown avec ses inclusions
          generateDigest: (data) =>
            context.generateDigest(typeof data === "string" ? include(data) : data),
          entryTypes: new Map(
            [...context.entryTypes].map(([ext, type]) => [
              ext,
              {
                ...type,
                getEntryInfo: (entry) =>
                  type.getEntryInfo({ ...entry, contents: include(entry.contents) }),
              },
            ]),
          ),
        });
      },
    },
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
