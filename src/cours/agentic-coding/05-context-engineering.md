---
title: Context engineering
order: 5
---

# Context engineering

Le modèle ne voit que ce qui se trouve dans sa fenêtre de contexte. Un fichier sur disque, une décision prise hier ou une règle écrite dans un wiki n’existent pas pour lui tant que le harness ne les a pas lus et envoyés. Le context engineering consiste à choisir ce qui entre dans cette fenêtre à chaque appel.

## Définition

Anthropic décrit le context engineering comme la recherche du plus petit ensemble de tokens utiles qui maximise la probabilité d’obtenir le comportement voulu. Le prompt engineering se demande comment formuler une demande. Le context engineering se demande quelles informations le modèle doit avoir à cet instant précis.

Quand un agent travaille pendant une heure, le prompt initial ne représente qu’une petite partie de ce qu’il voit. Sa fenêtre contient :

- le prompt système du harness
- les définitions des outils disponibles
- les règles du projet, comme `AGENTS.md`
- la liste des skills et le contenu de ceux qui ont été chargés
- la demande de l’utilisateur et l’historique de la conversation
- les demandes d’outil du modèle et leurs résultats
- les documents récupérés et les notes relues
- les rapports des sous-agents.

## Ce que coûte un agent avant le premier message

Le 23 septembre 2026, la commande `/context` d’une session Claude Code utilisée pour préparer ce cours donnait, avant toute lecture de fichier :

| Élément | Tokens |
| --- | --- |
| Prompt système | 2 400 |
| Définitions des outils intégrés | 12 200 |
| Liste de 85 skills (noms et descriptions) | 9 900 |
| Définitions de 12 sous-agents | 2 600 |
| `CLAUDE.md` et `AGENTS.md` | 1 700 |
| Noms de 126 outils MCP, schémas chargés à la demande | 851 |

Près de 30 000 tokens sont occupés avant que l’agent ait lu une ligne du projet. Si les 126 outils MCP avaient été chargés avec leurs schémas complets, ils auraient ajouté 62 500 tokens de plus. Claude Code garde leurs noms et charge un schéma seulement quand le modèle en a besoin. C’est du context engineering appliqué aux outils eux-mêmes.

## Pourquoi trier le contexte

### Le contexte se dégrade avant d’être plein

