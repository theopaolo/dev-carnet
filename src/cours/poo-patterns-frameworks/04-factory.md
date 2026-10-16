---
title: 'Choisir une création avec Factory, aide facultative'
order: 10
publishedAt: "2026-10-15"
updatedAt: "2026-10-16"
---

# Choisir une création avec Factory, aide facultative

Dans la [séance Strategy](/poo-patterns-frameworks/02-strategy/), un appel crée un `TarifNormal` ou un `TarifSolidaire` et fournit cet objet à `reserver`.

Cette aide illustre comment une fabrique peut regrouper une création répétée.

## Lire une fonction qui crée un objet

Commencez par cet exemple JavaScript, sans classe ni types TypeScript.

```js
function creerParticipant(nom) {
	return {
		nom: nom,
		statut: "inscrit"
	};
}

const lina = creerParticipant("Lina");
const sam = creerParticipant("Sam");
console.log(lina.nom); // Lina
console.log(sam.nom); // Sam
console.log(lina === sam); // false
```

`nom` est le paramètre reçu par la fonction. Dans `nom: nom`, le mot de gauche nomme la propriété de l'objet. Celui de droite désigne la valeur du paramètre. `return` renvoie l'objet à l'appelant. Chaque appel crée un nouvel objet.

On appelle cette fonction une **fabrique** parce qu'elle crée les objets.

## Lire une fabrique qui garde une configuration

```js
function creerAccueil(prefixe) {
	return {
		saluer: function (nom) {
			return prefixe + nom;
		}
	};
}

const accueil = creerAccueil("Bienvenue ");
console.log(accueil.saluer("Lina")); // Bienvenue Lina
console.log(accueil.saluer("Sam")); // Bienvenue Sam
```

`creerAccueil("Bienvenue ")` crée l'objet une fois. Les deux appels à `saluer` utilisent le même préfixe. La méthode garde accès au paramètre après la fin de l'appel à `creerAccueil`. Ce mécanisme s'appelle une [fermeture, ou closure](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Closures).

Dans [Factory Pattern sur Patterns.dev](https://www.patterns.dev/vanilla/factory-pattern/), suivez la configuration de `createLogger`, l'objet renvoyé, puis l'appel à `log.warn`.

1. Quelle valeur appartient à chaque objet créé ?
2. Quelle valeur `saluer` conserve-t-elle entre deux appels ?
3. Notre programme des ateliers a-t-il déjà plusieurs créations identiques à synchroniser ?

## Essayer une création liée aux tarifs

Dans une copie du [corrigé des tarifs](/ressources/poo-patterns-frameworks/ateliers-tarifs.ts), une création directe peut s'écrire ainsi.

```ts
const tarifConfigure = new TarifSolidaire();
assert.equal(tarifConfigure.appliquer(2001), 1001);
```

Si plusieurs entrées doivent construire les mêmes règles à partir d'un nom, comparez cette création directe à une fabrique simple.

```ts
function creerTarif(nom: "normal" | "solidaire"): Tarif {
	if (nom === "solidaire") return new TarifSolidaire();
	return new TarifNormal();
}

const tarifImport = creerTarif("solidaire");
assert.equal(tarifImport.appliquer(2001), 1001);
assert.equal(creerTarif("normal").appliquer(2001), 2001);
assert.equal(creerTarif("solidaire").appliquer(0), 0);
```

Dans cet exemple, le produit est un objet qui implémente `Tarif`. `creerTarif` regroupe le choix de la classe et la création de l'objet. L'appelant connaît seulement le nom du tarif, par exemple lu dans un fichier d'import, et reçoit un objet prêt à transmettre avec `reserver(2, "mia@example.test", tarifImport)`, dans un scénario où Photo possède une place libre.

Comparez le code ajouté au besoin actuel. Les classes `TarifNormal` et `TarifSolidaire` existent déjà dans le corrigé. Tant qu'un seul appel choisit le tarif, écrire directement `new TarifSolidaire()` évite d'ajouter une fonction.

## Distinguer les noms des sources

La fonction précédente est une fabrique simple. Factory Method fait redéfinir la création par des sous-classes ; Abstract Factory crée des familles de produits compatibles. Le [comparatif des fabriques](https://refactoring.guru/fr/design-patterns/factory-comparison) propose un approfondissement facultatif de ce vocabulaire.

Pour justifier une fabrique, montrez les créations répétées qu'elle réunit et les valeurs qu'elle doit initialiser.
