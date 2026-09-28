---
title: "Les lois de l'UX"
order: 2
publishedAt: "2026-09-27"
updatedAt: "2026-09-28"
---

# Les lois de l'UX

Les lois de l'UX décrivent comment les personnes perçoivent une interface, choisissent et agissent. Voici quatre lois et des principes de la Gestalt à utiliser dans l'[audit UX](/ux-ui/03-audit-ux/). Vous trouverez d'autres lois sur [Laws of UX](https://lawsofux.com/fr/).

## La loi de Fitts

Plus une cible est grande et proche du pointeur, plus on l'atteint vite.

Dans une interface :

- Les boutons importants sont grands et faciles à atteindre.
- Deux boutons trop proches augmentent le risque d'erreur.
- Sur téléphone, chaque cible doit être assez grande pour un doigt.

Paul Fitts a publié sa formule en 1954 : T = a + b × log₂(2D / L). T est le temps pour atteindre la cible, D la distance, L la largeur de la cible. a et b dépendent du pointeur : souris, doigt, pavé tactile.

[Fiche Laws of UX : loi de Fitts](https://lawsofux.com/fr/loi-de-fitts/)

## La loi de Hick

Plus il y a de choix, plus on met de temps à décider. Le temps augmente avec le nombre et la complexité des choix.

Dans une interface :

- Les options d'un formulaire sont regroupées par sujet.
- Un menu garde peu d'entrées, rangées en groupes.
- Une longue liste a une recherche ou des filtres.

[Fiche Laws of UX : loi de Hick](https://lawsofux.com/fr/loi-de-hick/)

## La loi de Jakob

Les gens passent la plupart de leur temps sur d'autres sites que le vôtre. Ils s'attendent à ce que votre site marche comme ceux qu'ils connaissent déjà.

Dans une interface :

- Le logo en haut à gauche ramène à l'accueil.
- Le panier est en haut à droite.
- Un texte souligné dans un paragraphe est un lien.

Si vous changez une convention, vérifiez que les utilisateurs comprennent la nouvelle interface.

[Fiche Laws of UX : loi de Jakob](https://lawsofux.com/fr/loi-de-jakob/)

## L'effet de gradation du but

Plus on se rapproche d'un but, plus on fait d'efforts pour l'atteindre. En anglais, on parle de _goal-gradient effect_.

Dans une interface :

- Une barre de progression montre ce qui reste à faire, par exemple « Étape 2 sur 3 ».
- Un long formulaire est découpé en étapes, et chaque étape finie fait avancer la barre.
- Un avantage réel déjà obtenu apparaît dès le départ, comme deux tampons offerts sur une carte de fidélité.

En 2006, les chercheurs Joseph Nunes et Xavier Drèze ont distribué des cartes de fidélité dans une station de lavage. La première carte demandait 8 tampons. La seconde en demandait 10, dont 2 déjà offerts. Il fallait donc 8 lavages dans les deux cas. 19 % des clients ont rempli la première carte, et 34 % la seconde.

Montrez une progression vraie. Une barre qui ment sur ce qu'il reste à faire, pour retenir l'utilisateur, devient un dark pattern.

[Fiche Laws of UX : effet de gradation du but](https://lawsofux.com/fr/effet-de-gradation-du-but/)

## Les principes de la Gestalt

Au début du XXe siècle, des psychologues ont étudié comment nous regroupons les formes que nous voyons. Leurs principes, dits de la Gestalt (« forme » en allemand), aident à organiser un écran.

| Principe | Ce qu'il dit | Un exemple |
| --- | --- | --- |
| Proximité | Des éléments proches semblent aller ensemble. | Sur Netflix, le titre d'une rangée est collé à ses films. |
| Similarité | Des éléments qui se ressemblent semblent avoir le même rôle. | Sur GitHub, les étiquettes ont toutes la même forme, et chaque statut a sa couleur. |
| Continuité | L'œil suit les lignes et les alignements, même interrompus. | Le chemin de progression de Duolingo, la barre d'étapes d'un formulaire. |
| Clôture | Le cerveau complète une forme incomplète. | Le panda du logo du WWF n'a pas de contour complet, et on le voit quand même. |
| Figure-fond | On sépare ce qui est devant de ce qui est derrière. | Une fenêtre de connexion au-dessus d'une page assombrie. |
| Destin commun | Des éléments qui bougent ensemble semblent aller ensemble. | Les films d'un carrousel qui défilent ensemble. |

Fiches Laws of UX : [loi de proximité](https://lawsofux.com/fr/loi-de-proximit%C3%A9/), [loi de similarité](https://lawsofux.com/fr/loi-de-similarit%C3%A9/).

## À lire et à regarder

- [Les lois de l'UX par Maze](https://maze.co/collections/ux-ui-design/ux-laws/), avec des captures d'interfaces réelles. En anglais.
- [Concevez un produit simple](https://openclassrooms.com/fr/courses/3013856-decouvrez-les-fondamentaux-de-l-ux-design/4088981-concevez-un-produit-simple), OpenClassrooms.
- [Pourquoi le web est devenu si moche ?](https://www.youtube.com/watch?v=dPi-o1rsHpI), vidéo de Basti UI sur la ressemblance entre les sites web. Regardez-la avec la loi de Jakob en tête.
- [The UX Psychology Behind Apps People Can't Stop Using](https://www.youtube.com/watch?v=2TlIg3VokY8), vidéo d'uxpeak. Six principes de psychologie, chacun avec un écran avant et après, dont une barre de progression qui ne part pas de zéro. En anglais, avec des sous-titres automatiques.

## Repérer un principe UX

Cette observation peut se faire pendant le roasting ou l'audit : repérez une loi UX sur le site choisi et expliquez son effet sur votre tâche.

## Pour la discussion

- Quel principe avez-vous trouvé le plus souvent ?
- Quel problème de ce site voulez-vous éviter dans votre page d'inscription ?
