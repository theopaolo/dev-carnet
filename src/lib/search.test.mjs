import { test } from "node:test";
import assert from "node:assert/strict";
import { prepareIndex, searchWords, search, highlight } from "./search.mjs";
import { escapeHtml } from "./html.mjs";

test("search matches every word without accents and prioritizes the current course", () => {
  const index = prepareIndex([
    { url: "/other/", page: "Un cours", section: "", text: "Déployer un conteneur" },
    { url: "/docker/", page: "Docker", section: "", text: "Déployer un conteneur" },
    { url: "/none/", page: "Autre", section: "", text: "Déployer" },
  ]);
  assert.deepEqual(
    search(index, searchWords("DÉPLOYER conteneur"), "/docker/").map(({ url }) => url),
    ["/docker/", "/other/"],
  );
  assert.deepEqual(search(index, searchWords("a")), []);
  assert.equal(highlight("État <script>", ["etat"]), "<mark>État</mark> &lt;script&gt;");
  assert.equal(escapeHtml('" onfocus="'), "&quot; onfocus=&quot;");
  assert.equal(highlight("Docker", ["", "docker", "dock"]), "<mark>Docker</mark>");
});
