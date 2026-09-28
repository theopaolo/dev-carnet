---
title: 'Le zoning et les wireframes'
order: 9
publishedAt: "2026-09-27"
updatedAt: "2026-09-28"
---

# Le zoning et les wireframes

Inès ouvre l'appli du snack pour trouver un repas à moins de 7 €. Avant de dessiner cette appli, plusieurs décisions sont à prendre : où afficher les plats, quelles informations donner, comment rendre les prix lisibles et ce qui se passe quand elle choisit un menu.

Le zoning, le wireframe, le mockup et le prototype aident à travailler ces décisions. Dans ce chapitre, vous apprendrez à les distinguer, puis vous dessinerez le zoning et les wireframes de votre projet MJC.

## Du zoning au prototype

Ces quatre mots désignent des représentations de l'interface, aussi appelées *livrables*. Chacune permet de discuter d'une question précise.

| Livrable | Ce qu'on représente | La question à vérifier |
| --- | --- | --- |
| Zoning | Les grandes zones, avec leur nom et leur place | Où mettre les informations prioritaires ? |
| Wireframe | Les contenus et les commandes de chaque zone | Que faut-il lire, choisir ou remplir ? |
| Mockup, ou maquette graphique | L'apparence prévue : couleurs, typographie, images | Les éléments sont-ils lisibles et reconnaissables ? |
| Prototype | Les réactions aux actions, simulées sur un parcours | La personne arrive-t-elle à accomplir sa tâche ? |

