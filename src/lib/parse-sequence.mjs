// Source d'un bloc ```animated : syntaxe sequenceDiagram de Mermaid, plus deux
// commentaires %% que Mermaid ignore. La même source reste donc un Mermaid valide.
//   %% ctx: <rôle> <tokens> <libellé>   entrée ajoutée à messages[] par l'étape
//   %% note: <texte>                    explication affichée pendant l'étape
//   %% ctx: compact <tokens> <libellé>  compaction : tout sauf system et tools
//                                       est remplacé par un résumé
//   %% budget: <tokens>                 repère du budget de contexte sur la barre
// Un %% ctx placé avant le premier message décrit le contexte de départ.
export function parseSequence(src) {
  const actors = [];
  const ids = new Map();
  const actor = (id, label = id) => {
    if (!ids.has(id)) ids.set(id, actors.push({ id, label }) - 1);
    return ids.get(id);
  };
  const s = { title: "", desc: "", budget: 0, actors, initial: [], steps: [] };
  // Les étapes d'un même bloc loop partagent le même objet
  let loop = null;

  for (const raw of src.split("\n")) {
    const line = raw.trim();
    let m;
    if ((m = line.match(/^(?:participant|actor)\s+(\w+)(?:\s+as\s+(.+))?$/))) actor(m[1], m[2]);
    else if ((m = line.match(/^accTitle:\s*(.*)$/))) s.title = m[1];
    else if ((m = line.match(/^accDescr:\s*(.*)$/))) s.desc = m[1];
    else if ((m = line.match(/^loop\b\s*(.*)$/))) loop = { label: m[1] };
    else if (line === "end") loop = null;
    else if ((m = line.match(/^%%\s*budget:\s*(\d+)/))) s.budget = Number(m[1]);
    else if ((m = line.match(/^%%\s*ctx:\s*compact\s+(\d+)\s*(.*)$/)) && s.steps.length)
      s.steps.at(-1).compact = { tokens: Number(m[1]), label: m[2] };
    else if ((m = line.match(/^%%\s*ctx:\s*(\w+)\s+(\d+)\s*(.*)$/)))
      (s.steps.at(-1)?.ctx ?? s.initial).push({ role: m[1], tokens: Number(m[2]), label: m[3] });
    else if ((m = line.match(/^%%\s*note:\s*(.*)$/)) && s.steps.length) s.steps.at(-1).note = m[1];
    else if ((m = line.match(/^(\w+)\s*(-->>|->>|-->|->)\s*(\w+)\s*:\s*(.*)$/)))
      s.steps.push({
        from: actor(m[1]),
        to: actor(m[3]),
        dashed: m[2].startsWith("--"),
        text: m[4],
        loop,
        ctx: [],
        compact: null,
        note: "",
      });
  }
  return s;
}
