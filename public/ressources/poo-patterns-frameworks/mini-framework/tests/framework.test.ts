import assert from "node:assert/strict";
import { Signal, auNettoyage, creerPortee, effet, fournir, injecter, type Cle } from "../src/framework.ts";
import { Inscriptions } from "../src/inscriptions.ts";
import { EtatAteliers } from "../src/etat.ts";

// Chapitre 4 : un effet suit les signaux qu'il lit réellement.
const email = new Signal("");
const places = new Signal(2);
const etats: string[] = [];
creerPortee(() => {
  effet(() => {
    etats.push(email.lire() === "" || places.lire() === 0 ? "désactivé" : "actif");
  });
});
places.ecrire(1);
email.ecrire("lea@example.test");
email.ecrire("lea@example.test");
places.ecrire(0);
assert.deepEqual(etats, ["désactivé", "actif", "désactivé"]);

// Chapitre 5 : un nouveau rendu arrête les effets du rendu précédent.
const reservations = new Signal([1, 2]);
let executions = 0;
const [, detruire] = creerPortee(() => {
  effet(() => {
    for (const _ of reservations.lire()) {
      effet(() => {
        email.lire();
        executions++;
      });
    }
  });
});
reservations.ecrire([1, 2, 3]);
executions = 0;
email.ecrire("sam@example.test");
assert.equal(executions, 3);
detruire();
executions = 0;
email.ecrire("zoe@example.test");
assert.equal(executions, 0);

const cible = new EventTarget();
let recus = 0;
const [, demonter] = creerPortee(() => {
  const compter = () => recus++;
  cible.addEventListener("ping", compter);
  auNettoyage(() => cible.removeEventListener("ping", compter));
});
cible.dispatchEvent(new Event("ping"));
demonter();
cible.dispatchEvent(new Event("ping"));
assert.equal(recus, 1);
assert.throws(() => auNettoyage(() => {}), /hors d'une portée/);

// Chapitre 6 : la valeur fournie la plus proche gagne.
const CleLangue: Cle<string> = Symbol("langue");
creerPortee(() => {
  fournir(CleLangue, "fr");
  creerPortee(() => {
    fournir(CleLangue, "en");
    assert.equal(injecter(CleLangue), "en");
  });
  assert.equal(injecter(CleLangue), "fr");
});
assert.throws(() => creerPortee(() => injecter(CleLangue)), /Aucune valeur fournie/);

// Chapitre 6 : l'orchestration se vérifie sans navigateur.
const etat = new EtatAteliers(
  new Inscriptions([{ id: 1, titre: "Dessin", capacite: 1, prixCentimes: 2000 }]),
);
etat.email.ecrire(" Lea@example.test ");
etat.reserver(1);
assert.equal(etat.ateliers.lire()[0].places, 0);
assert.equal(etat.message.lire(), "Réservation 1 confirmée pour lea@example.test");
etat.email.ecrire("sam@example.test");
etat.reserver(1);
assert.equal(etat.message.lire(), "Atelier complet");
etat.annuler(1);
assert.equal(etat.ateliers.lire()[0].places, 1);
assert.equal(etat.reservations.lire().length, 0);

console.log("Vérifications réussies.");
