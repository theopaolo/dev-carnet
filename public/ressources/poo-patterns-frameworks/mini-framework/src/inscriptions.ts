export type Atelier = { id: number; titre: string; capacite: number; prixCentimes: number };
export type Reservation = { id: number; atelierId: number; email: string; montantCentimes: number };
export type AtelierAvecPlaces = Atelier & { places: number };

export class Inscriptions {
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

  listerAteliers(): AtelierAvecPlaces[] {
    return this.#ateliers.map(atelier => ({
      ...atelier,
      places: atelier.capacite - this.#reservations.filter(r => r.atelierId === atelier.id).length,
    }));
  }

  reserver(atelierId: number, email: string): Reservation {
    const atelier = this.#ateliers.find(a => a.id === atelierId);
    if (!atelier) throw new Error("Atelier inconnu");
    const adresse = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adresse)) throw new Error("Courriel invalide");
    if (this.#reservations.some(r => r.atelierId === atelierId && r.email === adresse))
      throw new Error("Déjà inscrit");
    if (this.#reservations.filter(r => r.atelierId === atelierId).length >= atelier.capacite)
      throw new Error("Atelier complet");
    const reservation = {
      id: this.#prochainId++, atelierId, email: adresse, montantCentimes: atelier.prixCentimes,
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
