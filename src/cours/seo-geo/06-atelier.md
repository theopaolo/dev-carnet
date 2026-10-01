---
title: "Atelier : corriger la page de Prise d'Air"
order: 6
publishedAt: "2026-10-01"
updatedAt: "2026-10-02"
---

# Atelier : corriger la page de Prise d'Air

La page d'accueil de Prise d'Air contient des erreurs volontaires. Vous allez les repérer, corriger le HTML et vérifier ce qui a changé. Gardez vos notes dans un fichier `seo.md`.

Préparez un éditeur de code, un navigateur avec **Lighthouse**, comme Helium, et un accès à une IA avec recherche web. Vous n'avez pas besoin de compte **Search Console** ni de mettre le site en ligne.

## 1. Observer une recherche et une réponse d'IA

Cherchez "salle d'escalade lyon débutant" dans Google, en navigation privée. Notez le premier élément affiché : annonce, carte, **Aperçu IA** ou **résultat naturel**. Si vous voulez voir les annonces, désactivez le bloqueur de publicité.

Posez ensuite à une IA : "Quelle salle d'escalade pour débuter à Lyon un samedi ?". Utilisez la recherche web si l'outil la propose. Notez deux sources citées, puis ouvrez-en une pour vérifier un prix ou un horaire. Si la réponse ne cite aucune source, notez-le et vérifiez une information sur le site de la salle.

Dans `seo.md`, indiquez la recherche, l'outil utilisé et ce que vous avez vérifié. Quelques phrases suffisent.

## 2. Repérer les problèmes dans la page

Enregistrez [la page à corriger](/ressources/seo-geo/a-corriger.html) sous le nom `a-corriger.html`, au format "HTML uniquement". Ouvrez ce fichier dans votre éditeur.

Pour analyser vos fichiers, lancez un serveur depuis leur dossier :

```sh
python3 -m http.server 8000
```

Ouvrez `http://localhost:8000/a-corriger.html`. Si vous utilisez déjà un serveur local dans votre éditeur, gardez-le.

1. Lisez le `head` : `title`, **meta description**, `viewport` et `noindex`. Examinez ensuite les titres, les liens et les informations pratiques.
2. Dans les **DevTools**, lancez Lighthouse en mode Navigation, appareil Mobile, catégorie SEO. Notez le score et les problèmes signalés.
3. Affichez la page à 360 px de large avec la barre d'outils des appareils. Repérez les débordements.
4. Désactivez JavaScript dans le menu de commandes des DevTools : Ctrl+Shift+P, ou Cmd+Shift+P sur Mac, puis "Disable JavaScript". Rechargez la page et vérifiez les informations encore disponibles. Réactivez JavaScript après ce test.

Notez au moins cinq problèmes et une correction pour chacun. Exemple : "Le menu utilise des `span` avec `onclick`. Je les remplace par des liens `<a href>` pour que les robots puissent suivre les adresses."

<details class="course-details">
<summary>Comparer avec les problèmes prévus dans l'exercice</summary>

- La langue est déclarée en anglais et la balise `viewport` manque.
- Le titre "Accueil" est vague et la meta description manque.
- La balise `noindex` demande de ne pas indexer la page. `meta keywords` n'aide pas Google.
- Le titre principal est un `div` et les niveaux de titres sont mal organisés.
- Les éléments du menu sont des `span` cliquables. Le lien "Réserver" mène à `#`.
- Les images n'ont pas d'alternative textuelle. L'adresse et les horaires sont uniquement dans une image.
- Le texte d'accueil ne donne pas d'information sur la séance ou le lieu.
- Les tarifs affichent une ancienne date et leur lien s'appelle "ici".
- Les conditions de la séance sont ajoutées après un clic en JavaScript.
- Un texte caché répète des mots-clés. La largeur fixe fait déborder la page sur mobile.

Lighthouse ne signale pas tous ces problèmes. La lecture du HTML et les essais dans le navigateur complètent son rapport.

</details>

## 3. Corriger le HTML et les informations

Dupliquez le fichier sous le nom `corrige.html`, puis :

- corrigez la langue, ajoutez le `viewport`, un `title` précis et une meta description, puis retirez `noindex` et `meta keywords`,
- utilisez un `h1` qui présente la salle et des `h2` pour ses sections,
- remplacez les éléments du menu par des liens et donnez une destination au lien de réservation,
- écrivez l'adresse, les horaires et les conditions de la séance en HTML, sans attendre un clic,
- remplacez le texte d'accueil vague par les informations de la page et supprimez le texte caché,
- ajoutez les `alt` appropriés et adaptez la largeur de la page au téléphone.

Les autres pages du site ne sont pas fournies. Pour tester la navigation, vous pouvez faire pointer le menu et la réservation vers des sections de votre page avec des liens comme `href="#tarifs"`.

Gardez les données de l'exercice : séance de 1 h 30 à 18 €, chaussons compris, dès 8 ans, avec un adulte jusqu'à 14 ans. Remplacez le lien vers le PDF absent par le tarif connu de la séance.

Ouvrez `http://localhost:8000/corrige.html`. Relancez Lighthouse avec les mêmes réglages. Refaites les tests à 360 px et sans JavaScript. Réactivez JavaScript une fois terminé.

## Le travail à rendre

Réunissez `corrige.html` et `seo.md`. Dans les notes, expliquez une correction que Lighthouse a signalée et une autre que vous avez trouvée en lisant la page. Un modèle suffit :

```md
# Référencement de Prise d'Air

## Observation
Recherche Google : …
IA utilisée et sources citées : …
Information vérifiée sur le site source : …

## Problèmes et corrections
| Problème | Correction | Comment je l'ai vérifiée |
| --- | --- | --- |

## Vérifications
Score SEO Lighthouse avant : … / 100
Score SEO Lighthouse après : … / 100
Affichage à 360 px : …
Informations disponibles sans JavaScript : …
```

Une correction peut être utile même si elle ne change pas le score. La page locale ne permet pas de mesurer un classement Google ou une citation d'IA.

## Pour aller plus loin

Ces exercices sont facultatifs. Choisissez-en un si vous avez terminé la correction.

<details class="course-details">
<summary>Écrire un robots.txt</summary>

À partir de l'exemple du [chapitre technique](/seo-geo/02-seo-technique/#distinguer-robotstxt-et-noindex), écrivez un fichier qui laisse explorer les pages publiques et bloque `/recherche` et `/compte/`. Indiquez ensuite si vous souhaitez autoriser `GPTBot`, en vous aidant du [chapitre GEO](/seo-geo/04-geo/#autoriser-la-recherche-sans-autoriser-lentrainement).

</details>

<details class="course-details">
<summary>Préparer un article pour débutants</summary>

Trouvez une question dans les suggestions de Google. Proposez un titre, deux ou trois sections et un court paragraphe qui donne la réponse. Ajoutez un lien vers une page utile de Prise d'Air. Si vous utilisez une IA, indiquez ce que vous avez vérifié.

</details>

<details class="course-details">
<summary>Décrire la salle en JSON-LD</summary>

Adaptez l'exemple de [données structurées](/seo-geo/02-seo-technique/#decrire-la-salle-avec-des-donnees-structurees) à votre page. Vérifiez-le avec le [validateur schema.org](https://validator.schema.org/).

</details>
