---
title: 'Stories et backlog'
order: 6
---

# Stories et backlog

## En bref


**Scénario :** qui + déclencheur + parcours + résultat. 5 à 8 lignes. Pas de boutons.

**Story :** en tant que \___, je veux \___ afin de \___. Critère INVEST. Si trop longue découper.

**Critère d'acceptation** : étant donné \___, quand \___, alors \___. Toujours inclure le cas vide ou le cas d'erreur.

**User journey** : tableau structuré (phases / actions / pensées / émotions / frictions / opportunités) pour un persona précis. À faire en discovery, avant le backlog, quand vous avez du temps ou des utilisateurs réels à interviewer.

**Backlog :** MoSCoW puis odre de priorité. le Haut détaillé, le bas flou. Le Won't libère de la charge mentale, le backlog s’entretient régulièrement.

**Tâche :** verbe d'action, 3h max, découpée au dernier moment.

**Méthode :** WIP limit à 1, revue hebdo, Definition of Done écrite, démo régulière.

Garder en tête les questions :

1.  Quel scénario cette fonctionnalité sert-elle ? (sir rien on élimine)
2.  Comment je démontre que c'est fini ? (autrement ce n'est pas une story)
3.  C'est quoi la prochaine tâche de 3h ? (si trop gros, découper)



### Backlog et user stories

Les stories et parcours permettent de répondre aux besoins précis des usagers de notre projet. Il évite le scénario dans lequel 60 % du code produit ne sert pas les attentes des usagères.

### On part de :

1.  **Besoin/Envie** vers des 
2.  **Scénarios,** histoire récit
3.  la structure **Story - En tant que \[persona\], je veux \[action\] afin de \[bénéfice/raison\]**
4.  et enfin le **Backlog** des tâches

Chaque étapes répond à une question :

| Maillon | Question | Échelle |
| --- | --- | --- |
| Scénario | Qui fait quoi, dans quel contexte, pour quel résultat ? | Le parcours |
| User Story | Quelle unité de valeur livrable ? | Quelques jours |
| Backlog | Dans quel ordre ? | Le projet entier |
| Tâche | Quelle action concrète maintenant ? | 3 heures max |

## Scénarios utilisateur

Un scénario utilisateur est un récit court (5 à 8 lignes) qui décrit une personne plausible en train d'utiliser votre produit. Sans jargon technique, les noms d'écrans et les boutons, il raconte un histoire.

Eléments d’un scénario:

1.  Qui : un persona avec un prénom, un contexte, une contrainte.
2.  Un déclencheur : qu'est-ce qui pousse cette personne à ouvrir votre outil ?
3.  Un parcours : ce qu'elle cherche à accomplir, étape par étape.
4.  Un résultat : qu'est-ce qui a changé pour elle à la fin ?

Exemple (**app de covoiturage étudian**t) :

> Inès, 19 ans, étudiante à Villeurbanne, finit ses cours à 18h30 et rate systématiquement le dernier bus direct vers chez elle. Elle ouvre l'appli en sortant de l'amphi, voit que deux étudiants de son campus partent dans sa direction dans les 20 minutes, envoie une demande à l'un d'eux, reçoit la confirmation, et les retrouve au point de rendez-vous indiqué. Elle arrive chez elle 40 minutes plus tôt que d'habitude.

Contre-exemple :

> L'utilisateur se connecte, accède au dashboard, clique sur le bouton de recherche, filtre les résultats et valide.

Dans ce récit il manque la personne, le contexte et le bénéfice. Il décrit une interface plutôt qu’une description de besoins. Si le scénario est trop générique et décrit n'importe quelle appli finalement il ne décrit pas grand chose.

2 ou 4 personas suffisent, avec 2 ou 3 scénarios chacun : le parcours principal, plus au moins un cas limite (première utilisation, panne, abandon en cours de route). Au-delà, vous diluez votre attention sur des cas que vous ne traiterez jamais.

![Comparaison de spécifications techniques et de user stories centrées sur le besoin.](/ressources/stories-backlog/files/019ebbbf-61df-773a-8c82-7914dd22b3be/34.png)

### Scénario vs parcours utilisateur (user journey)

Le scénario est la forme allégée, plus adaptée au rythme agile. L’autre version plus structurée c'est le **parcours utilisateur**, ou _user journey_.

Un parcours utilisateur cartographie l'expérience complète d'un persona sur l'ensemble de son interaction avec le produit. Là où le scénario est un récit narratif libre, le parcours est un tableau structuré qui décompose chaque étape en plusieurs dimensions :

| Dimension | Ce qu'on y note |
| --- | --- |
| Phases | Les grandes étapes du parcours (découverte, usage régulier, abandon…) |
| Actions | Ce que l'utilisateur fait concrètement à chaque phase |
| Pensées | Ce qu'il se demande, ses doutes, ses questions |
| Émotions | Comment il se sent ( représenté par une courbe : frustration, satisfaction, confusion…) |
| Points de contact | Où il interagit avec le produit (app, email, notification, support…) |
| Points de friction | Ce qui ralentit, bloque ou décourage |
| Opportunités | Ce qu'on pourrait améliorer à cet endroit |

