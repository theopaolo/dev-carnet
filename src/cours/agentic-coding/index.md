---
title: Agentic coding
order: 1
publishedAt: "2026-09-23"
updatedAt: "2026-09-25"
---

# Agentic coding

Ce cours explique comment fonctionne un agent de code comme Claude Code, Codex, OpenCode ou Pi. Il sépare ce que fait le modèle de ce que fait le programme autour de lui, le harness.

> Un agent de code est un programme qui prépare un contexte, interroge un modèle, exécute des outils autorisés, observe leurs résultats et recommence jusqu’à une condition d’arrêt.

> Le modèle demande. Le harness décide et exécute. L’outil agit sur l’environnement. Le résultat revient dans le contexte.

## Prérequis

Vous pouvez suivre ce cours si vous utilisez surtout un chat avec copier-coller et n’avez pas encore configuré d’agent de code ni de clé d’API. Aucune connaissance en apprentissage automatique n’est nécessaire.

## Objectifs

Ce cours vous aide à :

- distinguer modèle, fournisseur d’API, harness, outil et environnement
- expliquer le trajet d’un appel d’outil et de son résultat
- distinguer contexte courant, mémoire externe et règles de projet
- formuler une tâche avec un résultat observable
- retracer une requête dans le mini-harness TypeScript fourni
- vérifier une affirmation de l’agent avec le code ou une expérience
- rédiger un `AGENTS.md` utile pour votre projet
- ajouter et tester un outil dans un harness
- créer un skill et l’utiliser sur une tâche réelle.

## Chapitres

1. [Du chat à l’agent](01-du-chat-a-l-agent/) : ce qu’est un LLM et ce qu’il ne sait pas faire seul.
2. [Les harnesses de code](02-harnesses/) : les couches d’un système agentique et les outils existants, en interface graphique, dans l’IDE ou dans le terminal.
3. [La boucle agentique](03-boucle-agentique/) : function calling, `messages[]` et conditions d’arrêt.
4. [Anatomie d’un harness](04-anatomie-harness/) : les huit responsabilités du programme autour du modèle.
5. [Context engineering](05-context-engineering/) : choisir ce que le modèle voit à chaque appel.
6. [Mémoire et état](06-memoire/) : reprendre un travail d’une session à l’autre.
7. [Écrire un AGENTS.md](07-agents-md/) : les instructions permanentes d’un dépôt.
8. [Créer un skill](08-skills/) : une procédure chargée seulement quand la tâche la demande.
9. [MCP](09-mcp/) : brancher des outils et des services externes.
10. [Permissions et prompt injection](10-securite/) : où placer la frontière de confiance.
11. [Formuler une tâche](11-bien-prompter/) : objectif, contexte, contraintes et critère de fin.
12. [Vers l’AI engineering](12-ai-engineering/) : RAG, embeddings, routage de modèles et boucles longues.
13. [Exercices et quiz](13-exercices/) : trois TP et des questions de révision.

## Pour pratiquer

- Le dépôt `mini-harness` : une boucle ReAct en TypeScript avec Bun, sept outils et trois TP dans `exercises/`.
- `demo-harness.ts` : une trace rejouable avec un faux modèle, sans compte ni clé d’API.
- Une clé [OpenRouter](https://openrouter.ai/) pour appeler un modèle depuis le mini-harness.
- OpenCode ou Pi installé sur votre machine.

Le point d’accès gratuit d’OpenRouter journalise les sessions. Ne lui envoyez aucune donnée confidentielle ou personnelle, et ne publiez jamais une clé d’API.

Les diagrammes animés de ce cours se lisent pas à pas avec les boutons ‹ et ›. La barre sous chaque diagramme montre le contenu de `messages[]` à l’étape affichée. Les nombres de tokens sont des ordres de grandeur choisis pour l’exemple.
