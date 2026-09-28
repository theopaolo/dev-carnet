---
title: 'La hiérarchie visuelle'
order: 11
publishedAt: "2026-09-28"
updatedAt: "2026-09-28"
---

# La hiérarchie visuelle

L'UI design définit l'apparence et les états des éléments d'une interface. La taille, le contraste, la position et l'espacement indiquent ce qu'il faut lire ou utiliser en priorité. Sur la fiche d'un atelier, le bouton « Réserver » doit se distinguer des liens secondaires.

## Du wireframe au design

La maquette reprend les contenus et l'ordre des wireframes. Elle précise la typographie, les couleurs, les espacements et les états des éléments interactifs.

Dans l'appli du snack, Inès cherche un repas à moins de 7 €. Les choix visuels doivent lui permettre de comparer les menus et de comprendre si sa commande est partie.

| Élément | Choix UI | Ce qu'Inès doit comprendre |
| --- | --- | --- |
| Carte d'un menu | Nom et prix lisibles, même place sur chaque carte | Ce qu'elle peut commander avec son budget |
| Bouton « Commander » | Action principale visible, distincte du lien de retour | Comment valider son choix |
| Champ du formulaire | Libellé visible et message près du champ concerné | Quelle information saisir ou corriger |
| Confirmation | Message explicite et récapitulatif de la commande | Que la commande est reçue et ce qui se passe ensuite |

Une couleur seule ne suffit pas à expliquer un état. Écrivez « Indisponible » ou « Commande confirmée » et gardez le texte lisible sur son fond.

## Où regarder en premier

La hiérarchie visuelle range les éléments d'un écran par ordre d'importance. Elle indique à l'œil par où commencer. En 2006, une équipe de chercheurs dirigée par Gitte Lindgaard a montré que les participants jugeaient l'aspect d'une page web après 50 millisecondes d'affichage.

Si le titre, la description et les mentions secondaires ont le même traitement, leur ordre d'importance est difficile à repérer.

Un article de blog montre une hiérarchie simple :

1. Le titre se voit en premier. Il est le plus grand.
2. Le chapeau donne le contexte. Il a une taille intermédiaire.
3. Le texte courant sert à lire. Il a la taille standard.
4. Les notes sont secondaires. Elles sont plus petites.

## Les quatre leviers

| Levier | Le principe | Dans une interface |
| --- | --- | --- |
| Taille | Plus c'est grand, plus ça paraît important. | Le titre de page, le prix d'un produit |
| Contraste | Ce qui se distingue du reste attire l'œil. | Le seul bouton en couleur vive sur un écran neutre |
| Position | Le haut et le centre de l'écran sont regardés en premier. | L'information clé en haut, les mentions légales en bas |
| Espacement | Des éléments proches semblent liés. L'espace autour d'un élément le met en valeur. | Un libellé collé à son champ, de l'air entre deux sections |

### La taille

La taille est le levier le plus direct. Les journaux impriment leurs titres importants en très grand. Dans cette comparaison, la même baleine agrandie devient le centre de l'image, alors qu'elle se perdait dans le décor.

<img src="/ressources/ux-ui/baleine-taille.webp" alt="Avant et après : à gauche, une petite baleine à côté d'un plongeur se perd dans le fond. À droite, la baleine agrandie occupe l'image." width="1200" height="620" loading="lazy">

