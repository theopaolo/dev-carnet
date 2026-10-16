---
title: 'Préparer la persistance avec Repository'
order: 7
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# Préparer la persistance avec Repository

Les réservations doivent survivre au redémarrage. Une confirmation ne doit jamais annoncer un enregistrement refusé. Cette séance prépare les appels au stockage et vérifie leurs échecs avec une simulation. Elle ne livre pas encore le stockage persistant demandé.

Dans une copie d'[`ateliers.ts`](/ressources/poo-patterns-frameworks/ateliers.ts), retrouvez toutes les lectures et écritures de `reservations`. Elles concernent `listerAteliers`, `reserver` et `annuler`. Retrouvez aussi `prochainId`. Un compteur remis à un au redémarrage ne peut pas attribuer les identifiants d'une collection déjà enregistrée.

## Décrire la première solution directe

Sur papier, remplacez chaque accès au tableau par un appel au stockage choisi. Dans `reserver`, placez l'enregistrement avant la confirmation. Dans `annuler`, placez le retrait avant sa notification. Montrez le chemin où le stockage refuse l'écriture.

Cette solution peut convenir à une petite application. Elle demande de lire le code du fournisseur au milieu des règles de réservation. Nous allons comparer un contrat qui nomme les opérations nécessaires au métier.

## Lire Repository avec notre collection

