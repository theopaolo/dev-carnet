import assert from "node:assert/strict";

type Atelier = { id: number; titre: string; capacite: number; prixCentimes: number };
type Reservation = { id: number; atelierId: number; email: string; montantCentimes: number };

interface Tarif {
  appliquer(prixCentimes: number): number;
}

class TarifNormal implements Tarif {
  appliquer(prixCentimes: number): number {
    return prixCentimes;
  }
}

class TarifSolidaire implements Tarif {
  appliquer(prixCentimes: number): number {
    return Math.round(prixCentimes / 2);
  }
}

class Inscriptions {
  #ateliers: Atelier[];
  #reservations: Reservation[] = [];
  #notifications: string[] = [];
  #prochainId = 1;

  constructor(ateliers: Atelier[]) {
    this.#ateliers = ateliers;
  }

  get reservations(): Reservation[] {
    return this.#reservations.map(r => ({ ...r }));
  }

  get notifications(): string[] {
    return [...this.#notifications];
  }

  listerAteliers() {
    return this.#ateliers.map(atelier => ({
      ...atelier,
      places: atelier.capacite - this.#reservations.filter(r => r.atelierId === atelier.id).length,
    }));
  }

  reserver(
    atelierId: number,
    email: string,
    tarif: Tarif = new TarifNormal(),
  ): Reservation {
    const atelier = this.#ateliers.find(a => a.id === atelierId);
    if (!atelier) throw new Error("Atelier inconnu");
    const adresse = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adresse)) throw new Error("Courriel invalide");
    if (this.#reservations.some(r => r.atelierId === atelierId && r.email === adresse))
      throw new Error("Déjà inscrit");
    if (this.#reservations.filter(r => r.atelierId === atelierId).length >= atelier.capacite)
      throw new Error("Atelier complet");
    const montantCentimes = tarif.appliquer(atelier.prixCentimes);
    if (!Number.isSafeInteger(montantCentimes) || montantCentimes < 0)
      throw new Error("Montant invalide");
    const reservation = {
      id: this.#prochainId++, atelierId, email: adresse, montantCentimes,
    };
    this.#reservations.push(reservation);
    this.#notifications.push(`Confirmation ${reservation.id} pour ${adresse}`);
    return { ...reservation };
  }

  annuler(reservationId: number): void {
    const index = this.#reservations.findIndex(r => r.id === reservationId);
    if (index === -1) throw new Error("Réservation inconnue");
    const reservation = this.#reservations[index];
    this.#reservations.splice(index, 1);
    this.#notifications.push(`Annulation ${reservation.id} pour ${reservation.email}`);
  }
}

const ateliers: Atelier[] = [
  { id: 1, titre: "Dessin", capacite: 2, prixCentimes: 2000 },
  { id: 2, titre: "Photo", capacite: 1, prixCentimes: 3000 },
];
const inscriptions = new Inscriptions(ateliers);

assert.deepEqual(inscriptions.listerAteliers().map(a => a.places), [2, 1]);
assert.throws(() => inscriptions.reserver(999, "lea@example.test"), /Atelier inconnu/);
assert.throws(() => inscriptions.reserver(1, "sans-adresse"), /Courriel invalide/);
assert.equal(inscriptions.reservations.length, 0);
assert.equal(inscriptions.notifications.length, 0);

const lea = inscriptions.reserver(1, " Lea@example.test ");
assert.deepEqual(lea, { id: 1, atelierId: 1, email: "lea@example.test", montantCentimes: 2000 });
assert.throws(() => inscriptions.reserver(1, "LEA@example.test"), /Déjà inscrit/);
const sam = inscriptions.reserver(1, "sam@example.test");
assert.equal(sam.id, 2);
assert.throws(() => inscriptions.reserver(1, "zoe@example.test"), /Atelier complet/);
assert.equal(inscriptions.reservations.length, 2);
assert.equal(inscriptions.notifications.length, 2);

