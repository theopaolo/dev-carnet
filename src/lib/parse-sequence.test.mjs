// node --test src/lib/parse-sequence.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { parseSequence } from "./parse-sequence.mjs";

test("participants, messages, contexte, notes et boucles", () => {
  const s = parseSequence(`sequenceDiagram
    accTitle: Titre
    accDescr: Description
    participant H as Harness
    %% ctx: system 100 Prompt système
    U->>H: Lis README.md
    %% ctx: user 20 Lis README.md
    %% note: Arrive au harness
    loop Tant qu'il y a un outil
      H->>M: messages[]
      M-->>H: tool_call
      %% ctx: assistant 5 call_1
    end
    H->>H: Permission
    H-->>U: Fini`);

  assert.equal(s.title, "Titre");
  assert.equal(s.desc, "Description");
  assert.deepEqual(s.actors.map((a) => a.label), ["Harness", "U", "M"]);
  assert.deepEqual(s.initial, [{ role: "system", tokens: 100, label: "Prompt système" }]);
  assert.equal(s.steps.length, 5);
  assert.deepEqual([s.steps[0].from, s.steps[0].to], [1, 0]);
  assert.equal(s.steps[0].note, "Arrive au harness");
  assert.equal(s.steps[0].ctx[0].tokens, 20);
  assert.equal(s.steps[1].dashed, false);
  assert.equal(s.steps[2].dashed, true);
  assert.equal(s.steps[2].ctx[0].role, "assistant");
  assert.equal(s.steps[1].loop.label, "Tant qu'il y a un outil");
  assert.equal(s.steps[1].loop, s.steps[2].loop);
  assert.equal(s.steps[3].loop, null);
  assert.equal(s.steps[3].from, s.steps[3].to);
  assert.equal(s.budget, 0);
  assert.equal(s.steps[0].compact, null);
});

test("compaction et budget", () => {
  const s = parseSequence(`sequenceDiagram
    %% budget: 4000
    H->>M: messages[]
    %% ctx: tool 3000 Logs
    H->>H: Compaction
    %% ctx: compact 300 Résumé des décisions`);

  assert.equal(s.budget, 4000);
  assert.deepEqual(s.steps[1].compact, { tokens: 300, label: "Résumé des décisions" });
  assert.equal(s.steps[1].ctx.length, 0);
});