Le scénario suffit quand vous partez de zéro sur un produit neuf et que vous voulez alimenter un backlog rapidement. Le user journey est utile quand vous reprenez un produit existant et que vous voulez diagnostiquer l'expérience complète avant de décider quoi modifier, ou quand vous avez accès à de vrais utilisateurs à interviewer et que vous voulez structurer ce que vous apprenez d'eux.

En pratique, le user journey vient en amont du backlog, c'est une activité de _discovery_, souvent conduite avec des outils de design collaboratif (Figma, Miro, ou même des post-its). Il faut compter une demi-journée de travail avec l'équipe, idéalement à partir d'entretiens utilisateurs réels.

Ces deux formes partent toujours d'un persona précis et d'un objectif concret. Un user journey « pour tous les utilisateurs » ne sert à rien, comme un scénario sans prénom.

### Sur votre projet

1.  Identifiez 2 personas pour votre projet : prénom, âge, contexte, contrainte principale. Une ligne chacun.
2.  Écrivez un scénario par persona : parcours principal pour le premier, cas limite pour le second.
3.  Test croisé : échangez avec des camarades voisine et posez la question : en lisant ce scénario, est-ce que tu comprends c’est quoi le projet, sans plus d'explications ?

---

## User stories et critères d'acceptation

Une user story découpe un scénario en unités de valeur livrables. Format canonique :

> **En tant que** \[persona\], **je veux** \[action\] **afin de** \[bénéfice\].

Une bonne story respecte les critères `INVEST` :

![Les critères INVEST : indépendante, négociable, valorisable, estimable, petite et testable.](/ressources/stories-backlog/files/019ebbbe-9594-73d0-abc5-9b52930f4bf8/33.jpg)

| Critère | Signification | Question test |
| --- | --- | --- |
| **I**ndépendante | Livrable sans attendre une autre story | « Je peux la coder seule ? » |
| **N**égociable | Le _comment_ reste ouvert | « Est-ce que je décris une solution ou un besoin ? » |
| **V**alorisable | Apporte quelque chose à l'utilisateur | « Qui s'en rend compte ? » |
| **E**stimable | On peut évaluer l'effort | « Je sais à peu près combien de temps ? » |
| **S**mall | Quelques jours max | « Livrable cette semaine ? » |
| **T**estable | On peut prouver qu'elle est finie | « Comment je démontre que c'est fait ? » |

Le critère qui élimine le plus de mauvaises stories est le dernier : Testable. Une story dont personne ne peut démontrer la complétion restera éternellement « presque finie ».

