---
title: 'Choisir une création avec Factory, aide facultative'
order: 10
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# Choisir une création avec Factory, aide facultative

Dans la [séance Strategy](/poo-patterns-frameworks/02-strategy/), un appel choisit `normal` ou `solidaire` et fournit cette fonction à `reserver`.

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
const tarifConfigure = (prixCentimes: number) => Math.round(prixCentimes / 2);
assert.equal(tarifConfigure(2001), 1001);
```

Si plusieurs entrées doivent construire les mêmes règles, comparez cette fonction à une fabrique simple.

```ts
function creerTarif(nom: "normal" | "solidaire"): Tarif {
	if (nom === "solidaire") return prix => Math.round(prix / 2);
	return prix => prix;
}

const tarifImport = creerTarif("solidaire");
assert.equal(tarifImport(2001), 1001);
assert.equal(creerTarif("normal")(2001), 2001);
assert.equal(creerTarif("solidaire")(0), 0);
```

Dans cet exemple, le produit est une fonction respectant `Tarif`. `creerTarif` regroupe le choix et la création. L'appelant l'utilise avec `reserver(2, "mia@example.test", tarifImport)`, dans un scénario où Photo possède une place libre.

Comparez le code ajouté au besoin actuel. Les fonctions `normal` et `solidaire` existent déjà dans le corrigé. Les sélectionner directement évite de les recréer.

## Distinguer les noms des sources

La fonction précédente est une fabrique simple. Factory Method fait redéfinir la création par des sous-classes ; Abstract Factory crée des familles de produits compatibles. Le [comparatif des fabriques](https://refactoring.guru/fr/design-patterns/factory-comparison) propose un approfondissement facultatif de ce vocabulaire.

Pour justifier une fabrique, montrez les créations répétées qu'elle réunit et les valeurs qu'elle doit initialiser.
