// node --test src/lib/anchor.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { describe, locate } from "./anchor.mjs";

test("le contexte départage deux passages identiques, une page modifiée garde la note", () => {
  const text = "Le harness appelle le modèle. Plus loin, le harness appelle un outil.";
  const second = text.lastIndexOf("le harness");
  const a = describe(text, second, second + "le harness".length);
  assert.equal(locate(text, a), second);

  // Phrase ajoutée avant le passage : le passage est retrouvé à sa nouvelle place
  const edited = "Introduction ajoutée. " + text;
  assert.equal(locate(edited, a), second + "Introduction ajoutée. ".length);

  // Passage supprimé : la note est détachée
  assert.equal(locate("Le chapitre a été réécrit.", a), -1);
});