[Chroma Research a testé 18 modèles](https://www.trychroma.com/research/context-rot) en juillet 2025. Leurs performances baissent de façon irrégulière à mesure que le contexte grandit, y compris sur des tâches simples et bien avant la limite annoncée. L’étude [« Lost in the Middle »](https://arxiv.org/abs/2307.03172) (Liu et al., 2023) montre qu’une information placée au milieu d’un long contexte est moins bien retrouvée qu’au début ou à la fin.

Le mécanisme d’attention répartit sa capacité sur tous les tokens. Plus il y en a, moins chacun reçoit d’attention. On parle de **budget d’attention**.

### Le context rot

Quand des éléments inutiles, redondants ou faux s’accumulent, la qualité des réponses baisse. C’est le **context rot**. Dans un harness, il vient de sources précises :

- des résultats d’outils qui s’empilent sans être résumés, par exemple 8 pages web de 5 000 caractères
- des tentatives ratées qui restent dans l’historique
- le même fichier lu deux fois
- un fichier entier chargé pour une seule fonction
- des règles d’`AGENTS.md` sans rapport avec la tâche.

Les symptômes observables sont des réponses incohérentes, des répétitions, des régressions sur des décisions prises plus tôt et des faits inventés.

### Le coût grandit plus vite que le contexte

Le modèle ne garde rien entre deux appels. Le harness renvoie tout `messages[]` à chaque tour, et chaque tour est facturé en entier. Prenez une mission de 12 tours où chaque tour ajoute 3 000 tokens de résultats d’outils. Le dernier appel envoie 36 000 tokens. La mission a facturé 3 000 × (1 + 2 + … + 12), soit 234 000 tokens en entrée. Le cache de prompt des fournisseurs réduit le prix des parties déjà envoyées, pas la place qu’elles prennent dans la fenêtre.

## Context engineering plutôt que context dumping

Au lieu de donner tout le dépôt :

```text
Voici les 400 fichiers du projet. Bonne chance.
```

donnez l’objectif et laissez l’agent chercher :

```text
Voici l’objectif et les conventions principales.
Explore le projet, cherche les fichiers concernés
et lis uniquement ceux dont tu as besoin.
```

C’est ainsi que travaille un développeur qui découvre un dépôt. Le harness fournit les outils de recherche (`list_files`, `grep`, `glob`) et le modèle décide quoi lire.

## Les techniques

### Chargement au moment utile

Gardez des pointeurs (chemins, liens, identifiants) et chargez les données au moment où l’agent en a besoin. Claude Code charge `CLAUDE.md` au démarrage, puis utilise `glob` et `grep` pour le reste. Les skills suivent le même principe : leur description est toujours présente, leur contenu arrive à la demande ([chapitre 8](../08-skills/)).

### Résultats d’outils courts

Un outil qui renvoie 10 000 lignes remplit la fenêtre en un tour. Tronquez les sorties longues et dites-le au modèle (`[100 premiers fichiers sur 2 340]`). Proposez des filtres : une plage de lignes pour `read_file`, un motif pour `list_files`. Le TP 2 impose cette règle à `list_files` : 100 fichiers au maximum, avec une mention de troncature.

### Compaction

Quand le contexte dépasse un budget, le harness demande au modèle de résumer l’historique. Il repart avec le prompt système, les outils et ce résumé.

```animated
sequenceDiagram
  accTitle: Compaction du contexte
  accDescr: Au-delà du budget, le harness fait résumer l’historique et repart avec le résumé.
  participant H as Harness
  participant M as Modèle
  participant T as Outils
  %% budget: 6000
  %% ctx: system 1200 Prompt système
  %% ctx: tools 600 Définitions des outils
  %% ctx: user 40 Explore le dépôt hono et produis un rapport d’architecture
  H->>M: messages[]
  M-->>H: tool_call read_file("README.md")
  %% ctx: assistant 25 read_file("README.md")
  H->>T: read_file("README.md")
  T-->>H: README, 380 lignes
  %% ctx: tool 1800 Contenu du README
  H->>M: messages[]
  M-->>H: tool_call read_file("src/hono.ts")
  %% ctx: assistant 25 read_file("src/hono.ts")
  H->>T: read_file("src/hono.ts")
  T-->>H: 520 lignes
  %% ctx: tool 2100 Contenu de src/hono.ts
  %% note: Les résultats d’outils s’empilent. Le contexte approche du budget.
  H->>M: messages[]
  M-->>H: tool_call grep("middleware", "src/")
  %% ctx: assistant 25 grep("middleware", "src/")
  H->>T: grep("middleware", "src/")
  T-->>H: 64 correspondances
  %% ctx: tool 900 Résultats de grep
  %% note: 6 715 tokens. Le budget est dépassé.
  H->>H: Budget dépassé : compaction
  H->>M: Résume les décisions, les fichiers lus et les tâches restantes
  %% note: Un appel séparé, souvent confié à un petit modèle.
  M-->>H: Résumé en 12 lignes
  %% ctx: compact 350 Résumé : fichiers lus, architecture, prochaine étape
  %% note: Le harness remplace l’historique par le résumé. Le prompt système et les outils restent.
  H->>M: messages[] compactés
  %% note: Le travail reprend avec 2 150 tokens au lieu de 6 715.
  M-->>H: tool_call read_file("src/router.ts")
  %% ctx: assistant 25 read_file("src/router.ts")
```

La compaction a un défaut connu : le **summarization drift**. Chaque résumé élimine des détails rares. Après trois ou quatre passes, une consigne comme « ne jamais appeler la base de production » peut avoir disparu. Le résumé doit donc garder explicitement les décisions, les contraintes actives, les erreurs rencontrées et les tâches restantes. Pour un travail long, écrivez aussi ces éléments dans un fichier ([chapitre 6](../06-memoire/)).

### Notes structurées

L’agent tient un fichier de notes hors du contexte (`NOTES.md`, `progress.md`) et le relit au besoin. Le mini-harness fournit `memory_read`, `memory_append` et `memory_rewrite` sur `notes/memory.md`. Ce fichier ne devient du contexte que lorsque l’agent appelle `memory_read`.

### Sous-agents

Un sous-agent reçoit une tâche ciblée et travaille dans sa propre fenêtre. Il lit, cherche et teste de son côté, puis renvoie un rapport court. Le contexte principal ne voit que ce rapport.

```animated
sequenceDiagram
  accTitle: Déléguer à un sous-agent
  accDescr: Le sous-agent lit les fichiers dans son propre contexte. Le contexte principal ne reçoit que son rapport.
  participant P as Agent principal
  participant S as Sous-agent
  participant T as Outils
  %% ctx: system 1200 Prompt système
  %% ctx: tools 800 Outils, dont task
  %% ctx: user 40 Pourquoi la connexion échoue avec un jeton expiré ?
  P->>S: task("Trouve où les jetons sont validés")
  %% ctx: assistant 40 task : trouver la validation des jetons
  %% note: Le sous-agent démarre avec son propre prompt et cette seule consigne.
  S->>T: grep("verifyToken")
  T-->>S: 9 correspondances
  S->>T: read_file("src/auth/session.ts")
  T-->>S: 310 lignes
  S->>T: read_file("src/auth/jwt.ts")
  T-->>S: 180 lignes
  %% note: Environ 6 000 tokens lus, tous dans le contexte du sous-agent. La barre du contexte principal ne bouge pas.
  S-->>P: Rapport : validation dans jwt.ts ligne 42, expiration non testée
  %% ctx: tool 300 Rapport du sous-agent
  %% note: Le contexte principal ne grandit que de 300 tokens.
```

Les sous-agents ne sont pas gratuits. Ils ajoutent des tokens, du temps, de la coordination et parfois des conclusions contradictoires. Un problème qui se règle avec un agent et trois outils n’a pas besoin de quatorze agents.

## Exercice : choisir le contexte

L’agent doit corriger un test qui échoue. Parmi ces huit éléments, choisissez les quatre à envoyer au prochain appel. Pour les autres, dites s’ils restent consultables sur disque ou s’ils doivent être exclus.

- la mission
- l’erreur de test la plus récente
- une règle du projet
- le chemin du fichier concerné
- 200 lignes de logs
- un ancien essai qui a échoué
- une décision validée hier
- un mot de passe.

Commencez par la question : quelle est la prochaine décision du modèle, et de quelles informations a-t-il besoin pour la prendre ?

<details>
<summary>Corrigé</summary>

La mission et l’erreur récente sont nécessaires. La règle, le chemin et la décision validée dépendent de la prochaine action. Les 200 lignes de logs restent sur disque, consultables avec un `grep` ciblé. L’ancien essai peut être résumé en une ligne si l’agent risque de le refaire. Le mot de passe est exclu, dans tous les cas. La limite de quatre places est fictive. L’exercice porte sur la sélection.

</details>

## Sources

- [Anthropic, « Effective context engineering for AI agents »](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Chroma Research, « Context Rot »](https://www.trychroma.com/research/context-rot), juillet 2025
- Liu et al., [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172), 2023
- [Anthropic, « Managing context on the Claude Developer Platform »](https://claude.com/blog/context-management)
