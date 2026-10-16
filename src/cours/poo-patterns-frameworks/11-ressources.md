---
title: 'Ressources et bibliographie'
order: 13
publishedAt: "2026-10-15"
updatedAt: "2026-10-16"
---

# Ressources et bibliographie

Ces références approfondissent les mécanismes des exemples TypeScript et leurs structures orientées objet.

| Besoin | Lecture conseillée | Travail dans ce cours |
| --- | --- | --- |
| Comprendre un mot ou une syntaxe | [Glossaire](/poo-patterns-frameworks/12-glossaire/), puis documentation du langage | Retrouver le mécanisme dans un petit exemple. |
| Comprendre l'intention et la structure d'un pattern | Fiches de Refactoring.Guru et schémas de la source | Nommer les rôles de notre application et comparer deux solutions. |
| Lire des variantes JavaScript | Patterns.dev | Suivre les valeurs et distinguer le mécanisme des syntaxes employées. |
| Choisir et vérifier une modification | [Situations](/poo-patterns-frameworks/09-situations/) et séances du parcours | Produire du code vérifié, un diagramme utile et une décision argumentée. |

## POO, contrats et SOLID

Pour commencer en français, suivre cet ordre de lecture :

1. [L'encapsulation en orientée objet, Data Transition Numérique](https://www.data-transitionnumerique.com/encapsulation-poo/). L'image de la boîte noire et l'exemple de voiture rendent la distinction entre opérations publiques et état interne concrète. Les exemples utilisent Java. Compléter cette lecture avec les [règles d'énergie de `Creature`](/poo-patterns-frameworks/01-fondations/#objets-classes-et-encapsulation), car ajouter des getters et des setters ne garantit pas à lui seul un état valide.
2. [Introduction à la programmation orientée objet, partie IV, Eric Sigoillot](https://hdd34.developpez.com/cours/artpoo/#LIV). Cette partie explique l'encapsulation, l'héritage et le polymorphisme avec des exemples de bâtiments et de véhicules. Les exemples utilisent le Pascal objet.
3. [Bonnes pratiques objet .NET, principes SOLID, Philippe Vialatte](https://philippe.developpez.com/articles/SOLIDdotNet/). L'introduction relie cohésion, couplage et encapsulation. Chaque principe possède ensuite une définition, une démarche et un exemple C#. Cet article de 2008 complète les [exemples SOLID du cours](/poo-patterns-frameworks/01-solid/). Lire les exemples pour le découpage des responsabilités. Les requêtes SQL par concaténation doivent être remplacées par des requêtes paramétrées dans une application.

Le [cours NSI du lycée Blaise Pascal](https://info.blaisepascal.fr/nsi-programmation-orientee-objet/) fournit une autre entrée progressive, avec des exemples Python et une représentation UML des classes. Il distingue attributs d'instance, attributs de classe et méthodes.

L'article [Héritage vs composition de LeanDeep](https://leandeep.com/h%C3%A9ritage-vs-composition-en-programmation-orient%C3%A9e-objet/) explique ces relations avec les formulations "est un" et "a un", des exemples Python et leurs dessins UML. Il complète les [fondations](/poo-patterns-frameworks/01-fondations/#composition-et-heritage). Pour choisir un héritage, vérifier aussi les promesses du parent ; pour choisir un losange UML, préciser la propriété des objets.

Le [manuel TypeScript sur les classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) décrit les champs, les méthodes, la visibilité et l'héritage. La page sur la [compatibilité des types](https://www.typescriptlang.org/docs/handbook/type-compatibility.html) explique pourquoi un objet peut respecter une interface sans déclaration explicite.

La [référence française des classes sur MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes) complète la [lecture d'une classe pas à pas](/poo-patterns-frameworks/01-fondations/#lire-une-classe-pas-a-pas). La page sur la [syntaxe de décomposition](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax) explique notamment la copie superficielle produite par `{ ...objet }`. Les [exemples de références et de copies](/poo-patterns-frameworks/01-fondations/#distinguer-deux-objets-et-deux-references) montrent pourquoi un objet imbriqué reste partagé.

L'[introduction française à SOLID de DigitalOcean](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design-fr) propose des exemples PHP. Sa partie Liskov montre un retour devenu incompatible, puis corrige sa forme. Pour travailler aussi les promesses métier, suivre le [contre-exemple et la correction des réservations](/poo-patterns-frameworks/01-solid/#remplacer-sans-rompre-le-contrat), puis la [partie Liskov de Philippe Vialatte](https://philippe.developpez.com/articles/SOLIDdotNet/#LIV).

Pour un autre exemple en français, lire la section 2.3 de [Principes avancés de conception objet, ENSICAEN, pages 3 et 4](https://foad.ensicaen.fr/pluginfile.php/1214/course/section/633/DP-Handout-02.pdf#page=3). Le support compare les contrats du rectangle et du carré, puis propose une correction par composition. Cette lecture complète l'[explication avec les réservations](/poo-patterns-frameworks/01-solid/#remplacer-sans-rompre-le-contrat).

### Approfondir chaque principe en français

Les cinq sections du [chapitre SOLID](/poo-patterns-frameworks/01-solid/) expliquent directement les exemples des ateliers. Les lectures suivantes permettent de comparer ces choix avec d'autres situations. Choisir le principe étudié plutôt que lire tous les supports d'un coup.

| Principe expliqué dans le cours | Complément ENSICAEN |
| --- | --- |
| [S, responsabilité unique](/poo-patterns-frameworks/01-solid/#s-responsabilite-unique) | [Section 2.1, pages 1 et 2](https://foad.ensicaen.fr/pluginfile.php/1214/course/section/633/DP-Handout-02.pdf#page=1) |
| [O, ouverture et fermeture](/poo-patterns-frameworks/01-solid/#o-ouvert-a-lextension-ferme-a-la-modification) | [Section 2.2, pages 2 et 3](https://foad.ensicaen.fr/pluginfile.php/1214/course/section/633/DP-Handout-02.pdf#page=2) |
| [L, substitution de Liskov](/poo-patterns-frameworks/01-solid/#remplacer-sans-rompre-le-contrat) | [Section 2.3, pages 3 et 4](https://foad.ensicaen.fr/pluginfile.php/1214/course/section/633/DP-Handout-02.pdf#page=3) |
| [I, ségrégation des interfaces](/poo-patterns-frameworks/01-solid/#i-segregation-des-interfaces) | [Section 2.4, pages 4 et 5](https://foad.ensicaen.fr/pluginfile.php/1214/course/section/633/DP-Handout-02.pdf#page=4) |
| [D, inversion des dépendances](/poo-patterns-frameworks/01-solid/#d-inversion-des-dependances) | [Section 2.5, pages 5 et 6](https://foad.ensicaen.fr/pluginfile.php/1214/course/section/633/DP-Handout-02.pdf#page=5) |

Les articles de Philippe Vialatte et de DigitalOcean offrent aussi des explications françaises. Les textes originaux de Robert C. Martin et de Martin Fowler, en anglais, restent des approfondissements facultatifs.

### Situer les auteurs et les contrats

La [présentation de Barbara Liskov au MIT](https://www.csail.mit.edu/person/barbara-liskov) situe ses travaux sur l'abstraction et les langages. Son article avec Jeannette Wing, [A Behavioral Notion of Subtyping](https://www.cs.cmu.edu/~svc/papers/view-publications-lw94.html), formalise le sous-typage comportemental en 1994. C'est une référence pour approfondir le principe de substitution après l'exemple du cours.

La [définition du duck typing dans le glossaire Python](https://docs.python.org/fr/3/glossary.html#term-duck-typing) complète la [distinction avec le typage structurel TypeScript](/poo-patterns-frameworks/01-fondations/#duck-typing-et-typage-structurel). Pouvoir appeler une méthode et respecter ses garanties sont deux vérifications différentes.

Robert C. Martin, surnommé Uncle Bob, a contribué à diffuser les principes SOLID. Il précise le lien entre [responsabilité unique et acteurs du changement](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html). Son article [Solid Relevance](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html) rappelle les cinq principes et leur portée au-delà d'un langage particulier.

## Dessiner les modèles avec UML

Le chapitre [UML, lire et dessiner un diagramme de classes](/poo-patterns-frameworks/01-uml/) présente les membres, les relations et les multiplicités avec une démarche et un exercice. La [documentation Mermaid des diagrammes de classes](https://mermaid.js.org/syntax/classDiagram.html) donne les écritures à saisir, et l'[éditeur Mermaid](https://mermaid.live/) permet de les essayer. La [spécification UML de l'OMG](https://www.omg.org/spec/UML/2.5.1/) constitue la référence du langage ; elle sert à vérifier un point précis plutôt qu'à débuter.

## Structures des patterns

Le [catalogue de Refactoring.Guru](https://refactoring.guru/design-patterns) classe les patterns orientés objet par leur intention de création, de structure ou de comportement. Ses fiches françaises présentent [Strategy](https://refactoring.guru/fr/design-patterns/strategy), [Observer](https://refactoring.guru/fr/design-patterns/observer), [Adapter](https://refactoring.guru/fr/design-patterns/adapter) et [Decorator](https://refactoring.guru/fr/design-patterns/decorator). Le [comparatif des fabriques](https://refactoring.guru/fr/design-patterns/factory-comparison) distingue le terme général, la fabrique simple et les patterns de création.

La [fiche Repository de Martin Fowler](https://martinfowler.com/eaaCatalog/repository.html) rattache ce pattern à une collection d'objets métier.

## Patterns JavaScript et organisation des interfaces

[Patterns.dev](https://www.patterns.dev/#patterns) couvre les mécanismes JavaScript, l'organisation des interfaces, le rendu et les performances. Ce périmètre dépasse celui des patterns orientés objet du GoF. Une fonction, un module ou une convention de composants peut répondre à un problème sans reproduire une hiérarchie de classes.

- [Observer Pattern](https://www.patterns.dev/vanilla/observer-pattern/) détaille l'abonnement, le nettoyage et la distinction avec un bus de publication et d'abonnement.
- [Factory Pattern](https://www.patterns.dev/vanilla/factory-pattern/) montre des fonctions de création et leur configuration. Commencer par les [deux exemples JavaScript de la fiche Factory](/poo-patterns-frameworks/04-factory/). L'article combine les fabriques avec des closures et plusieurs syntaxes compactes. Ses exemples HTTP et ses types TypeScript avancés servent à approfondir.
- [Module Pattern](https://www.patterns.dev/vanilla/module-pattern/) traite des opérations exportées et de l'état interne d'un module.
- [Container/Presentational Pattern](https://www.patterns.dev/react/presentational-container-pattern/) sépare l'obtention des données et leur présentation, avec des exemples React.

Le [guide des modules de MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules) complète ces lectures avec les mécanismes du langage.

## Frameworks et cycle d'exécution

Les textes de Fowler sur l'[inversion de contrôle](https://martinfowler.com/bliki/InversionOfControl.html) et l'[injection de dépendances](https://martinfowler.com/articles/injection.html) distinguent la conduite de l'exécution et l'assemblage des collaborateurs.

La documentation React décrit les étapes de [rendu et de commit](https://react.dev/learn/render-and-commit). MDN détaille l'[inscription](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener) et le [retrait](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/removeEventListener) d'écouteurs DOM.

## Repères visuels

[Murmur](https://www.murmur.living/), projet de oio et mattering, représente des écosystèmes vivants. Sa vue forestière Plot illustre les notions d'état, d'interaction et d'événement dans les [fondations](/poo-patterns-frameworks/01-fondations/).

La [capture de Smalltalk](https://d2w9rnfcy7mm78.cloudfront.net/21819379/original_c5b90a6c29d416c2df7866f97b563b44.png) montre un navigateur de classes et de méthodes. Dans [*Personal Distributed Computing: The Alto and Ethernet Software*](https://www.microsoft.com/en-us/research/wp-content/uploads/1988/01/ACM-Alto-software-paper.pdf#page=23), Butler W. Lampson décrit Smalltalk et présente son environnement à la figure 1.

## Livres pour approfondir

- Erich Gamma, Richard Helm, Ralph Johnson et John Vlissides, [*Design Patterns: Elements of Reusable Object-Oriented Software*](https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480), Addison-Wesley Professional, 1994. C'est le catalogue GoF de 23 patterns orientés objet. À consulter pour les intentions, les rôles et les conséquences des structures classiques.
- Eric Freeman et Elisabeth Robson, [*Head First Design Patterns*, 2e édition](https://www.oreilly.com/library/view/head-first-design/9781492077992/), O'Reilly, 2020. Son approche illustrée et ses exemples Java offrent une autre entrée dans les patterns. Les mécanismes se transposent à TypeScript, en tenant compte des fonctions et du typage structurel.
- Martin Fowler et coauteurs, [*Patterns of Enterprise Application Architecture*](https://martinfowler.com/books/eaa.html), 2002. À consulter pour la séparation entre métier et persistance, dont Repository. Le catalogue traite des problèmes d'applications d'entreprise plus larges que ceux du point de départ du cours.
- Robert C. Martin, surnommé Uncle Bob, [*Clean Code: A Handbook of Agile Software Craftsmanship*](https://www.informit.com/store/clean-code-a-handbook-of-agile-software-craftsmanship-9780132639408), première édition publiée en 2008. Le livre traite notamment du nommage, des fonctions et des tests. Pour discuter une recommandation, examiner le changement qu'elle facilite et son coût pour la lecture et les tests.

## Décisions et mise en pratique

Le texte de Michael Nygard sur les [Architecture Decision Records](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) propose de conserver le contexte et les conséquences des décisions.

Sur ce site, [Refactoriser](/lire-une-codebase/03-refactoriser/), [DRY, KISS et YAGNI](/lire-une-codebase/10-principes/) et les [ADR](/architecture-logicielle/06-adr/) complètent les [études de cas](/poo-patterns-frameworks/09-situations/). Les exemples peuvent se vérifier avec l'[exercice autonome](/poo-patterns-frameworks/10-exercice/).

Les [exercices et autoévaluations du parcours](/poo-patterns-frameworks/13-entrainement/) proposent des corrections expliquées pour les bases, puis des questions de lecture et de choix de conception. Les projets facultatifs du restaurant et du panier demandent de préserver des règles observables et de justifier la solution choisie.
