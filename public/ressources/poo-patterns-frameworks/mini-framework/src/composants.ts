import type { Reservation } from "./inscriptions.ts";
import { auNettoyage, effet, injecter } from "./framework.ts";
import { CleEtat } from "./etat.ts";

function LigneAtelier(atelierId: number): HTMLLIElement {
  const etat = injecter(CleEtat);
  const ligne = document.createElement("li");
  const texte = document.createElement("span");
  const bouton = document.createElement("button");
  bouton.textContent = "Réserver";
  bouton.addEventListener("click", () => etat.reserver(atelierId));
  ligne.append(texte, " ", bouton);

  const atelier = () => etat.ateliers.lire().find(a => a.id === atelierId)!;
  effet(() => {
    texte.textContent = `${atelier().titre}, places libres : ${atelier().places}`;
  });
  effet(() => {
    bouton.disabled = etat.email.lire() === "" || atelier().places === 0;
  });
  return ligne;
}

function LigneReservation(reservation: Reservation): HTMLLIElement {
  const etat = injecter(CleEtat);
  const ligne = document.createElement("li");
  const bouton = document.createElement("button");
  bouton.textContent = "Annuler";
  bouton.addEventListener("click", () => etat.annuler(reservation.id));
  ligne.append(`${etat.titre(reservation.atelierId)}, ${reservation.email} `, bouton);

  effet(() => {
    ligne.hidden = reservation.email !== etat.email.lire().trim().toLowerCase();
  });
  return ligne;
}

function ListeReservations(): HTMLElement {
  const etat = injecter(CleEtat);
  const section = document.createElement("section");
  const titre = document.createElement("h2");
  titre.textContent = "Vos réservations";
  const liste = document.createElement("ul");
  effet(() => {
    liste.replaceChildren(...etat.reservations.lire().map(r => LigneReservation(r)));
  });
  section.append(titre, liste);
  return section;
}

export function PageAteliers(): HTMLElement {
  const etat = injecter(CleEtat);
  const page = document.createElement("main");
  const champ = document.createElement("input");
  champ.type = "email";
  champ.addEventListener("input", () => etat.email.ecrire(champ.value));
  const etiquette = document.createElement("label");
  etiquette.append("Courriel ", champ);

  const raccourci = (evenement: KeyboardEvent) => {
    if (evenement.key === "/" && document.activeElement !== champ) {
      evenement.preventDefault();
      champ.focus();
    }
  };
  document.addEventListener("keydown", raccourci);
  auNettoyage(() => document.removeEventListener("keydown", raccourci));

  const liste = document.createElement("ul");
  liste.append(...etat.ateliers.lire().map(atelier => LigneAtelier(atelier.id)));

  const statut = document.createElement("p");
  statut.setAttribute("role", "status");
  effet(() => {
    statut.textContent = etat.message.lire();
  });

  page.append(etiquette, liste, statut, ListeReservations());
  return page;
}
