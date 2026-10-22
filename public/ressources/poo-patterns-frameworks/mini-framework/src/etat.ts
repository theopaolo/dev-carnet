import type { AtelierAvecPlaces, Inscriptions, Reservation } from "./inscriptions.ts";
import { Signal, type Cle } from "./framework.ts";

export class EtatAteliers {
  readonly ateliers: Signal<AtelierAvecPlaces[]>;
  readonly reservations: Signal<Reservation[]>;
  readonly email = new Signal("");
  readonly message = new Signal("");
  #inscriptions: Inscriptions;

  constructor(inscriptions: Inscriptions) {
    this.#inscriptions = inscriptions;
    this.ateliers = new Signal(inscriptions.listerAteliers());
    this.reservations = new Signal(inscriptions.reservations);
  }

  titre(atelierId: number): string {
    return this.#inscriptions.listerAteliers().find(a => a.id === atelierId)?.titre ?? "";
  }

  reserver(atelierId: number): void {
    try {
      const reservation = this.#inscriptions.reserver(atelierId, this.email.lire());
      this.#actualiser();
      this.message.ecrire(`Réservation ${reservation.id} confirmée pour ${reservation.email}`);
    } catch (erreur) {
      this.message.ecrire(erreur instanceof Error ? erreur.message : String(erreur));
    }
  }

  annuler(reservationId: number): void {
    this.#inscriptions.annuler(reservationId);
    this.#actualiser();
    this.message.ecrire(`Réservation ${reservationId} annulée`);
  }

  #actualiser(): void {
    this.ateliers.ecrire(this.#inscriptions.listerAteliers());
    this.reservations.ecrire(this.#inscriptions.reservations);
  }
}

export const CleEtat: Cle<EtatAteliers> = Symbol("état des ateliers");
