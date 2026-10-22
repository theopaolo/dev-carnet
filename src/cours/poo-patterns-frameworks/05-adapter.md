---
title: 'Lire les places du partenaire avec Adapter'
order: 6
publishedAt: "2026-10-15"
updatedAt: "2026-10-22"
---

# Lire les places du partenaire avec Adapter

Pour afficher les places annoncées par un partenaire, notre application doit lire le champ `remaining_seats` de sa réponse. Ce nom appartient au partenaire, alors que notre liste d'ateliers utilise le mot « places ». On va comparer deux façons de traduire cette réponse, en conservant la distinction entre un atelier complet et un appel qui échoue. Une réponse invalide ou une panne doit rester un échec visible, et non devenir zéro place ou un succès inventé.

Cette séance utilise un **partenaire simulé**, dont on contrôle les réponses sans contacter de service externe. Dans une copie d'[`ateliers.ts`](/ressources/poo-patterns-frameworks/ateliers.ts), retrouvez la méthode `listerAteliers` de la classe `Inscriptions` et le calcul local des places. Ce calcul repose sur `capacite` et `this.#reservations`, mais le partenaire ne connaît pas ces réservations locales. Ses places annoncées constituent donc une information distincte.

Ajoutez une méthode `listerAteliersPartenaire` à la classe, en conservant la méthode de liste locale. Gardez aussi `reserver`, `annuler` et les assertions de départ. La réponse du partenaire indique une disponibilité, mais elle ne permet ni de réserver ni d'annuler chez lui. Relier ces opérations au partenaire demanderait donc un autre contrat.

## Essayer une traduction directe

Déclarez l'interface suivante pour décrire la méthode que le partenaire simulé fournit à notre application.

```ts
interface Partenaire {
	getAvailability(code: string): Promise<unknown>;
}
```

`Promise` indique que l'appel fournit son résultat de façon asynchrone, sans le renvoyer directement. Le type `unknown` oblige ensuite à vérifier la forme de ce résultat avant d'en lire les valeurs. En effet, une déclaration TypeScript ne vérifie pas le contenu d'une réponse externe à l'exécution.

Pour une première solution, placez l'appel et sa validation dans `listerAteliersPartenaire`, qui reçoit un `Partenaire` en paramètre. Pour chaque élément de `this.#ateliers`, demandez `getAvailability` avec le code `atelier-${atelier.id}`. Contrôlez que la réponse est un objet non nul avec un champ `remaining_seats`. Ce champ doit être un entier sûr, positif ou nul. Renvoyez l'atelier avec cette valeur dans `places`.

Utilisez `Promise.all` pour attendre l'ensemble des réponses. Si un appel échoue ou qu'une réponse est invalide, la construction de la liste doit échouer aussi. N'ajoutez pas de `catch` qui renvoie un tableau vide, car l'appelant ne pourrait plus distinguer une panne d'une liste sans atelier.

## Adapter, un intermédiaire

