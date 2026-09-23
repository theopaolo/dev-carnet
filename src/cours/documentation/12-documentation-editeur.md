---
title: "Documentation dans l'éditeur"
order: 12
---

# Documenter une fonction jusque dans l’éditeur

Les commentaires placés près du code peuvent alimenter l’aide au survol, l’assistance à la saisie et une référence publiée. Cette manipulation prolonge les chapitres [Décisions et code](/documentation/07-decisions-et-code/) et [Documentation vivante](/documentation/09-documentation-vivante/).

## Distinguer les rôles

| Élément | Rôle | Installation pour le survol dans VS Code |
| --- | --- | --- |
| JSDoc | Syntaxe de commentaires, avec notamment des annotations de types en JavaScript. JSDoc désigne aussi un générateur de documentation | Le générateur JSDoc n’est pas nécessaire au survol |
| TSDoc | Proposition de syntaxe commune pour les commentaires de documentation TypeScript | Aucun paquet TSDoc n’est requis pour cet exercice |
| TypeDoc | Générateur de référence à partir du code TypeScript et de ses commentaires | Nécessaire seulement pour générer la référence TypeDoc |
| Service de langage TypeScript | Analyse JavaScript et TypeScript, fournit types, suggestions et diagnostics à l’éditeur | Prise en charge intégrée à VS Code |

