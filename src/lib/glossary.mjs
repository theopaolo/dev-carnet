import { unified } from "@astrojs/markdown-remark";

const text = (node) => node.value ?? (node.children ?? []).map(text).join("");

export async function readGlossary(markdown) {
  const entries = [];
  const processor = await unified({
    smartypants: false,
    remarkPlugins: [
      () => (tree) => {
        for (const table of tree.children.filter((node) => node.type === "table")) {
          for (const row of table.children.slice(1)) {
            const [label, definition] = row.children.map(text);
            if (!label || !definition) continue;
            entries.push({
              label,
              terms: label
                .split(/[,()]/)
                .map((term) => term.trim())
                .filter(Boolean),
              definition,
            });
          }
        }
      },
    ],
  }).createRenderer({ syntaxHighlight: false });
  await processor.render(markdown);
  return entries;
}
