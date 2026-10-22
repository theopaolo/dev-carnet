---
title: 'Préparer la persistance avec Repository'
order: 7
publishedAt: "2026-10-15"
updatedAt: "2026-10-22"
---

# Préparer la persistance avec Repository

Pour retrouver les réservations après un redémarrage, l'application doit les conserver dans un stockage persistant, qui garde les données au-delà de l'exécution du programme. Elle doit aussi attendre que ce stockage accepte l'enregistrement avant d'envoyer une confirmation. Cette séance prépare les appels nécessaires et vérifie, avec une simulation, qu'un refus du stockage ne produit pas de confirmation. Elle ne fournit pas encore le stockage persistant demandé.

Dans une copie d'[`ateliers.ts`](/ressources/poo-patterns-frameworks/ateliers.ts), retrouvez toutes les lectures et écritures de `this.#reservations` dans la classe `Inscriptions`. Elles concernent les méthodes `listerAteliers`, `reserver` et `annuler`, ainsi que le getter `reservations`. Retrouvez aussi `this.#prochainId`. Un compteur remis à un au redémarrage ne peut pas attribuer les identifiants d'une collection déjà enregistrée.

## Une collection de réservations

Un [Repository](https://martinfowler.com/eaaCatalog/repository.html) donne accès à des objets conservés dans un stockage en les présentant comme une collection. Ici, ces objets représentent les réservations de notre activité, d'où le terme « objets métier ». Le code qui applique les règles peut ainsi les consulter ou les enregistrer sans contenir les détails du stockage. Repository appartient au catalogue d'architecture d'entreprise de Fowler, et non aux 23 patterns du Gang of Four, abrégé GoF.

Dans notre programme, les objets métier sont les `Reservation`. Les méthodes `reserver`, `annuler` et `listerAteliers` de `Inscriptions` utilisent ces objets et constituent le code client du Repository. Le contrat proposé se nomme `Reservations`. Une classe qui réalise ce contrat devra communiquer avec un stockage durable pour répondre au besoin de persistance. La classe `ReservationsEnMemoire` présentée ici sert seulement à vérifier les échanges.

## Donner un contrat aux opérations nécessaires

Ajoutez ce contrat après le type `Reservation`.

```ts
interface Reservations {
	lister(): Promise<Reservation[]>;
	ajouter(nouvelle: Omit<Reservation, "id">): Promise<Reservation>;
	retirer(id: number): Promise<Reservation>;
}
```

`Omit<Reservation, "id">` décrit une réservation sans identifiant, car la collection attribue celui-ci lors de l'ajout. Elle renvoie ensuite la réservation enregistrée. Le succès d'`ajouter` doit signifier que le stockage a accepté l'enregistrement selon ses garanties documentées. En cas de panne, la promesse est rejetée et l'appelant reçoit une erreur lorsqu'il attend le résultat. De même, `retirer` rejette la promesse si l'identifiant n'existe pas, afin de conserver le refus de `annuler` dans le programme de départ.

## Simuler le contrat en mémoire

Ajoutez cette classe avant `Inscriptions`. Elle reprend le tableau `#reservations` et le compteur `#prochainId`, qui quittent donc la classe `Inscriptions`. L'attribution des identifiants relève désormais du stockage. Dans la simulation, le compteur reste en mémoire, mais une réalisation persistante devra éviter de réutiliser les identifiants déjà enregistrés après un redémarrage.

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

La classe renvoie des copies des réservations pour que l'appelant ne puisse pas modifier les valeurs stockées à travers un résultat reçu. Cette protection convient aux réservations de l'exemple, dont les champs contiennent seulement des nombres et des chaînes. En revanche, le tableau perd ses données à l'arrêt du programme et ne fournit donc pas de **persistance**.

La différence entre [deux objets et deux références](/poo-patterns-frameworks/01-fondations/#distinguer-deux-objets-et-deux-references) explique cette protection. Si une réservation contenait un objet imbriqué, la copie avec `{ ...reservation }` conserverait une référence vers cet objet. Il faudrait alors préciser ce que les appelants peuvent modifier et adapter la copie à ce contrat.

## Faire passer les trois méthodes par le contrat

Remplacez la classe `Inscriptions` du départ par celle-ci. Son constructeur reçoit maintenant le stockage, qu'elle garde dans le champ privé `#stockage`. Les trois méthodes deviennent asynchrones, et le getter `reservations` disparaît, puisque les réservations vivent désormais dans le stockage.

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

Le stockage arrive ici par le constructeur, alors que la [séance des tarifs](/poo-patterns-frameworks/02-strategy/) passe le calcul en troisième argument de `reserver`. Les deux changements restent donc compatibles. Pour les réunir, la méthode reprendra le paramètre `tarif` et la classe gardera le stockage reçu à sa construction.

## Adapter les appels et provoquer une panne

Créez d'abord le stockage, puis donnez-le au constructeur. Retrouvez ensuite chaque appel aux trois méthodes, y compris dans les assertions et les messages finaux. Comme ces méthodes sont devenues asynchrones, attendez leurs résultats avec `await`. Pour vérifier leurs erreurs, utilisez `assert.rejects`, qui contrôle le rejet d'une promesse plutôt qu'une erreur lancée directement par un appel synchrone.

Voici les transformations représentatives.

```ts
const memoire = new ReservationsEnMemoire();
const inscriptions = new Inscriptions(ateliers, memoire);

assert.deepEqual((await inscriptions.listerAteliers()).map(a => a.places), [2, 1]);
await assert.rejects(() => inscriptions.reserver(999, "lea@example.test"), /Atelier inconnu/);
assert.equal((await memoire.lister()).length, 0);
const lea = await inscriptions.reserver(1, " Lea@example.test ");
```

Ces lignes remplacent les contrôles correspondants du départ. Elles ne s'ajoutent pas à une série qui aurait déjà réservé la place de Léa. Transformez de la même façon les autres `assert.throws` sur `reserver` et `annuler`, les appels de réservation, d'annulation, et les lectures de la liste. De même, chaque lecture de `inscriptions.reservations` devient `await memoire.lister()`, puisque la classe n'a plus de getter pour les réservations.

Après tous les contrôles du départ, ajoutez cette simulation de panne. `StockageRefusant` lit les réservations de la mémoire, mais refuse toute écriture.

```ts
class StockageRefusant implements Reservations {
	#lecture: Reservations;

	constructor(lecture: Reservations) {
		this.#lecture = lecture;
	}

	lister(): Promise<Reservation[]> {
		return this.#lecture.lister();
	}

	async ajouter(): Promise<Reservation> {
		throw new Error("Enregistrement refusé");
	}

	async retirer(): Promise<Reservation> {
		throw new Error("Retrait refusé");
	}
}

const enPanne = new Inscriptions(ateliers, new StockageRefusant(memoire));
await assert.rejects(() => enPanne.reserver(2, "mia@example.test"), /Enregistrement refusé/);
await assert.rejects(() => enPanne.annuler(sam.id), /Retrait refusé/);
assert.deepEqual(enPanne.notifications, []);
const apresPanne = await memoire.lister();
assert.equal(apresPanne.length, 2);
assert.ok(apresPanne.some(r => r.id === sam.id));

const copie = await memoire.lister();
copie[0].montantCentimes = 1;
assert.equal((await memoire.lister())[0].montantCentimes, 2000);
```

L'objet `enPanne` applique les mêmes règles que `inscriptions`, car seul son stockage change. Les deux écritures refusées ne produisent aucune notification, et la mémoire garde ses deux réservations. Le montant de Sam vaut toujours 2 000 centimes, comme dans le scénario de départ. La dernière assertion vérifie que modifier ce montant dans une copie ne change pas la réservation conservée par le stockage simulé.

## Passer à un stockage durable

Ces contrôles portent sur des opérations exécutées l'une après l'autre, pas sur des réservations concurrentes. Ils vérifient les règles de réservation, le montant conservé au moment de la réservation, les copies et l'absence de notification après un refus du stockage. Le contrat sépare ces règles des détails du stockage et permet de comparer plusieurs réalisations.

La demande de persistance reste ouverte tant qu'aucune réalisation durable n'est fournie. Pour la valider, enregistrez une réservation avec le vrai stockage, arrêtez le processus, puis retrouvez la même réservation après redémarrage. Le compteur d'identifiants doit aussi éviter les collisions avec les anciennes données.

Un [Adapter](/poo-patterns-frameworks/05-adapter/) peut traduire les appels au fournisseur dans une réalisation de Repository.

## La même idée avec une fonction

Le contrat `Reservations` contient trois méthodes, il reste donc un objet. Cet objet n'a pourtant pas besoin d'une classe. Une fonction peut le créer avec des accolades et garder le tableau et le compteur dans ses variables locales. Les méthodes renvoyées continuent d'utiliser ces variables après l'appel, alors que le code extérieur ne peut pas les atteindre, comme il ne pouvait pas atteindre les champs privés de la classe.

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

`new ReservationsEnMemoire()` devient `creerReservationsEnMemoire()`. La classe `Inscriptions` ne change pas, puisqu'elle dépend seulement du contrat. Le type de retour `Reservations` permet aussi à TypeScript de déduire les types des paramètres `nouvelle` et `id`.

Dans un serveur Node, on retrouve ce découpage dans le module qui regroupe les requêtes vers la base de données, qu'elles passent par du SQL, par Prisma ou par Drizzle. Les routes appellent `lister` ou `ajouter` sans connaître les tables, et les tests leur fournissent une version en mémoire. NestJS écrit plutôt ces objets en classes, parce que son injection de dépendances les crée à partir de leur constructeur.
