// node --test src/lib/rehype-external-links.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { rehypeExternalLinks } from "./rehype-external-links.mjs";

test("seuls les liens externes s'ouvrent dans un nouvel onglet, markdown ou HTML brut", () => {
  const a = (href) => ({ type: "element", tagName: "a", properties: { href }, children: [] });
  const raw = (value) => ({ type: "raw", value });
  const tree = {
    type: "root",
    children: [
      a("https://www.cnil.fr"),
      a("/rgpd/01-reperes/"),
      a("#plan"),
      raw('<a href="https://eur-lex.europa.eu">'),
      raw('<a href="/ressources/x.webp" target="_blank">'),
      raw('<a href="https://w3.org" target="_self">'),
    ],
  };
  rehypeExternalLinks()(tree);
  const [ext, local, hash, rawExt, rawLocal, rawTarget] = tree.children;

  assert.equal(ext.properties.target, "_blank");
  assert.equal(local.properties.target, undefined);
  assert.equal(hash.properties.target, undefined);
  assert.equal(rawExt.value, '<a target="_blank" rel="noopener" href="https://eur-lex.europa.eu">');
  assert.equal(rawLocal.value, '<a href="/ressources/x.webp" target="_blank">');
  assert.equal(rawTarget.value, '<a href="https://w3.org" target="_self">');
});