ateliers[0].prixCentimes = 2500;
assert.equal(inscriptions.reservations[0].montantCentimes, 2000);
inscriptions.annuler(lea.id);
assert.throws(() => inscriptions.annuler(lea.id), /Réservation inconnue/);
assert.equal(inscriptions.listerAteliers()[0].places, 1);
const zoe = inscriptions.reserver(1, "zoe@example.test");
assert.equal(zoe.id, 3);
assert.equal(zoe.montantCentimes, 2500);
assert.deepEqual(inscriptions.reservations.map(r => r.id), [2, 3]);
assert.deepEqual(inscriptions.notifications, [
  "Confirmation 1 pour lea@example.test",
  "Confirmation 2 pour sam@example.test",
  "Annulation 1 pour lea@example.test",
  "Confirmation 3 pour zoe@example.test",
]);

// Tarifs de test : un montant imposé, un calcul en panne, un compteur d'appels.
class TarifFixe implements Tarif {
  readonly montantCentimes: number;

  constructor(montantCentimes: number) {
    this.montantCentimes = montantCentimes;
  }

  appliquer(): number {
    return this.montantCentimes;
  }
}

class TarifIndisponible implements Tarif {
  appliquer(): number {
    throw new Error("Calcul indisponible");
  }
}

class TarifCompte implements Tarif {
  calculs = 0;

  appliquer(prixCentimes: number): number {
    this.calculs++;
    return prixCentimes;
  }
}

const solidaire = new TarifSolidaire();
ateliers[1].prixCentimes = 2001;
assert.equal(solidaire.appliquer(2001), 1001);
assert.equal(solidaire.appliquer(0), 0);
assert.equal(new TarifNormal().appliquer(2001), 2001);
for (const montant of [-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
  assert.throws(
    () => inscriptions.reserver(2, "mia@example.test", new TarifFixe(montant)),
    /Montant invalide/,
  );
}
assert.throws(
  () => inscriptions.reserver(2, "mia@example.test", new TarifIndisponible()),
  /Calcul indisponible/,
);
assert.equal(inscriptions.reservations.length, 2);
assert.equal(inscriptions.notifications.length, 4);

// Les refus n'ont consommé aucun identifiant : Mia reçoit le 4.
const mia = inscriptions.reserver(2, "mia@example.test", solidaire);
assert.equal(mia.id, 4);
assert.equal(mia.montantCentimes, 1001);
ateliers[1].prixCentimes = 4000;
assert.equal(inscriptions.reservations.find(r => r.id === mia.id)?.montantCentimes, 1001);

const compter = new TarifCompte();
assert.throws(() => inscriptions.reserver(999, "inconnu@example.test", compter), /Atelier inconnu/);
assert.throws(() => inscriptions.reserver(2, "sans-adresse", compter), /Courriel invalide/);
assert.throws(() => inscriptions.reserver(2, "MIA@example.test", compter), /Déjà inscrit/);
assert.throws(() => inscriptions.reserver(2, "noa@example.test", compter), /Atelier complet/);
assert.equal(compter.calculs, 0);
assert.equal(inscriptions.notifications.length, 5);
assert.equal(inscriptions.reservations.length, 3);

inscriptions.annuler(mia.id);
const noa = inscriptions.reserver(2, "noa@example.test");
assert.equal(noa.id, 5);
assert.equal(noa.montantCentimes, 4000);
assert.deepEqual(inscriptions.notifications.slice(4), [
  "Confirmation 4 pour mia@example.test",
  "Annulation 4 pour mia@example.test",
  "Confirmation 5 pour noa@example.test",
]);

console.log("Vérifications réussies.");
console.log(`Ateliers au catalogue : ${inscriptions.listerAteliers().length}`);
console.log(`Réservations actives : ${inscriptions.reservations.length}`);
console.log(`Notifications en mémoire : ${inscriptions.notifications.length}`);
