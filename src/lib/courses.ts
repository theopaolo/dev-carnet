import { getCollection } from "astro:content";

// Un cours = son index.md (id sans « / ») et ses chapitres, triés par `order`.
// Un cours sans chapitre est une fiche d'une page.
export async function getCourses() {
  const all = (await getCollection("cours", (c) => !c.data.hidden)).sort((a, b) => a.data.order - b.data.order);
  const groups = all
    .filter((c) => !c.id.includes("/"))
    .map((course) => ({ course, chapters: all.filter((x) => x.id.startsWith(course.id + "/")) }));
  return {
    all,
    courses: groups.filter((g) => g.chapters.length > 0),
    sheets: groups.filter((g) => g.chapters.length === 0),
  };
}

// Présentation d'une page : premier paragraphe de texte, sans balisage Markdown. Sert à l'accueil
// et aux aperçus de lien (meta description). Un paragraphe qui finit par « : » annonce une liste
// et ne se lit pas seul, un paragraphe en italique est une citation ou une source
export const intro = (body = "") => {
  const para = body
    .replace(/^(```|~~~)[\s\S]*?^\1/gm, "")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .find((b) => b && !/^(#|>|-|\*|_|\d+\.|```|\||!\[|<)/.test(b) && !b.endsWith(":"));
  return (para ?? "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*`]|\b_|_\b/g, "")
    .replace(/\s+/g, " ");
};
