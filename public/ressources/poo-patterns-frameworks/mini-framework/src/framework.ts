type Portee = {
  parent: Portee | null;
  nettoyages: (() => void)[];
  valeurs: Map<unknown, unknown>;
};

let porteeCourante: Portee | null = null;
let effetCourant: Effet | null = null;

function dans<T>(portee: Portee, fonction: () => T): T {
  const precedente = porteeCourante;
  porteeCourante = portee;
  try {
    return fonction();
  } finally {
    porteeCourante = precedente;
  }
}

function detruire(portee: Portee): void {
  for (const nettoyage of portee.nettoyages.splice(0).reverse()) nettoyage();
}

export function creerPortee<T>(fonction: () => T): [T, () => void] {
  const portee: Portee = { parent: porteeCourante, nettoyages: [], valeurs: new Map() };
  const detruirePortee = () => detruire(portee);
  porteeCourante?.nettoyages.push(detruirePortee);
  return [dans(portee, fonction), detruirePortee];
}

export function auNettoyage(nettoyage: () => void): void {
  if (!porteeCourante) throw new Error("auNettoyage appelé hors d'une portée");
  porteeCourante.nettoyages.push(nettoyage);
}

export interface Cle<T> extends Symbol {
  readonly valeur?: T;
}

export function fournir<T>(cle: Cle<T>, valeur: T): void {
  if (!porteeCourante) throw new Error("fournir appelé hors d'une portée");
  porteeCourante.valeurs.set(cle, valeur);
}

export function injecter<T>(cle: Cle<T>): T {
  for (let portee = porteeCourante; portee; portee = portee.parent) {
    if (portee.valeurs.has(cle)) return portee.valeurs.get(cle) as T;
  }
  throw new Error(`Aucune valeur fournie pour ${cle.toString()}`);
}

export type Composant = () => HTMLElement;

export function monter(racine: HTMLElement, composant: Composant): () => void {
  const [element, detruirePortee] = creerPortee(composant);
  racine.append(element);
  return () => {
    detruirePortee();
    element.remove();
  };
}

export class Signal<T> {
  #valeur: T;
  #lecteurs = new Set<Effet>();

  constructor(valeur: T) {
    this.#valeur = valeur;
  }

  lire(): T {
    effetCourant?.suivre(this.#lecteurs);
    return this.#valeur;
  }

  ecrire(valeur: T): void {
    if (Object.is(this.#valeur, valeur)) return;
    this.#valeur = valeur;
    for (const effet of [...this.#lecteurs]) effet.executer();
  }
}

class Effet {
  #fonction: () => void;
  #sources = new Set<Set<Effet>>();
  #portee: Portee;
  #actif = true;

  constructor(fonction: () => void) {
    this.#fonction = fonction;
    this.#portee = { parent: porteeCourante, nettoyages: [], valeurs: new Map() };
    porteeCourante?.nettoyages.push(() => this.#arreter());
  }

  suivre(lecteurs: Set<Effet>): void {
    lecteurs.add(this);
    this.#sources.add(lecteurs);
  }

  executer(): void {
    if (!this.#actif) return;
    this.#nettoyer();
    const precedent = effetCourant;
    effetCourant = this;
    try {
      dans(this.#portee, this.#fonction);
    } finally {
      effetCourant = precedent;
    }
  }

  #arreter(): void {
    this.#actif = false;
    this.#nettoyer();
  }

  #nettoyer(): void {
    for (const lecteurs of this.#sources) lecteurs.delete(this);
    this.#sources.clear();
    detruire(this.#portee);
  }
}

export function effet(fonction: () => void): void {
  new Effet(fonction).executer();
}
