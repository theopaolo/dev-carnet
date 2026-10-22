---
title: 'Préparer la persistance avec Repository'
order: 7
publishedAt: "2026-10-15"
updatedAt: "2026-10-23"
---

# Préparer la persistance avec Repository

Pour retrouver les réservations après un redémarrage, l'application devra les enregistrer dans un stockage durable, par exemple une base de données. Cette séance prépare ce changement. Elle place les réservations derrière un contrat, puis vérifie les échanges avec un stockage simulé en mémoire. Travaillez dans une copie d'[`ateliers.ts`](/ressources/poo-patterns-frameworks/ateliers.ts).

## Le problème

Dans le départ, `Inscriptions` garde elle-même le tableau `#reservations` et le compteur `#prochainId`. Les méthodes `listerAteliers`, `reserver` et `annuler` lisent et modifient ce tableau directement. Pour passer à une base de données, il faudrait réécrire chacune d'elles, et les requêtes vers le stockage se mêleraient aux règles de réservation.

Un [Repository](https://martinfowler.com/eaaCatalog/repository.html) présente les objets enregistrés comme une collection, derrière un contrat. Le code des règles lit et ajoute des réservations sans savoir où elles sont rangées. Ce pattern vient du catalogue de Martin Fowler, et non du livre du Gang of Four.

## La refacto pas à pas

### Étape 1, le contrat

Ajoutez ce contrat après le type `Reservation`.

```ts
interface Reservations {
	lister(): Promise<Reservation[]>;
	ajouter(nouvelle: Omit<Reservation, "id">): Promise<Reservation>;
	retirer(id: number): Promise<Reservation>;
}
```

Les méthodes renvoient des promesses, car un vrai stockage répond plus tard. En cas de panne, la promesse est rejetée et l'appelant reçoit l'erreur quand il attend le résultat. `Omit<Reservation, "id">` décrit une réservation sans identifiant, puisque c'est le stockage qui l'attribue.

### Étape 2, la classe qui le respecte

`ReservationsEnMemoire` reprend le tableau et le compteur, qui quittent `Inscriptions`. Ajoutez-la avant cette classe.

```ts
class ReservationsEnMemoire implements Reservations {
	#reservations: Reservation[] = [];
	#prochainId = 1;

	async lister(): Promise<Reservation[]> {
		return this.#reservations.map(r => ({ ...r }));
	}

	async ajouter(nouvelle: Omit<Reservation, "id">): Promise<Reservation> {
		const reservation = { ...nouvelle, id: this.#prochainId++ };
		this.#reservations.push(reservation);
		return { ...reservation };
	}

	async retirer(id: number): Promise<Reservation> {
		const index = this.#reservations.findIndex(r => r.id === id);
		if (index === -1) throw new Error("Réservation inconnue");
		const reservation = this.#reservations[index];
		this.#reservations.splice(index, 1);
		return { ...reservation };
	}
}
```

La classe renvoie des copies, pour qu'un appelant ne puisse pas modifier une réservation stockée à travers le résultat reçu. La différence entre [deux objets et deux références](/poo-patterns-frameworks/01-fondations/#distinguer-deux-objets-et-deux-references) explique cette précaution. Le tableau perd ses données à l'arrêt du programme, donc cette classe sert seulement à vérifier les échanges.

### Étape 3, le code qui utilise le contrat

Remplacez la classe `Inscriptions` par celle-ci. Elle reçoit le stockage dans son constructeur, ses trois méthodes deviennent asynchrones et le getter `reservations` disparaît. Les assertions de départ ne fonctionnent plus à cette étape, et l'étape 4 les remplace.

```ts
class Inscriptions {
	#ateliers: Atelier[];
	#stockage: Reservations;
	#notifications: string[] = [];

	constructor(ateliers: Atelier[], stockage: Reservations) {
		this.#ateliers = ateliers;
		this.#stockage = stockage;
	}

	get notifications(): string[] {
		return [...this.#notifications];
	}

	async listerAteliers() {
		const existantes = await this.#stockage.lister();
		return this.#ateliers.map(atelier => ({
			...atelier,
			places: atelier.capacite - existantes.filter(r => r.atelierId === atelier.id).length,
		}));
	}

	async reserver(atelierId: number, email: string): Promise<Reservation> {
		const atelier = this.#ateliers.find(a => a.id === atelierId);
		if (!atelier) throw new Error("Atelier inconnu");
		const adresse = email.trim().toLowerCase();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adresse)) throw new Error("Courriel invalide");
		const existantes = await this.#stockage.lister();
		if (existantes.some(r => r.atelierId === atelierId && r.email === adresse))
			throw new Error("Déjà inscrit");
		if (existantes.filter(r => r.atelierId === atelierId).length >= atelier.capacite)
			throw new Error("Atelier complet");
		const reservation = await this.#stockage.ajouter({
			atelierId, email: adresse, montantCentimes: atelier.prixCentimes,
		});
		this.#notifications.push(`Confirmation ${reservation.id} pour ${adresse}`);
		return { ...reservation };
	}

	async annuler(reservationId: number): Promise<void> {
		const reservation = await this.#stockage.retirer(reservationId);
		this.#notifications.push(`Annulation ${reservation.id} pour ${reservation.email}`);
	}
}
```

La confirmation est ajoutée seulement après `await this.#stockage.ajouter(...)`. Si le stockage refuse l'enregistrement, l'erreur interrompt la méthode avant cette ligne.

### Étape 4, le branchement

Le stockage se crée hors de `Inscriptions`, puis passe à son constructeur. Remplacez tout ce qui suit la déclaration de `ateliers` par ce scénario, qui attend chaque résultat avec `await`.

```ts
const memoire = new ReservationsEnMemoire();
const inscriptions = new Inscriptions(ateliers, memoire);

await assert.rejects(() => inscriptions.reserver(999, "lea@example.test"), /Atelier inconnu/);
const lea = await inscriptions.reserver(1, " Lea@example.test ");
assert.equal(lea.id, 1);
await assert.rejects(() => inscriptions.reserver(1, "LEA@example.test"), /Déjà inscrit/);
const sam = await inscriptions.reserver(1, "sam@example.test");
await assert.rejects(() => inscriptions.reserver(1, "zoe@example.test"), /Atelier complet/);
assert.deepEqual((await inscriptions.listerAteliers()).map(a => a.places), [0, 1]);

await inscriptions.annuler(lea.id);
await assert.rejects(() => inscriptions.annuler(lea.id), /Réservation inconnue/);
assert.deepEqual((await memoire.lister()).map(r => r.id), [sam.id]);
console.log("Vérifications réussies.");
```

`assert.rejects` vérifie qu'une promesse échoue, comme `assert.throws` le fait pour un appel synchrone. Le jour où un vrai stockage existera, seule la ligne qui crée `memoire` changera.

## À vous

Écrivez une classe `StockageRefusant` qui implémente `Reservations` et reçoit `memoire` dans son constructeur. Sa méthode `lister` lit les réservations de `memoire`, `ajouter` lance l'erreur « Enregistrement refusé » et `retirer` lance « Retrait refusé ». Ajoutez ensuite ces lignes à la fin du fichier, elles doivent passer.

```ts
const enPanne = new Inscriptions(ateliers, new StockageRefusant(memoire));
await assert.rejects(() => enPanne.reserver(2, "mia@example.test"), /Enregistrement refusé/);
assert.deepEqual(enPanne.notifications, []);
assert.equal((await memoire.lister()).length, 1);
```

Un enregistrement refusé ne produit donc aucune confirmation, et la mémoire garde sa réservation.

## La même idée avec une fonction

Le contrat a trois méthodes, il reste donc un objet. Cet objet n'a pourtant pas besoin d'une classe. Une fonction peut le créer avec des accolades et garder le tableau et le compteur dans ses variables locales, que le code extérieur ne peut pas atteindre.

```ts
function creerReservationsEnMemoire(): Reservations {
	const reservations: Reservation[] = [];
	let prochainId = 1;
	return {
		async lister() {
			return reservations.map(r => ({ ...r }));
		},
		async ajouter(nouvelle) {
			const reservation = { ...nouvelle, id: prochainId++ };
			reservations.push(reservation);
			return { ...reservation };
		},
		async retirer(id) {
			const index = reservations.findIndex(r => r.id === id);
			if (index === -1) throw new Error("Réservation inconnue");
			const reservation = reservations[index];
			reservations.splice(index, 1);
			return { ...reservation };
		},
	};
}
```

`new ReservationsEnMemoire()` devient `creerReservationsEnMemoire()`, et `Inscriptions` ne change pas, puisqu'elle dépend seulement du contrat. Dans un serveur Node, on retrouve ce découpage dans le module qui regroupe les requêtes vers la base de données, en SQL, avec Prisma ou avec Drizzle. Les routes appellent `lister` ou `ajouter` sans connaître les tables, et les tests leur fournissent une version en mémoire. NestJS écrit plutôt ces objets en classes, parce que son injection de dépendances les crée à partir de leur constructeur.

## Pour réviser

Cette séance ne rend pas encore les réservations durables. Pour valider un vrai stockage, enregistrez une réservation, arrêtez le programme, puis retrouvez-la au redémarrage, sans que le compteur réattribue un identifiant déjà utilisé. Un [Adapter](/poo-patterns-frameworks/05-adapter/) peut traduire les appels vers le fournisseur de ce stockage. La [définition de Martin Fowler](https://martinfowler.com/eaaCatalog/repository.html) tient en une page et complète cette séance.
