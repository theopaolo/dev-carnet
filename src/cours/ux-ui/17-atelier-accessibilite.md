---
title: 'Atelier : tester et corriger une page'
order: 17
publishedAt: "2026-10-01"
updatedAt: "2026-10-01"
---

# Atelier : tester et corriger une page

Vous testez une page qui pose des problèmes d’accessibilité, vous la corrigez, puis vous testez un vrai site. Vous travaillez seul et vous notez tout dans votre dossier.

<div class="course-intro">
<img src="/ressources/ux-ui/a11y/atelier.webp" alt="" width="609" height="563">
<div>

**Ce que vous allez montrer**

"Voici ce qui bloque, voici qui est gêné, voici ma correction et le test qui le prouve."

Vous pouvez vous entraider pour tester. Chacun garde ses propres notes.

</div>
</div>

## 1. Tester la page

Téléchargez [la page à corriger](/ressources/ux-ui/a11y/a-corriger.html) avec "Enregistrer la page sous". Ouvrez-la dans votre navigateur et dans votre éditeur.

Faites les [cinq étapes du test](/ux-ui/16-tester-et-auditer/#tester-en-cinq-etapes) : clavier, lecteur d’écran, affichage, outil automatique, notes. Faites ce premier test sans IA.

Pour chaque problème, notez dans votre dossier :

- où il se trouve ;
- qui est gêné ;
- comment le corriger.

Exemple : "Le bouton Recevoir les informations est un `div`. Tab le saute. Une personne au clavier ne peut pas envoyer sa demande. Il faut un `<button>`."

Montrez votre premier problème au formateur avant midi.

<details class="course-details">
<summary>Vérifier votre liste : les problèmes de la page</summary>

1. Le focus est invisible (`outline: none`).
2. "Recevoir les informations" est un `div` : Tab le saute.
3. Le champ e-mail n’a pas de label.
4. Une adresse invalide est signalée seulement par un contour rouge.
5. Le bouton "Recommencer" est annoncé "Supprimer", à cause de son `aria-label`.
6. Le bouton "?" n’a pas de nom clair et n’annonce pas s’il est ouvert.
7. Le lien "Cliquez ici" ne dit pas où il mène.
8. Après "Il reste des places :", seule la couleur de la pastille donne la réponse.
9. Le texte gris clair est trop peu contrasté.
10. À 320 px de large, la page déborde à cause de sa largeur fixe de 850 px.
11. Le titre visible n’est pas un `h1`, la langue est `en` et le titre de l’onglet est "Page".

</details>

## 2. Corriger la page

Faites une copie nommée `corrige.html`. Corrigez un problème à la fois, puis refaites le même test. Commencez par ce qui bloque : le bouton d’envoi, le champ sans label, le message d’erreur.

Le bouton "?" affiche et masque une aide : c’est un disclosure. Donnez-lui un nom clair, puis faites changer `aria-expanded` à chaque clic. La section [Un état qui change](/ux-ui/15-accessibilite-html-et-aria/#un-etat-qui-change) montre le code.

Pour trois corrections, notez dans votre dossier le test avant et après.

## 3. Tester un vrai site

Choisissez une page d’un site existant, par exemple celui de votre audit UX, ou la [démonstration du W3C](https://www.w3.org/WAI/demos/bad/before/home.html). Faites les cinq étapes. Notez un ou deux problèmes dans votre dossier, avec la personne gênée et la correction que vous proposez.

Ne remplissez aucun formulaire réel.

## L’IA

L’IA peut vous proposer du code. Les tests, c’est vous qui les faites. Le formateur peut vous demander de refaire un test devant lui.

## À rendre

Dans votre dossier, une section Accessibilité avec :

1. Les problèmes trouvés sur `a-corriger.html` et sur le site testé.
2. Trois corrections, avec le test avant et après.
3. Votre fichier `corrige.html`.

En fin d’après-midi, un quiz individuel, sans IA. Si vous avez fini avant, appliquez une correction à votre propre page MJC.

[Sources et crédits des illustrations](/ressources/ux-ui/a11y/sources.md).
