import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { readGlossary } from "./glossary.mjs";

test("le lexique fournit les définitions et leurs alias sans balisage Markdown", async () => {
  const entries = await readGlossary(`Un paragraphe qui ne définit aucun terme.

| Terme | Sens | Explication |
| --- | --- | --- |
| 301, **Redirection 301** | Déplacement **définitif**, vers une [nouvelle adresse](/page/). | [Cours](/cours/) |
| \`noindex\` | Ne pas indexer. | |
| Page d'arrivée (*landing page*) | Page ouverte après un clic. | |
| | Ligne incomplète. | |
`);
  assert.deepEqual(entries, [
    {
      label: "301, Redirection 301",
      terms: ["301", "Redirection 301"],
      definition: "Déplacement définitif, vers une nouvelle adresse.",
    },
    { label: "noindex", terms: ["noindex"], definition: "Ne pas indexer." },
    {
      label: "Page d'arrivée (landing page)",
      terms: ["Page d'arrivée", "landing page"],
      definition: "Page ouverte après un clic.",
    },
  ]);
  assert.deepEqual(await readGlossary("Pas de tableau."), []);
  const markdown = await readFile(
    new URL("../cours/seo-geo/07-lexique.md", import.meta.url),
    "utf8",
  );
  const glossary = await readGlossary(markdown);
  for (const term of [
    "HTTP",
    "HTTPS",
    "Code de statut HTTP",
    "200",
    "301",
    "Redirection 301",
    "404",
  ]) {
    assert.ok(
      glossary.some((entry) => entry.terms.includes(term) && entry.definition),
      term,
    );
  }
});
