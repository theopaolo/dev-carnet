---
title: 'Ressources et bibliographie'
order: 13
publishedAt: "2026-10-15"
updatedAt: "2026-10-16"
---

# Ressources et bibliographie

Ces ressources aident à comprendre les exemples TypeScript du cours et à comparer leurs choix de conception. Consultez-les selon vos besoins.

| Besoin | Lecture conseillée | Mise en pratique |
| --- | --- | --- |
| Comprendre un mot ou une syntaxe | [Glossaire](/poo-patterns-frameworks/12-glossaire/), puis documentation du langage | Retrouver le mécanisme dans un petit exemple. |
| Comprendre l'intention et la structure d'un pattern | Fiches et schémas de Refactoring.Guru | Nommer les rôles de notre application et comparer deux solutions. |
| Lire des variantes JavaScript | Patterns.dev | Suivre les valeurs et distinguer le mécanisme des syntaxes employées. |
| Faire évoluer le programme | [Situations](/poo-patterns-frameworks/09-situations/) et séances du parcours | Ajouter un tarif, un partenaire ou des notifications. |

## POO, contrats et SOLID

Pour commencer, suivez cet ordre de lecture :

1. [L'encapsulation en orientée objet, Data Transition Numérique](https://www.data-transitionnumerique.com/encapsulation-poo/). La boîte noire et l'exemple de voiture illustrent la différence entre opérations publiques et état interne, avec du code Java. Complétez cette lecture avec les [règles d'énergie de `Creature`](/poo-patterns-frameworks/01-fondations/#objets-classes-et-encapsulation), car ajouter des getters et des setters ne garantit pas à lui seul un état valide.
2. [Introduction à la programmation orientée objet, partie IV, Eric Sigoillot](https://hdd34.developpez.com/cours/artpoo/#LIV). Cette partie explique l'encapsulation, l'héritage et le polymorphisme en Pascal objet, à partir de bâtiments et de véhicules.
3. [Bonnes pratiques objet .NET, principes SOLID, Philippe Vialatte](https://philippe.developpez.com/articles/SOLIDdotNet/). Cet article de 2008 relie cohésion, couplage et encapsulation, puis présente chaque principe avec une définition, une démarche et un exemple C#. Comparez le découpage des responsabilités avec les [exemples SOLID du cours](/poo-patterns-frameworks/01-solid/). Dans une application, remplacez les requêtes SQL par concaténation par des requêtes paramétrées.

Le [cours NSI du lycée Blaise Pascal](https://info.blaisepascal.fr/nsi-programmation-orientee-objet/) introduit la POO avec des exemples Python et des diagrammes UML. Il distingue attributs d'instance, attributs de classe et méthodes.

L'article [Héritage vs composition de LeanDeep](https://leandeep.com/h%C3%A9ritage-vs-composition-en-programmation-orient%C3%A9e-objet/) illustre les relations « est un » et « a un » avec des exemples Python et des diagrammes UML. Il complète les [fondations](/poo-patterns-frameworks/01-fondations/#composition-et-heritage). La relation « est un » ne suffit pas à justifier un héritage : la sous-classe doit respecter les promesses de sa classe parente. Pour choisir un losange UML, précisez à quel objet les parties appartiennent et si elles peuvent être partagées.

Le [manuel TypeScript sur les classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) décrit les champs, les méthodes, la visibilité et l'héritage. La page sur la [compatibilité des types](https://www.typescriptlang.org/docs/handbook/type-compatibility.html) explique pourquoi un objet peut respecter une interface sans déclaration explicite.

La [référence des classes sur MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes) complète la [lecture d'une classe pas à pas](/poo-patterns-frameworks/01-fondations/#lire-une-classe-pas-a-pas). La page sur la [syntaxe de décomposition](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax) explique la copie superficielle produite par `{ ...objet }`. Les [exemples de références et de copies](/poo-patterns-frameworks/01-fondations/#distinguer-deux-objets-et-deux-references) montrent pourquoi un objet imbriqué reste partagé.

L'[introduction à SOLID de DigitalOcean](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design-fr) propose des exemples PHP. La partie Liskov montre comment corriger un retour incompatible. Pour travailler aussi les promesses métier, lisez le [contre-exemple et la correction des réservations](/poo-patterns-frameworks/01-solid/#remplacer-sans-rompre-le-contrat), puis la [partie Liskov de Philippe Vialatte](https://philippe.developpez.com/articles/SOLIDdotNet/#LIV).

La section 2.3 de [Principes avancés de conception objet, ENSICAEN, pages 3 et 4](https://foad.ensicaen.fr/pluginfile.php/1214/course/section/633/DP-Handout-02.pdf#page=3) compare les contrats du rectangle et du carré, puis propose une correction par composition. Elle complète l'[explication avec les réservations](/poo-patterns-frameworks/01-solid/#remplacer-sans-rompre-le-contrat).

### Approfondir chaque principe

Le support ENSICAEN propose d'autres exemples pour chaque principe du [chapitre SOLID](/poo-patterns-frameworks/01-solid/).

| Principe | Complément ENSICAEN |
| --- | --- |
| [S, responsabilité unique](/poo-patterns-frameworks/01-solid/#s-responsabilite-unique) | [Section 2.1, pages 1 et 2](https://foad.ensicaen.fr/pluginfile.php/1214/course/section/633/DP-Handout-02.pdf#page=1) |
| [O, ouverture et fermeture](/poo-patterns-frameworks/01-solid/#o-ouvert-a-lextension-ferme-a-la-modification) | [Section 2.2, pages 2 et 3](https://foad.ensicaen.fr/pluginfile.php/1214/course/section/633/DP-Handout-02.pdf#page=2) |
| [L, substitution de Liskov](/poo-patterns-frameworks/01-solid/#remplacer-sans-rompre-le-contrat) | [Section 2.3, pages 3 et 4](https://foad.ensicaen.fr/pluginfile.php/1214/course/section/633/DP-Handout-02.pdf#page=3) |
| [I, ségrégation des interfaces](/poo-patterns-frameworks/01-solid/#i-segregation-des-interfaces) | [Section 2.4, pages 4 et 5](https://foad.ensicaen.fr/pluginfile.php/1214/course/section/633/DP-Handout-02.pdf#page=4) |
| [D, inversion des dépendances](/poo-patterns-frameworks/01-solid/#d-inversion-des-dependances) | [Section 2.5, pages 5 et 6](https://foad.ensicaen.fr/pluginfile.php/1214/course/section/633/DP-Handout-02.pdf#page=5) |

Les textes de Robert C. Martin et de Martin Fowler sont en anglais.

### Textes de référence

La [présentation de Barbara Liskov au MIT](https://www.csail.mit.edu/person/barbara-liskov) situe ses travaux sur l'abstraction et les langages. Son article avec Jeannette Wing, [A Behavioral Notion of Subtyping](https://www.cs.cmu.edu/~svc/papers/view-publications-lw94.html), formalise le sous-typage comportemental en 1994. Lisez-le après l'exemple du cours sur la substitution.

La [définition du duck typing dans le glossaire Python](https://docs.python.org/fr/3/glossary.html#term-duck-typing) complète la [distinction avec le typage structurel TypeScript](/poo-patterns-frameworks/01-fondations/#duck-typing-et-typage-structurel). Pouvoir appeler une méthode et respecter ses garanties sont deux vérifications différentes.

Robert C. Martin, surnommé Uncle Bob, a contribué à diffuser les principes SOLID. Il précise le lien entre [responsabilité unique et acteurs du changement](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html). Son article [Solid Relevance](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html) rappelle les cinq principes et leur portée au-delà d'un langage particulier.

## Diagrammes UML

Le chapitre [UML, lire et dessiner un diagramme de classes](/poo-patterns-frameworks/01-uml/) présente les membres, les relations et les multiplicités, puis propose un exercice. La [documentation Mermaid des diagrammes de classes](https://mermaid.js.org/syntax/classDiagram.html) fournit la syntaxe, à essayer dans l'[éditeur Mermaid](https://mermaid.live/). Pour vérifier un point précis, consultez la [spécification UML de l'OMG](https://www.omg.org/spec/UML/2.5.1/) après le chapitre du cours.

## Structures des patterns

Le [catalogue de Refactoring.Guru](https://refactoring.guru/design-patterns) classe les patterns orientés objet par leur intention de création, de structure ou de comportement. Ses fiches présentent [Strategy](https://refactoring.guru/fr/design-patterns/strategy), [Observer](https://refactoring.guru/fr/design-patterns/observer), [Adapter](https://refactoring.guru/fr/design-patterns/adapter) et [Decorator](https://refactoring.guru/fr/design-patterns/decorator). Le [comparatif des fabriques](https://refactoring.guru/fr/design-patterns/factory-comparison) distingue le terme général, la fabrique simple et les patterns de création.

La [fiche Repository de Martin Fowler](https://martinfowler.com/eaaCatalog/repository.html) rattache ce pattern à une collection d'objets métier.

## Patterns JavaScript

[Patterns.dev](https://www.patterns.dev/#patterns) couvre les mécanismes JavaScript, l'organisation des interfaces, le rendu et les performances. Ce périmètre dépasse celui des patterns orientés objet du GoF. Une fonction, un module ou une façon d'organiser les composants peut répondre au même problème sans reproduire une hiérarchie de classes.

- [Observer Pattern](https://www.patterns.dev/vanilla/observer-pattern/) détaille l'abonnement, le nettoyage et la distinction avec un bus de publication et d'abonnement.
- [Factory Pattern](https://www.patterns.dev/vanilla/factory-pattern/) montre des fonctions de création et leur configuration. Commencez par les [deux exemples JavaScript de la fiche Factory](/poo-patterns-frameworks/04-factory/), car l'article combine les fabriques avec des closures et plusieurs syntaxes compactes. Ses exemples HTTP et ses types TypeScript avancés servent à approfondir.
- [Module Pattern](https://www.patterns.dev/vanilla/module-pattern/) traite des opérations exportées et de l'état interne d'un module.
- [Container/Presentational Pattern](https://www.patterns.dev/react/presentational-container-pattern/) sépare l'obtention des données et leur présentation, avec des exemples React.

Le [guide des modules de MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules) complète ces lectures avec les mécanismes du langage.

## Frameworks et cycle d'exécution

L'article de Fowler sur l'[inversion de contrôle](https://martinfowler.com/bliki/InversionOfControl.html) explique qui décide quand le code s'exécute. Celui sur l'[injection de dépendances](https://martinfowler.com/articles/injection.html) décrit comment lui fournir les objets ou fonctions nécessaires.

La documentation React décrit les étapes de [rendu et de commit](https://react.dev/learn/render-and-commit). MDN détaille l'[inscription](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener) et le [retrait](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/removeEventListener) d'écouteurs DOM.

L'article de Ralph Johnson et Brian Foote, [*Designing Reusable Classes*](http://www.laputan.org/drc/drc.html), publié en 1988, donne la définition d'origine du framework orienté objet et de l'inversion de contrôle. Le [chapitre Frameworks 1](/poo-patterns-frameworks/08-frameworks/) en cite la traduction.

Pour les composants, MDN explique les [éléments personnalisés](https://developer.mozilla.org/fr/docs/Web/API/Web_components/Using_custom_elements) et leurs méthodes de cycle de vie. La [fiche Template Method de Refactoring.Guru](https://refactoring.guru/fr/design-patterns/template-method) présente le pattern qu'ils suivent.

Pour les signaux, l'article de Ryan Carniato [*Building a Reactive Library from Scratch*](https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p) construit une bibliothèque proche de celle du cours. La page de Vue sur la [réactivité en profondeur](https://fr.vuejs.org/guide/extras/reactivity-in-depth.html) montre le même mécanisme avec des `Proxy`, et la [proposition TC39](https://github.com/tc39/proposal-signals) décrit un standard possible.

Pour le nettoyage et l'injection, comparez [`useEffect`](https://react.dev/reference/react/useEffect) dans React, [`onCleanup`](https://docs.solidjs.com/reference/lifecycle/on-cleanup) dans Solid, [`provide` et `inject`](https://vuejs.org/guide/components/provide-inject.html) dans Vue, et l'[injection de dépendances d'Angular](https://angular.dev/guide/di).

## Repères visuels

[Murmur](https://www.murmur.living/), projet de oio et mattering, représente des écosystèmes vivants. Sa vue forestière Plot illustre les notions d'état, d'interaction et d'événement dans les [fondations](/poo-patterns-frameworks/01-fondations/).

La [capture de Smalltalk](https://d2w9rnfcy7mm78.cloudfront.net/21819379/original_c5b90a6c29d416c2df7866f97b563b44.png) montre un navigateur de classes et de méthodes. Dans [*Personal Distributed Computing: The Alto and Ethernet Software*](https://www.microsoft.com/en-us/research/wp-content/uploads/1988/01/ACM-Alto-software-paper.pdf#page=23), Butler W. Lampson décrit Smalltalk et présente son environnement à la figure 1.

## Livres

- Erich Gamma, Richard Helm, Ralph Johnson et John Vlissides, [*Design Patterns: Elements of Reusable Object-Oriented Software*](https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480), Addison-Wesley Professional, 1994. Le catalogue GoF réunit 23 patterns orientés objet et décrit leurs intentions, leurs rôles et leurs conséquences.
- Eric Freeman et Elisabeth Robson, [*Head First Design Patterns*, 2e édition](https://www.oreilly.com/library/view/head-first-design/9781492077992/), O'Reilly, 2020. Il explique les patterns avec des illustrations et des exemples Java. Les mécanismes se transposent à TypeScript, en tenant compte des fonctions et du typage structurel.
- Martin Fowler et coauteurs, [*Patterns of Enterprise Application Architecture*](https://martinfowler.com/books/eaa.html), 2002. Il traite de l'architecture des applications d'entreprise, notamment de la séparation entre métier et persistance avec Repository.
- Robert C. Martin, [*Clean Code: A Handbook of Agile Software Craftsmanship*](https://www.informit.com/store/clean-code-a-handbook-of-agile-software-craftsmanship-9780132639408), 1re édition, 2008. Le livre traite notamment du nommage, des fonctions et des tests. Pour évaluer une recommandation, comparez les changements qu'elle facilite à son coût pour la lecture et les tests.

## Pour pratiquer

Les [exercices du parcours](/poo-patterns-frameworks/13-entrainement/) proposent des créatures à programmer, puis un restaurant et un panier. L'[application de réservation](/poo-patterns-frameworks/10-exercice/) sert de point de départ aux [mises en situation](/poo-patterns-frameworks/09-situations/).
