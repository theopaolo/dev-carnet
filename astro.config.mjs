import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import { remarkMermaid } from "./src/lib/remark-mermaid.mjs";

export default defineConfig({
  // GitHub Pages sous un sous-chemin : décommenter et adapter.
  // site: "https://theopaolo.github.io",
  // base: "/carnet",
  markdown: {
    processor: unified({ remarkPlugins: [remarkMermaid] }),
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
});
