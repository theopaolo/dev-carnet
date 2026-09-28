import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { privateCourses } from "../src/lib/private-courses.mjs";

const dist = new URL("../dist/", import.meta.url);
for (const id of privateCourses) {
  for (const path of [`${id}/`, `ressources/${id}/`]) {
    assert(!existsSync(new URL(path, dist)), `Contenu privé publié : ${path}`);
  }
}
for (const path of readdirSync(dist, { recursive: true })) {
  if (!/\.(html|json|js|css|xml|txt|map)$/.test(path)) continue;
  const content = readFileSync(new URL(path, dist), "utf8");
  for (const id of privateCourses) {
    assert(!content.includes(`/${id}/`), `Lien privé dans ${path}`);
  }
}
console.log("Cours privés : pages, recherche et ressources absentes du build.");
