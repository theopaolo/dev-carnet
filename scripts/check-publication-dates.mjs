import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const format = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" });
let count = 0;
for (const path of readdirSync(new URL("src/cours/", root), { recursive: true })) {
  if (!path.endsWith(".md")) continue;
  const md = readFileSync(new URL(`src/cours/${path}`, root), "utf8");
  const frontmatter = md.split("---")[1];
  if (/^hidden: true$/m.test(frontmatter)) continue;
  const dates = ["publishedAt", "updatedAt"].map((key) => {
    const value = frontmatter.match(new RegExp(`^${key}: "(\\d{4}-\\d{2}-\\d{2})"$`, "m"))?.[1];
    assert(value, `${path} : ${key} manquant`);
    assert.equal(new Date(value).toISOString().slice(0, 10), value, path);
    return value;
  });
  assert(dates[1] >= dates[0], `${path} : mise à jour avant publication`);
  const id = path.replace(/\.md$/, "").replace(/\/index$/, "");
  const html = readFileSync(new URL(`dist/${id}/index.html`, root), "utf8");
  const metadata = html.match(/<p class="lesson-dates"[^>]*>([\s\S]*?)<\/p>/)?.[1];
  assert(metadata, `${path} : dates absentes de la page construite`);
  assert.equal((metadata.match(/<time /g) ?? []).length, 2, path);
  for (const date of dates) {
    assert(metadata.includes(`datetime="${date}"`), path);
    assert(metadata.includes(format.format(new Date(date))), path);
  }
  count++;
}
assert(count > 0);
console.log(`${count} pages : dates valides et affichées en français.`);
