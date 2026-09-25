---
title: La boucle agentique
order: 3
publishedAt: "2026-09-23"
updatedAt: "2026-09-23"
---

# La boucle agentique

Derrière les interfaces des chapitres précédents, la boucle est la même :

> exécuter un outil, récupérer son résultat, l’ajouter au contexte, rappeler le modèle.

Ce chapitre suit cette boucle message par message, puis la retrouve dans le code du mini-harness.

## Deux tours de function calling

Prenez la demande « Lis `README.md` et résume le projet ». Le harness a besoin de deux appels au modèle. Le premier renvoie une demande d’outil. Le second renvoie la réponse finale, une fois le fichier lu. Avancez pas à pas et arrêtez-vous avant le résultat de l’outil : que sait le modèle à cet instant ?

```animated
sequenceDiagram
  accTitle: Deux tours de function calling
  accDescr: Le modèle demande un outil, le harness l’exécute, le résultat revient dans messages[].
  participant U as Personne
  participant H as Harness
  participant M as Modèle
  participant T as read_file
  %% ctx: system 1200 Prompt système
  %% ctx: tools 150 Définition de read_file
  U->>H: Lis README.md et résume le projet
  %% ctx: user 15 Lis README.md et résume le projet
  %% note: Le harness ajoute la demande à messages[]. Le modèle ne l’a pas encore vue.
  H->>M: messages[] + définition des outils
  %% note: Le modèle reçoit le contexte. Il ne connaît pas le dépôt.
  M-->>H: tool_call call_1 : read_file("README.md")
  %% ctx: assistant 25 tool_call call_1 : read_file("README.md")
  %% note: Écrire read_file(...) ne lit pas le fichier. Le modèle renvoie une demande d’outil avec un identifiant.
  H->>H: Contrôle de permission
  %% note: Le harness valide les arguments et la permission avant d’exécuter.
  H->>T: read_file("README.md")
  T-->>H: Contenu du fichier
  %% ctx: tool 800 Résultat de call_1 : contenu de README.md
  %% note: Le résultat entre dans messages[] avec role: tool et le même tool_call_id.
  H->>M: messages[] complet
  %% note: Le modèle ne garde rien entre deux appels. Le harness renvoie tout le contexte.
  M-->>H: Réponse finale
  %% ctx: assistant 180 Résumé du projet
  %% note: Pas de nouvelle demande d’outil : la boucle s’arrête.
  H-->>U: Résumé du projet
```

Le harness tient un tableau `messages[]`. Chaque appel au modèle reçoit ce tableau en entier, avec la liste des outils disponibles. À la fin des deux tours, il contient :

```json
[
  { "role": "system", "content": "Tu es un agent. Tu peux utiliser des outils…" },
  { "role": "user", "content": "Lis README.md et résume le projet" },
  {
    "role": "assistant",
    "content": null,
    "tool_calls": [
      { "id": "call_1", "type": "function",
        "function": { "name": "read_file", "arguments": "{\"path\":\"README.md\"}" } }
    ]
  },
  { "role": "tool", "tool_call_id": "call_1", "content": "# Mini harness\nUne boucle et un outil." },
  { "role": "assistant", "content": "Le projet est un harness minimal…" }
]
```

Ce format est celui de Chat Completions, utilisé par OpenRouter et le mini-harness. L’API d’Anthropic et la Responses API d’OpenAI utilisent d’autres enveloppes. Le cycle reste le même.

## Les deux règles de la boucle

**Le message assistant garde ses `tool_calls`.** Sans lui, le modèle reçoit un résultat d’outil sans savoir qu’il l’a demandé. La plupart des API refusent alors la requête.

```typescript
// Le message complet, avec ses tool_calls
messages.push(turn.message);
```

**Chaque appel reçoit un résultat avec le même identifiant.** `call_1` relie la demande à son observation. Quand le modèle demande trois outils dans le même tour, il reçoit trois résultats, chacun avec son `tool_call_id`.

```typescript
messages.push({ role: "tool", tool_call_id: toolUse.id, content: result });
```

