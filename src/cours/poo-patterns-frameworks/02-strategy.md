---
title: 'Ajouter un tarif avec Strategy'
order: 5
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# Ajouter un tarif avec Strategy

Ajoutons un tarif solidaire au programme des ateliers. Il coûte la moitié du prix normal, arrondie au centime le plus proche. Une réservation à 2 001 centimes coûte donc 1 001 centimes. Son montant reste figé après l'inscription. Un refus ne crée ni réservation ni notification.

Travaillez dans une copie du [programme de départ `ateliers.ts`](/ressources/poo-patterns-frameworks/ateliers.ts). Le [démarrage de l'atelier](/poo-patterns-frameworks/10-exercice/) explique comment l'exécuter. Conservez ses assertions. Nous comparerons deux solutions qui répondent à la même demande.

## Retrouver le calcul actuel

Dans `reserver`, retrouvez `montantCentimes: atelier.prixCentimes`. Cette ligne copie le prix du catalogue dans la réservation. `listerAteliers` ne calcule aucun tarif. `annuler` libère une place sans modifier les montants des autres réservations.

Avant de modifier le code, repérez les quatre refus de `reserver` et les deux écritures qui les suivent. Les appels à `reservations.push` et `notifications.push` doivent rester après les validations.

## Ajouter d'abord une condition

Remplacez seulement `reserver` par cette version. Le troisième paramètre choisit le tarif. Sa valeur par défaut conserve les appels à deux arguments.

```ts
function reserver(
	atelierId: number,
	email: string,
	tarif: "normal" | "solidaire" = "normal",
): Reservation {
	const atelier = ateliers.find(a => a.id === atelierId);
	if (!atelier) throw new Error("Atelier inconnu");
	const adresse = email.trim().toLowerCase();
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adresse)) throw new Error("Courriel invalide");
	if (reservations.some(r => r.atelierId === atelierId && r.email === adresse))
		throw new Error("Déjà inscrit");
	if (reservations.filter(r => r.atelierId === atelierId).length >= atelier.capacite)
		throw new Error("Atelier complet");
	const montantCentimes = tarif === "solidaire"
		? Math.round(atelier.prixCentimes / 2)
		: atelier.prixCentimes;
	const reservation = {
		id: prochainId++, atelierId, email: adresse, montantCentimes,
	};
	reservations.push(reservation);
	notifications.push(`Confirmation ${reservation.id} pour ${adresse}`);
	return { ...reservation };
}
```

Ajoutez ces assertions après celles du fichier de départ. L'atelier Photo possède encore sa place libre à cet endroit.

```ts
ateliers[1].prixCentimes = 2001;
const mia = reserver(2, "mia@example.test", "solidaire");
assert.equal(mia.montantCentimes, 1001);
ateliers[1].prixCentimes = 4000;
assert.equal(reservations.find(r => r.id === mia.id)?.montantCentimes, 1001);
const avantRefus = notifications.length;
assert.throws(() => reserver(2, "noa@example.test"), /Atelier complet/);
assert.equal(notifications.length, avantRefus);
```

Le type `"normal" | "solidaire"` autorise ces deux valeurs pour `tarif`.

## Lire Strategy avec notre problème en tête

Lisez les sections « Solution », « Structure » et « Avantages et inconvénients » de [Strategy sur Refactoring.Guru](https://refactoring.guru/fr/design-patterns/strategy). La source présente des objets et des classes. Dans notre variante, une fonction peut porter le calcul.

Répondez avant d'extraire la règle.

1. Quelle partie de `reserver` varie entre les deux tarifs ?
2. Qui choisit le tarif si `reserver` reçoit une fonction ?
3. Quel coût ajoute ce choix pour deux règles utilisées à un seul endroit ?

Le **contexte** de la source correspond ici à `reserver`. Le **contrat** devient le type `Tarif`. Les stratégies concrètes sont `normal` et `solidaire`. Le client est l'appel qui fournit l'une de ces fonctions.

## Comparer une fonction de tarif fournie à la réservation

Dans une autre copie, ajoutez ces définitions au-dessus de `reserver`.

```ts
type Tarif = (prixCentimes: number) => number;
const normal: Tarif = prix => prix;
const solidaire: Tarif = prix => Math.round(prix / 2);

assert.equal(solidaire(2001), 1001);
assert.equal(solidaire(0), 0);
assert.equal(normal(2001), 2001);
```

Ce contrat reçoit et renvoie des entiers en centimes, positifs ou nuls. Remplacez le troisième paramètre et le calcul de la première solution comme suit. Le reste de `reserver` conserve le même ordre.

```diff
-	tarif: "normal" | "solidaire" = "normal",
+	tarif: Tarif = normal,
```

```diff
-const montantCentimes = tarif === "solidaire"
-	? Math.round(atelier.prixCentimes / 2)
-	: atelier.prixCentimes;
+const montantCentimes = tarif(atelier.prixCentimes);
+if (!Number.isSafeInteger(montantCentimes) || montantCentimes < 0)
+	throw new Error("Montant invalide");
```

La validation du résultat précède `prochainId++`, l'enregistrement et la notification. Une règle qui renvoie `NaN`, un montant négatif ou une fraction ne doit pas laisser une réservation partielle.

Changez aussi l'appel de test en `reserver(2, "mia@example.test", solidaire)`. Les anciens appels à deux arguments utilisent encore `normal`. Fournir la fonction en paramètre est une **injection de dépendance**. Strategy décrit ici le choix entre plusieurs calculs interchangeables.

## Vérifier les deux solutions

Exécutez le programme après chaque variante. Les assertions initiales doivent toujours passer. Ajoutez les contrôles suivants.

- Le tarif normal conserve le prix du catalogue. Le tarif solidaire transforme 2 001 en 1 001 et zéro en zéro.
- Une modification du catalogue ne change pas un montant déjà enregistré.
- Un atelier inconnu, un courriel invalide, un doublon et un atelier complet ne créent aucune notification.
- Dans la variante injectée, un calcul invalide ne crée rien et ne consomme pas d'identifiant.

Un montant enregistré est une valeur calculée au moment de réserver. Conserver seulement la fonction puis recalculer le prix à chaque lecture ne respecterait pas cette règle.

## Comparer avec le corrigé

Le [corrigé autonome `ateliers-tarifs.ts`](/ressources/poo-patterns-frameworks/ateliers-tarifs.ts) contient le programme complet avec la fonction `Tarif` injectée. Téléchargez-le puis exécutez `node ateliers-tarifs.ts`. Il conserve les contrôles du départ et ajoute ceux des tarifs.

```text
Vérifications réussies.
Ateliers au catalogue : 2
Réservations actives : 3
Notifications en mémoire : 7
```

La condition regroupe les deux tarifs dans `reserver`. L’injection permet aux appelants de choisir des calculs différents et de les faire évoluer séparément.

Dans le [carnet de décisions sur les tarifs](/poo-patterns-frameworks/09-situations/#situation-1-des-tarifs-qui-varient), justifiez votre choix avec le code modifié et un coût concret. Si la sélection se répète réellement, l'[aide Factory](/poo-patterns-frameworks/04-factory/) permet de l'examiner.
