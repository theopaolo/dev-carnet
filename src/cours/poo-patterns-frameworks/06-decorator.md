---
title: 'Tracer une réservation avec Decorator'
order: 6.5
publishedAt: "2026-10-15"
updatedAt: "2026-10-23"
---

# Tracer une réservation avec Decorator

Après une réservation réussie, on veut garder une trace de son enregistrement, sans changer le résultat renvoyé à l'appelant. Travaillez dans une copie d'[`ateliers.ts`](/ressources/poo-patterns-frameworks/ateliers.ts).

## Le problème

La solution directe écrit la trace dans `reserver`, ou bien après chaque appel.

```ts
const mia = inscriptions.reserver(2, "mia@example.test");
traces.push(`Réservation ${mia.id} enregistrée`);
```

Dans `reserver`, la trace s'ajoute aux règles d'inscription, et chaque besoin technique suivant, comme mesurer une durée ou réessayer après une panne, grossira encore la méthode. Après chaque appel, la même ligne se répète partout, et un oubli passe inaperçu.

Decorator place une enveloppe autour de l'objet. Cette enveloppe respecte le même contrat que lui, transmet chaque appel et ajoute son comportement autour. L'appelant l'utilise comme l'objet d'origine, sans voir la différence.

## La refacto pas à pas

### Étape 1, le contrat

Ajoutez cette interface au-dessus de la classe `Inscriptions`. Elle décrit la seule opération que l'enveloppe expose. `Inscriptions` la respecte déjà, puisque sa méthode `reserver` a la même signature, et TypeScript l'accepte sans `implements`.

```ts
interface ServiceReservation {
	reserver(atelierId: number, email: string): Reservation;
}
```

### Étape 2, l'enveloppe

L'enveloppe garde le service reçu dans son constructeur. Elle lui transmet les mêmes arguments, ajoute la trace seulement après un succès et renvoie le même résultat. Ajoutez-la sous l'interface.

```ts
class ReservationTracee implements ServiceReservation {
	#service: ServiceReservation;
	readonly traces: string[] = [];

	constructor(service: ServiceReservation) {
		this.#service = service;
	}

	reserver(atelierId: number, email: string): Reservation {
		const reservation = this.#service.reserver(atelierId, email);
		this.traces.push(`Réservation ${reservation.id} enregistrée`);
		return reservation;
	}
}
```

### Étape 3, le code qui utilise le contrat

Cette fonction représente le formulaire d'inscription. Elle dépend du contrat, et non d'une classe, donc elle accepte aussi bien `inscriptions` que sa version tracée. Ajoutez-la sous l'enveloppe.

```ts
function envoyerFormulaire(service: ServiceReservation, atelierId: number, email: string): string {
	const reservation = service.reserver(atelierId, email);
	return `Réservation ${reservation.id} confirmée`;
}
```

Vérifiez qu'elle fonctionne déjà avec `inscriptions`, en ajoutant cette ligne après les assertions du départ. L'atelier Dessin est complet à cet endroit.

```ts
assert.throws(() => envoyerFormulaire(inscriptions, 1, "noe@example.test"), /Atelier complet/);
```

### Étape 4, le branchement

Le code qui assemble l'application place l'enveloppe autour de `inscriptions`, puis la donne au formulaire. Ajoutez ce scénario à la suite. Les identifiants 1 à 3 sont déjà pris, et l'atelier Photo a encore une place.

```ts
const tracee = new ReservationTracee(inscriptions);
assert.equal(envoyerFormulaire(tracee, 2, "mia@example.test"), "Réservation 4 confirmée");
assert.deepEqual(tracee.traces, ["Réservation 4 enregistrée"]);
assert.throws(() => envoyerFormulaire(tracee, 2, "noa@example.test"), /Atelier complet/);
assert.equal(tracee.traces.length, 1);
```

Le second appel est refusé, et l'enveloppe n'ajoute aucune trace, car l'erreur interrompt sa méthode avant la ligne qui écrit la trace.

## À vous

Écrivez une enveloppe `ReservationComptee` qui compte chaque appel à `reserver`, réussi ou refusé, puis placez-la autour de `tracee`. Après l'appel refusé `envoyerFormulaire(comptee, 2, "noa@example.test")`, `comptee.tentatives` doit valoir 1, et `tracee.traces` ne doit toujours contenir qu'une ligne.

## La même idée avec une fonction

Une enveloppe peut aussi entourer une fonction. `avecTrace` reçoit une fonction de réservation et renvoie une nouvelle fonction de même signature, qui appelle la première puis ajoute la trace.

```ts
type Reserver = (atelierId: number, email: string) => Reservation;

function avecTrace(reserver: Reserver, traces: string[]): Reserver {
	return (atelierId, email) => {
		const reservation = reserver(atelierId, email);
		traces.push(`Réservation ${reservation.id} enregistrée`);
		return reservation;
	};
}

const traces: string[] = [];
const reserverTracee = avecTrace((id, email) => inscriptions.reserver(id, email), traces);
const mia = reserverTracee(2, "mia@example.test");
assert.deepEqual(traces, [`Réservation ${mia.id} enregistrée`]);
```

La fonction fléchée `(id, email) => inscriptions.reserver(id, email)` a son importance. Passée seule, `inscriptions.reserver` serait appelée sans son objet, `this` vaudrait alors `undefined`, et l'appel échouerait avec une `TypeError`. L'écriture `inscriptions.reserver.bind(inscriptions)` produit le même résultat que la fonction fléchée.

On retrouve cette enveloppe dans le code web. Une fonction qui entoure `fetch` pour ajouter un en-tête garde la signature de `fetch`. Les middlewares de Hono exécutent leur code avant et après `await next()`, qui appelle la route sans qu'elle le sache. Les décorateurs de TypeScript, écrits `@Component` dans Angular, portent le même nom mais servent surtout à annoter une classe.

## Pour réviser

La [fiche Decorator](/ressources/poo-patterns-frameworks/fiches/decorator.html) résume le pattern sur un schéma, et la [fiche de Refactoring.Guru](https://refactoring.guru/fr/design-patterns/decorator) le présente avec d'autres exemples. Decorator conserve le contrat de l'objet entouré, alors qu'un [Adapter](/poo-patterns-frameworks/05-adapter/) traduit un contrat différent.
