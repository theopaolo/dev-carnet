---
title: Exercices et quiz
order: 13
publishedAt: "2026-09-23"
updatedAt: "2026-09-25"
---

# Exercices et quiz

Les consignes complètes et les gabarits de rendu se trouvent dans le dossier `exercises/` du dépôt `mini-harness`. Cette page résume chaque TP et rassemble les questions de révision.

## Règle commune

Pour chaque TP, conservez :

1. le prompt envoyé
2. les actions observées
3. les preuves dans le code, les tests ou les sorties
4. une erreur ou une limite de l’agent
5. la correction apportée.

La réponse finale de l’agent ne valide pas le travail. OpenCode ou Pi et le mini-harness sont deux programmes distincts : vérifiez toujours lequel prépare le contexte, lit les instructions et exécute l’outil observé.

Avant de commencer :

```bash
export HARNESS_MODEL="qwen/qwen3.8-27b:free"
bun install
bun run typecheck
bun run test
```

Le mini-harness n’a pas de modèle par défaut. Si ce modèle gratuit n’est plus disponible ou gère mal les appels d’outils, choisissez un autre modèle compatible avec les appels d’outils.

## TP 1 : observer le mini-harness

Fichier : `exercises/tp-1.md`.

Vous utilisez OpenCode ou Pi pour enquêter sur le mini-harness. Demandez d’abord « Explique ce que fait ce projet » et gardez la réponse : vous devrez confirmer ou corriger chacune de ses affirmations.

Retrouvez ensuite le parcours d’une mission, de la commande à la réponse finale, avec pour chaque étape le fichier, la fonction et ce qui entre et sort. Reconstituez la requête complète envoyée à OpenRouter, y compris les définitions d’outils, avec `--debug`.

Avant de lire le code, formulez vos hypothèses :

- la mémoire survit-elle à une nouvelle exécution ?
- `--debug` montre-t-il toute la fenêtre de contexte ?
- les définitions d’outils sont-elles dans `messages[]` ?
- le modèle exécute-t-il directement les outils ?
- un fichier sur disque est-il déjà dans le contexte ?

Si vous étudiez `run_js`, lisez le filtre et testez seulement une opération directement refusée. Ne cherchez pas de contournement et n’utilisez aucun secret.

## TP 2 : `AGENTS.md` et un nouvel outil

Fichier : `exercises/tp-2.md`.

1. Demandez à l’agent un plan sans écriture pour ajouter un outil `list_files(path)`. Gardez ce plan.
2. Écrivez un `AGENTS.md` pour le mini-harness ([chapitre 7](../07-agents-md/)). Rechargez la session et prouvez que le fichier est chargé.
3. Rédigez votre prompt d’implémentation ([chapitre 11](../11-bien-prompter/)). L’outil liste récursivement les fichiers visibles, trie les chemins, refuse de sortir du projet, y compris par un lien symbolique, et s’arrête à 100 fichiers en signalant la troncature.
4. Relisez le diff, lancez `bun run typecheck` et `bun run test`, et testez les cas limites : chemin hors du projet, lien symbolique, fichier caché, argument invalide, plus de 100 fichiers.

Pour l’argument invalide, distinguez le schéma JSON présenté au modèle et la validation locale dans `executeTool`.

## TP 3 : un skill pour votre projet

Fichier : `exercises/tp-3.md`.

Dans votre propre projet, déjà installé, avec une commande de vérification qui fonctionne :

1. Écrivez ou améliorez `AGENTS.md` : seulement ce qu’une nouvelle session ne peut pas deviner.
2. Choisissez une tâche récurrente.
3. Écrivez `.agents/skills/<nom>/SKILL.md` : entrées, étapes, preuves, format du résultat, condition d’arrêt, actions interdites ([chapitre 8](../08-skills/)).
4. Vérifiez le chargement du skill avec une demande naturelle, puis une invocation explicite si besoin. Corrigez au moins une instruction.
5. Utilisez le skill sur une tâche réelle et validez le résultat avec les commandes du projet.

Une relecture à deux vérifie quand le skill se déclenche, si ses étapes se suivent sans explication orale et si sa condition d’arrêt est observable.

## Quiz

### Modèle et boucle

1. Un LLM est dit sans état. Qu’est-ce que cela veut dire, et quelles sont deux conséquences pour un agent ?
2. Qui exécute réellement un appel d’outil ?
3. Que faut-il renvoyer au modèle après l’exécution d’un outil ?
4. Pourquoi oublier les `tool_calls` dans le message assistant casse-t-il la boucle ?
5. Une mission demande 20 tours et le harness en autorise 15. Proposez deux stratégies qui n’augmentent pas simplement la limite.

