---
title: 'La typographie et les couleurs'
order: 12
publishedAt: "2026-09-28"
updatedAt: "2026-10-01"
---

# La typographie et les couleurs

Les polices et les couleurs aident à distinguer les titres, les contenus et les actions. Elles donnent aussi un ton à l'interface. Pour la MJC, testez vos choix sur le nom d'un atelier, sa description et le bouton de réservation.

Pour l’atelier, utilisez la police de la charte et les quatre styles ci-dessous. Les familles de polices, les harmonies et le moodboard restent des ressources complémentaires.

## Les familles de polices

<img src="/ressources/ux-ui/familles-polices.webp" alt="Le même mot écrit en serif, sans-serif, chasse fixe, script et display." width="370" height="412" loading="lazy">

| Famille | Comment la reconnaître | Usages possibles | Exemples |
| --- | --- | --- | --- |
| Serif | Des empattements : de petits traits au bout des lettres | Titres ou texte courant, selon le dessin de la police | Times New Roman, Garamond, Merriweather |
| Sans-serif | Des lettres sans empattements | Titres, paragraphes et libellés d'interface | Helvetica, Arial, Inter, Roboto |
| Display | Un dessin prévu pour les grandes tailles | Titres courts et affiches | Bebas Neue, Anton |
| Décorative | Des formes stylisées, par exemple des lettres manuscrites | Logo ou mot isolé, après vérification de la lisibilité | Lobster, Pacifico |

Ces catégories ne suffisent pas à choisir une police. Une display peut devenir difficile à lire en petit. Pour les paragraphes, testez un texte complet à la taille prévue, avec des caractères accentués.

### Associer deux polices

Une seule police suffit souvent, avec plusieurs graisses. Si vous en prenez deux, cherchez un contraste net : une serif ou une display pour les titres, une sans-serif neutre pour le texte.

Testez-les avec du vrai texte. "Menu étudiant à 6,50 €" en titre, suivi d'une phrase de description, en dit plus qu'un mot "Typography" écrit en 60 px.

Ces deux sites montrent l'effet d'un choix de police. Le Dansk Byplanlaboratorium utilise une seule sans-serif, en plusieurs tailles. Daisy associe des titres en serif à un texte en chasse fixe, ce qui distingue les titres des autres textes.

<img src="/ressources/ux-ui/polices-byplanlab.webp" alt="Site du Dansk Byplanlaboratorium : de grands titres en sans-serif sur une photo aérienne de côte." width="935" height="549" loading="lazy">

<img src="/ressources/ux-ui/polices-daisy.webp" alt="Site de Daisy : un titre en serif, une ligne en chasse fixe dessous, et des cartes colorées." width="953" height="560" loading="lazy">

## L'échelle typographique

Une échelle typographique, ou _type scale_, définit les tailles de texte de l'interface. Pour construire une échelle modulaire, on part d'une taille de base et on la multiplie par un même ratio à chaque niveau.

Avec une base de 16 px et un ratio de 1,25, on obtient 16, 20, 25, 31,25 et 39,06 px. Arrondissez et ajustez ces tailles selon la charte, puis testez leur lisibilité avec votre police et vos vrais textes.

