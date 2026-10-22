---
title: 'Ajouter un tarif avec Strategy'
order: 5
publishedAt: "2026-10-15"
updatedAt: "2026-10-22"
---

# Ajouter un tarif avec Strategy

Le programme des ateliers applique actuellement le prix du catalogue à chaque réservation. Vous allez y ajouter un tarif solidaire, égal à la moitié du prix normal et arrondi au centime le plus proche. Pour un prix normal de 2 001 centimes, on enregistre donc un montant de 1 001 centimes. Ce montant doit rester figé après l'inscription, même si le catalogue change. L'ajout du tarif doit aussi préserver les refus existants, qui ne créent ni réservation ni notification.

Pour comparer deux solutions qui répondent à cette demande, travaillez dans une copie du [programme de départ `ateliers.ts`](/ressources/poo-patterns-frameworks/ateliers.ts). Le [démarrage de l'atelier](/poo-patterns-frameworks/10-exercice/) explique comment l'exécuter. Conservez les assertions du départ afin de vérifier que les deux variantes respectent toujours les comportements existants.

## Retrouver le calcul actuel

Dans la méthode `reserver` de la classe `Inscriptions`, retrouvez `montantCentimes: atelier.prixCentimes`. Cette ligne copie le prix du catalogue dans la réservation. `listerAteliers` ne calcule aucun tarif. `annuler` libère une place sans modifier les montants des autres réservations.

Avant de modifier le code, repérez les quatre cas où `reserver` refuse la demande. Il s'agit d'un atelier inconnu, d'un courriel invalide, d'une double inscription et d'un atelier complet. Repérez ensuite les deux appels qui enregistrent la réservation et sa notification. Ces appels à `this.#reservations.push` et `this.#notifications.push` doivent rester après les validations pour ne rien enregistrer en cas de refus.

## Ajouter d'abord une condition

Remplacez seulement la méthode `reserver` par cette version. Le troisième paramètre choisit le tarif, tandis que sa valeur par défaut conserve les appels à deux arguments. Le type `"normal" | "solidaire"` autorise ces deux valeurs pour `tarif`.

```ts
class Inscriptions {
	// Les champs, le constructeur et les autres méthodes ne changent pas.

	reserver(
		atelierId: number,
		email: string,
		tarif: "normal" | "solidaire" = "normal",
	): Reservation {
		const atelier = this.#ateliers.find(a => a.id === atelierId);
		if (!atelier) throw new Error("Atelier inconnu");
		const adresse = email.trim().toLowerCase();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adresse)) throw new Error("Courriel invalide");
		if (this.#reservations.some(r => r.atelierId === atelierId && r.email === adresse))
			throw new Error("Déjà inscrit");
		if (this.#reservations.filter(r => r.atelierId === atelierId).length >= atelier.capacite)
			throw new Error("Atelier complet");
		const montantCentimes = tarif === "solidaire"
			? Math.round(atelier.prixCentimes / 2)
			: atelier.prixCentimes;
		const reservation = {
			id: this.#prochainId++, atelierId, email: adresse, montantCentimes,
		};
		this.#reservations.push(reservation);
		this.#notifications.push(`Confirmation ${reservation.id} pour ${adresse}`);
		return { ...reservation };
	}
}
```

Ajoutez ces assertions après celles du fichier de départ. L'atelier Photo possède encore sa place libre à cet endroit.

```ts
ateliers[1].prixCentimes = 2001;
const mia = inscriptions.reserver(2, "mia@example.test", "solidaire");
assert.equal(mia.montantCentimes, 1001);
ateliers[1].prixCentimes = 4000;
assert.equal(inscriptions.reservations.find(r => r.id === mia.id)?.montantCentimes, 1001);
const avantRefus = inscriptions.notifications.length;
assert.throws(() => inscriptions.reserver(2, "noa@example.test"), /Atelier complet/);
assert.equal(inscriptions.notifications.length, avantRefus);
```

## Le principe de Strategy

Strategy consiste à isoler plusieurs façons d'effectuer un même calcul ou traitement derrière un contrat commun. Le code qui utilise ce contrat peut alors recevoir l'une ou l'autre de ces stratégies. Ici, on souhaite comparer des façons de calculer le montant d'une réservation.

La [fiche Strategy de Refactoring.Guru](https://refactoring.guru/fr/design-patterns/strategy) présente une structure à base de classes. Dans notre variante, chaque tarif devient une classe qui implémente une interface commune.

Le **contexte** de la source correspond ici à la classe `Inscriptions`, et plus précisément à sa méthode `reserver`. Le **contrat** devient l'interface `Tarif`. Les stratégies concrètes sont les classes `TarifNormal` et `TarifSolidaire`. Le client est l'appel qui crée l'un de ces objets et le transmet à `reserver`.

## Comparer un objet de tarif fourni à la réservation

Conservez votre première solution pour pouvoir la comparer à la suivante. Dans une copie de cette solution, ajoutez ces définitions au-dessus de la classe `Inscriptions`.

```ts
interface Tarif {
	appliquer(prixCentimes: number): number;
}

class TarifNormal implements Tarif {
	appliquer(prixCentimes: number): number {
		return prixCentimes;
	}
}

class TarifSolidaire implements Tarif {
	appliquer(prixCentimes: number): number {
		return Math.round(prixCentimes / 2);
	}
}

const solidaire = new TarifSolidaire();
assert.equal(solidaire.appliquer(2001), 1001);
assert.equal(solidaire.appliquer(0), 0);
assert.equal(new TarifNormal().appliquer(2001), 2001);
```

Le contrat de `appliquer` ne porte pas seulement sur le nom de la méthode. Elle doit recevoir un prix et renvoyer un montant, tous deux exprimés en centimes entiers, positifs ou nuls. Remplacez le troisième paramètre et le calcul de la première solution comme suit, sans changer l'ordre des autres opérations de `reserver`.

```diff
-		tarif: "normal" | "solidaire" = "normal",
+		tarif: Tarif = new TarifNormal(),
```

```diff
-		const montantCentimes = tarif === "solidaire"
-			? Math.round(atelier.prixCentimes / 2)
-			: atelier.prixCentimes;
+		const montantCentimes = tarif.appliquer(atelier.prixCentimes);
+		if (!Number.isSafeInteger(montantCentimes) || montantCentimes < 0)
+			throw new Error("Montant invalide");
```

Le résultat est validé avant `this.#prochainId++`, l'enregistrement et la notification. Si une règle renvoie `NaN`, un montant négatif ou une fraction, le programme refuse donc la demande sans consommer d'identifiant ni enregistrer de réservation ou de notification.

Changez aussi l'appel de test en `inscriptions.reserver(2, "mia@example.test", solidaire)`. Les anciens appels à deux arguments reçoivent la valeur par défaut, un nouvel objet `TarifNormal`. Dans `reserver`, la ligne `tarif.appliquer(atelier.prixCentimes)` exécute la méthode de l'objet reçu sans savoir de quelle classe il provient. Fournir cet objet en paramètre est une **injection de dépendance**. Strategy décrit ici le choix entre plusieurs calculs interchangeables.

## Vérifier les deux solutions

Exécutez le programme après chaque variante. Les assertions initiales doivent toujours passer. Ajoutez les contrôles suivants.

- Le tarif normal conserve le prix du catalogue. Le tarif solidaire transforme 2 001 en 1 001 et zéro en zéro.
- Une modification du catalogue ne change pas un montant déjà enregistré.
- Un atelier inconnu, un courriel invalide, un doublon et un atelier complet ne créent aucune notification.
- Dans la variante injectée, un calcul invalide ne crée rien et ne consomme pas d'identifiant.

Un montant enregistré est une valeur calculée au moment de réserver. Conserver seulement l'objet de tarif puis recalculer le prix à chaque lecture ne respecterait pas cette règle.

## Comparer avec le corrigé

Le [corrigé autonome `ateliers-tarifs.ts`](/ressources/poo-patterns-frameworks/ateliers-tarifs.ts) contient le programme complet avec l'objet `Tarif` injecté. Ses tests utilisent aussi trois petites classes de tarif, qui imposent un montant invalide, simulent une panne ou comptent les appels. Téléchargez-le puis exécutez `node ateliers-tarifs.ts`. Il conserve les contrôles du départ et ajoute ceux des tarifs.

```text
Vérifications réussies.
Ateliers au catalogue : 2
Réservations actives : 3
Notifications en mémoire : 7
```

Dans la première solution, la condition regroupe les deux tarifs dans la méthode `reserver`. Avec l'injection, chaque appelant choisit un objet de tarif, dont le calcul peut évoluer sans modifier la méthode de réservation.

Si plusieurs endroits doivent choisir le même tarif, [Factory](/poo-patterns-frameworks/04-factory/) permet de regrouper cette sélection.

## La même idée avec une fonction

Le contrat `Tarif` ne contient qu'une méthode, qui reçoit un prix et renvoie un montant. Une fonction fait déjà exactement cela. En TypeScript, on peut donc remplacer l'interface par un type de fonction, et chaque tarif devient une constante, sans classe ni `new`.

```ts
type CalculTarif = (prixCentimes: number) => number;

const tarifNormal: CalculTarif = prix => prix;
const tarifSolidaire: CalculTarif = prix => Math.round(prix / 2);

assert.equal(tarifSolidaire(2001), 1001);
assert.equal(tarifNormal(2001), 2001);
```

Dans une copie de la variante injectée, le paramètre de `reserver` reçoit maintenant cette fonction, et le calcul l'appelle directement. La validation du montant qui suit ne change pas.

```diff
-		tarif: Tarif = new TarifNormal(),
+		tarif: CalculTarif = tarifNormal,
```

```diff
-		const montantCentimes = tarif.appliquer(atelier.prixCentimes);
+		const montantCentimes = tarif(atelier.prixCentimes);
```

L'appel de test devient `inscriptions.reserver(2, "mia@example.test", tarifSolidaire)`. Le mécanisme reste celui de Strategy, puisque `reserver` utilise un calcul qu'elle reçoit sans savoir lequel. Vous l'employez d'ailleurs chaque fois que vous triez un tableau. Dans `[...ateliers].sort((a, b) => a.prixCentimes - b.prixCentimes)`, `sort` garde l'algorithme de tri, tandis que la fonction de comparaison décide de l'ordre.

La version en classes reste préférable quand une stratégie regroupe plusieurs opérations, par exemple un tarif qui calcule un montant et fournit aussi son libellé. Elle convient aussi quand un framework crée les objets à partir de classes, comme l'injection de dépendances d'Angular ou de NestJS.
