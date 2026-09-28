---
title: 'La typographie et les couleurs'
order: 12
publishedAt: "2026-09-28"
updatedAt: "2026-09-28"
---

# La typographie et les couleurs

Les polices et les couleurs aident à distinguer les titres, les contenus et les actions. Elles donnent aussi un ton à l'interface. Pour la MJC, testez vos choix sur le nom d'un atelier, sa description et le bouton de réservation.

## Les familles de polices

<img src="/ressources/ux-ui/familles-polices.webp" alt="Le même mot écrit en serif, sans-serif, chasse fixe, script et display." width="370" height="412" loading="lazy">

| Famille | Comment la reconnaître | Ce qu'elle évoque | Quand l'utiliser | Exemples |
| --- | --- | --- | --- | --- |
| Serif | Des empattements : de petits traits au bout des lettres | Tradition, sérieux, élégance | Presse, sites institutionnels, marques de luxe | Times New Roman, Garamond, Merriweather |
| Sans-serif | Pas d'empattements, des formes simples | Modernité, clarté | La norme sur écran, pour le texte courant et l'interface | Helvetica, Arial, Inter, Roboto |
| Display | Dessinée pour être vue en grand | Impact, créativité | Les titres seulement, pas les paragraphes | Bebas Neue, Anton |
| Décorative | Très stylisée : manuscrite, graffiti, futuriste | Une personnalité forte | Un logo, un mot mis en avant | Lobster, Pacifico |

Une police display peut devenir difficile à lire en petit. Testez la police à la taille du texte courant, avec un paragraphe complet et des caractères accentués.

### Associer deux polices

Une seule police suffit souvent, avec plusieurs graisses. Si vous en prenez deux, cherchez un contraste net : une serif ou une display pour les titres, une sans-serif neutre pour le texte.

Testez-les avec du vrai texte. « Menu étudiant à 6,50 € » en titre, suivi d'une phrase de description, en dit plus qu'un mot « Typography » écrit en 60 px.

Ces deux sites montrent l'effet d'un choix de police. Le Dansk Byplanlaboratorium utilise une seule sans-serif, en plusieurs tailles. Daisy associe des titres en serif à un texte en chasse fixe, ce qui distingue les titres des autres textes.

<img src="/ressources/ux-ui/polices-byplanlab.webp" alt="Site du Dansk Byplanlaboratorium : de grands titres en sans-serif sur une photo aérienne de côte." width="935" height="549" loading="lazy">

<img src="/ressources/ux-ui/polices-daisy.webp" alt="Site de Daisy : un titre en serif, une ligne en chasse fixe dessous, et des cartes colorées." width="953" height="560" loading="lazy">

## L'échelle typographique

Une échelle typographique, ou _type scale_, calcule les tailles de texte à partir d'une base et d'un ratio. Chaque niveau multiplie le précédent par ce ratio. Vous obtenez des écarts réguliers entre le texte courant et les titres.

Avec une base de 16 px et un ratio de 1,25 :

| Style | Calcul | Taille arrondie |
| --- | --- | --- |
| Petit texte, légende | 16 ÷ 1,25 | 13 px |
| Texte courant | La base | 16 px |
| Titre de niveau 4 | 16 × 1,25 | 20 px |
| Titre de niveau 3 | 20 × 1,25 | 25 px |
| Titre de niveau 2 | 25 × 1,25 | 31 px |
| Titre de niveau 1 | 31 × 1,25 | 39 px |

| Ratio | L'effet | Pour quoi |
| --- | --- | --- |
| 1,125 | Des écarts faibles | Un site avec beaucoup de texte |
| 1,25 | Des écarts modérés | Le texte courant et les titres du projet |
| 1,333 | Des écarts plus marqués | Une interface où les titres doivent se distinguer davantage |
| 1,5 | Des écarts très forts | Une page d'accueil, une affiche |
| 1,618 | Le nombre d'or, des écarts très grands | Peu de niveaux de titres |

