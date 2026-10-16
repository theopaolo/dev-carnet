---
title: 'Lire les places du partenaire avec Adapter'
order: 6
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# Lire les places du partenaire avec Adapter

Un partenaire fournit le nombre de places sous le nom `remaining_seats`. Affichons cette information dans une liste des ateliers. Une réponse invalide ou une panne doit rester un échec visible. Elle ne doit devenir ni zéro place ni un succès inventé.

Cette séance utilise un **partenaire simulé**. Dans une copie d'[`ateliers.ts`](/ressources/poo-patterns-frameworks/ateliers.ts), retrouvez `listerAteliers` et le calcul local des places. Ce calcul repose sur `capacite` et `reservations`. Notre partenaire ne connaît pas ces réservations locales.

Ajoutez une fonction `listerAteliersPartenaire` à côté de la liste locale. Conservez `reserver`, `annuler` et les assertions de départ. Relier les réservations au partenaire demanderait un autre contrat, absent de sa réponse de disponibilité.

## Essayer une traduction directe

Déclarez le contrat de notre faux fournisseur.

```ts
interface Partenaire {
	getAvailability(code: string): Promise<unknown>;
}
```

`Promise` annonce un résultat reçu plus tard. `unknown` signifie que nous devons vérifier sa forme avant d'en lire les valeurs. Écrire un type TypeScript ne valide pas une réponse externe.

Pour une première solution, placez l'appel et sa validation dans `listerAteliersPartenaire`. Pour chaque élément de `ateliers`, demandez `getAvailability` avec le code `atelier-${atelier.id}`. Contrôlez que la réponse est un objet non nul avec un champ `remaining_seats`. Ce champ doit être un entier sûr, positif ou nul. Renvoyez l'atelier avec cette valeur dans `places`.

Utilisez `Promise.all` pour attendre les réponses de la liste. Si une réponse échoue, laissez échouer la liste. N'ajoutez pas de `catch` qui renvoie un tableau vide.

## Lire Adapter à partir de cet appel

Lisez « Solution » et « Structure » dans la [fiche Adapter de Refactoring.Guru](https://refactoring.guru/fr/design-patterns/adapter).

1. Quel nom le programme des ateliers veut-il utiliser pour demander des places ?
2. Quels détails appartiennent seulement au partenaire ?
3. Si `remaining_seats` change de nom, quelle fonction devra changer dans votre première solution ?

Le client devient `listerAteliersPartenaire`. Le contrat attendu sera `Places`. Le service adapté est `Partenaire`. La fonction `adapterPlaces` construit l'objet qui traduit les appels entre les deux. Une simple lecture de champ n'est qu'une conversion de données. Ici, l'objet adapte aussi la façon d'appeler le service.

## Extraire la traduction

Comparez votre première solution à cette variante. Elle garde le vocabulaire du partenaire dans un endroit identifié.

```ts
interface Places {
	disponibles(atelierId: number): Promise<number>;
}

function adapterPlaces(api: Partenaire): Places {
	return {
		async disponibles(id) {
			const data = await api.getAvailability(`atelier-${id}`);
			if (typeof data !== "object" || data === null ||
				!("remaining_seats" in data)) throw new Error("Format invalide");
			const places = data.remaining_seats;
			if (typeof places !== "number" || !Number.isSafeInteger(places) || places < 0)
				throw new Error("Places invalides");
			return places;
		},
	};
}

async function listerAteliersPartenaire(places: Places) {
	return Promise.all(ateliers.map(async atelier => ({
		...atelier,
		places: await places.disponibles(atelier.id),
	})));
}
```

La correspondance entre l'identifiant `2` et le code `atelier-2` est une convention de notre simulation.

## Vérifier les valeurs et les échecs

Ajoutez ces assertions à la fin de la copie du programme. `await` attend le résultat avant de poursuivre le contrôle.

```ts
const codesDemandes: string[] = [];
const partenaire: Partenaire = {
	async getAvailability(code) {
		codesDemandes.push(code);
		return { remaining_seats: code === "atelier-1" ? 3 : 0 };
	},
};
const listePartenaire = await listerAteliersPartenaire(adapterPlaces(partenaire));
assert.deepEqual(listePartenaire.map(a => a.places), [3, 0]);
assert.deepEqual(codesDemandes, ["atelier-1", "atelier-2"]);

for (const valeur of [null, {}, { remaining_seats: "3" },
	{ remaining_seats: -1 }, { remaining_seats: 1.5 }, { remaining_seats: NaN },
	{ remaining_seats: Infinity }, { remaining_seats: Number.MAX_SAFE_INTEGER + 1 }]) {
	const invalide = adapterPlaces({ async getAvailability() { return valeur; } });
	await assert.rejects(() => invalide.disponibles(1));
}
const indisponible = adapterPlaces({
	async getAvailability() { throw new Error("Partenaire indisponible"); },
});
await assert.rejects(() => listerAteliersPartenaire(indisponible), /Partenaire indisponible/);
```

La liste obtenue contient trois places pour Dessin, même si notre catalogue local annonce une capacité de deux. Ce résultat est volontaire. Il révèle deux sources différentes, qui ne doivent pas être mélangées sans règle métier.

## Retenir une frontière utile

Les deux variantes peuvent convenir. Si cet appel est unique, sa traduction directe reste défendable avec la même validation. L'objet `Places` devient utile si plusieurs opérations demandent la même traduction ou si un autre partenaire doit le remplacer.

Dans les deux cas, une disponibilité lue ne réserve aucune place. Elle peut changer avant une inscription. Notez cette limite dans la [situation du partenaire et de l'enregistrement](/poo-patterns-frameworks/09-situations/#situation-2-une-api-externe-et-un-enregistrement-qui-echoue). Le besoin de conserver les réservations au redémarrage est traité dans la [séance Repository](/poo-patterns-frameworks/07-repository/).
