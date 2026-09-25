---
title: 'Stories et backlog'
order: 6
publishedAt: "2026-09-23"
updatedAt: "2026-09-25"
---

# Stories et backlog

## Aide-mémoire

**Scénario :** qui + déclencheur + parcours + résultat. 5 à 8 lignes. Aucun bouton.

**Story :** en tant que \___, je veux \___ afin de \___. Critères INVEST. Trop longue ? Découpez.

**Critère d'acceptation :** étant donné \___, quand \___, alors \___. Incluez le cas vide ou le cas d'erreur.

**User journey :** tableau (phases, actions, pensées, émotions, frictions, opportunités) pour un persona précis. Il se fait en discovery, avant le backlog, quand vous avez du temps ou des utilisateurs réels à interviewer.

**Backlog :** MoSCoW, puis ordre de priorité. Le haut est détaillé, le bas reste flou. Le Won't enlève des sujets de la tête. Le backlog s'entretient chaque semaine.

**Tâche :** verbe d'action, 3 h maximum, découpée au dernier moment.

**Méthode :** une seule tâche en cours (WIP limit à 1), revue hebdo, Definition of Done écrite, démo régulière.

Trois questions à garder en tête :

1.  Quel scénario cette fonctionnalité sert-elle ? (aucun : on la retire)
2.  Comment je démontre que c'est fini ? (sans réponse, ce n'est pas une story)
3.  Quelle est la prochaine tâche de 3 h ? (plus grosse : on découpe)

### Backlog et user stories

Les scénarios et les stories partent des besoins précis des personnes qui utiliseront votre projet. Ils évitent de coder des fonctionnalités dont personne n'a besoin.

### La chaîne

1.  Un **besoin** ou une **envie**
2.  des **scénarios**, sous forme de récits
3.  des **stories** : _En tant que \[persona\], je veux \[action\] afin de \[bénéfice\]_
4.  le **backlog**, découpé en tâches.

Chaque maillon répond à une question :

| Maillon | Question | Échelle |
| --- | --- | --- |
| Scénario | Qui fait quoi, dans quel contexte, pour quel résultat ? | Le parcours |
| User story | Quelle unité de valeur livrable ? | Quelques jours |
| Backlog | Dans quel ordre ? | Le projet entier |
| Tâche | Quelle action faire maintenant ? | 3 heures max |

## Scénarios utilisateur

Un scénario utilisateur est un récit court (5 à 8 lignes) qui montre une personne plausible en train d'utiliser votre produit. Il raconte une histoire, sans jargon technique, sans noms d'écrans ni boutons.

Éléments d'un scénario :

1.  Qui : un persona avec un prénom, un contexte, une contrainte.
2.  Un déclencheur : qu'est-ce qui pousse cette personne à ouvrir votre outil ?
3.  Un parcours : ce qu'elle cherche à accomplir, étape par étape.
4.  Un résultat : qu'est-ce qui a changé pour elle à la fin ?

Exemple (**app de covoiturage étudiant**) :

> Inès, 19 ans, étudiante à Villeurbanne, finit ses cours à 18h30 et rate systématiquement le dernier bus direct vers chez elle. Elle ouvre l'appli en sortant de l'amphi, voit que deux étudiants de son campus partent dans sa direction dans les 20 minutes, envoie une demande à l'un d'eux, reçoit la confirmation, et les retrouve au point de rendez-vous indiqué. Elle arrive chez elle 40 minutes plus tôt que d'habitude.

Contre-exemple :

> L'utilisateur se connecte, accède au dashboard, clique sur le bouton de recherche, filtre les résultats et valide.

Ce récit n'a ni personne, ni contexte, ni bénéfice. Il décrit une interface au lieu d'un besoin. Il pourrait s'appliquer à n'importe quelle appli, donc il n'apprend rien sur la vôtre.

2 à 4 personas suffisent, avec 2 ou 3 scénarios chacun : le parcours principal, plus au moins un cas limite (première utilisation, panne, abandon en cours de route). Au-delà, vous passez du temps sur des cas que vous ne traiterez pas.

![Comparaison de spécifications techniques et de user stories centrées sur le besoin.](/ressources/stories-backlog/files/019ebbbf-61df-773a-8c82-7914dd22b3be/34.png)

### Scénario ou parcours utilisateur (user journey)

Le scénario est la forme légère, adaptée au rythme agile. La forme plus structurée s'appelle le **parcours utilisateur**, ou _user journey_.

Un parcours utilisateur cartographie toute l'expérience d'un persona avec le produit. Le scénario est un récit libre. Le parcours est un tableau qui décompose chaque étape en plusieurs dimensions :

