---
title: 'Ressources et bibliographie'
order: 11
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# Ressources et bibliographie

Ces références approfondissent les mécanismes des exemples TypeScript et leurs structures orientées objet.

## POO, contrats et SOLID

Le [manuel TypeScript sur les classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) décrit les champs, les méthodes, la visibilité et l'héritage. La page sur la [compatibilité des types](https://www.typescriptlang.org/docs/handbook/type-compatibility.html) explique pourquoi un objet peut respecter une interface sans déclaration explicite.

Robert C. Martin précise le lien entre [responsabilité unique et acteurs du changement](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html). Son article [Solid Relevance](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html) rappelle les cinq principes et leur portée au-delà d'un langage particulier.

## Structures des patterns

Les fiches françaises de Refactoring.Guru présentent [Strategy](https://refactoring.guru/fr/design-patterns/strategy), [Observer](https://refactoring.guru/fr/design-patterns/observer), [Adapter](https://refactoring.guru/fr/design-patterns/adapter) et [Decorator](https://refactoring.guru/fr/design-patterns/decorator). Le [comparatif des fabriques](https://refactoring.guru/fr/design-patterns/factory-comparison) distingue le terme général, la fabrique simple et les patterns de création. Les schémas représentent les dépendances entre rôles.

La [fiche Repository de Martin Fowler](https://martinfowler.com/eaaCatalog/repository.html) rattache ce pattern à une collection d'objets métier.

## Frameworks et cycle d'exécution

Les textes de Fowler sur l'[inversion de contrôle](https://martinfowler.com/bliki/InversionOfControl.html) et l'[injection de dépendances](https://martinfowler.com/articles/injection.html) distinguent la conduite de l'exécution et l'assemblage des collaborateurs.

La documentation React décrit les étapes de [rendu et de commit](https://react.dev/learn/render-and-commit). MDN détaille l'[inscription](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener) et le [retrait](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/removeEventListener) d'écouteurs DOM.

## Trois livres pour approfondir

- Erich Gamma, Richard Helm, Ralph Johnson et John Vlissides, [*Design Patterns: Elements of Reusable Object-Oriented Software*](https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480), Addison-Wesley Professional. Publication en 1994, copyright 1995. C'est le catalogue GoF de 23 patterns orientés objet. À consulter pour les intentions, les rôles et les conséquences des structures classiques.
- Eric Freeman et Elisabeth Robson, [*Head First Design Patterns*, 2e édition](https://www.oreilly.com/library/view/head-first-design/9781492077992/), O'Reilly, 2020. Son approche illustrée et ses exemples Java offrent une autre entrée dans les patterns. Les mécanismes se transposent à TypeScript, en tenant compte des fonctions et du typage structurel.
- Martin Fowler et coauteurs, [*Patterns of Enterprise Application Architecture*](https://martinfowler.com/books/eaa.html), 2002. À consulter pour la séparation entre métier et persistance, dont Repository. Le catalogue traite des problèmes d'applications d'entreprise plus larges que ceux du point de départ du cours.

## Décisions et mise en pratique

Le texte de Michael Nygard sur les [Architecture Decision Records](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) propose de conserver le contexte et les conséquences des décisions.

Sur ce site, [Refactoriser](/lire-une-codebase/03-refactoriser/), [DRY, KISS et YAGNI](/lire-une-codebase/10-principes/) et les [ADR](/architecture-logicielle/06-adr/) complètent les [études de cas](/poo-patterns-frameworks/09-situations/). Les exemples peuvent se vérifier avec l'[exercice autonome](/poo-patterns-frameworks/10-exercice/).