Adapter place un objet intermédiaire entre un client et un service dont les méthodes ou les données ne correspondent pas au contrat attendu. Cet objet traduit les appels pour que le client utilise le service sans connaître ses particularités. La [fiche Adapter de Refactoring.Guru](https://refactoring.guru/fr/design-patterns/adapter) représente ces rôles dans son schéma.

Dans notre exemple, le client est la méthode `listerAteliersPartenaire`, qui attendra le contrat de l'interface `Places`. Le service à adapter est `Partenaire`. Pour les relier, la classe `AdaptateurPlaces` implémente `Places`, reçoit le partenaire dans son constructeur et traduit les appels entre les deux. L'objet ne se contente donc pas de convertir les données reçues, il adapte aussi la façon de demander les places au service.

## Extraire la traduction

Comparez votre première solution à cette variante, qui garde le vocabulaire du partenaire dans une classe identifiée. Ajoutez l'interface et l'adaptateur avant la classe `Inscriptions`, puisque sa méthode de liste va les utiliser.

```ts
interface Places {
	disponibles(atelierId: number): Promise<number>;
}

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

La méthode de `Inscriptions` demande désormais les places à travers le contrat `Places`. Elle n'a plus à construire le code attendu par le partenaire ni à vérifier le format de sa réponse, car l'adaptateur s'en charge.

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

La correspondance entre l'identifiant `2` et le code `atelier-2` est une convention de notre simulation.

## Vérifier les valeurs et les échecs

Ajoutez ces assertions à la fin de la copie du programme. `await` attend le résultat avant de poursuivre le contrôle. Les trois classes de partenaire simulent une réponse correcte, une réponse imposée et une panne.

```ts
class PartenaireSimule implements Partenaire {
	codesDemandes: string[] = [];

	async getAvailability(code: string): Promise<unknown> {
		this.codesDemandes.push(code);
		return { remaining_seats: code === "atelier-1" ? 3 : 0 };
	}
}

class PartenaireFixe implements Partenaire {
	#reponse: unknown;

	constructor(reponse: unknown) {
		this.#reponse = reponse;
	}

	async getAvailability(): Promise<unknown> {
		return this.#reponse;
	}
}

class PartenaireEnPanne implements Partenaire {
	async getAvailability(): Promise<unknown> {
		throw new Error("Partenaire indisponible");
	}
}

const partenaire = new PartenaireSimule();
const listePartenaire = await inscriptions.listerAteliersPartenaire(new AdaptateurPlaces(partenaire));
assert.deepEqual(listePartenaire.map(a => a.places), [3, 0]);
assert.deepEqual(partenaire.codesDemandes, ["atelier-1", "atelier-2"]);

for (const valeur of [null, {}, { remaining_seats: "3" },
	{ remaining_seats: -1 }, { remaining_seats: 1.5 }, { remaining_seats: NaN },
	{ remaining_seats: Infinity }, { remaining_seats: Number.MAX_SAFE_INTEGER + 1 }]) {
	const invalide = new AdaptateurPlaces(new PartenaireFixe(valeur));
	await assert.rejects(() => invalide.disponibles(1));
}
const indisponible = new AdaptateurPlaces(new PartenaireEnPanne());
await assert.rejects(() => inscriptions.listerAteliersPartenaire(indisponible), /Partenaire indisponible/);
```

La liste obtenue contient trois places pour Dessin, même si notre catalogue local annonce une capacité de deux. Cet écart est volontaire, car le partenaire annonce ses propres disponibilités sans tenir compte de nos réservations locales. On ne peut donc pas combiner ces deux sources sans définir quelle règle doit s'appliquer.

## Isoler le format du partenaire

La classe `AdaptateurPlaces` regroupe la traduction du partenaire et permet de la réutiliser dans plusieurs opérations.

Lire une disponibilité ne réserve aucune place, et cette disponibilité peut changer avant une inscription. Un autre besoin consiste à conserver les réservations au redémarrage, ce que prépare la [séance Repository](/poo-patterns-frameworks/07-repository/).

## La même idée avec une fonction

Le contrat `Places` ne contient qu'une méthode, si bien qu'un type de fonction peut le remplacer. Le partenaire n'est plus reçu par un constructeur, mais par une fonction qui renvoie l'adaptateur. La fonction renvoyée garde accès au paramètre `api` après la fin de cet appel. Ce mécanisme s'appelle une [fermeture](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Closures).

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

Dans `listerAteliersPartenaire`, l'appel `places.disponibles(atelier.id)` devient `places(atelier.id)`. Dans les assertions, chaque `new AdaptateurPlaces(...)` devient `placesDuPartenaire(...)`, et `invalide.disponibles(1)` devient `invalide(1)`. Les contrôles ne changent pas, donc une réponse invalide est toujours rejetée.

Vous écrirez cette traduction dans presque tous les projets qui appellent une API. Après un `fetch`, une fonction reçoit le JSON, vérifie sa forme et renvoie un objet qui porte les noms de l'application. Le reste du code ne voit alors jamais `remaining_seats`, et un changement de format chez le partenaire ne touche que cette fonction. La classe redevient utile quand l'adaptateur expose plusieurs méthodes qui partagent le même client, par exemple pour lire les places, réserver et annuler avec le même jeton d'accès.