Lisez la [fiche Repository de Martin Fowler](https://martinfowler.com/eaaCatalog/repository.html). Elle présente une collection d'objets métier persistants, accessible sans écrire les détails du stockage dans les règles métier. Repository appartient à ce catalogue d'architecture d'entreprise, pas aux 23 patterns GoF.

1. Quelles opérations notre réservation demande-t-elle réellement à la collection ?
2. Quelle différence faut-il conserver entre une réservation absente et une panne du stockage ?
3. Une collection en mémoire prouve-t-elle que les données survivent à un redémarrage ?

Les objets métier sont les `Reservation`. Le code client comprend `reserver`, `annuler` et `listerAteliers`. Le contrat proposé se nomme `Reservations`. Sa réalisation persistante devra parler au stockage. Notre réalisation `memoire` sert seulement à vérifier les échanges.

## Donner un contrat aux opérations nécessaires

Ajoutez ce contrat après le type `Reservation`.

```ts
interface Reservations {
	lister(): Promise<Reservation[]>;
	ajouter(nouvelle: Omit<Reservation, "id">): Promise<Reservation>;
	retirer(id: number): Promise<Reservation>;
}
```

`Omit<Reservation, "id">` décrit une réservation sans identifiant. La collection attribue cet identifiant lors de l'ajout et renvoie la réservation enregistrée. Le succès d'`ajouter` doit signifier que le stockage a accepté l'enregistrement selon ses garanties documentées. Une panne rejette la promesse. `retirer` rejette aussi la promesse si l'identifiant n'existe pas, comme `annuler` dans le programme de départ.

## Simuler le contrat en mémoire

Ajoutez cet objet après `prochainId`. Il réutilise les données du programme pour que les assertions existantes puissent toujours les examiner.

```ts
const memoire: Reservations = {
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
```

Les copies empêchent un appelant de modifier les enregistrements plats à travers un résultat reçu. Le tableau perd ses données à l'arrêt du programme. Il ne fournit pas de **persistance**.

La différence entre [deux objets et deux références](/poo-patterns-frameworks/01-fondations/#distinguer-deux-objets-et-deux-references) explique cette protection. Si une réservation contenait un objet imbriqué, la copie avec `{ ...reservation }` conserverait une référence vers cet objet. Il faudrait alors préciser ce que les appelants peuvent modifier et adapter la copie à ce contrat.

## Faire passer les trois fonctions par le contrat

Remplacez les trois fonctions du départ par celles-ci. Le stockage mémoire est fourni par défaut pour conserver le sens des appels existants. Les fonctions deviennent asynchrones.

```ts
async function listerAteliers(stockage: Reservations = memoire) {
	const existantes = await stockage.lister();
	return ateliers.map(atelier => ({
		...atelier,
		places: atelier.capacite - existantes.filter(r => r.atelierId === atelier.id).length,
	}));
}

async function reserver(
	atelierId: number,
	email: string,
	stockage: Reservations = memoire,
): Promise<Reservation> {
	const atelier = ateliers.find(a => a.id === atelierId);
	if (!atelier) throw new Error("Atelier inconnu");
	const adresse = email.trim().toLowerCase();
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adresse)) throw new Error("Courriel invalide");
	const existantes = await stockage.lister();
	if (existantes.some(r => r.atelierId === atelierId && r.email === adresse))
		throw new Error("Déjà inscrit");
	if (existantes.filter(r => r.atelierId === atelierId).length >= atelier.capacite)
		throw new Error("Atelier complet");
	const reservation = await stockage.ajouter({
		atelierId, email: adresse, montantCentimes: atelier.prixCentimes,
	});
	notifications.push(`Confirmation ${reservation.id} pour ${adresse}`);
	return { ...reservation };
}

async function annuler(reservationId: number, stockage: Reservations = memoire): Promise<void> {
	const reservation = await stockage.retirer(reservationId);
	notifications.push(`Annulation ${reservation.id} pour ${reservation.email}`);
}
```

Dans cette séance, le troisième argument est le stockage. Dans la [séance des tarifs](/poo-patterns-frameworks/02-strategy/), il était le calcul. Ces copies étudient séparément chaque changement. Pour les réunir, il faudra choisir une signature commune et adapter tous ses appels.

## Adapter les appels et provoquer une panne

Retrouvez chaque appel aux trois fonctions, y compris dans les assertions et les messages finaux. Attendez leurs résultats avec `await`. Une erreur asynchrone se vérifie avec `assert.rejects`, qui attend aussi une promesse.

Voici trois transformations représentatives.

```ts
assert.deepEqual((await listerAteliers()).map(a => a.places), [2, 1]);
await assert.rejects(() => reserver(999, "lea@example.test"), /Atelier inconnu/);
const lea = await reserver(1, " Lea@example.test ");
```

Ces lignes remplacent les contrôles correspondants du départ. Elles ne s'ajoutent pas à une série qui aurait déjà réservé la place de Léa. Transformez de la même façon les autres `assert.throws` sur `reserver` et `annuler`, les appels de réservation, d'annulation, et les lectures de la liste.

Après tous les contrôles du départ, ajoutez ces simulations de panne.

```ts
const avantPanne = notifications.length;
const refus: Reservations = {
	...memoire,
	async ajouter() { throw new Error("Enregistrement refusé"); },
	async retirer() { throw new Error("Retrait refusé"); },
};
await assert.rejects(() => reserver(2, "mia@example.test", refus), /Enregistrement refusé/);
await assert.rejects(() => annuler(sam.id, refus), /Retrait refusé/);
assert.equal(notifications.length, avantPanne);
assert.equal(reservations.length, 2);
assert.ok(reservations.some(r => r.id === sam.id));

const copie = await memoire.lister();
copie[0].montantCentimes = 1;
assert.equal(reservations[0].montantCentimes, 2000);
```

Le montant de Sam vaut encore 2 000 dans le scénario de départ. La dernière assertion prouve que modifier la copie ne modifie pas le stockage simulé.

## Distinguer ce qui est vérifié et ce qui reste à construire

Les contrôles vérifient les règles séquentielles, le montant figé, les copies et l'absence de notification après un refus du stockage. Le contrat sépare ces règles des détails du stockage et permet de comparer plusieurs réalisations.

La demande de persistance reste ouverte tant qu'aucune réalisation durable n'est fournie. Pour la valider, enregistrez une réservation avec le vrai stockage, arrêtez le processus, puis retrouvez la même réservation après redémarrage. Le compteur d'identifiants doit aussi éviter les collisions avec les anciennes données.

Un [Adapter](/poo-patterns-frameworks/05-adapter/) peut traduire les appels au fournisseur dans une réalisation de Repository.
