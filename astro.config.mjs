import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import { remarkMermaid } from "./src/lib/remark-mermaid.mjs";
import { rehypeHeadingIds } from "./src/lib/rehype-heading-ids.mjs";

export default defineConfig({
  markdown: {
    processor: unified({ remarkPlugins: [remarkMermaid], rehypePlugins: [rehypeHeadingIds] }),
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
});
