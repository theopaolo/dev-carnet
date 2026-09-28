import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Astro can emit scoped component styles before the layout's stylesheet.
// Declare layers in the head first, or Piloti's compositions override Focus and mobile states.
for (const page of ["index.html", "docker/01-dockerfile-multi-stage/index.html", "pochette/index.html", "404.html"]) {
  const html = readFileSync(new URL(`../dist/${page}`, import.meta.url), "utf8");
  const layers = html.match(/@layer\s+settings\s*,\s*reset\s*,\s*base\s*,\s*compositions\s*,\s*components\s*,\s*utilities\s*;/);
  assert.ok(layers, `${page}: missing layer order`);
  assert.equal(html.indexOf("@layer"), layers.index, `${page}: a component defines layers first`);
  const stylesheet = html.search(/<link\b[^>]*rel="stylesheet"/);
  assert.ok(stylesheet < 0 || layers.index < stylesheet, `${page}: stylesheet precedes layer order`);
  assert.equal((html.match(/<main\b/g) ?? []).length, 1, `${page}: expected one main landmark`);
}
console.log("Layout: CSS layer order and main landmarks verified.");
