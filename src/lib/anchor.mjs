// Ancrage d'une note dans le texte d'une page (src/scripts/notebook.js).
// La note garde le passage surligné et 32 caractères de chaque côté. Au chargement, le passage
// est cherché dans le texte de la page : le contexte départage deux passages identiques, et une
// page modifiée retrouve le passage tant qu'il existe encore. Introuvable : la note est détachée.

const AROUND = 32;

export function describe(text, start, end) {
  return {
    quote: text.slice(start, end),
    prefix: text.slice(Math.max(0, start - AROUND), start),
    suffix: text.slice(end, end + AROUND),
  };
}

// Position du passage dans le texte, -1 s'il n'y est plus
export function locate(text, { quote, prefix = "", suffix = "" }) {
  let best = -1;
  let bestScore = -1;
  for (let i = text.indexOf(quote); quote && i !== -1; i = text.indexOf(quote, i + 1)) {
    const score = (text.slice(0, i).endsWith(prefix) ? 2 : 0) + (text.slice(i + quote.length).startsWith(suffix) ? 1 : 0);
    if (score > bestScore) [best, bestScore] = [i, score];
  }
  return best;
}