Sources : [JSDoc](https://jsdoc.app/), [TSDoc](https://tsdoc.org/), [TypeDoc](https://typedoc.org/) et [prise en charge JavaScript dans VS Code](https://code.visualstudio.com/docs/languages/javascript).

TSDoc ne remplace pas les types TypeScript. Dans un fichier TypeScript, les types sont écrits dans les signatures ou inférés par l’analyseur. Les commentaires expliquent les unités, les effets, les préconditions et les raisons qu’une signature ne suffit pas à transmettre.

## Obtenir le survol en JavaScript

1. Ouvrir le dossier du cours dans VS Code.
2. Ouvrir [demo/editeur/survol.js](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/editeur/survol.js).
3. Survoler le nom reserver dans l’appel. L’éditeur doit présenter la signature et la description issues du [fichier documenté](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/src/reservations.mjs).
4. Survoler reservation.statut : le type attendu est l’union des valeurs confirmee et annulee.
5. Placer le curseur dans l’appel pour consulter l’aide sur les paramètres.

Sur macOS, le raccourci du survol est Commande+K puis Commande+I. Sous Windows et Linux, c’est Ctrl+K puis Ctrl+I. L’aide à la signature se déclenche avec Commande+Maj+Espace sur macOS, Ctrl+Maj+Espace ailleurs. [Référence VS Code](https://code.visualstudio.com/docs/languages/javascript#_hover-information).

Le fichier utilisé est inclus ci-dessous au moment de construire le site :


~~~javascript
// @ts-check
import { reserver } from '../src/reservations.mjs';

/** @type {import('../src/reservations.mjs').Reservation[]} */
const historique = [];

const reservation = reserver(historique, {
  personne: 'alice',
  atelier: 'poterie',
  capacite: 3
});

console.log(reservation.statut);

~~~


L’annotation @type décrit ici la liste avant qu’elle contienne une réservation. @param, @returns et @typedef dans le fichier importé fournissent les autres informations. Un commentaire de documentation commence par /** et se place devant la déclaration concernée. La [référence TypeScript sur JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) précise les annotations reconnues par son analyseur.

Lancer cet exemple depuis la racine avec :

~~~sh
node demo/editeur/survol.js
~~~

Résultat attendu : confirmee.

## Faire signaler un mauvais type

Dans une copie de survol.js, remplacer la valeur numérique de capacite par le texte 'trois'. La ligne // @ts-check active la vérification de ce fichier JavaScript. L’éditeur doit signaler qu’une chaîne de caractères n’est pas assignable à un nombre. Corriger ensuite la valeur.

Le [tsconfig de l’exercice](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/editeur/tsconfig.json) autorise l’analyse du JavaScript et n’émet pas de nouveaux fichiers. Il limite les fichiers d’entrée aux deux exemples. Les modules importés sont aussi lus pour connaître leurs signatures. Il ne lance pas une vérification exhaustive du kit.

Le survol et la complétion peuvent fonctionner sans @ts-check. Cette directive ajoute des diagnostics sur le JavaScript. Pour étendre la vérification à un projet, examiner l’option checkJs dans sa configuration existante. [TypeScript dans les projets JavaScript](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html).

Un type number n’impose pas un entier positif. Le contrôle de types ne remplace pas la validation des données à l’exécution. Une valeur provenant d’un formulaire ou d’une réponse réseau reste à valider.

## Écrire la variante TypeScript avec des commentaires TSDoc

L’exemple suivant est une fonction d’affichage indépendante. Elle ne réalise pas une réservation.


~~~typescript
/**
 * Calcule le nombre de places encore disponibles pour l’affichage.
 *
 * @remarks
 * Les arguments sont supposés être des entiers positifs ou nuls déjà validés.
 * Cette fonction ne réserve aucune place et ne contrôle pas les accès concurrents.
 *
 * @param capacite - Nombre total de places de la séance.
 * @param confirmees - Nombre de réservations qui occupent une place.
 * @returns Le nombre de places restantes, ramené à zéro si la capacité est dépassée.
 * @example
 * placesRestantes(8, 6) // 2
 */
export function placesRestantes(capacite: number, confirmees: number): number {
  return Math.max(0, capacite - confirmees);
}

~~~


[Fichier TypeScript complet](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/editeur/capacite.ts).

Les types number sont dans la signature. La forme @param capacite - Description explique le paramètre sans recopier son type entre accolades. @remarks détaille les limites, @returns le résultat et @example un usage.

TypeDoc s’appuie sur une syntaxe inspirée de TSDoc, avec des différences et extensions documentées. Ne suppose pas que chaque balise sera rendue de façon identique dans l’éditeur, JSDoc et TypeDoc. [Commentaires reconnus par TypeDoc](https://typedoc.org/documents/Doc_Comments.html).

## Vérifier les types puis générer une référence TypeDoc

Ces commandes constituent un prolongement optionnel. Les outils de base du kit restent suffisants pour le reste du cours. Depuis la racine, dans une copie de travail, installer les versions utilisées pour vérifier cet exemple :

~~~sh
npm install --save-dev --save-exact typescript@6.0.3 typedoc@0.28.20
npx tsc -p demo/editeur/tsconfig.json
npx typedoc demo/editeur/capacite.ts --tsconfig demo/editeur/tsconfig.json --out .build/typedoc
~~~

Le contrôle doit terminer sans diagnostic. La référence se trouve dans .build/typedoc/index.html. Lancer un serveur local pour la consulter :

~~~sh
python3 -m http.server 8001 --bind 127.0.0.1 --directory .build/typedoc
~~~

Ouvrir ensuite [la référence TypeDoc locale](http://127.0.0.1:8001/). Retrouver placesRestantes, ses paramètres et son exemple. Ce serveur est distinct de celui du cours sur le port 8000.

VS Code fournit son service de langage, mais l’installation de TypeScript dans le projet fournit la commande tsc. Pour comparer des diagnostics qui diffèrent, vérifier la version TypeScript choisie par l’éditeur. [Tutoriel TypeScript de VS Code](https://code.visualstudio.com/docs/typescript/typescript-tutorial).

## Relier cette aide à la documentation vivante

Modifier la description d’une fonction, enregistrer et consulter son aide au survol. Reconstruire ensuite la référence publiée. Le commentaire reste près du code et sert à plusieurs lecteurs.

La génération ne prouve pas l’exactitude des phrases. Un bloc @example n’est pas automatiquement un test exécuté par TypeDoc ou JSDoc. Si cet exemple exprime une règle importante, vérifier son résultat avec un test ou un scénario adapté.

Documenter en priorité les points d’entrée utilisés par d’autres personnes, les effets et les limites. Pour un collègue du support, publier aussi les règles en langage métier et leurs exemples. Le survol aide surtout la personne qui travaille dans le code.

## Exercice en binôme, quinze minutes

Choisir une fonction dont le contrat manque de précision. Une personne écrit le commentaire, l’autre utilise la fonction depuis un second fichier.

Vérifier que le survol explique le résultat et les effets. Passer volontairement une valeur du mauvais type et lire le diagnostic. Corriger l’appel, puis expliquer une contrainte que le type ne peut pas garantir, par exemple « capacité entière et positive ou nulle ».

Si rien ne s’affiche, vérifier le mode de langage du fichier, le réglage editor.hover.enabled et l’activation de la prise en charge intégrée JavaScript/TypeScript. Le commentaire doit être attaché à la déclaration ou à la propriété concernée. Un générateur HTML installé ne répare pas à lui seul un service de langage désactivé.
