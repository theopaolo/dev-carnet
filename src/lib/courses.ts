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
