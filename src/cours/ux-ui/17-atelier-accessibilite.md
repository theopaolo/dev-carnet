---
title: 'Atelier : tester et corriger une page'
order: 17
publishedAt: "2026-10-01"
updatedAt: "2026-10-01"
---

# Atelier : tester et corriger une page

Vous testez une page qui pose des problèmes d’accessibilité, vous la corrigez, puis vous testez un site existant. Conservez vos observations et vos corrections dans un dossier de travail.

Pour cet atelier, préparez un navigateur, un éditeur de code et un lecteur d’écran. Les pages [HTML et ARIA](/ux-ui/15-accessibilite-html-et-aria/) et [méthode de test](/ux-ui/16-tester-et-auditer/) expliquent les notions et les manipulations utilisées. La page à corriger est fournie : vous pouvez suivre l’atelier sans avoir réalisé le projet MJC.

<div class="course-intro">
<img src="/ressources/ux-ui/a11y/atelier.webp" alt="" width="609" height="563">
<div>

**Ce que vos notes doivent permettre de vérifier**

"Voici ce qui bloque, voici qui est gêné, voici ma correction et le test qui le prouve."

Décrivez les manipulations et leurs résultats pour pouvoir reproduire chaque test.

</div>
</div>

## 1. Tester la page

Téléchargez [la page à corriger](/ressources/ux-ui/a11y/a-corriger.html) avec "Enregistrer la page sous". Ouvrez-la dans votre navigateur et dans votre éditeur.

Faites les [cinq étapes du test](/ux-ui/16-tester-et-auditer/#tester-en-cinq-etapes) : clavier, lecteur d’écran, affichage, outil automatique, notes. Faites ce premier test sans IA.

Pour chaque problème, notez dans votre dossier :

- où il se trouve et comment le reproduire,
- qui est gêné et ce que cela empêche de faire,
- comment le corriger.

Exemple : "Le bouton Recevoir les informations est un `div`. Tab le saute. Une personne au clavier ne peut pas envoyer sa demande. Il faut un `<button>`."

Comparez vos observations avec la liste ci-dessous après votre premier passage. Pour chaque problème que vous n’aviez pas repéré, revenez à la page et essayez de le reproduire.

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

Vous pouvez utiliser l’IA pour proposer une correction. Vérifiez chaque proposition dans votre page avec les mêmes tests qu’avant la modification. Gardez uniquement le code dont vous comprenez le rôle et dont vous avez vérifié le résultat.

## Vérifier votre travail

Votre dossier doit contenir une section Accessibilité avec :

1. Les problèmes trouvés sur `a-corriger.html` et sur le site testé.
2. Trois corrections, avec le test avant et après.
3. Votre fichier `corrige.html`.

Pour chacune des trois corrections, vérifiez que vos notes indiquent les manipulations, le résultat avant modification et le résultat après. Signalez les points non testés ou encore à corriger. Le [modèle de diagnostic](/ressources/ux-ui/a11y/audit.md) peut vous servir de support.

## Vérifier votre compréhension

Répondez sans consulter le cours ni utiliser l’IA, puis comparez avec les réponses.

1. Pourquoi `role="button"` ne suffit-il pas à rendre un `div` utilisable au clavier ?
2. Un bouton affiche "Recommencer" mais porte `aria-label="Supprimer"`. Quel problème cela pose-t-il et comment le corriger ?
3. Une erreur de saisie est signalée uniquement en rouge. Que faut-il ajouter ?
4. Un score de 100 à un outil automatique prouve-t-il que le parcours est accessible ?

<details class="course-details">
<summary>Comparer avec les réponses</summary>

1. Le rôle décrit l’élément aux technologies d’assistance. Il n’ajoute ni le focus ni les interactions clavier. Utilisez un bouton HTML natif, puis vérifiez qu’il déclenche l’action attendue.
2. Le nom accessible diffère du texte visible, ce qui peut gêner la compréhension et la commande vocale. Supprimez cet `aria-label` pour que le texte "Recommencer" fournisse le nom.
3. Ajoutez un message qui explique comment corriger la saisie et associez-le au champ avec `aria-describedby`. Signalez l’état invalide avec `aria-invalid`, puis retirez cet état après correction. Vérifiez le résultat avec un lecteur d’écran.
4. Non. Il faut aussi tester le clavier, la restitution du lecteur d’écran, l’affichage et la réalisation de la tâche. Notez les limites de vos vérifications.

</details>

Pour prolonger l’exercice, appliquez une correction à votre propre page MJC ou à une autre page dont vous pouvez modifier le code. Documentez le test avant et après.

[Sources et crédits des illustrations](/ressources/ux-ui/a11y/sources.md).
