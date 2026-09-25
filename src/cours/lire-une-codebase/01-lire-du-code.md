---
title: 'Lire du code'
order: 1
publishedAt: "2026-09-23"
updatedAt: "2026-09-24"
---

# Lire du code

Les développeur·ses passent près de 60 % de leur temps à comprendre du code, et bien moins à en écrire (Xia et al., « Measuring Program Comprehension », _IEEE Transactions on Software Engineering_, 2018).

Dans _The Programmer's Brain_ (2021), Felienne Hermans distingue trois sources de confusion quand on lit du code :

1.  La **syntaxe** ou un **concept** inconnus : il manque une connaissance en mémoire à long terme.
2.  Ce que fait **un bout de code** : trop d'informations à tenir en même temps dans la mémoire à court terme.
3.  L'**exécution globale** : la mémoire de travail sature.

Nommer le type de confusion indique quoi faire : chercher dans la doc, noter sur papier, ou zoomer sur un bloc plus petit.

[Programmers_brain.pdf](/ressources/lire-une-codebase/files/019e683b-91d4-728f-b60b-b102c6e0c100/Programmers_brain.pdf)

## Relire son vieux code

Reprendre un projet écrit il y a quelques mois demande presque autant d'effort que lire le code de quelqu'un d'autre. Les détails, les évidences du moment et les raisons des décisions se sont effacés.

Pour relire ton code avec un regard critique, suis quatre étapes : **cartographier**, **repérer les beacons**, **lire en surface** et **modifier pour comprendre**.

### Cartographier

Avant de chercher des problèmes, parcours les fichiers sans toucher au code, le temps de te souvenir. Pose-toi ces questions :

- Qu'est-ce que cette appli fait, en une phrase ?
- De quelle fonctionnalité étais-tu le plus fier·e ?
- Qu'est-ce que tu savais ne pas avoir eu le temps de faire correctement ?

La dernière question donne souvent la réponse la plus honnête. Elle mène aux smells à traiter en premier.

Ordre de lecture : **arborescence** → **README** → **package.json et imports** → **point d'entrée**.

### Repérer les beacons

_Les « beacons » (balises) sont des identifiants, noms de fonctions, de variables ou de classes, qui signalent l'intention du code. Ce sont les premières prises de sens dans une codebase inconnue._

Cherche les fonctions et variables dont le nom dit clairement ce qu'elles font. Ce sont tes points d'appui. Note ce que tu crois comprendre, tu vérifieras ensuite.

Cherche aussi les endroits où le nom ne dit rien : `data`, `val`, `tmp`, `handleClick2`. Ce sont tes premières cibles.

### Lire en surface avant de lire en profondeur

Lis une fonction, note ce que tu penses qu'elle fait, passe à la suivante. Ne descends pas dans les dépendances avant d'avoir vu l'ensemble.

L'erreur classique : entrer dans une fonction, puis dans ses dépendances, puis dans les dépendances des dépendances, et se perdre.

### Modifier pour mieux comprendre

Renomme une variable floue, simplifie une condition, supprime du code mort. Ces petits gestes aident à s'approprier le code autant qu'à l'améliorer. Si tu casses quelque chose, Git te ramène au dernier commit.
