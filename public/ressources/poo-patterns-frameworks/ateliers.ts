import assert from "node:assert/strict";

type Atelier = { id: number; titre: string; capacite: number; prixCentimes: number };
type Reservation = { id: number; atelierId: number; email: string; montantCentimes: number };

const ateliers: Atelier[] = [
  { id: 1, titre: "Dessin", capacite: 2, prixCentimes: 2000 },
  { id: 2, titre: "Photo", capacite: 1, prixCentimes: 3000 },
];
const reservations: Reservation[] = [];
const notifications: string[] = [];
let prochainId = 1;

function listerAteliers() {
  return ateliers.map(atelier => ({
    ...atelier,
    places: atelier.capacite - reservations.filter(r => r.atelierId === atelier.id).length,
  }));
}

function reserver(atelierId: number, email: string): Reservation {
  const atelier = ateliers.find(a => a.id === atelierId);
  if (!atelier) throw new Error("Atelier inconnu");
  const adresse = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adresse)) throw new Error("Courriel invalide");
  if (reservations.some(r => r.atelierId === atelierId && r.email === adresse))
    throw new Error("Déjà inscrit");
  if (reservations.filter(r => r.atelierId === atelierId).length >= atelier.capacite)
    throw new Error("Atelier complet");
  const reservation = {
    id: prochainId++, atelierId, email: adresse, montantCentimes: atelier.prixCentimes,
  };
  reservations.push(reservation);
  notifications.push(`Confirmation ${reservation.id} pour ${adresse}`);
  return { ...reservation };
}

function annuler(reservationId: number): void {
  const index = reservations.findIndex(r => r.id === reservationId);
  if (index === -1) throw new Error("Réservation inconnue");
  const reservation = reservations[index];
  reservations.splice(index, 1);
  notifications.push(`Annulation ${reservation.id} pour ${reservation.email}`);
}

assert.deepEqual(listerAteliers().map(a => a.places), [2, 1]);
assert.throws(() => reserver(999, "lea@example.test"), /Atelier inconnu/);
assert.throws(() => reserver(1, "sans-adresse"), /Courriel invalide/);
assert.equal(reservations.length, 0);
assert.equal(notifications.length, 0);

const lea = reserver(1, " Lea@example.test ");
assert.deepEqual(lea, { id: 1, atelierId: 1, email: "lea@example.test", montantCentimes: 2000 });
assert.throws(() => reserver(1, "LEA@example.test"), /Déjà inscrit/);
const sam = reserver(1, "sam@example.test");
assert.equal(sam.id, 2);
assert.throws(() => reserver(1, "zoe@example.test"), /Atelier complet/);
assert.equal(reservations.length, 2);
assert.equal(notifications.length, 2);

ateliers[0].prixCentimes = 2500;
assert.equal(reservations[0].montantCentimes, 2000);
annuler(lea.id);
assert.throws(() => annuler(lea.id), /Réservation inconnue/);
assert.equal(listerAteliers()[0].places, 1);
const zoe = reserver(1, "zoe@example.test");
assert.equal(zoe.id, 3);
assert.equal(zoe.montantCentimes, 2500);
assert.deepEqual(reservations.map(r => r.id), [2, 3]);
assert.deepEqual(notifications, [
  "Confirmation 1 pour lea@example.test",
  "Confirmation 2 pour sam@example.test",
  "Annulation 1 pour lea@example.test",
  "Confirmation 3 pour zoe@example.test",
]);

console.log("Vérifications réussies.");
console.log(`Ateliers au catalogue : ${listerAteliers().length}`);
console.log(`Réservations actives : ${reservations.length}`);
console.log(`Notifications en mémoire : ${notifications.length}`);
