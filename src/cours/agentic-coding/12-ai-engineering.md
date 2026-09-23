---
title: Vers l’AI engineering
order: 12
---

# Vers l’AI engineering

Jusqu’ici, le modèle servait à écrire votre code. L’AI engineering consiste à construire des logiciels dont le modèle fait partie : un support client qui répond à partir de la documentation, un outil qui classe des tickets, un assistant intégré à un produit. Les briques sont celles de ce cours : contexte, outils, boucles, évaluations. Ce chapitre ouvre sur ce qui vient après les deux jours.

## Un autre métier que le machine learning

Chip Huyen distingue les deux dans [AI Engineering](https://www.oreilly.com/library/view/ai-engineering/9781098166298/) (O’Reilly, 2025). Le machine learning engineer entraîne des modèles à partir de données. L’AI engineer part d’un modèle existant, appelé par API, et construit le système autour : prompts, récupération d’informations, outils, évaluation, coûts, latence, interface. Le travail ressemble plus au développement d’un produit qu’à la recherche.

## Le LLM augmenté

Anthropic appelle **augmented LLM** la brique de base : un modèle relié à des outils, à un mécanisme de récupération d’informations et à une mémoire. Les outils sont par exemple un shell, une API ou un navigateur. La récupération passe par des documents, une recherche ou du RAG. La mémoire garde l’état et les décisions.

Un agent de code est un LLM augmenté dont les outils agissent sur un dépôt. La même brique sert à des applications qui n’ont rien à voir avec le code.

## Workflows et agents

Tous les systèmes n’ont pas besoin d’une boucle autonome. Dans [« Building effective agents »](https://www.anthropic.com/engineering/building-effective-agents), Anthropic sépare les **workflows**, dont le chemin est écrit dans le code, des **agents**, où le modèle choisit la prochaine étape.

| Motif | Principe | Exemple |
| --- | --- | --- |
| Chaîne de prompts | Chaque appel traite la sortie du précédent | Rédiger, puis traduire, puis vérifier le ton |
| Routage | Un premier appel classe la demande et l’envoie au bon traitement | Ticket de facturation ou ticket technique |
| Parallélisation | Plusieurs appels sur la même entrée, résultats combinés | Trois relectures indépendantes d’un contrat |
| Orchestrateur et exécutants | Un modèle découpe la tâche et délègue | Modifier dix fichiers dans un dépôt |
| Évaluateur et optimiseur | Un appel produit, un autre critique, on boucle | Traduction relue jusqu’à validation |
| Agent | Le modèle choisit ses actions en boucle | Claude Code, OpenCode |

Commencez par le motif le plus simple qui résout le problème. Un workflow est plus prévisible, moins cher et plus facile à tester qu’un agent.

## Choisir plusieurs modèles

Une application IA n’appelle pas forcément un seul grand modèle. Elle peut router chaque étape vers le modèle adapté :

```text
application
   ↓
routeur
   ├── petit modèle          → classer un e-mail
   ├── modèle de code        → générer une requête SQL
   ├── modèle multimodal     → lire une facture scannée
   ├── modèle d’embedding    → transformer un texte en vecteur
   ├── reranker              → trier des résultats de recherche
   ├── speech-to-text        → transcrire un appel
   └── modèle de raisonnement → planifier une migration
```

Les **modèles de raisonnement** consacrent plus de calcul à un problème avant de répondre. Ils aident à analyser une erreur ou à comparer des stratégies, avec plus de latence et de coût. Plus de raisonnement ne corrige pas un mauvais contexte ou des outils mal définis.

Beaucoup de grands modèles utilisent une architecture **Mixture of Experts** : un routeur interne n’active qu’une partie des paramètres pour chaque token. Le modèle gagne en capacité sans que chaque calcul utilise tous ses paramètres. Les « experts » sont une organisation interne du réseau, pas des spécialistes du JavaScript ou du droit.

## Embeddings

Un modèle d’**embedding** ne produit pas de texte. Il transforme un texte en vecteur de nombres :

```text
"annuler une réservation"  →  [0.14, -0.82, 0.31, 0.07, …]   1 024 dimensions
```

Deux textes de sens proche donnent des vecteurs proches, même sans mot commun : « annuler une réservation » et « se faire rembourser un séjour ». La proximité se mesure souvent par la similarité cosinus. Les embeddings servent à la recherche sémantique, au regroupement de documents, à la détection de doublons et au RAG.

## RAG

Le **Retrieval-Augmented Generation** ([Lewis et al., 2020](https://arxiv.org/abs/2005.11401)) ajoute au contexte du modèle des extraits retrouvés dans vos documents. Le modèle répond à partir de ces extraits au lieu de sa seule mémoire d’entraînement, et peut citer ses sources.

### Indexer

L’indexation se fait une fois, puis à chaque mise à jour des documents. Chaque document est découpé en segments. Un modèle d’embedding transforme chaque segment en vecteur. La base vectorielle stocke ces vecteurs avec les métadonnées du segment : titre, source et date.

La **segmentation** (*chunking*) découpe chaque document en morceaux. C’est l’étape qui décide le plus de la qualité des réponses :

- des segments trop longs mélangent plusieurs sujets et diluent la similarité
- des segments trop courts perdent le contexte : « il faut prévenir 48 h avant » ne dit plus de quoi il s’agit
- un chevauchement de quelques phrases entre segments évite de couper une idée en deux
- un découpage qui suit la structure (titres, paragraphes, fonctions pour du code) vaut mieux qu’un découpage tous les 500 caractères
- les métadonnées (titre, source, date) permettent de filtrer et de citer.

Anthropic propose le [contextual retrieval](https://www.anthropic.com/news/contextual-retrieval) : ajouter à chaque segment une phrase qui le situe dans son document avant de le vectoriser. Leurs mesures donnent 49 % d’échecs de récupération en moins, et 67 % avec un reranker.

### Répondre

À chaque question, l’application retrouve les segments proches, les trie, puis envoie les meilleurs au modèle. Regardez ce qui arrive dans le contexte :

```animated
sequenceDiagram
  accTitle: Une requête RAG
  accDescr: La recherche vectorielle trouve 20 segments, le reranker en garde 3, seuls ces 3 entrent dans le contexte.
  participant U as Utilisateur
  participant A as Application
  participant E as Embedding
  participant V as Base vectorielle
  participant R as Reranker
  participant M as LLM
  %% ctx: system 400 Instructions : réponds à partir des sources et cite-les
  U->>A: Comment annuler une réservation après 48 h ?
  %% ctx: user 20 Comment annuler une réservation après 48 h ?
  A->>E: Vectoriser la question
  E-->>A: Vecteur de 1 024 dimensions
  A->>V: 20 segments les plus proches
  V-->>A: 20 segments, environ 8 000 tokens
  %% note: Ces 20 segments ne vont pas au modèle. Beaucoup sont proches par les mots et hors sujet.
  A->>R: Trier les 20 segments par pertinence
  R-->>A: 3 segments retenus
  %% ctx: docs 900 CGV article 4, FAQ annulation, politique de remboursement
  %% note: 900 tokens utiles au lieu de 8 000. Le RAG est du context engineering.
  A->>M: Instructions, question et 3 segments
  M-->>A: Réponse avec citations
  %% ctx: assistant 180 Réponse citant l’article 4 des CGV
  A-->>U: Réponse et liens vers les sources
```

La recherche vectorielle rate les correspondances exactes : un numéro de commande, un nom de fonction, un code d’erreur. La **recherche hybride** combine les vecteurs avec une recherche par mots-clés comme BM25. Le **reranker** est un modèle qui lit la question et chaque segment ensemble. Il est plus précis que la similarité entre vecteurs, et plus lent, donc on l’applique aux 20 ou 50 premiers résultats seulement.

### RAG ou recherche par l’agent

Claude Code n’indexe pas votre dépôt dans une base vectorielle. Il cherche avec `grep` et `glob`, lit les fichiers, puis cherche encore. Pour du code, où les noms exacts comptent, cette recherche par l’agent marche souvent mieux qu’un index de similarité, et elle n’a pas d’index à maintenir. Le RAG classique reste utile pour de grands corpus de texte, des documents qui changent peu et des réponses qui doivent citer leurs sources.

## Évaluer une application IA

Une application IA a besoin d’évaluations comme un harness ([chapitre 4](../04-anatomie-harness/)) :

- un jeu de questions représentatives avec les réponses attendues
- des vérifications en code quand c’est possible : format JSON, présence d’une citation, montant exact
- un modèle juge (*LLM-as-judge*) pour les critères flous, lui-même vérifié sur un échantillon noté à la main
- chaque erreur trouvée en production, ajoutée au jeu comme cas de régression.

Pour un RAG, mesurez séparément la récupération (le bon segment fait-il partie des 3 retenus ?) et la génération (la réponse est-elle fidèle aux segments ?). Sinon, vous ne saurez pas quelle étape corriger.

## Boucles longues

Un agent peut travailler des heures si on le relance tant que le critère de fin n’est pas atteint. Geoffrey Huntley a popularisé la [boucle Ralph Wiggum](https://ghuntley.com/ralph/), volontairement simple :

```bash
while :; do cat PROMPT.md | agent ; done
```

`PROMPT.md` décrit l’objectif et renvoie vers un fichier de progression. Chaque itération repart d’un contexte vide, lit l’état, avance d’un pas, lance les tests et met à jour la progression. La qualité du résultat dépend moins de l’orchestration que du critère de fin, des tests et de l’état écrit sur disque.

La plupart des harnesses ont un mode sans interface pour ces usages : `claude -p`, `codex exec`, `opencode run`. On peut alors lancer un agent dans une CI, sur chaque issue étiquetée, ou en parallèle dans plusieurs worktrees. Le harness devient une brique de votre propre système.

## La suite

Quelques directions à suivre après le cours :

- les modèles progressent plus vite que l’orchestration : une logique qui compense une faiblesse du modèle devient inutile quelques mois plus tard
- les agents lancés en arrière-plan, qui livrent une pull request au lieu d’une conversation
- les [recursive language models](https://alexzhang13.github.io/blog/2025/rlm/), où le modèle manipule son propre contexte comme une variable dans un environnement de code
- la sécurité des agents qui ont une mémoire persistante et un accès au réseau.

Construisez d’abord la version minimale : un modèle, une boucle, quelques outils. Ajoutez une couche quand une panne observée la justifie.

## Sources

- Chip Huyen, [AI Engineering: Building Applications with Foundation Models](https://www.oreilly.com/library/view/ai-engineering/9781098166298/), O’Reilly, 2025
- [Anthropic, « Building effective agents »](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic, « Introducing Contextual Retrieval »](https://www.anthropic.com/news/contextual-retrieval)
- Lewis et al., [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401), 2020
- Geoffrey Huntley, [Ralph Wiggum as a software engineer](https://ghuntley.com/ralph/)
