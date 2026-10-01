import { test } from "node:test";
import assert from "node:assert/strict";
import { readPage } from "../../scripts/update-link-previews.mjs";

test("les aperçus décodent le HTML, préfèrent Open Graph et ne prennent que les vrais liens", () => {
  const page = readPage(`<title>Titre de secours</title>
    <meta content='Un titre &amp; un &quot;exemple&quot;' property='og:title'>
    <meta name=description content="Résumé de secours">
    <meta property="og:description" content="  Lire &lt;div&gt;\n sans exécuter de HTML.  ">
    <a href="https://example.org/?a=1&amp;b=2">Source</a>
    <pre>&lt;a href="https://example.org/faux"&gt;</pre>`);
  assert.deepEqual(page, {
    title: 'Un titre & un "exemple"',
    description: "Lire <div> sans exécuter de HTML.",
    links: ["https://example.org/?a=1&b=2"],
  });
  assert.equal(
    readPage("<title> Page </title><meta name=description content='Résumé'>").description,
    "Résumé",
  );
  assert.equal(readPage("<title> Page </title>").title, "Page");
  assert.deepEqual(readPage(""), { title: "", description: "", links: [] });
});
