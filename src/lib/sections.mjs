// Découpe le Markdown d'une page en sections, une par titre, pour l'index de recherche.
// `slugs` : les ancres calculées par Astro (render(entry).headings), dans l'ordre du document.
// Les titres dans les blocs de code ne comptent pas, les diagrammes ne sont pas indexés.

const SKIP = new Set(["mermaid", "animated"]);

const clean = (s) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*+|`/g, "")
    .replace(/^\s*(?:[-*>|]|\d+\.)\s+/gm, "")
    .replace(/\s*\|\s*|-{3,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function splitSections(body, slugs) {
  const sections = [{ slug: "", title: "", lines: [] }];
  let fence = null;
  let h = 0;
  for (const line of body.split("\n")) {
    const f = line.match(/^\s*(`{3,}|~{3,})\s*(\w*)/);
    if (fence) {
      if (f && f[1][0] === fence.mark[0] && f[1].length >= fence.mark.length && !f[2]) fence = null;
      else if (!SKIP.has(fence.lang)) sections.at(-1).lines.push(line);
      continue;
    }
    if (f) {
      fence = { mark: f[1], lang: f[2] };
      continue;
    }
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (m) {
      sections.push({ slug: slugs[h++] ?? "", title: clean(m[2]), lines: [] });
      continue;
    }
    sections.at(-1).lines.push(line);
  }
  return sections
    .map(({ slug, title, lines }) => ({ slug, title, text: clean(lines.join("\n")) }))
    .filter((s) => s.title || s.text);
}