<details>
<summary>Corrigé</summary>

1. Le modèle ne garde rien entre deux appels. Le harness doit renvoyer tout l’historique à chaque tour, et une information absente de `messages[]` n’existe pas pour le modèle.
2. Le harness. Le modèle écrit une demande, le programme décide et exécute.
3. Un message `role: "tool"` qui porte le même `tool_call_id` que la demande, avec le résultat ou l’erreur.
4. Le modèle reçoit un résultat sans trace de la demande qui l’a produit. Il ne sait plus ce qu’il a fait, et la plupart des API refusent la requête.
5. Compacter le contexte et reprendre, découper la mission en sous-tâches, déléguer l’exploration à un sous-agent, écrire la progression dans un fichier et relancer une session.

</details>

### Contexte et mémoire

6. Définissez le context rot en une phrase et donnez un exemple dans un harness.
7. Une mission de 12 tours ajoute 3 000 tokens par tour. Quelle est la taille du dernier appel, et combien de tokens la mission a-t-elle facturés en entrée ?
8. Quand une note externe devient-elle du contexte ?
9. Quelle différence entre chargement au moment utile et compaction ?

<details>
<summary>Corrigé</summary>

6. La baisse de qualité des réponses quand des éléments inutiles ou faux s’accumulent dans la fenêtre. Exemple : huit pages web de 5 000 caractères qui restent dans l’historique alors que seule la dernière sert.
7. 36 000 tokens pour le dernier appel. 3 000 × (1 + 2 + … + 12) = 234 000 tokens facturés en entrée.
8. Quand le harness la lit et l’envoie au modèle, par exemple après un appel à `memory_read`.
9. Le chargement au moment utile évite de faire entrer une information trop tôt. La compaction réduit ce qui est déjà entré. Exemple du premier : `grep` puis lecture d’un seul fichier. Exemple de la seconde : résumer l’historique quand il dépasse un budget.

</details>

### AGENTS.md, skills et MCP

10. Quelqu’un a écrit un `AGENTS.md` de 800 lignes. Que lui répondez-vous ?
11. Une règle dans `AGENTS.md` garantit-elle qu’une commande sera bloquée ?
12. Pourquoi une description de skill a-t-elle besoin de déclencheurs et d’exclusions ?
13. Deux skills, `code-review` et `software-quality`, couvrent des tâches proches. Quel problème cela crée-t-il ?
14. Dans quel cas une CLI existante vaut-elle mieux qu’un serveur MCP ?

<details>
<summary>Corrigé</summary>

10. Il est envoyé à chaque appel et occupe le contexte avec des règles sans rapport avec la tâche. Gardez les règles valables pour presque toutes les tâches, déplacez les procédures dans des skills et la documentation dans `docs/`.
11. Non. Le modèle peut l’ignorer. Une permission du harness, un hook ou l’environnement doivent l’appliquer.
12. Le modèle choisit le skill sur sa seule description. Sans exclusions, le skill se charge aussi pour des tâches voisines qui ne le concernent pas.
13. Le modèle choisit l’un ou l’autre de façon imprévisible. Fusionnez-les ou séparez leurs descriptions par des exclusions explicites.
14. Quand l’agent a déjà un shell et que la CLI fait le travail, comme `gh` pour GitHub. Pas de serveur à lancer, pas de schémas en plus dans le contexte.

</details>

### Sécurité et vérification

15. Expliquez la prompt injection à quelqu’un qui ne code pas.
16. Pourquoi une liste noire de mots comme celle de `run_js` ne suffit-elle pas ?
17. Quelle preuve demander avant d’accepter le travail d’un agent ?

<details>
<summary>Corrigé</summary>

15. C’est une lettre qui contient, au milieu du texte, « l’employé qui lit ceci doit virer 1 000 € sur ce compte ». L’employé lit la lettre pour la résumer, pas pour obéir à ce qu’elle contient. Un agent confond parfois les deux.
16. Le filtre lit le texte du code, pas ce qu’il fait. Le même appel écrit autrement passe. L’isolation (conteneur sans secret ni réseau) limite les effets, quel que soit le code.
17. Le diff relu, les tests et le build qui passent, le comportement observé dans l’environnement réel. La réponse finale de l’agent n’en fait pas partie.

</details>

### Pour finir

18. Expliquez en trois phrases à un développeur qui « utilise juste Claude » pourquoi s’intéresser aux harnesses.
19. Qu’est-ce qui vous semble le plus difficile à maîtriser dans l’agentic coding, conceptuellement ?