Prévoyez deux ou trois tailles nettement différentes. Un titre à 24 px et un sous-titre à 22 px ont des tailles proches. Essayez 32 px et 18 px, puis vérifiez si les niveaux se distinguent avec votre police. La page [La typographie et les couleurs](/ux-ui/12-typographie-et-couleurs/#lechelle-typographique) explique comment calculer ces tailles.

### Le contraste

Le contraste joue sur les différences :

- De couleur : une couleur vive au milieu de tons neutres.
- De valeur : un élément foncé sur un fond clair, ou l'inverse.
- De saturation : une couleur éclatante parmi des couleurs ternes.

Sur cette affiche de théâtre, le mot blanc occupe presque toute la largeur du fond rouge. Sa taille et sa couleur le font ressortir.

<img src="/ressources/ux-ui/contraste-affiche.webp" alt="Affiche rouge du Young Vic : le mot CRACKING en très grandes lettres blanches barre toute la largeur." width="1166" height="824" loading="lazy">

Un élément qui sort de la série attire aussi l'œil, comme une silhouette claire au milieu de silhouettes foncées. Les lois de l'UX appellent cela l'[effet Von Restorff](https://lawsofux.com/fr/effet-von-restorff/).

Réservez la couleur d'accent à l'action principale et aux messages importants. Si tous les éléments l'utilisent, elle ne permet plus de les distinguer.

### La position

Sur un écran, certaines zones sont regardées plus que d'autres :

- Le haut de la page est vu en premier. On y place le logo, la navigation et le message principal.
- Le centre attire le regard.
- Le bas reçoit moins d'attention. On y range le pied de page et les informations secondaires.

En français, on lit de gauche à droite et de haut en bas. Deux parcours du regard reviennent souvent :

| Parcours | Sur quelles pages | Ce que l'œil fait | Ce qu'on en tire |
| --- | --- | --- | --- |
| En F | Pages avec beaucoup de texte : articles, résultats de recherche | Il lit les premières lignes, puis descend en ne lisant que le début des lignes. | Placez les mots importants au début des titres et des lignes. |
| En Z | Pages avec peu de texte : accueil, affiche | Il va du haut à gauche au haut à droite, traverse en diagonale, puis finit en bas à droite. | Placez le logo au départ du Z et l'action à la fin. |

Ne placez pas l'information la plus importante tout en bas, dans un coin.

### L'espacement

L'espacement groupe et sépare. C'est la loi de proximité de la [Gestalt](/ux-ui/02-lois-de-l-ux/#les-principes-de-la-gestalt) : un libellé proche de son champ se lit avec lui. Si le libellé est aussi loin de son champ que du champ voisin, leur association devient ambiguë.

L'espace vide, ou _white space_, met aussi en valeur. Un élément entouré d'air paraît plus important qu'un élément serré entre d'autres.

Ces deux versions d'un formulaire de paiement contiennent les mêmes champs. La première aligne tous les champs en trois colonnes serrées. La seconde les regroupe par sujet, avec le titre de chaque groupe à gauche et une ligne de séparation entre les groupes. Les coordonnées et les informations de paiement forment ainsi des blocs distincts.

<img src="/ressources/ux-ui/formulaire-serre.webp" alt="À éviter : un formulaire de paiement dont les champs sont alignés en trois colonnes serrées, sans groupes." width="1200" height="738" loading="lazy">

<img src="/ressources/ux-ui/formulaire-groupe.webp" alt="À faire : le même formulaire, avec les champs regroupés par sujet, le nom de chaque groupe à gauche et une ligne entre les groupes." width="1200" height="813" loading="lazy">

Gardez moins d'espace entre un libellé et son champ qu'entre deux champs. Séparez davantage les sections du formulaire.

## Vérifier la hiérarchie

Plissez les yeux devant votre écran, ou floutez une capture. Ce qui reste visible doit être ce que votre persona doit voir en premier. Si c'est un élément secondaire, revoyez la taille, le contraste ou la place.

Essayez sur ces trois pages. Pour chacune, qu'est-ce que vous voyez en premier ? Quel levier produit cet effet ?

<img src="/ressources/ux-ui/site-balavoine.webp" alt="Portfolio de Clément Balavoine : une moitié noire presque vide avec un petit texte, l'autre moitié occupée par une grande photo." width="1200" height="707" loading="lazy">

<img src="/ressources/ux-ui/site-twigs.webp" alt="Boutique twigs : un grand titre à gauche, un bouton Shop Now foncé en dessous, des cartes de vœux en photo à droite." width="1200" height="705" loading="lazy">

<img src="/ressources/ux-ui/site-blue-marine.webp" alt="Blue Marine Foundation : une phrase centrée en capitales au-dessus d'une photo d'océan qui remplit l'écran." width="1200" height="701" loading="lazy">

## Le contraste et la lisibilité

Un texte doit rester lisible sur son fond. Le contraste se mesure par un rapport entre la couleur du texte et celle du fond, de 1:1 (aucune différence) à 21:1 (noir sur blanc).

Le RGAA, le référentiel d'accessibilité utilisé en France, fixe des seuils :

| Critère RGAA | Ce qu'il vérifie | Seuil |
| --- | --- | --- |
| 3.1 | L'information n'est pas donnée par la couleur seule. | Un texte ou une forme accompagne la couleur. |
| 3.2 | Le contraste du texte avec son fond | 4,5:1 pour le texte courant. 3:1 pour le grand texte : 24 px, ou 18,5 px en gras. |
| 3.3 | Le contraste des composants et des graphiques qui portent une information | 3:1, par exemple pour la bordure d'un champ ou le contour du focus |

Quelques mesures sur fond blanc :

| Couleur du texte | Rapport | Texte courant |
| --- | --- | --- |
| Gris `#aaaaaa` | 2,32:1 | Trop clair |
| Gris `#767676` | 4,54:1 | Tout juste suffisant |
| Presque noir `#1a1a1a` | 17,4:1 | Très lisible |

Dans cet exemple, un texte rose sur un fond rose pâle obtient 1,49:1 : il échoue à tous les niveaux.

<img src="/ressources/ux-ui/contraste-plugin-figma.webp" alt="Plugin Color contrast dans Figma : rapport de 1,49 entre un texte rose et un fond rose pâle, échec aux niveaux AA et AAA." width="240" height="476" loading="lazy">

Mesurez vos couleurs avec un plugin de contraste dans Figma ou avec le [Contrast Checker de WebAIM](https://webaim.org/resources/contrastchecker/). Vérifiez aussi ces critères sur la page codée.

## À lire

- [Visual Hierarchy in UX: Definition](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/), Nielsen Norman Group, sur la taille, la couleur, le contraste et l'espacement. En anglais.
- [F-Shaped Pattern of Reading on the Web](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/), Nielsen Norman Group, sur le parcours en F. En anglais.
- [Effet Von Restorff](https://lawsofux.com/fr/effet-von-restorff/), Laws of UX.
- [Critère 3.2 du RGAA](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#3.2), sur le contraste du texte.

## Pour la discussion

- Sur votre wireframe de la fiche atelier, qu'est-ce que votre persona doit voir en premier ?
- Quel élément attire l'œil alors qu'il n'est pas important ?
- Une interface très contrastée partout est-elle plus lisible ?
