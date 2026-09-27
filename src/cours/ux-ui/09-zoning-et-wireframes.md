---
title: 'Le zoning et les wireframes'
order: 9
publishedAt: "2026-09-27"
updatedAt: "2026-09-27"
---

# Le zoning et les wireframes

C'est l'étape 7 du projet, mardi matin. Vous dessinez les écrans, en partant du plus simple.

## Du zoning au prototype

Un écran se conçoit en quatre niveaux, du plus grossier au plus fini. Plus on avance, plus un changement coûte cher. Déplacer une zone sur un zoning prend une minute. Déplacer un bloc dans une page codée demande de reprendre le HTML et le CSS.

| Niveau | Ce qu'il montre | Avec quoi | Quand |
| --- | --- | --- | --- |
| Zoning | Les grandes zones de l'écran, avec leur nom | Papier, ou rectangles dans Figma | Mardi matin |
| Wireframe | Le contenu de chaque zone, en gris : titres, textes, champs, boutons | Figma | Mardi matin |
| Maquette | L'écran final, avec les couleurs, les polices et les images | Figma, avec le style guide | Mardi après-midi |
| Prototype | La maquette rendue cliquable, pour tester le parcours | Figma, onglet Prototype | Pour le test, si vous avez le temps |

## Le zoning

Le zoning découpe un écran en grandes zones, avant le wireframe. Chaque zone a un nom et une place. On décide ce qui va où, sans dessiner les détails.

1. Le plus important va en haut.
2. Chaque zone répond à un besoin du persona.
3. On dessine des blocs et des noms. Pas de texte, pas d'image, pas de couleur.

Voici le zoning de la page menu du snack, sur téléphone :

```mermaid
block-beta
  columns 1
  a["En-tête"]
  b["Recherche"]
  c["Catégories"]
  d["Liste des plats, avec les prix"]
  e["Bouton Commander"]
```

Chaque zone vient du journey d'Inès. La liste affiche les prix, parce qu'Inès cherchait le prix du menu étudiant.

## Le wireframe

Un wireframe est un schéma simplifié d'un écran. Il précise le contenu de chaque zone : les titres, les textes, les champs et les boutons. Il reste en gris.

Voici le wireframe de la même page :

```text
┌────────────────────────────┐
│ Snack du coin       Panier │
├────────────────────────────┤
│ [ Chercher un plat       ] │
│ (Kebab)  (Tacos)  (Soda)   │
│                            │
│ [X]  Menu étudiant  6,50 € │
│ [X]  Tacos poulet      7 € │
│ [X]  Assiette falafel  8 € │
│                            │
│ [        Commander       ] │
└────────────────────────────┘
```

Un rectangle barré d'une croix, ici `[X]`, remplace une image.

### Pourquoi faire des wireframes

- Pour tester la structure vite, avant de choisir les couleurs.
- Pour discuter avec le client et les développeurs à partir d'un même dessin.
- Pour changer d'avis sans perdre de travail.

### Ce qu'on évite

- Les couleurs, les polices décoratives et les photos. On les choisit à l'étape de la maquette.
- Le faux texte « lorem ipsum » dans les titres et les boutons. Écrivez les vrais libellés : « Commander » dit ce que fait le bouton.
- Les détails : ombres, arrondis, icônes.

## Les outils de Figma

| Outil | Raccourci | Pour quoi faire |
| --- | --- | --- |
| Frame | F | Créer un écran. Choisissez un format téléphone ou ordinateur dans le panneau de droite. |
| Rectangle | R | Dessiner une zone ou une image |
| Texte | T | Écrire les titres, les libellés et les boutons |
| Auto layout | Maj + A | Empiler des éléments avec un espace régulier |
| Composant | Ctrl + Alt + K, ou Cmd + Option + K sur Mac | Réutiliser un élément, comme un bouton ou une carte |
| Section | Maj + S | Ranger les écrans par étape |

## L'activité

### Le zoning

En équipe, 30 minutes.

1. Chacun dessine seul le zoning de la fiche atelier, sur papier ou dans Figma. 10 minutes.
2. Partez de votre journey : quelles infos votre persona doit-il voir avant de réserver ?
3. Comparez vos zonings. Retenez les zones et leur ordre en vous appuyant sur les besoins du persona.

### Les wireframes

En équipe, 1 heure. Répartissez-vous les écrans.

1. Dessinez trois écrans : la liste des ateliers, la fiche d'un atelier, la réservation.
2. Choisissez le format selon l'appareil de votre persona.
3. Partez du zoning de l'équipe. Écrivez les vrais libellés.
4. Relisez le brief : l'âge minimum, le matériel, l'accord d'un parent et les places limitées doivent trouver leur place.
5. Relisez vos user stories : chaque critère d'acceptation se voit-il sur un écran ?
6. Ajoutez les états nécessaires : séance complète avec liste d'attente, information manquante, accord parental selon la règle du brief et confirmation de réservation. Une variante d'écran suffit.

Rendu : le zoning, les 3 wireframes et leurs états, dans la section « 7. Zoning et wireframes ». Vous les reprendrez dans [la maquette UI](/ux-ui/11-ui-et-maquette/).

## À lire

- [Un wireframe, c'est quoi ?](https://blog-ux.com/un-wireframe-cest-quoi/), blog-ux.
- [Maquettage UX Design : wireframe, maquette ou prototype ?](https://www.arquen.fr/blog/maquettage-ux-wireframe-maquette-ou-prototype/), Arquen.
- [Appliquez les bonnes pratiques de prototypage](https://openclassrooms.com/fr/courses/3013856-decouvrez-les-fondamentaux-de-l-ux-design/4041901-appliquez-les-bonnes-pratiques-de-prototypage), OpenClassrooms.
- [Guide de l'auto layout](https://help.figma.com/hc/fr/articles/360040451373-Guide-de-l-auto-layout), aide de Figma.
- [What is a wireframe and how to make one](https://penpot.app/blog/what-is-a-wireframe-and-how-to-make-one/), Penpot, l'équivalent libre de Figma. En anglais.

## Pour la discussion

- Qu'est-ce qui a changé entre votre zoning et vos wireframes ?
- Un wireframe en gris suffit-il pour savoir si une page marche ?
