---
title: 'Ajouter un tarif avec Strategy'
order: 5
publishedAt: "2026-10-15"
updatedAt: "2026-10-23"
---

# Ajouter un tarif avec Strategy

Le programme des ateliers applique le prix du catalogue à chaque réservation. Vous allez y ajouter un tarif solidaire, égal à la moitié du prix normal arrondie au centime le plus proche. Pour un prix de 2 001 centimes, la réservation enregistre donc 1 001 centimes.

Travaillez dans une copie du [programme de départ `ateliers.ts`](/ressources/poo-patterns-frameworks/ateliers.ts). Le [démarrage de l'atelier](/poo-patterns-frameworks/10-exercice/) explique comment l'exécuter. Les assertions du départ doivent passer après chaque étape.

## Le problème

La solution la plus directe ajoute un troisième paramètre à `reserver` et une condition dans son calcul.

```ts
const montantCentimes = tarif === "solidaire"
	? Math.round(atelier.prixCentimes / 2)
	: atelier.prixCentimes;
```

Elle fonctionne pour deux tarifs. Pourtant, chaque nouveau tarif, étudiant ou groupe, ajoute une branche dans `reserver`, une méthode qui vérifie déjà l'atelier, le courriel, les doublons et les places. Les règles de prix et les règles d'inscription finissent mélangées au même endroit.

Strategy range chaque façon de calculer dans son propre objet, derrière un contrat commun. `reserver` reçoit l'un de ces objets et l'utilise sans savoir lequel.

## La refacto pas à pas

### Étape 1, le contrat

Ajoutez cette interface au-dessus de la classe `Inscriptions`. Elle décrit ce que tout tarif sait faire : recevoir un prix en centimes et renvoyer un montant en centimes entiers, positif ou nul.

```ts
interface Tarif {
	appliquer(prixCentimes: number): number;
}
```

### Étape 2, les classes qui le respectent

Écrivez une classe par tarif, juste sous l'interface. Chacune implémente `Tarif` avec sa propre règle.

```ts
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
```

### Étape 3, le code qui utilise le contrat

`reserver` reçoit maintenant un tarif et lui confie le calcul du montant. Remplacez la méthode `reserver` par celle-ci. Deux choses changent, le troisième paramètre et le calcul de `montantCentimes`.

```ts
class Inscriptions {
	// Les champs, le constructeur et les autres méthodes ne changent pas.

	reserver(atelierId: number, email: string, tarif: Tarif = new TarifNormal()): Reservation {
		const atelier = this.#ateliers.find(a => a.id === atelierId);
		if (!atelier) throw new Error("Atelier inconnu");
		const adresse = email.trim().toLowerCase();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adresse)) throw new Error("Courriel invalide");
		if (this.#reservations.some(r => r.atelierId === atelierId && r.email === adresse))
			throw new Error("Déjà inscrit");
		if (this.#reservations.filter(r => r.atelierId === atelierId).length >= atelier.capacite)
			throw new Error("Atelier complet");
		const montantCentimes = tarif.appliquer(atelier.prixCentimes);
		if (!Number.isSafeInteger(montantCentimes) || montantCentimes < 0)
			throw new Error("Montant invalide");
		const reservation = {
			id: this.#prochainId++, atelierId, email: adresse, montantCentimes,
		};
		this.#reservations.push(reservation);
		this.#notifications.push(`Confirmation ${reservation.id} pour ${adresse}`);
		return { ...reservation };
	}
}
```

La valeur par défaut garde valides les appels à deux arguments du départ. Le contrôle refuse un montant impossible, comme `NaN` ou une valeur négative, avant d'enregistrer quoi que ce soit.

### Étape 4, le branchement

Le code qui appelle `reserver` choisit le tarif et le lui transmet. Ajoutez ces lignes après les assertions du départ. L'atelier Photo a encore une place à cet endroit.

```ts
ateliers[1].prixCentimes = 2001;
const mia = inscriptions.reserver(2, "mia@example.test", new TarifSolidaire());
assert.equal(mia.montantCentimes, 1001);
```

Fournir ainsi l'objet en paramètre s'appelle une **injection de dépendance**. Le [corrigé `ateliers-tarifs.ts`](/ressources/poo-patterns-frameworks/ateliers-tarifs.ts) contient le programme complet, avec d'autres vérifications.

## À vous

Ajoutez un tarif étudiant, égal à 70 % du prix arrondi au centime, sans modifier la classe `Inscriptions`. `new TarifEtudiant().appliquer(2001)` doit valoir 1 401.

## La même idée avec une fonction

Le contrat `Tarif` ne contient qu'une méthode, qui reçoit un prix et renvoie un montant. Une fonction fait exactement cela. En TypeScript, un type de fonction peut donc remplacer l'interface, et chaque tarif devient une constante.

```ts
type CalculTarif = (prixCentimes: number) => number;

const tarifNormal: CalculTarif = prix => prix;
const tarifSolidaire: CalculTarif = prix => Math.round(prix / 2);
```

Dans cette version, `reserver` déclare `tarif: CalculTarif = tarifNormal` et calcule `tarif(atelier.prixCentimes)`. L'appel devient `inscriptions.reserver(2, "mia@example.test", tarifSolidaire)`. Vous utilisez déjà ce mécanisme pour trier un tableau. Dans `[...ateliers].sort((a, b) => a.prixCentimes - b.prixCentimes)`, `sort` garde l'algorithme de tri, et la fonction de comparaison décide de l'ordre.

Les classes restent préférables quand une stratégie regroupe plusieurs opérations, par exemple un tarif qui calcule un montant et fournit aussi son libellé. Elles conviennent aussi quand un framework comme Angular ou NestJS crée les objets à partir de classes.

## Pour réviser

La [fiche Strategy](/ressources/poo-patterns-frameworks/fiches/strategy.html) résume le pattern sur un schéma, et la [fiche de Refactoring.Guru](https://refactoring.guru/fr/design-patterns/strategy) le présente avec d'autres exemples. Si plusieurs endroits du programme doivent choisir le même tarif, la séance [Factory](/poo-patterns-frameworks/04-factory/) regroupe ce choix.