| Dimension | Ce qu'on y note |
| --- | --- |
| Phases | Les grandes étapes du parcours (découverte, usage régulier, abandon…) |
| Actions | Ce que l'utilisateur fait à chaque phase |
| Pensées | Ce qu'il se demande, ses doutes, ses questions |
| Émotions | Comment il se sent (souvent une courbe : frustration, satisfaction, confusion…) |
| Points de contact | Où il interagit avec le produit (app, email, notification, support…) |
| Points de friction | Ce qui ralentit, bloque ou décourage |
| Opportunités | Ce qu'on pourrait améliorer à cet endroit |

Le scénario suffit quand vous partez de zéro sur un produit neuf et voulez alimenter un backlog vite. Le user journey sert dans deux cas : vous reprenez un produit existant et voulez diagnostiquer toute l'expérience avant de décider quoi modifier, ou vous avez accès à de vrais utilisateurs et voulez structurer ce que vous apprenez d'eux.

Le user journey se fait avant le backlog, idéalement à partir d'entretiens utilisateurs réels. On peut le construire dans un outil collaboratif (Figma, Miro) ou avec des post-its.

Les deux formes partent d'un persona précis et d'un objectif précis. Un user journey « pour tous les utilisateurs » est aussi inutile qu'un scénario sans prénom.

### Sur votre projet

1.  Identifiez 2 personas pour votre projet : prénom, âge, contexte, contrainte principale. Une ligne chacun.
2.  Écrivez un scénario par persona : parcours principal pour le premier, cas limite pour le second.
3.  Test croisé : échangez avec vos voisin·es et demandez : en lisant ce scénario, comprends-tu de quoi parle le projet, sans autre explication ?

---

## User stories et critères d'acceptation

Une user story découpe un scénario en unités de valeur livrables. Format canonique :

> **En tant que** \[persona\], **je veux** \[action\] **afin de** \[bénéfice\].

Une bonne story respecte les critères `INVEST` :

![Les critères INVEST : indépendante, négociable, valorisable, estimable, petite et testable.](/ressources/stories-backlog/files/019ebbbe-9594-73d0-abc5-9b52930f4bf8/33.jpg)

| Critère | Signification | Question test |
| --- | --- | --- |
| **I**ndépendante | Livrable sans attendre une autre story | « Je peux la coder seule ? » |
| **N**égociable | Le _comment_ reste ouvert | « Est-ce que je décris une solution ou un besoin ? » |
| **V**alorisable | Apporte quelque chose à l'utilisateur | « Qui s'en rend compte ? » |
| **E**stimable | On peut évaluer l'effort | « Je sais à peu près combien de temps ? » |
| **S**mall | Quelques jours max | « Livrable cette semaine ? » |
| **T**estable | On peut prouver qu'elle est finie | « Comment je démontre que c'est fait ? » |

Le critère Testable élimine le plus de mauvaises stories. Une story dont personne ne peut démontrer la fin reste « presque finie » pendant des semaines.

