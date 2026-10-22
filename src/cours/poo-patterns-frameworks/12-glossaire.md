---
title: 'Glossaire'
order: 12
publishedAt: "2026-10-15"
updatedAt: "2026-10-16"
---

# Glossaire

Ce glossaire permet de retrouver un terme rencontré dans le cours et d'accéder au chapitre qui l'explique. Les termes anglais reprennent les noms utilisés dans la documentation et le code. Lorsqu'une ligne donne plusieurs noms, ils désignent ici la même notion.

## Objets et relations

| Terme | Sens | Chapitre |
| --- | --- | --- |
| Objet | Valeur qui regroupe des propriétés et des opérations. En JavaScript, un objet peut être créé sans classe. | [Objets et classes](/poo-patterns-frameworks/01-fondations/#objets-classes-et-encapsulation) |
| Classe | Définition utilisée pour créer des objets avec une structure et des méthodes communes. Chaque objet créé possède son propre état. | [Objets et classes](/poo-patterns-frameworks/01-fondations/#objets-classes-et-encapsulation) |
| Instance | Objet créé à partir d'une classe. Deux instances de `Creature` peuvent avoir des énergies différentes. | [Objets et classes](/poo-patterns-frameworks/01-fondations/#objets-classes-et-encapsulation) |
| Référence | Valeur qui permet de désigner un objet. Après `const autre = creature`, les deux variables désignent le même objet et observent ses modifications. | [Objets et références](/poo-patterns-frameworks/01-fondations/#distinguer-deux-objets-et-deux-references) |
| Copie superficielle | Nouvel objet ou tableau qui reprend les valeurs du premier niveau. Les objets imbriqués restent partagés. `{ ...reservation }` suffit pour isoler les champs primitifs des réservations du cours. | [Objets et références](/poo-patterns-frameworks/01-fondations/#distinguer-deux-objets-et-deux-references) |
| Attribut, champ | Donnée nommée qui participe à l'état d'un objet ou d'une classe. Le champ privé `#energie` conserve l'énergie d'une créature. | [Encapsulation](/poo-patterns-frameworks/01-fondations/#objets-classes-et-encapsulation) |
| Propriété | Élément nommé accessible sur un objet. `creature.nom` lit une donnée, tandis que `creature.energie` appelle ici un getter. Les champs JavaScript privés écrits avec `#` ne se lisent pas comme des propriétés publiques. | [Lire une classe](/poo-patterns-frameworks/01-fondations/#lire-une-classe-pas-a-pas) |
| Méthode | Fonction accessible par un objet ou une classe. Une méthode d'instance peut lire ou modifier l'état de l'objet qui la reçoit. | [Objets et classes](/poo-patterns-frameworks/01-fondations/#objets-classes-et-encapsulation) |
| Getter | Accesseur qui exécute du code lors de la lecture d'une propriété. Il permet notamment d'exposer un champ privé sans autoriser son affectation directe. | [Encapsulation](/poo-patterns-frameworks/01-fondations/#objets-classes-et-encapsulation) |
| Setter | Accesseur qui exécute du code lors de l'affectation d'une propriété. Il peut vérifier la valeur reçue avant de modifier l'état de l'objet. | [Encapsulation](/poo-patterns-frameworks/01-fondations/#objets-classes-et-encapsulation) |
| Encapsulation | Organisation qui réserve l'accès ou la modification d'un état à des opérations contrôlées. Ces opérations protègent les règles de l'objet. | [Encapsulation](/poo-patterns-frameworks/01-fondations/#objets-classes-et-encapsulation) |
| Héritage | Relation par laquelle une classe reprend les membres d'une classe parente et peut les compléter ou les redéfinir. L'utilisation comme sous-type exige aussi le respect du contrat du parent. | [Composition et héritage](/poo-patterns-frameworks/01-fondations/#composition-et-heritage) |
| Composition | Organisation dans laquelle un objet utilise d'autres objets pour effectuer une partie de son travail. En UML, la composition désigne plus précisément une relation tout-partie où une partie appartient au plus à un composite à la fois. | [Composition et héritage](/poo-patterns-frameworks/01-fondations/#composition-et-heritage) |
| UML | Langage de modélisation qui définit plusieurs sortes de diagrammes. Un diagramme de classes décrit des types, leurs membres et leurs relations. | [Diagrammes de classes](/poo-patterns-frameworks/01-uml/) |
| Multiplicité | Nombre d'instances qui peuvent participer à une relation UML pour une instance à l'autre extrémité. `0..*` autorise aucune, une ou plusieurs instances. | [Diagrammes de classes](/poo-patterns-frameworks/01-uml/) |

## Lire les mots d'une classe

| Terme | Sens | Chapitre |
| --- | --- | --- |
| Constructeur, constructor | Code qui initialise une instance pendant sa création. Dans `constructor(nom: string)`, `nom` reçoit l'argument fourni à `new`. | [Lire une classe](/poo-patterns-frameworks/01-fondations/#lire-une-classe-pas-a-pas) |
| new | Opérateur utilisé ici pour créer une instance d'une classe et appeler son constructeur. Deux appels à `new Creature()` créent deux objets distincts. | [Lire une classe](/poo-patterns-frameworks/01-fondations/#lire-une-classe-pas-a-pas) |
| this | Valeur qui désigne l'objet utilisé pour cet appel. Dans `grenouille.avancer()`, `this` désigne `grenouille` pendant l'exécution de cette méthode d'instance. | [Lire une classe](/poo-patterns-frameworks/01-fondations/#lire-une-classe-pas-a-pas) |
| public | Visibilité qui autorise l'utilisation d'un membre depuis le code extérieur à la classe. En TypeScript, un membre sans modificateur de visibilité est public par défaut. | [Lire une classe](/poo-patterns-frameworks/01-fondations/#lire-une-classe-pas-a-pas) |
| private | Modificateur TypeScript qui interdit l'accès à un membre en dehors de sa classe pendant la vérification des types. Les champs JavaScript écrits avec `#` disposent d'un contrôle d'accès à l'exécution. | [Lire une classe](/poo-patterns-frameworks/01-fondations/#lire-une-classe-pas-a-pas) |
| protected | Modificateur TypeScript qui réserve l'accès à un membre au code de sa classe et de ses sous-classes. Il n'autorise pas les appelants extérieurs à l'utiliser. | [Lire une classe](/poo-patterns-frameworks/01-fondations/#lire-une-classe-pas-a-pas) |
| static | Modificateur qui place un membre sur la classe elle-même. `Creature.energieMax` se lit sur la classe, tandis que `grenouille.energie` se lit sur une instance. | [Objets et classes](/poo-patterns-frameworks/01-fondations/#objets-classes-et-encapsulation) |
| readonly | Modificateur TypeScript qui limite les affectations d'une propriété. Il ne gèle pas l'objet à l'exécution et ne rend pas ses objets imbriqués immuables. | [Lire une classe](/poo-patterns-frameworks/01-fondations/#lire-une-classe-pas-a-pas) |
| extends | Mot-clé qui déclare ici qu'une classe hérite d'une autre. Il permet aussi à une interface TypeScript d'étendre un autre contrat, sans lui ajouter de code exécuté. | [Héritage et contrats](/poo-patterns-frameworks/01-fondations/#lire-extends-super-et-implements) |
| super | Mot-clé qui donne accès au constructeur ou à une méthode de la classe parente. Dans le constructeur d'une sous-classe, `super(nom)` initialise la partie héritée avec ce nom. | [Héritage et contrats](/poo-patterns-frameworks/01-fondations/#lire-extends-super-et-implements) |
| implements | Mot-clé TypeScript qui demande au compilateur de vérifier qu'une classe satisfait un contrat. Il ne fournit pas le code des méthodes annoncées. | [Héritage et contrats](/poo-patterns-frameworks/01-fondations/#lire-extends-super-et-implements) |
| Redéfinition, override | Nouvelle version d'un membre hérité, écrite dans une sous-classe. Le mot-clé TypeScript `override` fait vérifier que ce membre existe dans la classe parente. | [Héritage et contrats](/poo-patterns-frameworks/01-fondations/#lire-extends-super-et-implements) |
| Classe abstraite, abstract | Classe TypeScript qui sert de base à des sous-classes et que le compilateur interdit d'instancier directement. Elle peut associer du code partagé et des opérations abstraites. | [Interface et classe abstraite](/poo-patterns-frameworks/01-fondations/#comparer-une-interface-et-une-classe-abstraite) |
| Méthode abstraite | Opération déclarée sans corps dans une classe abstraite. Une sous-classe concrète doit fournir le code correspondant si elle n'en hérite pas déjà. | [Interface et classe abstraite](/poo-patterns-frameworks/01-fondations/#comparer-une-interface-et-une-classe-abstraite) |

## Contrats et types

| Terme | Sens | Chapitre |
| --- | --- | --- |
| Contrat | Ensemble des opérations, conditions et garanties sur lesquelles un appelant peut compter. Une signature de méthode décrit une partie de ce contrat. | [Contrats et polymorphisme](/poo-patterns-frameworks/01-fondations/#contrats-et-polymorphisme) |
| Interface | Description des opérations ou des données qu'un code rend accessibles à d'autres codes. En TypeScript, le mot-clé `interface` décrit les membres attendus et leurs types. | [Contrats et polymorphisme](/poo-patterns-frameworks/01-fondations/#contrats-et-polymorphisme) |
| Abstraction | Description des capacités utiles à un appelant, sans tous les détails de leur réalisation. Un contrat de stockage permet ainsi de réserver sans connaître la base de données. | [Contrats et polymorphisme](/poo-patterns-frameworks/01-fondations/#contrats-et-polymorphisme) |
| Invariant | Règle vraie à la création d'un objet et préservée après ses opérations publiques. L'énergie d'une créature reste par exemple entre 0 et 100. | [Encapsulation](/poo-patterns-frameworks/01-fondations/#objets-classes-et-encapsulation) |
| Précondition | Condition que l'appelant doit respecter avant une opération. Une opération de retrait peut exiger un solde suffisant. | [Substitution de Liskov](/poo-patterns-frameworks/01-solid/#remplacer-sans-rompre-le-contrat) |
| Postcondition | Garantie sur le résultat ou l'état après une opération, lorsque ses conditions d'utilisation sont respectées. Une annulation réussie garantit par exemple que la place réservée est de nouveau disponible. | [Substitution de Liskov](/poo-patterns-frameworks/01-solid/#remplacer-sans-rompre-le-contrat) |
| Sous-type | Type utilisable là où un type plus général est attendu. Un sous-type comportemental respecte aussi les conditions et les garanties de ce type général. | [Substitution de Liskov](/poo-patterns-frameworks/01-solid/#remplacer-sans-rompre-le-contrat) |
| Polymorphisme | Possibilité pour un appelant d'utiliser un même contrat avec plusieurs implémentations. Chaque implémentation fournit le comportement attendu à sa manière. | [Contrats et polymorphisme](/poo-patterns-frameworks/01-fondations/#contrats-et-polymorphisme) |
| Duck typing, typage canard | Style de programmation qui utilise les opérations d'un objet sans exiger une classe précise. La présence d'une méthode ne suffit pas à prouver que l'objet respecte son contrat comportemental. | [Duck typing](/poo-patterns-frameworks/01-fondations/#duck-typing-et-typage-structurel) |
| Typage structurel | Système qui détermine la compatibilité des types en comparant leurs membres et les types de ces membres. TypeScript utilise cette approche pour vérifier les objets avant l'exécution. | [Typage structurel](/poo-patterns-frameworks/01-fondations/#duck-typing-et-typage-structurel) |
| Typage nominal | Système où la compatibilité dépend de l'identité des types et de relations déclarées. Deux types de même structure ne deviennent pas compatibles pour cette seule raison. | [Typage nominal](/poo-patterns-frameworks/01-fondations/#duck-typing-et-typage-structurel) |
| SOLID | Groupe de cinq principes sur les responsabilités, l'extension, la substitution, les interfaces et les dépendances. Ils aident à discuter une conception et ses conséquences. | [Principes SOLID](/poo-patterns-frameworks/01-solid/) |
| Responsabilité unique, SRP | Principe qui regroupe le code répondant à une même raison de changement, liée aux règles de l'activité. Plusieurs méthodes peuvent contribuer à cette responsabilité. | [Responsabilité unique](/poo-patterns-frameworks/01-solid/#s-responsabilite-unique) |
| OCP | Principe ouvert à l'extension et fermé à la modification. Une variation prévue peut s'ajouter derrière un contrat stable, sans réécrire le traitement qui l'utilise. | [Extension](/poo-patterns-frameworks/01-solid/#o-ouvert-a-lextension-ferme-a-la-modification) |
| Substitution de Liskov, LSP | Principe qui exige d'un sous-type qu'il préserve les promesses du type attendu par l'appelant. Une signature compatible ne suffit pas à garantir ce comportement. | [Substitution](/poo-patterns-frameworks/01-solid/#remplacer-sans-rompre-le-contrat) |
| Ségrégation des interfaces, ISP | Principe qui donne à chaque client un contrat adapté aux opérations dont il a besoin. Un écran de consultation n'a pas besoin d'exiger les opérations d'administration. | [Interfaces](/poo-patterns-frameworks/01-solid/#i-segregation-des-interfaces) |
| Inversion des dépendances, DIP | Principe qui fait dépendre les détails techniques d'un contrat adapté aux règles métier. Fournir un objet en paramètre ne démontre pas à lui seul cette direction des dépendances. | [Dépendances](/poo-patterns-frameworks/01-solid/#d-inversion-des-dependances) |

## Fonctions et organisation du code

| Terme | Sens | Chapitre |
| --- | --- | --- |
| Paramètre | Nom déclaré dans la définition d'une fonction ou d'une méthode pour recevoir une valeur lors de l'appel. Dans la méthode `reserver(atelierId: number, email: string)`, `email` est un paramètre. | [Application de réservation](/poo-patterns-frameworks/10-exercice/) |
| Argument | Valeur fournie à une fonction ou à une méthode lors d'un appel. Dans `inscriptions.reserver(1, "lea@example.test")`, `1` et la chaîne sont des arguments. | [Application de réservation](/poo-patterns-frameworks/10-exercice/) |
| Callback, fonction de rappel | Fonction transmise à un autre code pour que ce code l'appelle au moment prévu. Elle peut être appelée pendant le traitement courant ou plus tard. | [Observer](/poo-patterns-frameworks/03-observer/) |
| Closure, fermeture | Fonction qui garde accès aux variables de l'environnement où elle a été définie, même après la fin de la fonction qui l'a créée. Une fabrique peut ainsi produire une fonction qui conserve le tarif reçu lors de sa création. | [Factory](/poo-patterns-frameworks/04-factory/#lire-une-fabrique-qui-garde-une-configuration) |
| Fonction pure | Fonction dont le résultat dépend uniquement de ses arguments et qui ne modifie aucun état extérieur. Elle peut calculer une remise sans enregistrer une réservation ni envoyer un message. | [Strategy](/poo-patterns-frameworks/02-strategy/) |
| Module | Unité de code qui organise ses déclarations et expose certains éléments aux autres modules. En JavaScript, `export` et `import` définissent ces échanges. | [Frameworks](/poo-patterns-frameworks/08-frameworks/) |
| Cohésion | Degré auquel les éléments d'un module contribuent à une même tâche ou à un ensemble de tâches liées. Un module qui calcule les tarifs et met en forme des courriels réunit des raisons de changement différentes. | [Responsabilités](/poo-patterns-frameworks/01-fondations/#cohesion-couplage-et-responsabilites) |
| Couplage | Ensemble des dépendances et des connaissances qui lient des éléments du code. Connaître les champs propres à un fournisseur lie le code appelant à son format. | [Responsabilités](/poo-patterns-frameworks/01-fondations/#cohesion-couplage-et-responsabilites) |
| Assertion | Vérification exécutable qui échoue si une condition ou un résultat attendu n'est pas respecté. `assert.equal(places, 2)` exige que `places` vaille exactement `2`. | [Application de réservation](/poo-patterns-frameworks/10-exercice/) |
| Refactoring, refactorisation | Modification de la structure du code qui conserve son comportement observable. Extraire un calcul dans une fonction peut rendre une règle plus facile à lire et à tester. | [Refactoriser](/lire-une-codebase/03-refactoriser/) |

## Patterns et frameworks

| Terme | Sens | Chapitre |
| --- | --- | --- |
| Strategy, stratégie | Organisation qui permet de choisir une implémentation d'une règle derrière un même contrat. Une règle de réduction peut varier sans modifier le traitement qui l'utilise. | [Strategy](/poo-patterns-frameworks/02-strategy/) |
| Observer, observateur | Organisation où un sujet avertit les abonnés d'un événement sans connaître le détail de leurs réactions. | [Observer](/poo-patterns-frameworks/03-observer/) |
| Factory, fabrique | Code qui centralise la création d'objets. Une fabrique simple choisit quoi créer, tandis que Factory Method et Abstract Factory décrivent des organisations plus précises. | [Factory](/poo-patterns-frameworks/04-factory/) |
| Adapter, adaptateur | Code qui traduit le contrat d'un service ou d'un format vers celui attendu par l'application. Il isole par exemple les noms de champs propres à une API externe. | [Adapter](/poo-patterns-frameworks/05-adapter/) |
| Decorator, décorateur | Objet ou fonction qui entoure un comportement pour lui ajouter un traitement tout en conservant le contrat attendu par l'appelant. Il peut par exemple mesurer la durée d'une opération. | [Decorator](/poo-patterns-frameworks/06-decorator/) |
| Repository, dépôt | Accès à une collection d'objets de l'application, comme les réservations, qui masque les détails de leur enregistrement et de leur lecture dans un stockage. Un dépôt de réservations peut proposer une recherche par identifiant. | [Repository](/poo-patterns-frameworks/07-repository/) |
| Bibliothèque, library | Ensemble de fonctions ou de composants que l'application appelle pour effectuer une tâche. L'application choisit les moments où elle les utilise. | [Frameworks](/poo-patterns-frameworks/08-frameworks/) |
| Framework | Cadre logiciel qui organise une partie de l'exécution et appelle le code fourni par l'application aux points prévus. Un framework web peut appeler un gestionnaire quand une requête arrive. | [Frameworks](/poo-patterns-frameworks/08-frameworks/) |
| Inversion de contrôle, IoC | Organisation où un mécanisme extérieur choisit quand appeler le code de l'application. Les gestionnaires d'événements du navigateur en sont un exemple. | [Frameworks](/poo-patterns-frameworks/08-frameworks/) |
| Injection de dépendances | Fait de fournir à un code les objets ou fonctions dont il a besoin, au lieu de le laisser les créer ou les chercher lui-même. Une fonction de réservation peut ainsi recevoir le dépôt qu'elle utilise. | [Frameworks 6](/poo-patterns-frameworks/08-6-injection/) |
| Localisateur de services, service locator | Objet central auquel un code demande explicitement les services dont il a besoin. Martin Fowler l'oppose à l'injection, où le code reçoit ses services sans rien demander. | [Frameworks 6](/poo-patterns-frameworks/08-6-injection/#nuance-injection-ou-localisateur) |
| Composant | Morceau d'interface qui regroupe ses éléments, la façon de les mettre à jour et ses réactions aux actions de la personne. Une ligne d'atelier avec son bouton Réserver forme un composant. | [Frameworks 3](/poo-patterns-frameworks/08-3-composants/) |
| État de l'interface | Données nécessaires pour dessiner la page à un instant donné, comme les places libres, le courriel saisi et le dernier message. | [Frameworks 2](/poo-patterns-frameworks/08-2-etat/) |
| Store | Objet qui conserve l'état de l'interface, permet de le remplacer et prévient ses abonnés à chaque changement. Il joue le rôle du sujet d'un Observer. | [Frameworks 2](/poo-patterns-frameworks/08-2-etat/) |
| Rendu | Transformation de l'état en éléments affichés. Un rendu complet recalcule toute la page, un rendu ciblé modifie seulement les éléments concernés. | [Frameworks 2](/poo-patterns-frameworks/08-2-etat/) |
| Délégation d'événements | Technique qui pose un seul écouteur sur un ancêtre, puis retrouve l'élément cliqué grâce à la propagation des événements. Elle fonctionne aussi pour les éléments créés plus tard. | [Frameworks 2](/poo-patterns-frameworks/08-2-etat/#deuxieme-defaut-les-ecouteurs-disparaissent) |
| Template Method, patron de méthode | Pattern où une classe mère fixe l'ordre des étapes d'un algorithme et laisse les sous-classes en redéfinir certaines. Les étapes facultatives s'appellent des crochets, comme `connectedCallback` d'un élément personnalisé. | [Frameworks 3](/poo-patterns-frameworks/08-3-composants/#template-method-le-squelette-et-les-crochets) |
| Signal | Conteneur de valeur qui retient les effets qui le lisent et les relance quand sa valeur change. L'abonnement se fait par la lecture, sans appel explicite. | [Frameworks 4](/poo-patterns-frameworks/08-4-signaux/) |
| Effet | Fonction que le framework relance chaque fois qu'un signal lu pendant sa dernière exécution change. Un effet peut par exemple écrire le nombre de places dans un élément. | [Frameworks 4](/poo-patterns-frameworks/08-4-signaux/) |
| Cycle de vie | Étapes de l'existence d'un composant : création, montage dans la page, mises à jour, puis démontage. Le démontage doit défaire les abonnements et les écouteurs extérieurs. | [Frameworks 5](/poo-patterns-frameworks/08-5-nettoyage/) |
| Portée | Liste des nettoyages à exécuter ensemble, rattachée à un composant ou à une exécution d'effet. Détruire une portée arrête aussi les effets créés dans cette portée. | [Frameworks 5](/poo-patterns-frameworks/08-5-nettoyage/) |
| DOM virtuel | Description de l'interface sous forme d'objets JavaScript, que React compare avec la description précédente pour ne modifier que les éléments qui diffèrent. | [Frameworks 7](/poo-patterns-frameworks/08-7-bilan/#le-dom-virtuel-de-react) |
