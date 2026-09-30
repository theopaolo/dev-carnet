---
title: 'Le persona'
order: 5
publishedAt: "2026-09-27"
updatedAt: "2026-09-30"
---

# Le persona

Un persona est un profil fictif construit à partir de besoins, d'objectifs et de difficultés observés. L'équipe s'y réfère pour choisir les contenus, les fonctionnalités et l'ordre des écrans. Sa fiche résume le brief et les entretiens, sans remplacer les échanges avec les utilisateurs.

## Pourquoi en créer ?

Si les personnes interrogées hésitent à réserver sans connaître le matériel nécessaire, notez ce frein dans le persona. L'équipe peut alors afficher le matériel avant le bouton de réservation.

Il sert aussi à vérifier les suppositions de l'équipe. "Les jeunes veulent tous réserver sur téléphone" est une hypothèse tant que personne ne l'a confirmé. Notez-la comme telle, puis confrontez-la aux entretiens et aux tests.

## Ce que contient la fiche

| Champ | La question à se poser |
| --- | --- |
| Prénom, âge et situation | Qui est-ce ? L'âge compte-t-il pour accéder à l'atelier ou obtenir un accord parental ? |
| Objectif | Que veut faire cette personne, dans ce projet précis ? |
| Motivation et freins | Pourquoi veut-elle venir ? Qu'est-ce qui pourrait l'en empêcher ? |
| Usage | Sur quel appareil agit-elle ? Utilise-t-elle une technologie d'assistance, comme un lecteur d'écran, ou une autre manière de naviguer, si vous le savez ? |
| Sa phrase | Quels mots a-t-elle employés en entretien ? N'inventez pas de citation. |
| Source | Qu'est-ce qui vient d'un entretien, du brief ou d'une hypothèse à vérifier ? |

Gardez les détails qui peuvent changer une décision de conception. Une profession ou une tranche d'âge sans lien avec l'objectif n'aide pas à choisir un écran.

## Deux exemples illustrés

Ces deux profils illustrent des besoins différents : acheter en ligne et trouver des conseils sur les plantes. Leur fiche dépend du projet, comme celle que vous créez pour la MJC.

<div class="persona-examples">
  <figure>
    <img src="/ressources/ux-ui/marie.png" alt="Illustration de Marie assise devant un ordinateur portable" width="246" height="227" loading="lazy">
    <figcaption><strong>Marie</strong> 33–38 ans, enseignante. Elle veut acheter vite en ligne, surtout sur son téléphone. Les formulaires trop longs la freinent. Pour sa boutique, l'équipe vérifierait le nombre de champs et le parcours sur mobile.</figcaption>
  </figure>
  <figure>
    <img src="/ressources/ux-ui/lucas.png" alt="Illustration de Lucas debout" width="377" height="349" loading="lazy">
    <figcaption><strong>Lucas</strong> 25–30 ans, développeur mobile. Il veut en apprendre davantage sur ses plantes et passe du téléphone à l'ordinateur. Pour son application, l'équipe vérifierait que les conseils restent faciles à retrouver sur les deux appareils.</figcaption>
  </figure>
</div>

Leur âge et leur métier donnent un contexte. Ce sont leurs objectifs, leurs freins et leur usage qui orientent ici les choix de conception.

## Un exemple suivi dans ce cours

Inès est le persona de l'appli d'un snack de quartier. Le snack veut éviter la queue à midi.

| Champ | Inès |
| --- | --- |
| Prénom et âge | Inès, 17 ans |
| Situation | Lycéenne, elle mange près du lycée le midi |
| Objectif | Manger en moins de 20 minutes pendant sa pause, sans dépasser 7 € |
| Frustrations | La queue à midi. Les prix qui ne sont pas affichés. Ne pas savoir si sa commande est prête. |
| Appareil | Son téléphone, uniquement |
| Sa phrase | "Le midi, j'ai une heure, et j'en passe la moitié à attendre." |

Cet exemple fictif conduit à afficher les prix avant la commande et à prévenir Inès quand sa commande est prête. Vous retrouverez Inès dans les [user stories](/ux-ui/06-user-stories/) et le [parcours utilisateur](/ux-ui/07-journey/). Pour votre persona, utilisez les propos et les difficultés recueillis en entretien.

## Un persona et l'accessibilité

Pierre est un développeur aveugle qui utilise un lecteur d'écran. Sur un formulaire, une image sans texte alternatif ou un bouton sans nom lui cache une information ou une action.

| Situation | Ce que l'équipe peut vérifier pour la MJC |
| --- | --- |
| Pierre utilise un lecteur d'écran | Les images qui portent une information ont un texte alternatif. |
| Une personne réserve une séance d'essai | Chaque champ et chaque bouton a un nom compréhensible. La confirmation de réservation est annoncée. |

Ces vérifications concernent la fiche de l'atelier, le formulaire et sa confirmation. Un persona rend un obstacle concret, mais ne couvre pas à lui seul tous les besoins d'accessibilité. Les [cinq personas d'Orange](https://a11y-guidelines.orange.com/fr/persona/) montrent d'autres situations à examiner.

## Atelier : créer un persona

Reprenez la frame "1–2. Préparer la réservation". Créez un seul profil à partir du brief et du récit entendu : son objectif et ses principaux freins. Signalez ce que vous supposez avec "à vérifier". Notez ce que ce profil vous conduit à prévoir sur la page.

Rendu : une fiche persona dans votre fichier de projet.

## Pensez à tout le monde

Vos entretiens ne couvrent pas tous les besoins. Pensez aussi aux personnes qui lisent difficilement, distinguent mal les couleurs ou utilisent seulement le clavier. Si vous ajoutez un besoin que personne n'a exprimé, marquez-le "à vérifier". Vérifiez aussi ces besoins sur votre page codée.

## À lire

- [Définissez un persona](https://openclassrooms.com/fr/courses/3013856-decouvrez-les-fondamentaux-de-l-ux-design/4089011-definissez-un-persona), OpenClassrooms.
- [Persona en UX design : à quoi sert-il et comment le créer ?](https://www.usabilis.com/persona-ux-design/), Usabilis.
- [Qu'est-ce qu'un persona UX ?](https://blog-ux.com/quest-ce-quun-persona/), avec des exemples et des modèles.

## Pour la discussion

- Dans votre persona, qu'est-ce qui vient des entretiens ? Qu'est-ce qui reste à vérifier ?
- Quelle décision de votre page vient d'un besoin du persona ?
- Un persona inventé par une IA, sans entretien, est-ce de la recherche ?