D'où les critères d'acceptation, au format [**Gherkin**](https://cucumber.io/docs/gherkin/reference) :

> **Étant donné** \[contexte\], **quand** \[action\], **alors** \[résultat observable\].

Exemple complet :

> **Story** : En tant qu'Inès (étudiante sans voiture), je veux voir les trajets partant de mon campus dans la prochaine heure, afin de rentrer chez moi sans attendre le bus.
> 
> **Critères d'acceptation :**
> 
> - Étant donné que je suis géolocalisée sur le campus, quand j'ouvre l'appli, alors je vois la liste des trajets partant dans les 60 prochaines minutes, triés par heure de départ.
> - Étant donné qu'aucun trajet n'est disponible, quand j'ouvre l'appli, alors je vois un message m'invitant à créer une alerte (et non un écran vide).

Le cas **vide** est un critère d'acceptation à part entière. Les stories bâclées se repèrent aux états vides, aux erreurs et aux limites.

![Exemple de critères d’acceptation pour une story sur la consultation de journaux d’erreurs.](/ressources/stories-backlog/files/019ebbbf-b271-76cc-8eb8-58b1bf889cdb/36.png)

Trois contre-exemples :

La story technique déguisée _\[en tant que développeur, je veux migrer la base de données\]_ : le développeur n'est pas votre utilisateur. Une tâche technique se rattache à une story qui livre de la valeur.

La story-épopée _\[en tant qu'utilisateur, je veux gérer mon compte\]_ : **gérer** cache six stories (créer, modifier l'email, supprimer, réinitialiser le mot de passe…). Découpez-la.

La story-solution _\[je veux un bouton rouge en haut à droite\]_ : elle donne le comment avant le pourquoi. Remontez au besoin.

### Sur votre projet

1.  À partir de vos scénarios, écrivez 6 à 8 user stories. Format canonique strict, avec les trois parties.
2.  Choisissez vos 3 stories les plus importantes et écrivez 2 critères d'acceptation pour chacune, dont au moins un cas limite (vide, erreur, refus).
3.  Passez vos 3 stories dans la grille **INVEST**. Si une story échoue à un critère, corrigez-la ou découpez-la.

![Exemple de story pour trouver un terrain de pétanque proche, avec objectif et critères d’acceptation.](/ressources/stories-backlog/files/019ebbc0-9045-708b-9124-f4bc716f2aac/37.png)

## Le backlog

Le backlog est la liste ordonnée de toutes vos stories. Une seule story occupe la position 1. Un backlog avec quinze items « urgents » n'a plus d'ordre, c'est une liste de courses.

Faites un premier tri avec MoSCoW :

| Catégorie | Définition | Test |
| --- | --- | --- |
| **Must** | Sans ça, le produit n'a pas de sens | On peut livrer sans ? Non. |
| **Should** | Important, mais le produit fonctionne sans | Douloureux mais vivable |
| **Could** | Confort, si le temps le permet | Personne ne le réclamerait |
| **Won't** | Explicitement hors périmètre, pour l'instant | On l'écrit pour arrêter d'en parler |

Le **Won't** compte autant que les autres. Écrire ce que vous ne ferez pas clôt les débats qui reviendraient pendant le développement.

Ordonnez ensuite les **Must** en P1, P2, P3 selon deux critères : la valeur (qu'est-ce qui débloque le scénario principal ?) et le risque (qu'est-ce qui peut faire échouer le projet ?).

Le haut du backlog est précis, le bas reste flou. Inutile de détailler une story prévue dans plusieurs semaines : elle changera, ou disparaîtra, à mesure que le projet se précise.

Le backlog évolue et demande de l'entretien. Une story qui reste en bas depuis des semaines sans jamais monter se supprime. Sinon, vous finissez avec un cimetière de 80 items. Gardez le backlog à un seul endroit : un fichier `BACKLOG.md` dans le dépôt, un tableau physique, peu importe le support, tant qu'il n'y en a qu'un.

### Sur votre projet

1.  Posez toutes vos stories (celles de l'exercice 2 plus celles qui vous viennent maintenant) et classez-les en MoSCoW. Visez au moins 2 items en Won't : si vous n'en avez aucun, vous n'avez pas fait de choix.
2.  Ordonnez les **Must**. Justifiez la position 1 en une phrase : valeur ou risque ?
3.  Revue croisée avec une autre équipe. L'équipe qui écoute pose deux questions imposées : « pourquoi celle-là en premier ? » et « qu'avez-vous mis en Won't, et pourquoi ? »

---

## Tâches et méthode de travail

Découpez une story en tâches au moment de la prendre. Le projet bouge, et un découpage fait trop tôt sera faux quand vous y arriverez.

Une tâche est une action qui commence par un verbe :

- Bon : créer la route `GET /trajets?campus=X`
- Bon : maquetter l'écran liste des trajets (état plein et état vide)
- Bon : écrire le test du tri par heure de départ
- Mauvais : backend, faire la BDD, avancer sur la recherche

3 heures maximum par tâche. Au-delà, découpez. Une story se découpe en général en 3 à 8 tâches.

#### La méthode Scrum

Le vocabulaire de Scrum, que vous croiserez sans doute en entreprise :

- **Sprint** : itération de durée fixe (souvent 2 semaines) avec un objectif livrable.
- **Sprint planning** : on choisit les stories du sprint depuis le haut du backlog.
- **Daily** : point quotidien de 15 min, debout (hier, aujourd'hui, blocages).
- **Sprint review** : démo de ce qui est fini au sens strict, pas « presque fini ».
- **Rétrospective** : qu'est-ce qu'on change dans notre façon de travailler ?
- **Rôles** : Product Owner (responsable du backlog), Scrum Master (responsable du processus), équipe de dev.

Scrum complet est trop lourd pour une petite équipe. Pour vos projets, un Kanban à quatre colonnes suffit :

**Backlog** → **À faire (3 max)** → **En cours (1 max)** → **Fait**

La colonne **En cours** se limite à un item par personne. Vous finissez ce qui est en cours avant de commencer autre chose.

Ajoutez une revue hebdo de 30 minutes : qu'est-ce qui est passé en **Fait**, qu'est-ce qui monte du **backlog**, qu'est-ce qu'on supprime. Et écrivez une **D**efinition **o**f **D**one, par exemple : **code mergé**, **_critères d'acceptation démontrés_**, **_testé par quelqu'un d'autre_**.

### Sur votre projet

1.  Prenez la story en position 1 de votre backlog. Découpez-la en tâches de 3 h maximum, chacune commençant par un verbe d'action. Vérifiez que l'ensemble des tâches couvre les critères d'acceptation.
2.  Écrivez votre **D**efinition **o**f **D**one en 3 lignes maximum, et fixez le jour et l'heure de votre revue hebdo. Notez-les tout de suite, avant la fin de l'exercice.