Le site [Typescale](https://typescale.com/) permet de comparer ces échelles. Aucun plugin n'est nécessaire pour l'exercice.

À titre d'exemple, l'échelle de Material Design 3 nomme les styles par rôle (Display, Headline, Title, Label, Body) et propose trois tailles pour chacun (L, M, S), en version standard (*baseline*) et accentuée (*emphasized*).

<img src="/ressources/ux-ui/typescale.webp" alt="Échelle typographique de Material Design 3 : les rôles Display, Headline, Title, Label et Body en tailles L, M et S, en version standard (baseline) à gauche et accentuée (emphasized) à droite." width="1353" height="968" loading="lazy">

### Quatre styles pour la MJC

Utilisez cette proposition si votre projet n'a pas encore de styles validés. Elle reprend quelques tailles de l'échelle, avec Arial normal ou gras.

| Style Figma | Taille / interligne | Graisse | Usage |
| --- | --- | --- | --- |
| `text/page-title` | 32 / 40 px | Gras | Nom de l'atelier en titre de page |
| `text/section-title` | 24 / 32 px | Gras | "Choisir une séance" |
| `text/body` | 16 / 24 px | Normal | Informations pratiques et messages |
| `text/label` | 16 / 24 px | Gras | Libellés des champs et boutons |

Dans le code, choisissez les balises `h1`, `h2` et suivantes selon le niveau du titre dans le document, puis appliquez le style. La taille du texte ne détermine pas la balise.

Dans Figma, enregistrez chaque style dans **Typography** et appliquez-le à plusieurs textes. Changez temporairement sa taille : tous les textes liés doivent suivre. Testez les accents et le libellé "Réserver une séance d'essai" sur un écran étroit. Sur le site codé, vérifiez aussi le zoom et le redimensionnement du texte.

### Un texte courant lisible

- Partez de 16 px pour le texte courant, puis vérifiez la lisibilité avec votre police.
- Essayez un interligne de 1,5 fois la taille du texte, soit 24 px pour un texte de 16 px.
- Visez 45 à 75 caractères par ligne lorsque la largeur de l'écran le permet. Des lignes trop longues rendent le retour à la ligne suivante plus difficile.
- Mesurez le contraste avec le fond en vous appuyant sur [les seuils de contraste](/ux-ui/11-hierarchie-visuelle/#le-contraste-et-la-lisibilite).

Comparez ces deux versions du même texte. La seconde augmente l'interligne, raccourcit les lignes et sépare les paragraphes.

<img src="/ressources/ux-ui/texte-serre.webp" alt="À éviter : un paragraphe à l'interligne serré dans un bloc trop large." width="1200" height="738" loading="lazy">

<img src="/ressources/ux-ui/texte-aere.webp" alt="À faire : le même texte avec un interligne plus grand, des lignes plus courtes et un paragraphe de plus." width="1200" height="738" loading="lazy">

## Où trouver des polices

| Site | Ce qu'on y trouve |
| --- | --- |
| [Google Fonts](https://fonts.google.com/) | Un grand catalogue de polices libres, prêtes pour le web |
| [Fontshare](https://www.fontshare.com/) | Des polices gratuites proposées par l'Indian Type Foundry |
| [Collletivo](https://www.collletivo.it/) | Une sélection de polices libres |
| [Velvetyne](https://velvetyne.fr/) | Une fonderie française de polices libres, plus expérimentales |
| [Use & Modify](https://usemodify.com/) | Des polices libres que l'on peut modifier |
| [Tunera](https://www.tunera.xyz/) | Une collection indépendante de polices libres |

Vérifiez que la licence autorise l'usage prévu sur le web : certaines polices gratuites sont réservées à un usage personnel. Utilisez la même police dans la maquette et dans la page codée.

## La roue chromatique

La roue chromatique range les couleurs en cercle. Dans le modèle illustré ici, les trois primaires sont le rouge, le jaune et le bleu. Les secondaires, orange, vert et violet, se placent entre elles. Les tertiaires, comme le bleu-vert, complètent le cercle.

<img src="/ressources/ux-ui/roue-chromatique.webp" alt="Roue chromatique à douze couleurs, avec un triangle qui relie les primaires rouge, jaune et bleu." width="1054" height="709" loading="lazy">

Les harmonies sont des façons de combiner des couleurs d'après leur place sur la roue.

| Harmonie | Comment la construire | Un usage possible |
| --- | --- | --- |
| Monochromatique | Une seule teinte, plus ou moins claire ou saturée | Décliner les fonds et les accents à partir d'une couleur |
| Analogue | Trois couleurs voisines, par exemple bleu, bleu-vert et vert | Composer une palette de teintes proches |
| Complémentaire | Deux couleurs opposées sur la roue, à 180°, comme bleu et orange | Distinguer une couleur dominante et une couleur d'accent |
| Triadique | Trois couleurs espacées de 120° | Prévoir plusieurs accents, en réservant un rôle à chacun |
| Complémentaire adjacente (*split-complementary*) | Une couleur et les deux voisines de sa complémentaire | Essayer deux accents autour de la teinte opposée |

Ces six pages, tirées de Designspiration, montrent chacune une palette réduite : une ou deux couleurs dominantes et un accent.

<img src="/ressources/ux-ui/palettes-sites.webp" alt="Six maquettes de sites aux palettes différentes : orange et vert, coucher de soleil rose, noir et blanc, rose et rouge, jaune et violet, bleu et vert." width="1200" height="598" loading="lazy">

Avec deux couleurs complémentaires, utilisez l'une sur les grandes surfaces et l'autre en accent. Leur opposition sur la roue ne garantit pas la lisibilité du texte. Mesurez le contraste de chaque paire texte/fond avec les couleurs exactes de votre maquette.

## Des couleurs qui ont un rôle

Pour les couleurs de l'interface, choisissez des noms qui décrivent leur rôle. `color.action.primary` désigne l'action principale, que le bouton soit orange ou bleu.

| Rôle | Où elle sert |
| --- | --- |
| Texte | Titres et texte courant |
| Fond | L'arrière-plan des pages et des cartes |
| Action principale | Le bouton qui permet de poursuivre la tâche, comme "Réserver" |
| Erreur | Les messages d'erreur et le contour d'un champ mal rempli |
| Confirmation | Les messages de réussite |

Le rouge pour l'erreur et le vert pour la confirmation sont des conventions. Accompagnez-les d'un message explicite, pour que l'état reste compréhensible si la personne distingue mal ces couleurs.

Pour extraire une palette d'une image, utilisez [Adobe Color](https://color.adobe.com/fr/create/image) ou [Coolors](https://coolors.co/). Dans Figma, la pipette (raccourci I) prélève une couleur sur une image.

## Le moodboard

Le moodboard, ou planche d'inspiration, rassemble des images, des couleurs et des polices pour choisir une direction visuelle avant de dessiner la maquette.

Pour la MJC, comparez par exemple une piste avec des photos d'activités et une autre avec des illustrations.

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
| Brutalisme | Blocs apparents, contrastes marqués, typographie imposante |
| Glassmorphism | Des surfaces floues et transparentes, comme du verre dépoli |
| 3D et isométrique | Des illustrations en volume |
| Illustration, _playful_ | Des dessins, des couleurs vives, un ton léger |

Dans cet exemple, le moodboard rassemble des photos, des palettes et des captures de sites dans Figma :

<img src="/ressources/ux-ui/moodboard-figma.webp" alt="Moodboard dans Figma pour un service de voyage : photos de mer, captures de sites, palettes de bleus et mots d'ambiance, avec les curseurs de quatre membres de l'équipe." width="1200" height="779" loading="lazy">

Où chercher : [Pinterest](https://www.pinterest.fr/), [Dribbble](https://dribbble.com/), [Awwwards](https://www.awwwards.com/), [Designspiration](https://www.designspiration.com/) et [Mobbin](https://mobbin.com/) pour les applis mobiles.

### Le moodboard de votre atelier

Cet atelier est facultatif. Le moodboard aide à choisir un style visuel. Le référentiel DWWM RNCP37674 demande de respecter la charte graphique, sans citer le moodboard comme livrable exigé. [Référentiel officiel, compétence 2](https://www.francecompetences.fr/wp-json/api/v1/activity/export/24208/465344).

Rassemblez 6 à 8 images qui évoquent l'ambiance de votre atelier de la MJC, sur une page "Moodboard" de votre fichier. Tirez-en 3 à 5 couleurs. Testez la police de votre charte avec le nom de votre atelier.

Rendu : le moodboard dans votre fichier de projet. Indiquez ce que vous retenez des références pour [choisir les styles](/ux-ui/13-style-guide-et-composants/#choisir-les-styles) : une couleur, un traitement des photos ou une association de polices.

## À lire

- [Google Fonts Knowledge](https://fonts.google.com/knowledge), des articles courts sur le choix et l'usage des polices. En anglais.
- [Typescale](https://typescale.com/), pour calculer et essayer une échelle typographique.
- [Adobe Color](https://color.adobe.com/fr/create/color-wheel), une roue chromatique qui construit les harmonies et vérifie le contraste.

## Pour la discussion

- Quelle ambiance correspond à votre atelier ? Quelles images la montrent ?
- Votre couleur d'action se voit-elle sans être partout ?
- Votre police reste-t-elle lisible en petit, sur un téléphone ?
