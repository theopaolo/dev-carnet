// Index de recherche statique : une entrée par section de page, lu par src/scripts/search.js
import { getCollection, render } from "astro:content";
import { splitSections } from "../lib/sections.mjs";

export async function GET() {
  const all = await getCollection("cours", (c) => !c.data.hidden);
  const title = new Map(all.map((c) => [c.id, c.data.title]));
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const index = [];
  for (const c of all) {
    const { headings } = await render(c);
    const course = c.id.includes("/") ? title.get(c.id.split("/")[0]) : "";
    for (const s of splitSections(c.body ?? "", headings.map((h) => h.slug))) {
      index.push({
        url: `${base}/${c.id}/${s.slug ? `#${s.slug}` : ""}`,
        page: course ? `${course} › ${c.data.title}` : c.data.title,
        section: s.title === c.data.title ? "" : s.title,
        text: s.text,
      });
    }
  }
  return new Response(JSON.stringify(index), { headers: { "Content-Type": "application/json" } });
}