D'où les critères d'acceptation, au format [**Gherkin**](https://cucumber.io/docs/gherkin/reference) :

> **Étant donné** \[contexte\], **quand** \[action\], **alors** \[résultat observable\].

Exemple complet :

> **Story** : En tant qu'Inès (étudiante sans voiture), je veux voir les trajets partant de mon campus dans la prochaine heure, afin de rentrer chez moi sans attendre le bus.
> 
> **Critères d'acceptation :**
> 
> - Étant donné que je suis géolocalisée sur le campus, quand j'ouvre l'appli, alors je vois la liste des trajets partant dans les 60 prochaines minutes, triés par heure de départ.
> - Étant donné qu'aucun trajet n'est disponible, quand j'ouvre l'appli, alors je vois un message m'invitant à créer une alerte (et non un écran vide).


Le cas **vide** est lui-même un critère d'acceptation. Les états vides, les erreurs et les limites sont les endroits où les stories bâclées se trahissent.

![Exemple de critères d’acceptation pour une story sur la consultation de journaux d’erreurs.](/ressources/stories-backlog/files/019ebbbf-b271-76cc-8eb8-58b1bf889cdb/36.png)

Contre-exemples de stories : 

La story technique déguisée _\[en tant que développeur, je veux migrer la base de données\]_ : le développeur n'est pas votre utilisateur, et les tâches techniques s'accrochent toujours à une story qui livre de la valeur. 

La story-épic _\[en tant qu'utilisateur, je veux gérer mon compte\]_ : le **gérer**, cache six stories distinctes (créer, modifier l'email, supprimer, réinitialiser le mot de passe...), il faut découper. 

La story-solution _\[je veux un bouton rouge en haut à droite\]_ : le comment avant le pourquoi, remontez au besoin.

### Sur votre projet

1.  À partir de vos scénarios, écrivez 6 à 8 user stories. Format canonique strict, les trois parties.
2.  Choisissez vos 3 stories les plus importantes et écrivez 2 critères d'acceptation pour chacune, dont au moins un cas limite (vide, erreur, refus).
3.  Passez vos 3 stories dans le cadre **INVEST**. Si la story échoue à un critère, corrigez ou découpez.

![Exemple de story pour trouver un terrain de pétanque proche, avec objectif et critères d’acceptation.](/ressources/stories-backlog/files/019ebbc0-9045-708b-9124-f4bc716f2aac/37.png)

## Le backlog

Le backlog est la liste ordonnée de toutes vos stories, une seule story doit occupe la position 1, si votre backlog contient quinze items « urgents » il devient une liste de courses.

Commencez par faire un premier tri avec MoSCoW :

| Catégorie | Définition | Test |
| --- | --- | --- |
| **Must** | Sans ça, le produit n'a pas de sens | On peut livrer sans ? Non. |
| **Should** | Important, mais le produit fonctionne sans | Douloureux mais vivable |
| **Could** | Confort, si le temps le permet | Personne ne le réclamerait |
| **Won't** | Explicitement hors périmètre, pour l'instant | On l'écrit pour arrêter d'en parler |

Le **Won'**t est important, poser le cadre du pas à faire libère de la charge mentale et permet de couper les éventuelle débats qui peuvent émerger au cours du développement du projet.

Ordoner les **Must** en P1, P2, P3, la valeur P se détermine par : qu'est-ce qui débloque le scénario principal ? et le risque : qu'est-ce qui peut faire échouer le projet ?.

Le haut du backlog est en générale très précis et le bas plus flou, par besoin de détailler une story qui seras développée plus loins dans le projet et qui pourrais éventuellement disparaître avec les avancé et précision du projet. 

Le backlog c’est pas figé, c’est un outils qui vous accompagner et demande de l'entretient : une story qui stagne en bas depuis des semaines sans jamais monter se supprime, sinon vous vous retrouvez avec un cimetière de 80 items. Garder un endroit fixe pour le backlog du style un fichier `BACKLOG.md` dans le repo, un tableau physique, peu importe le support, mais une seule source de vérité.

### Sur votre projet

1.  Posez toutes vos stories (celles de l'exercice 2 plus celles qui vous viennent maintenant) et classez-les en MoSCoW. Visez au moins 2 items en Won't : si vous n'en avez aucun, c'est que vous n'avez pas fait de choix.
2.  Ordonnez les **Must**. Justifiez la position 1 en une phrase : valeur ou risque ?
3.  Revue croisée avec une autre équipe. L'équipe qui écoute pose deux questions imposées : « pourquoi celle-là en premier ? » et « qu'est-ce que vous avez mis en Won't, et pourquoi ? »

---

## Tâches et méthode de travail

On découpe une story en tâches au moment de la prendre pour implémentation, puisque le projet bouge, on découpage trop en amont risque d’être invalide par l’évolution du produit.

Une tâche est une action concrète qui commence par un verbe d'action :

- Bon : créer la route `GET /trajets?campus=X`
- Bon : maquetter l'écran liste des trajets (état plein et état vide)
- Bon : écrire le test du tri par heure de départ
- Mauvais : backend, faire la BDD, avancer sur la recherche

3 heures maximum par tâche, si c’est plus il faudra probableent découper la tâche. Une story type se découpe en 3 à 8 tâches.

#### La méthode Scrum

Vocabulair du Scrum qui vous croiserez peut-être en entreprise. 

- **Sprint** : itération fixe (souvent 2 semaines) avec un objectif livrable.
- **Sprint planning** : on choisit les stories du sprint depuis le haut du backlog.
- **Daily** : point quotidien de 15 min debout (hier, aujourd'hui, blocages).
- **Sprint review** : démo de ce qui est fini, au sens strict, et non « presque fini ».
- **Rétrospective** : qu'est-ce qu'on change dans notre façon de travailler ?
- **Rôles** : Product Owner (gardien du backlog), Scrum Master (gardien du processus), équipe de dev.

Le scrum complet sur une petite équipe c'est overkill, pour vos projets un Kanban avec les tois colone suffit :

**Backlog** - **À faire (3 max)** - **En cours (1 max)** - **Fait**

La colonne \[**En cours**\] doit se limiter à un item par personne, elle dertermine ce qui doit être fini avant de commencer autre chose. 

Vous pouvez faire une autp-revue hebdo de 30 minutes : qu'est-ce qui est passé en **Fait**, qu'est-ce qui monte du **backlog**, qu'est-ce qu'on supprime. Et une **D**efinition **o**f **D**one par exemple : **code mergé**, **_critères d'acceptation démontrés_**, **_testé par quelqu'un d'autre_**. 

### Sur votre projet

1.  Prenez la story en position 1 de votre backlog. Découpez-la en tâches de 3h maximum, chacune commençant par un verbe d'action. Vérifiez que la somme des tâches couvre les critères d'acceptation.
2.  Écrivez votre **D**efinition **o**f **D**one en 3 lignes maximum, et décidez du jour et de l'heure de votre revue hebdo. Notez-le tout de suite, avant la fin de l'exercice.
