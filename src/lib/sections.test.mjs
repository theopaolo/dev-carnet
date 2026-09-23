// node --test src/lib/sections.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { splitSections } from "./sections.mjs";

test("une section par titre, titres de code ignorés, diagrammes exclus", () => {
  const md = [
    "# Titre",
    "Intro avec **gras** et [un lien](https://x.dev).",
    "## Boucle",
    "```text",
    "# Injection directe",
    "```",
    "```mermaid",
    "flowchart LR",
    "```",
    "- tool_call",
    "## Fin",
  ].join("\n");
  const s = splitSections(md, ["titre", "boucle", "fin"]);
  assert.deepEqual(
    s.map((x) => [x.slug, x.title]),
    [["titre", "Titre"], ["boucle", "Boucle"], ["fin", "Fin"]],
  );
  assert.equal(s[0].text, "Intro avec gras et un lien.");
  assert.equal(s[1].text, "# Injection directe tool_call");
});
