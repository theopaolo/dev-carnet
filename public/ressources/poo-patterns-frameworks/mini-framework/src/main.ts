import { Inscriptions } from "./inscriptions.ts";
import { fournir, monter } from "./framework.ts";
import { CleEtat, EtatAteliers } from "./etat.ts";
import { PageAteliers } from "./composants.ts";

const etat = new EtatAteliers(
  new Inscriptions([
    { id: 1, titre: "Dessin", capacite: 2, prixCentimes: 2000 },
    { id: 2, titre: "Photo", capacite: 1, prixCentimes: 3000 },
  ]),
);

monter(document.querySelector<HTMLElement>("#app")!, () => {
  fournir(CleEtat, etat);
  return PageAteliers();
});
