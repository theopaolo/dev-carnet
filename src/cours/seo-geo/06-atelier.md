---
title: "Atelier : corriger la page de Prise d'Air"
order: 6
publishedAt: "2026-10-01"
updatedAt: "2026-10-02"
---

# Atelier : corriger la page de Prise d'Air

La page d'accueil de Prise d'Air, une salle d'escalade fictive à Lyon, contient des erreurs volontaires. Corrigez-la pour qu'elle soit bien référencée et accessible.

Il vous faut un éditeur de code, un navigateur avec **Lighthouse**, comme Chrome ou Helium, et une IA avec recherche web.

## 1. Observer une recherche

Cherchez "salle d'escalade lyon débutant" sur Google. Posez ensuite la question "Quelle salle d'escalade pour débuter à Lyon un samedi ?" à une IA avec recherche web.

Notez ce que Google affiche en premier (annonce, carte, **Aperçu IA** ou **résultat naturel**) et les sources citées par l'IA. Vérifiez un prix ou un horaire sur le site d'une de ces sources.

## 2. Corriger la page

<p><a class="button" href="/ressources/seo-geo/a-corriger.html" download="a-corriger.html">Télécharger la page à corriger</a></p>

Corrigez le HTML pour que :

- Google comprenne ce que propose la page et puisse l'indexer,
- un visiteur trouve l'adresse, les horaires et les conditions de la séance découverte sans cliquer, sur ordinateur comme sur téléphone,
- une personne au clavier ou avec un lecteur d'écran puisse lire la page et suivre ses liens.

Gardez les informations de la salle : séance de 1 h 30 à 18 €, chaussons compris, dès 8 ans, avec un adulte jusqu'à 14 ans. Les autres pages du site n'existent pas. Faites pointer les liens vers des sections de la page, par exemple `href="#tarifs"`.

Lighthouse analyse seulement les pages servies en **HTTP**. Ouvrez la page avec un serveur local, par exemple Live Server dans VS Code, `npx serve` ou `python3 -m http.server`. Lancez Lighthouse avant et après vos corrections, sur Mobile, avec les catégories SEO et Accessibilité. Lighthouse ne repère pas tout : lisez aussi le code et affichez la page à 360 px de large.

## Le travail à rendre

Rendez votre page corrigée et un document de notes, par exemple un Google Doc, avec :

- ce que vous avez observé sur Google et dans la réponse de l'IA,
- les scores Lighthouse SEO et Accessibilité avant et après,
- les problèmes trouvés, avec leur correction en une phrase.

Exemple : "Le menu utilise des `span` avec `onclick`. Je les remplace par des liens `<a href>` pour que les robots et le clavier puissent les suivre."

## Corrigé

<details class="course-details">
<summary>Après votre correction</summary>

- La langue est déclarée en anglais et la balise `viewport` manque.
- Le titre "Accueil" est vague et la **meta description** manque.
- La balise `noindex` demande de ne pas indexer la page. `meta keywords` n'aide pas Google.
- Le titre principal est un `div` et les niveaux de titres sont mal organisés.
- Les éléments du menu sont des `span` cliquables. Tab ne les atteint pas et les robots ne suivent pas leurs adresses. Le lien "Réserver" mène à `#`.
- Les images n'ont pas d'**alternative textuelle**. L'adresse et les horaires sont uniquement dans une image.
- Le texte d'accueil ne donne pas d'information sur la séance ou le lieu.
- Les tarifs affichent une ancienne date et leur lien s'appelle "ici". Le PDF n'existe pas : écrivez le tarif dans la page.
- Les conditions de la séance apparaissent seulement après un clic, en JavaScript.
- Un texte caché répète des mots-clés. La largeur fixe de 960 px fait déborder la page sur mobile.

</details>

## Pour aller plus loin

Ces exercices sont facultatifs.

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
