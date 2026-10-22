---
title: 'Choisir une création avec Factory'
order: 11
publishedAt: "2026-10-15"
updatedAt: "2026-10-22"
---

# Choisir une création avec Factory

Dans la [séance Strategy](/poo-patterns-frameworks/02-strategy/), un appel crée un `TarifNormal` ou un `TarifSolidaire` et fournit cet objet à `reserver`.

Si plusieurs parties du programme doivent choisir quel objet créer à partir du nom d'un tarif, ce choix risque d'être répété. Une fabrique peut le regrouper dans une fonction qui renvoie l'objet attendu.

En TypeScript, une fonction qui renvoie un objet couvre la plupart des besoins de création, c'est pourquoi ce chapitre fait partie des approfondissements. Sa section sur [la fabrique qui garde une configuration](#lire-une-fabrique-qui-garde-une-configuration) explique pourtant la fermeture qu'utilise le store du chapitre [Frameworks 2](/poo-patterns-frameworks/08-2-etat/).

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

`nom` est le paramètre reçu par la fonction. Dans `nom: nom`, le mot de gauche nomme la propriété de l'objet. Celui de droite désigne la valeur du paramètre. `return` renvoie l'objet à l'appelant. Comme chaque appel crée un objet distinct, la dernière comparaison indique que les deux variables ne désignent pas le même objet.

On appelle cette fonction une **fabrique** parce qu'elle crée les objets.

## Lire une fabrique qui garde une configuration

Une fabrique peut aussi créer un objet dont les méthodes conservent un paramètre de configuration. Dans l'exemple suivant, ce paramètre est le préfixe ajouté à chaque salutation.

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

[Factory Pattern sur Patterns.dev](https://www.patterns.dev/vanilla/factory-pattern/) montre ce mécanisme avec `createLogger` et sa méthode `log.warn`.

## Essayer une création liée aux tarifs

Dans une copie du [corrigé des tarifs](/ressources/poo-patterns-frameworks/ateliers-tarifs.ts), une création directe peut s'écrire ainsi.

```ts
const tarifConfigure = new TarifSolidaire();
assert.equal(tarifConfigure.appliquer(2001), 1001);
```

Si plusieurs points d'entrée, par exemple un import et un formulaire, doivent choisir le même tarif à partir de son nom, cette sélection risque d'être répétée. Comparez alors la création directe à une fabrique simple qui regroupe le choix de la classe.

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

Dans cet exemple, l'objet créé implémente `Tarif`. La fonction `creerTarif` regroupe le choix de la classe et la création de cet objet. L'appelant connaît seulement le nom du tarif, par exemple lu dans un fichier d'import. Il reçoit un objet qu'il peut transmettre avec `inscriptions.reserver(2, "mia@example.test", tarifImport)`. Pour essayer cet appel, assurez-vous que l'atelier Photo possède encore une place libre.

Les classes `TarifNormal` et `TarifSolidaire` existent déjà dans le corrigé. Tant qu'un seul appel choisit le tarif, écrire directement `new TarifSolidaire()` évite d'ajouter une fonction.

## Distinguer les noms des sources

La fonction précédente est une fabrique simple, mais toutes les sources n'utilisent pas le mot Factory pour le même mécanisme. Avec Factory Method, des sous-classes redéfinissent la création des objets. Abstract Factory permet plutôt de créer des familles d'objets conçus pour fonctionner ensemble. Le [comparatif des fabriques](https://refactoring.guru/fr/design-patterns/factory-comparison) détaille ces différences.