La condition de sortie vient du modèle : quand sa réponse ne contient plus de demande d’outil, il a terminé. Le harness ajoute ses propres limites, décrites plus bas.

## Une erreur est aussi une observation

Si `README.md` n’existe pas, le harness ne s’arrête pas. Il renvoie l’erreur comme résultat de l’outil. Le modèle peut alors chercher le fichier ailleurs, demander une précision ou expliquer l’échec. Il ne doit pas inventer le contenu.

```animated
sequenceDiagram
  accTitle: Un outil qui échoue
  accDescr: L’erreur revient au modèle comme un résultat normal, et il change de stratégie.
  participant H as Harness
  participant M as Modèle
  participant T as Outils
  %% ctx: system 1200 Prompt système
  %% ctx: tools 300 read_file, list_files
  %% ctx: user 15 Lis README.md et résume le projet
  H->>M: messages[]
  M-->>H: tool_call call_1 : read_file("README.md")
  %% ctx: assistant 25 read_file("README.md")
  H->>T: read_file("README.md")
  T-->>H: Erreur : README.md introuvable
  %% ctx: tool 12 Erreur : README.md introuvable
  %% note: Le harness renvoie l’erreur avec role: tool et tool_call_id: call_1. La boucle continue.
  H->>M: messages[]
  M-->>H: tool_call call_2 : list_files(".")
  %% ctx: assistant 20 list_files(".")
  %% note: Le modèle change de stratégie. Il explore avant de relire.
  H->>T: list_files(".")
  T-->>H: docs/README.md, src/, package.json
  %% ctx: tool 60 Arborescence
  H->>M: messages[]
  M-->>H: tool_call call_3 : read_file("docs/README.md")
  %% ctx: assistant 25 read_file("docs/README.md")
  H->>T: read_file("docs/README.md")
  T-->>H: Contenu du fichier
  %% ctx: tool 800 Contenu de docs/README.md
  H->>M: messages[]
  M-->>H: Réponse finale
  %% ctx: assistant 180 Résumé du projet
```

Jouez le rôle du harness. Le modèle demande `read_file("README.md")` et le fichier est absent. Le résultat à renvoyer est :

```json
{ "role": "tool", "tool_call_id": "call_1", "content": "Erreur : README.md introuvable" }
```

## La boucle complète

Une mission réelle demande plusieurs tours. Chaque tour ajoute une demande d’outil et son résultat. Le contexte grandit jusqu’à la réponse finale. Cette vue place le harness au centre, parce que chaque message passe par lui : le modèle et les outils ne se parlent jamais directement.

```animated loop
sequenceDiagram
  accTitle: La boucle agentique
  accDescr: Chaque tour ajoute une demande d’outil et son résultat. Le contexte grandit jusqu’à la réponse finale.
  participant U as Personne
  participant H as Harness
  participant M as Modèle
  participant T as Outils
  %% ctx: system 1200 Prompt système
  %% ctx: tools 600 Définitions de read_file, edit_file, bash
  U->>H: Corrige formatPrice pour les montants négatifs
  %% ctx: user 40 Corrige formatPrice pour les montants négatifs
  loop Tant que le modèle demande un outil
    H->>M: messages[]
    %% note: Premier tour. Le modèle ne connaît que la mission et la liste des outils.
    M-->>H: tool_call read_file("price.js")
    %% ctx: assistant 25 read_file("price.js")
    H->>T: read_file("price.js")
    T-->>H: 48 lignes
    %% ctx: tool 700 Contenu de price.js
    %% note: Les résultats d’outils pèsent le plus lourd dans le contexte.
    H->>M: messages[]
    %% note: Deuxième tour. Le contexte contient maintenant le fichier lu.
    M-->>H: tool_call edit_file("price.js", …)
    %% ctx: assistant 120 edit_file("price.js", …)
    H->>T: edit_file("price.js", …)
    T-->>H: Fichier modifié
    %% ctx: tool 40 Diff appliqué
    H->>M: messages[]
    %% note: Troisième tour. Le modèle demande une preuve : les tests.
    M-->>H: tool_call bash("npm test")
    %% ctx: assistant 20 bash("npm test")
    H->>T: npm test
    T-->>H: 12 tests passent
    %% ctx: tool 400 Sortie de npm test
  end
  H->>M: messages[]
  M-->>H: Réponse finale
  %% ctx: assistant 150 Diff et résultat des tests
  %% note: Le modèle répond sans demander d’outil. Le harness arrête la boucle.
  H-->>U: Diff et résultat des tests
```

