---
title: 'Tracer une réservation avec Decorator'
order: 6.5
publishedAt: "2026-10-15"
updatedAt: "2026-10-22"
---

# Tracer une réservation avec Decorator

Après une réservation réussie, on veut conserver une trace de son enregistrement sans changer le résultat renvoyé à l'appelant. Decorator utilise une enveloppe, c'est-à-dire un objet qui reçoit un autre objet et ajoute un comportement autour de ses appels, tout en conservant son contrat.

Travaillez dans une copie d'[`ateliers.ts`](/ressources/poo-patterns-frameworks/ateliers.ts). Retrouvez la signature de la méthode `reserver`, les situations où elle refuse la réservation et la copie qu'elle renvoie en cas de succès. Ces éléments constituent les garanties que l'enveloppe devra conserver.

## Commencer par l'appel direct

Après les assertions du programme de départ, l'atelier Photo possède encore une place. Ajoutez ce scénario dans une copie.

```ts
const traces: string[] = [];
const mia = inscriptions.reserver(2, "mia@example.test");
traces.push(`Réservation ${mia.id} enregistrée`);
assert.equal(traces[0], `Réservation ${mia.id} enregistrée`);
```

Si `inscriptions.reserver` lance une erreur, la ligne qui ajoute la trace n'est pas exécutée. La trace décrit donc uniquement une réservation réussie lors de cet appel, pas toutes les réservations de l'application.

## L'enveloppe de Decorator

La [fiche Decorator de Refactoring.Guru](https://refactoring.guru/fr/design-patterns/decorator) montre comment cette enveloppe entoure un objet.

Dans notre variante, l'interface `ServiceReservation` sera le contrat commun, et la classe `Inscriptions` réalisera l'opération de réservation. La classe `ReservationTracee` implémentera le même contrat et conservera une référence vers l'objet reçu dans son constructeur. L'appelant utilisera cette enveloppe comme il utiliserait `inscriptions`. On compose ainsi les objets en faisant appel à l'un depuis l'autre, sans modifier la classe d'origine.

## Comparer avec un objet qui entoure `inscriptions`

Pour comparer les variantes sans réserver deux fois la même place, repartez d'une autre copie du programme initial. Ajoutez ces définitions après la classe `Inscriptions`.

```ts
interface ServiceReservation {
	reserver(atelierId: number, email: string): Reservation;
}

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

`ServiceReservation` décrit la seule opération que l'enveloppe expose. La classe `Inscriptions` satisfait ce contrat parce qu'elle possède déjà une méthode avec la signature attendue. TypeScript accepte donc de l'utiliser sans écrire `implements ServiceReservation`. L'enveloppe transmet les mêmes arguments à l'objet entouré et renvoie sa valeur de retour. Elle ajoute la trace seulement après le succès, sans transformer une erreur en réservation fictive.

Dans cette seconde copie, ajoutez les assertions suivantes après celles du programme de départ. Elles vérifient la réservation et sa trace, puis l'absence de nouvelle trace lorsque l'atelier est complet.

```ts
const tracee = new ReservationTracee(inscriptions);
const mia = tracee.reserver(2, "mia@example.test");
assert.ok(inscriptions.reservations.some(r => r.id === mia.id));
assert.deepEqual(tracee.traces, [`Réservation ${mia.id} enregistrée`]);
assert.throws(() => tracee.reserver(2, "noa@example.test"), /Atelier complet/);
assert.equal(tracee.traces.length, 1);

const resultatAttendu: Reservation = {
	id: 99, atelierId: 2, email: "test@example.test", montantCentimes: 3000,
};
class ServiceSimule implements ServiceReservation {
	reserver(): Reservation {
		return resultatAttendu;
	}
}
const traceeSimulee = new ReservationTracee(new ServiceSimule());
assert.equal(traceeSimulee.reserver(2, "test@example.test"), resultatAttendu);
```

Pour le dernier contrôle, `ServiceSimule` remplace `Inscriptions` et renvoie un objet connu. L'assertion vérifie que l'enveloppe renvoie exactement cet objet, sans le remplacer par une autre valeur.

## Conserver les garanties de l'opération

Cette enveloppe correspond à la méthode du départ, qui renvoie directement un résultat et reçoit deux arguments. Elle expose seulement `reserver`, parce que son contrat ne demande rien d'autre. En particulier, elle ne transmet pas le troisième argument ajouté dans la séance Strategy. Si vous combinez les séances, adaptez la signature et vérifiez que le tarif fourni arrive à l'opération de réservation.

Decorator conserve le contrat de l'opération, tandis qu'un [Adapter](/poo-patterns-frameworks/05-adapter/) traduit un contrat différent.

## La même idée avec une fonction

Une enveloppe peut aussi entourer une fonction. `avecTrace` reçoit une fonction de réservation et renvoie une nouvelle fonction de même signature, qui appelle la première puis ajoute la trace. Essayez-la dans une nouvelle copie du programme initial, après les assertions de départ.

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
assert.throws(() => reserverTracee(2, "noa@example.test"), /Atelier complet/);
assert.equal(traces.length, 1);
```

La fonction fléchée `(id, email) => inscriptions.reserver(id, email)` a son importance. Si l'on passait `inscriptions.reserver` seul, la méthode serait appelée sans son objet. `this` vaudrait alors `undefined`, et l'appel échouerait avec une `TypeError`. L'écriture `inscriptions.reserver.bind(inscriptions)` produit le même résultat que la fonction fléchée.

On retrouve cette enveloppe dans le code web. Une fonction qui entoure `fetch` pour ajouter un en-tête ou réessayer après une panne garde la signature de `fetch` et ajoute un comportement autour de l'appel. Les middlewares de Hono s'en rapprochent aussi : leur code s'exécute avant et après `await next()`, qui appelle le gestionnaire de la route sans que celui-ci le sache. Les décorateurs de TypeScript, écrits `@Component` dans Angular, partagent le nom du pattern mais servent surtout à annoter une classe au moment de sa déclaration.