Le site [Typescale](https://typescale.com/) calcule l'échelle à partir de la base et du ratio. Des plugins Figma font la même chose.

### Un texte courant lisible

- Prenez 16 px comme point de départ pour le texte courant, puis vérifiez la lisibilité avec votre police.
- Un interligne d'environ 1,5 fois la taille du texte. Les exemples ci-dessous montrent l'effet de l'interligne, de la longueur des lignes et de la séparation des paragraphes.

<img src="/ressources/ux-ui/texte-serre.webp" alt="À éviter : un paragraphe à l'interligne serré dans un bloc trop large." width="1200" height="738" loading="lazy">

<img src="/ressources/ux-ui/texte-aere.webp" alt="À faire : le même texte avec un interligne plus grand, des lignes plus courtes et un paragraphe de plus." width="1200" height="738" loading="lazy">

- Des lignes de 45 à 75 caractères. Au-delà, l'œil se perd en revenant à la ligne suivante.
- Un contraste suffisant avec le fond. Revoyez [les seuils](/ux-ui/11-hierarchie-visuelle/#le-contraste-et-la-lisibilite).

## Où trouver des polices

| Site | Ce qu'on y trouve |
| --- | --- |
| [Google Fonts](https://fonts.google.com/) | Un grand catalogue de polices libres, prêtes pour le web |
| [Fontshare](https://www.fontshare.com/) | Des polices professionnelles gratuites, de l'Indian Type Foundry |
| [Collletivo](https://www.collletivo.it/) | Une sélection de polices libres |
| [Velvetyne](https://velvetyne.fr/) | Une fonderie française de polices libres, plus expérimentales |
| [Use & Modify](https://usemodify.com/) | Des polices libres que l'on peut modifier |
| [Tunera](https://www.tunera.xyz/) | Une collection indépendante de polices libres |

Vérifiez toujours la licence : certaines polices gratuites sont réservées à un usage personnel. Pour le projet, choisissez une police utilisable sur le web. Utilisez cette même police dans la maquette et dans la page codée.

## La roue chromatique

La roue chromatique range les couleurs en cercle. Les trois primaires, rouge, jaune et bleu, forment un triangle. Les secondaires, orange, vert et violet, sont entre elles. Les tertiaires, comme le bleu-vert, complètent le cercle.

<img src="/ressources/ux-ui/roue-chromatique.webp" alt="Roue chromatique à douze couleurs, avec un triangle qui relie les primaires rouge, jaune et bleu." width="1054" height="709" loading="lazy">

Les harmonies sont des façons de combiner des couleurs d'après leur place sur la roue.

| Harmonie | Comment la construire | L'effet | Un usage |
| --- | --- | --- | --- |
| Monochromatique | Une seule teinte, plus ou moins claire ou saturée | Cohérent et calme, parfois monotone | Un site minimaliste |
| Analogue | Trois couleurs voisines, par exemple bleu, bleu-vert et vert | Harmonieux, peu contrasté | Une ambiance douce |
| Complémentaire | Deux couleurs opposées sur la roue, à 180°, comme bleu et orange | Des teintes qui se distinguent | Un bouton d'action qui doit se voir |
| Triadique | Trois couleurs espacées de 120° | Équilibré et vivant, plus difficile à doser | Une palette avec plusieurs accents |
| Split-complémentaire | Une couleur et les deux voisines de sa complémentaire | Trois teintes autour de deux pôles de la roue | Une alternative au complémentaire |

Ces six pages, tirées de Designspiration, montrent chacune une palette réduite : une ou deux couleurs dominantes et un accent.

<img src="/ressources/ux-ui/palettes-sites.webp" alt="Six maquettes de sites aux palettes différentes : orange et vert, coucher de soleil rose, noir et blanc, rose et rouge, jaune et violet, bleu et vert." width="1200" height="598" loading="lazy">

Avec deux couleurs complémentaires, utilisez l'une sur les grandes surfaces et l'autre en accent. Leur opposition sur la roue ne garantit pas la lisibilité du texte. Mesurez le contraste de chaque paire texte/fond avec les couleurs exactes de votre maquette.

## Des couleurs qui ont un rôle

Dans une interface, chaque couleur a une fonction. Nommez-la selon son rôle plutôt que sa teinte : `color.action.primary` reste juste si l'orange devient bleu, `color.orange` ne l'est plus.

| Rôle | Où elle sert |
| --- | --- |
| Texte | Titres et texte courant |
| Fond | L'arrière-plan des pages et des cartes |
| Action principale | Le bouton qu'on veut voir cliquer, les liens |
| Erreur | Les messages d'erreur et le contour d'un champ mal rempli |
| Confirmation | Les messages de réussite |

Le rouge pour l'erreur et le vert pour la confirmation sont des conventions. Écrivez toujours le message : une personne qui distingue mal ces deux couleurs doit comprendre l'état.

Pour extraire une palette d'une image, utilisez [Adobe Color](https://color.adobe.com/fr/create/image) ou [Coolors](https://coolors.co/). Dans Figma, la pipette (raccourci I) prélève une couleur sur une image.

## Le moodboard

Le moodboard est un collage d'images qui montre l'ambiance visuelle d'un projet. On le fait avant de maquetter, pour se mettre d'accord sur la direction.

Il permet par exemple de comparer une piste avec des photos d'activités et une autre avec des illustrations, avant de dessiner les écrans.

Ce qu'on y met :

- Des photos ou des illustrations d'ambiance.
- Des captures de sites ou d'applis au style proche de ce que vous visez.
- Deux ou trois palettes de couleurs.
- Deux ou trois associations de polices.
- Des exemples de composants : boutons, cartes, navigation.
- Des textures, des motifs, des icônes.

Quelques styles visuels à reconnaître :

| Style | Ses signes |
| --- | --- |
| Minimal, épuré | Beaucoup d'espace, peu de couleurs |
| Flat design | Des aplats de couleur, sans ombre ni relief |
| Skeuomorphisme | L'imitation de matières réelles : cuir, bois, métal |
| Brutalisme | Brut, typographie forte, parfois volontairement « moche » |
| Glassmorphism | Des surfaces floues et transparentes, comme du verre dépoli |
| 3D et isométrique | Des illustrations en volume |
| Illustration, _playful_ | Des dessins, des couleurs vives, un ton léger |

Dans cet exemple, le moodboard rassemble des photos, des palettes et des captures de sites dans Figma :

<img src="/ressources/ux-ui/moodboard-figma.webp" alt="Moodboard dans Figma pour un service de voyage : photos de mer, captures de sites, palettes de bleus et mots d'ambiance, avec les curseurs de quatre membres de l'équipe." width="1200" height="779" loading="lazy">

Où chercher : [Pinterest](https://www.pinterest.fr/), [Dribbble](https://dribbble.com/), [Awwwards](https://www.awwwards.com/), [Designspiration](https://www.designspiration.com/) et [Mobbin](https://mobbin.com/) pour les applis mobiles.

### Le moodboard de votre atelier

Cet atelier est facultatif.

Rassemblez 6 à 8 images qui évoquent l'ambiance de votre atelier de la MJC, sur une page « Moodboard » de votre fichier. Tirez-en 3 à 5 couleurs. Proposez deux polices et testez-les avec le nom de votre atelier.

Rendu : le moodboard dans votre fichier de projet. Il vous aidera à [choisir les styles](/ux-ui/13-style-guide-et-composants/#choisir-les-styles).

## À lire

- [Google Fonts Knowledge](https://fonts.google.com/knowledge), des articles courts sur le choix et l'usage des polices. En anglais.
- [Typescale](https://typescale.com/), pour calculer et essayer une échelle typographique.
- [Adobe Color](https://color.adobe.com/fr/create/color-wheel), une roue chromatique qui construit les harmonies et vérifie le contraste.

## Pour la discussion

- Quelle ambiance correspond à votre atelier ? Quelles images la montrent ?
- Votre couleur d'action se voit-elle sans être partout ?
- Votre police reste-t-elle lisible en petit, sur un téléphone ?
