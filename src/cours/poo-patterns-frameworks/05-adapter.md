---
title: 'Lire les places du partenaire avec Adapter'
order: 6
publishedAt: "2026-10-15"
updatedAt: "2026-10-23"
---

# Lire les places du partenaire avec Adapter

Un partenaire annonce lui aussi les places de nos ateliers, et l'application doit les afficher. Sa réponse utilise son propre vocabulaire, avec un champ `remaining_seats`, alors que notre code parle de « places ». Cette séance range la traduction entre les deux dans une seule classe. Elle utilise un partenaire simulé, dont vous choisissez les réponses sans contacter de service externe. Travaillez dans une copie d'[`ateliers.ts`](/ressources/poo-patterns-frameworks/ateliers.ts) et gardez ses assertions de départ.

## Le problème

Le partenaire fournit la méthode décrite par cette interface. Ajoutez-la après les types du fichier.

```ts
interface Partenaire {
	getAvailability(code: string): Promise<unknown>;
}
```

`Promise` indique que la réponse arrive plus tard. Le type `unknown` oblige à vérifier sa forme avant de la lire, car TypeScript ne contrôle pas le contenu d'une réponse externe pendant l'exécution.

La solution directe ajoute à `Inscriptions` une méthode qui construit le code `atelier-1` attendu par le partenaire, appelle `getAvailability`, puis vérifie que la réponse contient un `remaining_seats` entier et positif. La classe des règles de réservation connaît alors le format du partenaire. Une deuxième méthode qui aurait besoin des places répéterait ce travail, et un changement de format chez le partenaire obligerait à modifier `Inscriptions`.

Adapter place un objet intermédiaire entre notre code et le service. Notre code demande les places avec ses propres mots, et l'adaptateur traduit cette demande dans la langue du partenaire.

## La refacto pas à pas

### Étape 1, le contrat

Le contrat exprime, avec le vocabulaire de l'application, la seule question qu'elle pose au partenaire, le nombre de places d'un atelier. Ajoutez-le après l'interface `Partenaire`.

```ts
interface Places {
	disponibles(atelierId: number): Promise<number>;
}
```

### Étape 2, la classe qui le respecte

`AdaptateurPlaces` reçoit le partenaire, construit son code et vérifie sa réponse. Une réponse invalide lance une erreur au lieu de devenir zéro place, car zéro signifierait « atelier complet ». Ajoutez cette classe avant `Inscriptions`.

```ts
class AdaptateurPlaces implements Places {
	#api: Partenaire;

	constructor(api: Partenaire) {
		this.#api = api;
	}

	async disponibles(atelierId: number): Promise<number> {
		const data = await this.#api.getAvailability(`atelier-${atelierId}`);
		if (typeof data !== "object" || data === null ||
			!("remaining_seats" in data)) throw new Error("Format invalide");
		const places = data.remaining_seats;
		if (typeof places !== "number" || !Number.isSafeInteger(places) || places < 0)
			throw new Error("Places invalides");
		return places;
	}
}
```

### Étape 3, le code qui utilise le contrat

Ajoutez cette méthode à `Inscriptions`. Elle demande les places à travers `Places`, sans connaître `remaining_seats` ni le code `atelier-1`.

```ts
class Inscriptions {
	// Les champs, le constructeur et les méthodes du départ ne changent pas.

	async listerAteliersPartenaire(places: Places) {
		return Promise.all(this.#ateliers.map(async atelier => ({
			...atelier,
			places: await places.disponibles(atelier.id),
		})));
	}
}
```

`Promise.all` attend toutes les réponses, et la liste échoue dès qu'une réponse échoue. N'ajoutez pas de `catch` qui renverrait un tableau vide, sinon l'appelant confondrait une panne avec une liste sans atelier.

### Étape 4, le branchement

Le partenaire se choisit hors de `Inscriptions`, au moment où l'on crée l'adaptateur. Ajoutez ce bloc à la fin du fichier. Il crée un partenaire simulé, qui renvoie la réponse prévue pour chaque code, le branche, puis vérifie la liste et le refus des réponses invalides. `await` attend la réponse, et `assert.rejects` vérifie qu'une promesse échoue.

```ts
class PartenaireSimule implements Partenaire {
	#reponses: Record<string, unknown>;

	constructor(reponses: Record<string, unknown>) {
		this.#reponses = reponses;
	}

	async getAvailability(code: string): Promise<unknown> {
		return this.#reponses[code];
	}
}

const partenaire = new PartenaireSimule({
	"atelier-1": { remaining_seats: 3 },
	"atelier-2": { remaining_seats: 0 },
});
const places = new AdaptateurPlaces(partenaire);
const liste = await inscriptions.listerAteliersPartenaire(places);
assert.deepEqual(liste.map(a => a.places), [3, 0]);

for (const reponse of [null, {}, { remaining_seats: "3" }, { remaining_seats: -1 }, { remaining_seats: 1.5 }]) {
	const invalide = new AdaptateurPlaces(new PartenaireSimule({ "atelier-1": reponse }));
	await assert.rejects(() => invalide.disponibles(1));
}
```

Pour brancher le vrai service, seule la création de l'adaptateur changera. La liste annonce trois places pour Dessin alors que notre catalogue en prévoit deux, car le partenaire publie ses propres disponibilités sans connaître nos réservations.

## À vous

Écrivez une classe `PartenaireEnPanne` dont `getAvailability` lance l'erreur « Partenaire indisponible ». Ces lignes doivent alors passer, ce qui montre qu'une panne reste visible.

```ts
const enPanne = new AdaptateurPlaces(new PartenaireEnPanne());
await assert.rejects(() => inscriptions.listerAteliersPartenaire(enPanne), /Partenaire indisponible/);
```

## La même idée avec une fonction

`Places` ne contient qu'une méthode, donc un type de fonction peut le remplacer. `placesDuPartenaire` reçoit le partenaire et renvoie l'adaptateur. La fonction renvoyée garde accès à `api` après l'appel, grâce à une [fermeture](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Closures).

```ts
type Places = (atelierId: number) => Promise<number>;

function placesDuPartenaire(api: Partenaire): Places {
	return async atelierId => {
		const data = await api.getAvailability(`atelier-${atelierId}`);
		if (typeof data !== "object" || data === null ||
			!("remaining_seats" in data)) throw new Error("Format invalide");
		const places = data.remaining_seats;
		if (typeof places !== "number" || !Number.isSafeInteger(places) || places < 0)
			throw new Error("Places invalides");
		return places;
	};
}
```

Les appels `places.disponibles(atelier.id)` deviennent `places(atelier.id)`, et chaque `new AdaptateurPlaces(...)` devient `placesDuPartenaire(...)`. Vous écrirez cette traduction dans presque tous les projets qui appellent une API. Après un `fetch`, une fonction vérifie le JSON et renvoie un objet qui porte les noms de l'application. La classe redevient utile quand l'adaptateur expose plusieurs méthodes qui partagent le même client, par exemple pour lire les places, réserver et annuler avec le même jeton d'accès.

## Pour réviser

La [fiche Adapter et Facade](/ressources/poo-patterns-frameworks/fiches/adapter-facade.html) résume le pattern sur un schéma, et la [fiche Adapter de Refactoring.Guru](https://refactoring.guru/fr/design-patterns/adapter) le reprend avec d'autres exemples. La [séance Repository](/poo-patterns-frameworks/07-repository/) traite le besoin suivant, conserver les réservations après un redémarrage.
