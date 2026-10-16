---
title: 'Tracer une réservation avec Decorator, aide facultative'
order: 11
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# Tracer une réservation avec Decorator, aide facultative

Nous voulons tracer une réservation réussie sans changer son résultat. Pour une trace utilisée à un seul endroit, ajoutez un appel direct après `reserver`. Une enveloppe devient une option si le même comportement doit entourer plusieurs opérations compatibles ou être composé avec d'autres comportements.

Cette aide travaille dans une copie d'[`ateliers.ts`](/ressources/poo-patterns-frameworks/ateliers.ts). Retrouvez la signature de `reserver`, ses refus, puis la copie qu'elle renvoie.

## Commencer par l'appel direct

Après les assertions du programme de départ, l'atelier Photo possède encore une place. Ajoutez ce scénario dans une copie.

```ts
const traces: string[] = [];
const mia = reserver(2, "mia@example.test");
traces.push(`Réservation ${mia.id} enregistrée`);
assert.equal(traces[0], `Réservation ${mia.id} enregistrée`);
```

Si `reserver` lance une erreur, la ligne suivante n'est pas exécutée. La trace annonce seulement un succès observé par cet appelant.

## Lire l'enveloppe de Decorator

Lisez « Solution » et « Structure » dans la [fiche Decorator de Refactoring.Guru](https://refactoring.guru/fr/design-patterns/decorator).

1. Quel contrat l'enveloppe doit-elle conserver pour remplacer l'opération ?
2. Où appelle-t-elle l'opération d'origine ?
3. Quel besoin du programme actuel justifierait plusieurs enveloppes ?

Dans notre variante, `Reserver` sera le contrat commun. La fonction `reserver` réalise l'opération. `avecTrace` crée la fonction qui l'entoure. L'appelant utilise cette nouvelle fonction. Nous composons des fonctions, alors que la structure de la source compose des objets.

## Comparer avec une fonction qui entoure `reserver`

Dans une autre copie du départ, ajoutez ces définitions après `annuler`.

```ts
type Reserver = typeof reserver;
const traces: string[] = [];

function avecTrace(operation: Reserver): Reserver {
	return (atelierId, email) => {
		const reservation = operation(atelierId, email);
		traces.push(`Réservation ${reservation.id} enregistrée`);
		return reservation;
	};
}
```

`typeof reserver` récupère le type de la fonction existante. L'enveloppe conserve ses arguments et sa valeur de retour. Elle ajoute une trace après le succès, sans transformer une erreur en réservation fictive.

Ajoutez ces assertions après celles du départ.

```ts
const reserverAvecTrace = avecTrace(reserver);
const mia = reserverAvecTrace(2, "mia@example.test");
assert.ok(reservations.some(r => r.id === mia.id));
assert.deepEqual(traces, [`Réservation ${mia.id} enregistrée`]);
assert.throws(() => reserverAvecTrace(2, "noa@example.test"), /Atelier complet/);
assert.equal(traces.length, 1);

const resultatAttendu: Reservation = {
	id: 99, atelierId: 2, email: "test@example.test", montantCentimes: 3000,
};
const operationSimulee: Reserver = () => resultatAttendu;
assert.equal(avecTrace(operationSimulee)(2, "test@example.test"), resultatAttendu);
```

La dernière opération est une simulation. Elle vérifie que l'enveloppe renvoie exactement le résultat reçu.

## Conserver les garanties de l'opération

Cette enveloppe correspond à la fonction synchrone du départ, à deux arguments. Elle ne transmet pas le troisième argument de la séance Strategy. Si vous combinez les séances, adaptez la signature et vérifiez que le tarif fourni arrive à l'opération.

Decorator conserve le contrat de l'opération, tandis qu'un [Adapter](/poo-patterns-frameworks/05-adapter/) traduit un contrat différent.