Cette distinction est aussi présentée dans [l'article de Blog UX sur les quatre livrables](https://blog-ux.com/quelle-est-la-difference-entre-le-zoning-wireframe-mockup-et-prototype/).

Dans ce cours, « maquette » désigne la maquette graphique. Le mot peut avoir un sens plus large dans une équipe : précisez si vous attendez un dessin en gris, un écran avec ses styles ou un parcours à essayer.

On peut relier des wireframes pour les tester avant de travailler les couleurs. Un test peut aussi conduire à revoir le zoning. Ces livrables accompagnent les corrections tout au long du projet.

Avant le zoning, un croquis au crayon suffit souvent pour essayer une idée. Voici le croquis, le zoning et le wireframe de la page d'une voiture électrique :

<img src="/ressources/ux-ui/croquis-zoning-wireframe.webp" alt="Trois versions d'une même page. Le croquis au crayon montre un en-tête, un titre, une voiture, un prix et trois encarts. Le zoning remplace ces éléments par des rectangles gris nommés : en-tête et navigation, titre, contenu de niveau 1, appel à l'action, trois encarts de niveau 2. Le wireframe ajoute les vrais textes, les onglets et les boutons." width="1200" height="382" loading="lazy">

## Le zoning

Le zoning découpe un écran en grandes zones, avant le wireframe. Chaque zone a un nom et une place. On décide ce qui va où, sans dessiner les détails.

1. Placez d'abord les informations nécessaires au choix de l'atelier.
2. Organisez les zones autour des besoins du persona.
3. Dessinez des blocs et nommez-les. Gardez les textes détaillés, les images et les couleurs pour la suite.

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

Imaginez deux zonings : dans le premier, une grande présentation du snack repousse la liste des plats en bas. Dans le second, la liste apparaît juste après les catégories. Pour Inès, qui doit choisir pendant sa pause, le second donne plus tôt accès aux prix. Vous pouvez comparer ces deux organisations avec quelques rectangles.

Avant de détailler l'écran, faites expliquer votre zoning à un binôme. Il doit pouvoir situer la liste des plats et l'accès à la commande. Si une zone manque ou semble mal placée, déplacez-la maintenant.

Un autre exemple montre une page d'accueil en zoning, en wireframe puis en prototype. Le bleu repère ici les éléments prévus pour être cliquables. Cette image fixe ne permet pas d'essayer leurs réactions : il faut ouvrir le prototype pour cela.

<img src="/ressources/ux-ui/zoning-wireframe-prototype.webp" alt="Trois écrans côte à côte. Le zoning n'a que des blocs gris et des cercles. Le wireframe ajoute des lignes de texte dans les mêmes blocs. Le prototype colore en bleu les liens et les boutons." width="960" height="600" loading="lazy">

## Le wireframe

Un wireframe, ou « maquette fil de fer », détaille le contenu des zones : titres, textes, champs et boutons. Dans cet atelier, il reste en gris pour concentrer la discussion sur ce que la personne comprend et peut faire.

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

Le zoning disait « Liste des plats, avec les prix ». Le wireframe écrit « Menu étudiant, 6,50 € ». Inès peut maintenant comparer ce prix à son budget. Le libellé « Commander » indique l'action proposée.

Le dessin laisse toutefois une décision ouverte : comment sélectionner un plat avant de commander ? Ajoutez un bouton « Ajouter » sur chaque ligne ou prévoyez une fiche qui permet de choisir. Annotez le comportement retenu. Un bouton dessiné indique une action possible, mais ne la fait pas encore fonctionner.

Un wireframe peut aussi se dessiner à la main. Sur ces deux écrans d'une appli de commandes, les croix marquent les images et des vagues remplacent les paragraphes. Les titres et les boutons gardent leurs vrais mots : « Cancel », « Accept ».

<img src="/ressources/ux-ui/wireframe-papier.webp" alt="Deux écrans de téléphone dessinés à la main. La liste des commandes montre des images barrées, des noms et des prix. La fiche d'une commande montre une grande image, un prix, les boutons Cancel et Accept et des lignes ondulées à la place du texte." width="768" height="604" loading="lazy">

### Basse et haute fidélité

La fidélité décrit la proximité avec le produit envisagé. On peut préciser l'apparence, les contenus et les interactions séparément. Des textes réalistes peuvent donc figurer sur un croquis très simple.

| Représentation | Ce qu'elle permet d'examiner |
| --- | --- |
| Croquis ou wireframe peu détaillé | L'ordre des contenus et les actions proposées |
| Wireframe détaillé | Les textes, les dimensions et les différents états d'un écran |
| Maquette graphique | Le rendu des contenus avec les couleurs, les polices et les images prévues |

<img src="/ressources/ux-ui/basse-haute-fidelite.webp" alt="Le même écran d'envoi de colis en trois versions. En basse fidélité, les logos des transporteurs sont des rectangles barrés. En haute fidélité, les vrais logos et prix apparaissent. Le design final ajoute la couleur bleue de la marque et des étiquettes colorées." width="1200" height="304" loading="lazy">

Dans cette illustration, « haute fidélité » désigne le wireframe plus détaillé du milieu. Le niveau de détail visuel ne dit pas si un écran est interactif : une image très soignée peut être statique, et un croquis peut servir à tester un parcours. [Nielsen Norman Group distingue ces dimensions de la fidélité](https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/).

Pour cet atelier, restez en basse fidélité, avec de vrais libellés. Les styles se travaillent dans la [maquette](/ux-ui/14-maquette-et-test/).

### Pourquoi faire des wireframes

- Pour vérifier l'ordre des contenus avant de choisir les couleurs.
- Pour discuter avec le client et les développeurs à partir d'un même dessin.
- Pour déplacer un champ ou une section sans reprendre les styles d'une maquette détaillée.

### Ce qu'on évite

- Les couleurs, les polices décoratives et les photos. On les choisit à l'étape de la maquette.
- Le faux texte « lorem ipsum » dans les titres et les boutons. Écrivez les vrais libellés : « Commander » dit ce que fait le bouton.
- Les détails : ombres, arrondis, icônes.

## Le mockup, ou maquette graphique

Le mockup montre l'apparence prévue de l'écran. On applique le [style guide](/ux-ui/13-style-guide-et-composants/) aux contenus du wireframe : typographie, couleurs, espacements, images et icônes.

Sur la page du snack, les rectangles barrés deviennent des photos de plats. Le prix de 6,50 € reçoit une taille et un contraste qui permettent de le lire. Le bouton « Commander » reprend le style des actions principales.

Examinez la maquette à la taille d'un téléphone : le prix se distingue-t-il de la description ? Un nom de plat long reste-t-il lisible ? Le bouton se reconnaît-il comme une action ? Si un texte ne tient pas, adaptez la mise en page. Le wireframe reste une base que l'on peut corriger.

À ce stade, vous pouvez montrer l'aspect du panier. Pour observer comment Inès y ajoute un menu puis corrige sa commande, il faut simuler ces actions.

## Le prototype

Un prototype permet d'essayer une partie du fonctionnement prévu. On prépare les réactions aux actions de la personne, par exemple l'ouverture du panier ou l'affichage d'une confirmation.

Pour le snack, reliez uniquement les écrans nécessaires au scénario :

1. Sur la liste des plats, « Ajouter » place le menu étudiant dans un panier simulé.
2. Le panier affiche le menu, sa quantité et le total. « Retirer » permet de revenir à un panier vide.
3. « Commander » ouvre le récapitulatif et les étapes prévues pour valider la commande.
4. Une confirmation donne le numéro de commande et l'heure de retrait.

Faites essayer ce parcours avec la consigne : « Tu as 7 € et vingt minutes pour déjeuner. Commande un repas, puis indique quand tu pourras le récupérer. » Notez si la personne trouve le prix, comprend le total et repère l'heure de retrait.

Dans ce prototype d'exercice, aucun paiement n'est encaissé et aucune commande n'est envoyée au snack. Les écrans simulent ces résultats. Si une action n'a pas été préparée, notez cette limite au lieu de conclure que la personne ne sait pas utiliser l'interface.

### Tester dès les wireframes

Vous pouvez faire ce premier essai avec des écrans en gris reliés dans Figma ou Penpot. Sur papier, le binôme pointe une commande du doigt et vous présentez la feuille correspondant au résultat. Dans les deux cas, vous observez ses choix avant de finaliser les styles.

Si la personne cherche comment retirer le menu du panier, ajoutez ou clarifiez cette action et refaites l'essai. Les étapes pour relier les écrans et conduire le test sont détaillées dans [La maquette et le test](/ux-ui/14-maquette-et-test/).

## Quel livrable choisir ?

Partez de ce que vous voulez apprendre. Dessinez seulement ce qui permet de l'examiner.

| Situation dans le projet MJC | Travail utile maintenant |
| --- | --- |
| Vous hésitez entre placer les créneaux avant ou après la description | Comparer deux zonings de la fiche atelier |
| Vous ne savez pas quoi afficher quand une séance est complète | Dessiner le wireframe de cet état, avec l'accès à la liste d'attente |
| Le bouton de réservation se confond avec le texte | Revoir sa présentation dans la maquette graphique |
| Vous voulez savoir si une personne comprend qu'elle est sur liste d'attente | Lui faire essayer ce cas dans un prototype |

### À vous de reconnaître

Pour chaque cas, nommez le livrable et dites ce qu'il permet de vérifier :

1. Une feuille contient quatre rectangles : « En-tête », « Atelier », « Créneaux », « Réservation ».
2. Un écran gris montre le champ « E-mail », un exemple de saisie et un message d'erreur.
3. Une image de la fiche atelier présente les photos, les couleurs et les polices retenues. On ne peut pas agir dessus.
4. Trois écrans en gris sont reliés. Un clic sur « Réserver » ouvre le formulaire, puis la confirmation.

<details>
<summary>Voir le corrigé</summary>

1. **Zoning** : on examine l'ordre des grandes zones de la fiche.
2. **Wireframe** : on vérifie les informations nécessaires pour remplir et corriger le champ.
3. **Mockup** : on examine la présentation visuelle de la fiche.
4. **Prototype à partir de wireframes** : on essaie le parcours de réservation. L'absence de couleurs ne l'empêche pas d'être un prototype.

</details>

## Les outils de Figma

Figma s'utilise dans le navigateur, sans installation. Plusieurs personnes peuvent travailler dans le même fichier en même temps. La façon de construire le fichier compte autant que le rendu : des calques nommés, des composants réutilisés et des styles définis aident aussi la personne qui codera la page.

### Les pages et les frames

Une frame est un écran. Avec l'outil Frame (`F`), choisissez un format dans le panneau de droite : un iPhone 14 mesure 390 × 844 px. Renommez la frame dès sa création, par exemple « Fiche atelier ».

Une page regroupe plusieurs frames, par exemple une page pour les wireframes et une autre pour les composants. Le panneau des calques, à gauche, montre les frames de la page ouverte et leur contenu.

### La grille

Une grille de colonnes aide à aligner les éléments. Sur téléphone, prenez 4 colonnes, 24 px de marge à gauche et à droite et 16 px entre les colonnes. Ne placez ni texte ni bouton dans les marges. Ajoutez la grille depuis le panneau de droite de la frame, puis enregistrez-la comme style pour la réutiliser sur les autres écrans.

### L'auto layout

Un bouton fait d'un texte posé sur un rectangle ne s'adapte pas : si le libellé s'allonge, il déborde. Avec l'auto layout (`Maj + A`), le cadre suit son contenu.

<img src="/ressources/ux-ui/figma-bouton-auto-layout.webp" alt="À gauche, un bouton fait d'un texte sur un rectangle, avec un espace intérieur approximatif. À droite, le même bouton en auto layout, dont le cadre indique Hug × 44." width="1200" height="283" loading="lazy">

Le panneau de l'auto layout règle la direction, l'espacement entre les éléments, le padding (l'espace intérieur) et l'alignement.

<img src="/ressources/ux-ui/figma-auto-layout-reglages.webp" alt="Le panneau Auto layout de Figma, annoté : la direction verticale ou horizontale, l'espacement entre les éléments, le padding horizontal et vertical, l'alignement, le padding de chaque côté et les réglages avancés." width="1200" height="381" loading="lazy">

La largeur et la hauteur de chaque élément ont trois réglages :

| Réglage | Ce que fait l'élément | Exemple |
| --- | --- | --- |
| Fixed | Il garde sa taille. | Un écran de 390 px de large |
| Hug | Il s'ajuste à son contenu. | Un bouton qui suit la longueur de son libellé |
| Fill | Il occupe toute la place disponible. | Un bouton sur toute la largeur de l'écran |

Réglez les espacements au chiffre près, avec des multiples de 8 : 8, 16, 24, 32 px. Pour un bouton, mettez deux fois plus de padding sur les côtés qu'en haut et en bas, par exemple 12 px et 24 px. Une hauteur d'environ 44 px rend le bouton facile à toucher au doigt.

Les auto layouts s'emboîtent comme les `div` en HTML : les boutons forment une ligne, la ligne se range dans une section, la section dans l'écran.

### Le défi de l'auto layout

Combien d'auto layouts contient cet écran ? 1, 7, 10 ou 23 ?

<img src="/ressources/ux-ui/figma-defi-auto-layout.webp" alt="Écran de téléphone d'une boutique : bouton retour, recherche et panier, photo d'une basket, nom et prix, grille de neuf tailles, bouton favori et bouton Ajouter au panier." width="300" height="641" loading="lazy">

<details>
<summary>Voir la réponse</summary>

Il y en a 23. Chaque pointillé entoure un auto layout : l'en-tête, chaque bouton, chaque ligne de tailles, la grille, la section des tailles, la barre du bas et l'écran entier.

<img src="/ressources/ux-ui/figma-defi-auto-layout-reponse.webp" alt="Le même écran avec des pointillés de couleur autour de chaque auto layout, emboîtés les uns dans les autres." width="300" height="644" loading="lazy">

</details>

### Les raccourcis

| Outil | Raccourci | Pour quoi faire |
| --- | --- | --- |
| Frame | F | Créer un écran. Choisissez un format téléphone ou ordinateur dans le panneau de droite. |
| Rectangle | R | Dessiner une zone ou une image |
| Texte | T | Écrire les titres, les libellés et les boutons |
| Auto layout | Maj + A | Empiler des éléments avec un espace régulier |
| Composant | Ctrl + Alt + K, ou Cmd + Option + K sur Mac | Réutiliser un élément, comme un bouton ou une carte |
| Section | Maj + S | Ranger les écrans par étape |

## Ateliers : dessiner les écrans de la MJC

### Le zoning

Dessinez les grandes zones de la fiche atelier. Placez en premier ce dont votre persona a besoin pour décider de réserver. Des rectangles avec un nom suffisent.

Essayez deux ordres différents pour la description et les informations pratiques. Choisissez-en un en vous appuyant sur un besoin de votre persona, puis notez la raison en une phrase.

### Prendre en main Figma

1. Ouvrez votre fichier de projet dans Figma. Si vous n'en avez pas, créez un fichier de design nommé « MJC des Tilleuls ».
2. Avec l'outil Frame (`F`), créez un écran au format téléphone. Nommez-le « Fiche atelier ».
3. Avec Rectangle (`R`) et Texte (`T`), reproduisez les zones de votre zoning. Ajoutez le nom de l'atelier, une description et le texte « Réserver une séance d'essai ».
4. Sélectionnez le texte du bouton et appliquez l'auto layout (`Maj + A`). Ajoutez un fond gris et de l'espace autour du texte.
5. Changez le libellé du bouton : son cadre doit s'adapter au texte. Renommez vos éléments dans le panneau des calques pour les retrouver.

Rendu : une fiche atelier en gris, avec un bouton qui s'adapte à son libellé. Utilisez ce fichier pour les wireframes.

### Les wireframes

Dessinez trois écrans en gris, avec les vrais titres, libellés et boutons :

| Écran | Contenu à prévoir |
| --- | --- |
| Liste des ateliers | Nom et description des activités, public concerné, accès à chaque fiche |
| Fiche atelier | Activité, âge accepté, matériel, lieu, créneaux et accès à la réservation |
| Réservation | Séance choisie, prénom, nom, âge, e-mail et bouton de validation |

Ajoutez les états du parcours :

- Une confirmation avec l'atelier, la date, l'heure, le lieu et le matériel à prévoir.
- Une erreur de saisie qui indique quel champ corriger et comment.
- Une séance complète avec accès à la liste d'attente.
- Un message qui demande aux moins de 18 ans d'apporter une autorisation parentale.

Vérifiez qu'on peut suivre le parcours depuis la liste des ateliers jusqu'au résultat de la réservation.

Faites une première lecture avec un binôme. Sans lui indiquer où regarder, demandez-lui de trouver un atelier adapté à son âge, de choisir une séance et d'indiquer ce qu'il doit apporter. Il peut pointer les actions pendant que vous lui montrez l'écran suivant.

Avant de rendre, vérifiez que :

- Le prix de la séance d'essai, les âges acceptés et le matériel sont indiqués.
- Chaque champ a un libellé et l'erreur explique comment corriger la saisie.
- La réservation confirmée et l'inscription sur liste d'attente donnent des messages distincts.
- Le cas d'une personne mineure autorise la réservation et rappelle l'autorisation à apporter.

Corrigez une hésitation observée et gardez une courte note de ce que vous avez changé.

Rendu : le zoning et les trois écrans avec leurs états, dans votre fichier de projet. Ils serviront de base à [la maquette UI](/ux-ui/14-maquette-et-test/).

## À lire

- [Quelle est la différence entre le zoning, wireframe, mockup et prototype ?](https://blog-ux.com/quelle-est-la-difference-entre-le-zoning-wireframe-mockup-et-prototype/), Blog UX, pour comparer les quatre livrables.
- [UX Prototypes: Low Fidelity vs. High Fidelity](https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/), Nielsen Norman Group, sur les niveaux de fidélité et les tests sur papier ou écran. En anglais.
- [Un wireframe, c'est quoi ?](https://blog-ux.com/un-wireframe-cest-quoi/), blog-ux.
- [Maquettage UX Design : wireframe, maquette ou prototype ?](https://www.arquen.fr/blog/maquettage-ux-wireframe-maquette-ou-prototype/), Arquen.
- [Appliquez les bonnes pratiques de prototypage](https://openclassrooms.com/fr/courses/3013856-decouvrez-les-fondamentaux-de-l-ux-design/4041901-appliquez-les-bonnes-pratiques-de-prototypage), OpenClassrooms.
- [Guide de l'auto layout](https://help.figma.com/hc/fr/articles/360040451373-Guide-de-l-auto-layout), aide de Figma.
- [What is a wireframe and how to make one](https://penpot.app/blog/what-is-a-wireframe-and-how-to-make-one/), Penpot, l'équivalent libre de Figma. En anglais.

## Pour la discussion

- Qu'est-ce qui a changé entre votre zoning et vos wireframes ?
- Que peut-on apprendre en faisant essayer un prototype en gris ? Que reste-t-il à vérifier sur le site codé ?
