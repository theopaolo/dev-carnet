import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import { remarkMermaid } from "./src/lib/remark-mermaid.mjs";
import { rehypeHeadingIds } from "./src/lib/rehype-heading-ids.mjs";
import { rehypeExternalLinks } from "./src/lib/rehype-external-links.mjs";
import { rm } from "node:fs/promises";
import { privateCourses } from "./src/lib/private-courses.mjs";

export default defineConfig({
  integrations: [{
    name: "private-course-resources",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        for (const id of privateCourses) {
          await rm(new URL(`ressources/${id}/`, dir), { recursive: true, force: true });
        }
      },
    },
  }],
  markdown: {
    processor: unified({ remarkPlugins: [remarkMermaid], rehypePlugins: [rehypeHeadingIds, rehypeExternalLinks] }),
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
});
