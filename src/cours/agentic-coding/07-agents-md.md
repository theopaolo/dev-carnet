---
title: Écrire un AGENTS.md
order: 7
publishedAt: "2026-09-23"
updatedAt: "2026-09-24"
---

# Écrire un AGENTS.md

`AGENTS.md` est un fichier Markdown à la racine du dépôt que l’agent lit au début de chaque session. Il contient ce qu’une nouvelle session ne peut pas deviner en lisant les fichiers : les commandes réelles, l’architecture peu visible, les conventions du projet, les opérations interdites et la façon de vérifier un travail.

## Un format partagé

[AGENTS.md](https://agents.md/) est un format ouvert, proposé par OpenAI et maintenu depuis décembre 2025 par l’Agentic AI Foundation de la Linux Foundation, avec MCP et Goose. Codex, Cursor, OpenCode, Pi, Goose, Cline et la plupart des agents le lisent. Claude Code lit `CLAUDE.md`. Pour garder une seule source, écrivez vos règles dans `AGENTS.md` et placez dans `CLAUDE.md` une ligne qui l’importe :

```markdown
@AGENTS.md
```

Un dépôt peut contenir plusieurs fichiers. Un `AGENTS.md` dans `packages/api/` s’applique quand l’agent travaille dans ce dossier, en plus de celui de la racine. Le fichier le plus proche du code modifié l’emporte en cas de conflit.

## Ce qui y va

Gardez les informations vraies pour presque toutes les tâches :

- le but du projet en deux ou trois lignes
- les commandes d’installation, de test et de vérification, telles qu’elles existent
- l’architecture difficile à deviner depuis les noms de fichiers
- les conventions propres au projet
- les opérations risquées ou interdites
- le critère de fin d’une modification.

## Ce qui n’y va pas

| Contenu | Où le mettre |
| --- | --- |
| Une procédure pour un type de tâche | Un skill ([chapitre 8](../08-skills/)) |
| La documentation technique détaillée | `docs/`, avec un lien depuis `AGENTS.md` |
| Ce que le linter ou le formateur vérifie déjà | Nulle part, la configuration suffit |
| Une règle qui concerne moins d’une tâche sur deux | Un skill ou un `AGENTS.md` de sous-dossier |
| Une règle générique comme « écris du code propre » | Nulle part |

Chaque règle doit pouvoir changer une décision de l’agent. « Écris du bon code » ne change rien. « Les montants sont stockés en centimes, en entiers, jamais en flottants » change la façon d’écrire une fonction de prix.

## Un fichier court

Un `AGENTS.md` utile tient souvent en une trentaine de lignes. Il est envoyé à chaque appel, pour chaque tâche. Un fichier de 500 lignes qui couvre tous les cas occupe le contexte dès le démarrage, pour des règles qui ne concernent pas la tâche en cours.

Claude Code entoure d’ailleurs le contenu de `CLAUDE.md` d’un rappel système : *this context may or may not be relevant to your tasks*. Le modèle écarte ce qu’il juge hors sujet, y compris parfois une règle qui comptait. Moins il y a de règles, plus chacune a de poids.

## Exemple pour le mini-harness

```markdown
# mini-harness

Harness d’agent minimal en TypeScript avec Bun : une boucle ReAct, un appel
à OpenRouter et sept outils. Support pédagogique, pas un outil de production.

## Commandes
- `bun install`
- `bun run typecheck` puis `bun run test` avant de conclure
- `bun run index.ts --debug "mission"` pour voir la requête envoyée au modèle
- Modèle obligatoire : `--model` ou `HARNESS_MODEL`

## Architecture
- `src/app/harness.ts` : la boucle, les limites de tours et les délais
- `src/app/systemPrompt.ts` : le prompt système du mini-harness
- `src/llm/openrouter.ts` : l’appel HTTP au fournisseur
- `src/tools/index.ts` : `toolDefinitions` et le `switch` de `executeTool`

## Ajouter un outil
1. Créer `src/tools/<nom>.ts` avec la définition et la fonction
2. Ajouter la définition à `toolDefinitions`
3. Ajouter le `case` dans `executeTool`, avec validation des arguments
4. Ajouter les tests dans `src/tools/tools.test.ts`

## Sécurité
- Aucun outil ne sort du répertoire courant, y compris par un lien symbolique
- `run_js` applique un filtre textuel. Ce n’est pas une sandbox.
- Ne jamais lire ni afficher `.env.local`

## Mémoire et livrables
- `notes/memory.md` est la mémoire de travail de l’agent
- `documents/` reçoit le livrable final, écrit une seule fois

## Fin d’une modification
Typecheck et tests verts, diff relu, limites signalées.
```

## Deux harnesses dans la même pièce

Pendant le TP 2, deux programmes travaillent sur le même dépôt :

```text
vous → OpenCode ou Pi → outils de modification → dépôt mini-harness
mission → mini-harness → OpenRouter → modèle → outils du mini-harness
```

OpenCode ou Pi lit `AGENTS.md` et modifie le code. Le mini-harness, lui, utilise `src/app/systemPrompt.ts` quand il s’exécute. `AGENTS.md` ne devient pas une instruction du mini-harness. Avant de conclure qu’une règle a été suivie, vérifiez quel programme a préparé le contexte.

## Vérifier que le fichier est chargé

Une différence de réponse ne prouve pas que le fichier a été lu. Cherchez une preuve dans l’en-tête de session, la trace ou la commande de contexte de votre outil (`/context` dans Claude Code, les informations de session dans OpenCode).

Pour mesurer l’effet d’`AGENTS.md`, envoyez le même prompt de plan avant et après l’avoir écrit :

```text
Sans modifier les fichiers, explique comment tu ajouterais un outil
list_files(path) à ce projet. Cite tous les fichiers concernés et les
vérifications à effectuer.
```

Notez une différence que vous pouvez relier à une règle précise du fichier.

## Une règle n’est pas une garantie

`AGENTS.md` guide le modèle. Il n’empêche rien. « Ne jamais lancer `git push --force` » reste une phrase que le modèle peut ignorer. Ce qui doit être imposé passe par du code :

| Besoin | Mécanisme |
| --- | --- |
| Toujours lancer le lint | Hook, script de pré-commit ou CI |
| Interdire une commande | Permission du harness, liste de commandes refusées |
| Protéger un fichier | Permission en écriture, isolation |
| Vérifier une convention | Test ou règle de linter |

Une vérification exécutable vaut mieux qu’un rappel textuel. `npm run lint` dans la CI est plus fiable que « n’oublie pas de lancer le lint ».

## Faire relire

À deux, le lecteur vérifie :

- que les commandes existent et fonctionnent
- que chaque règle concerne ce projet
- qu’une nouvelle session sait comment valider son travail
- qu’aucune règle ne répète ce que les outils vérifient déjà.

## Sources

- [agents.md](https://agents.md/), le format et la liste des outils qui le lisent
- [Claude Code, gestion de la mémoire et CLAUDE.md](https://code.claude.com/docs/en/memory)
- [OpenCode, règles de projet](https://opencode.ai/docs/rules/)