En pseudo-code, avec les limites que le modèle ne contrôle pas :

```text
charger l’état de la session

tant que le budget autorise une nouvelle étape :
  construire le contexte utile
  demander la prochaine action au modèle

  si le modèle produit une réponse finale :
    valider et retourner la réponse

  vérifier que l’action respecte la politique d’accès
  exécuter l’outil dans l’environnement prévu
  ajouter le résultat à l’état de la session

demander une décision humaine ou arrêter la tâche
```

## Conditions d’arrêt

La boucle s’arrête quand le modèle répond sans demander d’outil. Le harness en ajoute d’autres, parce qu’un modèle peut répéter la même action, rester bloqué sur une erreur ou accumuler des coûts :

- nombre maximal de tours
- budget de tokens ou de coût atteint
- délai dépassé pour un appel au modèle ou à un outil
- action interdite ou échecs répétés
- validation humaine nécessaire.

Le mini-harness fixe 15 tours, 120 secondes par appel au modèle et 60 secondes par outil. Au-delà de 15 tours, il s’arrête avec le message `Arrêt propre: maximum de 15 tours dépassé.`

## ReAct

[ReAct](https://arxiv.org/abs/2210.03629) (Yao et al., 2022) décrit cette alternance entre raisonnement, action et observation :

```text
Tour 1 : raisonnement → « Je dois lire ce fichier »
         action       → read_file("README.md")
         observation  → « # Mini harness… »

Tour 2 : raisonnement → « J’ai ce qu’il faut »
         réponse finale
```

Dans un harness, on observe les demandes d’outil et les réponses. Le raisonnement interne du modèle n’est pas toujours visible, et le texte qu’il affiche ne reflète pas forcément son calcul.

Une machine à états ou un graphe fixe une partie du chemin à l’avance. Une boucle ReAct laisse le modèle choisir la prochaine action. Les deux approches coexistent souvent dans le même système.

## Dans le code du mini-harness

Toute la boucle tient dans `src/app/harness.ts`. Trois endroits suffisent pour la lire :

| Ligne | Code | Rôle |
| --- | --- | --- |
| 49 | `messages.push(turn.message)` | Garder le message assistant et ses `tool_calls` |
| 79 à 83 | `messages.push({ role: "tool", tool_call_id: toolUse.id, content: result })` | Ajouter chaque résultat avec son identifiant |
| 86 | `continue` | Rappeler le modèle au tour suivant |

La trace rejouable montre ce qui casse quand l’un de ces messages manque. Elle n’utilise ni réseau ni clé d’API :

```bash
bun cours/demo-harness.ts normal          # la boucle complète
bun cours/demo-harness.ts missing-call    # résultat sans demande enregistrée
bun cours/demo-harness.ts missing-result  # demande sans résultat
bun cours/demo-harness.ts tool-error      # fichier absent, puis récupération
bun cours/demo-harness.ts max-turns       # arrêt par la limite de tours
```

Avant chaque incident, demandez quel message va manquer dans `messages[]` et qui devait l’ajouter.

Avec un vrai modèle, `--debug` affiche la requête avant chaque appel : options, outils disponibles et messages numérotés.

```bash
bun run index.ts --debug "Lis README.md et résume le projet"
```

## Sources

- Yao et al., [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629), 2022
- [Anthropic, « Building effective agents »](https://www.anthropic.com/engineering/building-effective-agents)
- [OpenAI, guide du function calling](https://developers.openai.com/api/docs/guides/function-calling)
