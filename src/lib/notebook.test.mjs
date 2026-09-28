import { test } from "node:test";
import assert from "node:assert/strict";
import { byPage, exportNotebook, importNotebook, load, save } from "./notebook.mjs";

const note = {
  id: "note-1",
  page: "docker/01",
  title: "Docker",
  quote: "un passage",
  text: "note --> intacte",
  prefix: "",
  suffix: "",
  at: 1,
};
const ribbon = (slug, at) => ({ page: "docker/01", title: "Docker", slug, at, slot: 0 });

test("notebook export round-trips and merges without dropping existing notes", () => {
  const current = { notes: [note], ribbons: [ribbon("ancien", 1)] };
  const incoming = {
    notes: [
      { ...note, text: "modifiée --> conservée", at: 2 },
      { ...note, id: "note-2", at: 3 },
    ],
    ribbons: [ribbon("a", 2), ribbon("b", 3), ribbon("c", 4), ribbon("c", 5)],
  };
  const markdown = exportNotebook(incoming, (page) => `https://example.test/${page}/`);
  assert.ok(markdown.includes("modifiée --> conservée"));
  const merged = importNotebook(markdown, current);
  assert.equal(merged.notes.length, 2);
  assert.equal(merged.notes[0].text, incoming.notes[0].text);
  assert.deepEqual(
    merged.ribbons.map(({ slug, slot }) => [slug, slot]),
    [
      ["c", 0],
      ["b", 1],
      ["a", 2],
    ],
  );
  const order = [...incoming.notes];
  byPage(incoming.notes);
  assert.deepEqual(incoming.notes, order);
});

test("invalid imports cannot inject links or malformed note identifiers", () => {
  const current = { notes: [note], ribbons: [] };
  assert.throws(() => importNotebook("not a notebook", current));
  assert.throws(() => importNotebook('<!-- carnet {"notes":null,"ribbons":[]} -->', current));
  const bad = {
    notes: [
      { ...note, id: '"]' },
      { ...note, page: "../outside" },
      { ...note, prefix: 5 },
    ],
    ribbons: [ribbon("a", 1), { ...ribbon("b", 2), page: "https://elsewhere.test" }],
  };
  const result = importNotebook(
    exportNotebook(bad, (page) => page),
    current,
  );
  assert.deepEqual(result.notes, [note]);
  assert.equal(result.ribbons.length, 1);
});

test("corrupt or unavailable storage does not prevent reading", () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  try {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: () => "{}",
        setItem: () => {
          throw new Error("quota");
        },
      },
    });
    assert.deepEqual(load("notes"), []);
    assert.equal(save("notes", [note]), false);
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get: () => {
        throw new Error("denied");
      },
    });
    assert.deepEqual(load("notes"), []);
  } finally {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous);
    else delete globalThis.localStorage;
  }
});
