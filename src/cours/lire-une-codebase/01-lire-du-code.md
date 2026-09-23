---
title: 'Lire du code'
order: 1
---

# Lire du code


_60% du temps des développeur·ses est passé à comprendre du code, pas à en écrire._

Selon _Felienne Hermans_, dans sont livre **_\- Programmers brain… -_** quand on lit du code on bloque souvent sur les même choses :

1.  La **syntaxe** ou un **concept**, c’est lié à notre mémoire long terme (on ne connait pas encore le projet)
2.  Confusion sur **ce que fait un bout de code** : problème de mémoire court terme (trop d'infos à tenir en tête en même temps)
3.  Confusion sur l'**exécution globale** : problème de mémoire de travail (surcharge cognitive)

Savoir nommer le type de confusion aide à savoir quoi faire : chercher dans la doc, externaliser sur papier, ou zoomer sur un bloc plus petit.

[Programmers_brain.pdf](/ressources/lire-une-codebase/files/019e683b-91d4-728f-b60b-b102c6e0c100/Programmers_brain.pdf)

## Relire son vieux code

Reprendre un projet qu'on a écrit il y a quelques mois, c'est presque aussi exigeant que lire du code qu'on n'a pas écrit, notre mémoire de certains details c’est estompé, les évidences, décisions.

Pour se retrouver sans son code avec regard critique on passer pas 4 étapes : **Cartographier**, **Pointer beacons**, **lecture en surface** et **ajustements**.

### Cartographier

Avant de chercher des problèmes, laissez-vous le temps de vous souvenir en parcourant les fichiers sans toucher au code, tout en posant les questions :

- Qu'est-ce que cette appli fait, en une phrase ?
- Quelle était la fonctionnalité dont vous étiez le plus fier·e ?
- Qu'est-ce que vous saviez que vous n'aviez pas eu le temps de faire correctement ?

Cette dernière question est souvent la plus honnête. La réponse pointe directement vers les smells à traiter.


**Arborescence** → **README** → **package.json / imports** → **point d'entrée**

### Repérer les beacons

_Les "beacons" sont des identifiants \[noms de fonctions, de variables, de classes\] qui signalent l'intention du code. Ce sont les premières prises de sens dans un codebase inconnu._

Cherchez les fonctions et variables dont le nom dit clairement ce qu'elles font. Ce sont vos points d'appui. Notez ce que vous croyez comprendre, vous vérifierez ensuite.

Cherchez aussi les endroits où le nom ne dit rien : `data`, `val`, `tmp`, `handleClick2`. Ce sont vos premières cibles.

### Lire en surface pas en profondeur

Lisez une fonction, notez ce que vous pensez qu'elle fait, passez à la suivante. Ne descendez pas dans les dépendances avant d'avoir vu l'ensemble.

L'erreur classique : rentrer dans une fonction, aller dans ses dépendances, dans les dépendances des dépendances, et se perdre.

### Modifier pour mieux comprendre

Renommer une variable floue, simplifier une condition, supprimer du code mort. Ces petits gestes aident à s'approprier le code autant qu'à l'améliorer. Si vous cassez quelque chose, git vous ramène en arrière.
