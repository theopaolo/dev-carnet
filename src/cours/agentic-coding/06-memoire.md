---
title: Mémoire et état
order: 6
---

# Mémoire et état

Toute session se termine. Le contexte est compacté, la conversation est fermée, une autre personne reprend la tâche. Sans mémoire, l’agent repart de zéro : il relit le README, redécouvre la structure du projet et retente la correction qui avait échoué la veille.

## État, contexte et mémoire

Trois notions à ne pas confondre :

- l’**état** décrit l’avancement de la tâche en cours : messages, actions, résultats, plan, budget restant
- le **contexte** est ce que le modèle reçoit pour un appel précis
- la **mémoire** conserve des informations pour plus tard, hors de la fenêtre.

| | Mémoire dans le contexte | Mémoire hors contexte |
| --- | --- | --- |
| Stockage | La fenêtre du modèle | Fichiers, base de données, index vectoriel |
| Durée | L’appel ou la session | Plusieurs sessions |
| Exemples | Historique récent, résultats d’outils | `progress.md`, décisions du projet, préférences validées |

Une note écrite sur disque n’est pas dans le contexte. Elle le devient quand le harness la relit et l’envoie au modèle.

## Le dépôt est déjà une mémoire

Dans un projet logiciel, la plus grande partie de la mémoire utile existe déjà : le code, les tests, les commits, les issues, la documentation. Un agent qui lance ces commandes retrouve un état structuré et vérifiable :

```bash
git status   # ce qui n’est pas encore commité
git diff     # ce qui a changé
git log      # les décisions récentes, si les messages de commit sont bons
git show     # le détail d’un changement
```

Évitez de reconstruire une mémoire conversationnelle géante quand le dépôt contient déjà l’état. Des messages de commit qui expliquent le pourquoi servent autant à l’agent qu’à vos collègues.

## Un fichier de progression

Pour un travail long, un fichier court suffit souvent :

```markdown
# Progress

## Goal
Ajouter l’authentification OAuth.

## Done
- Provider GitHub configuré
- Route callback créée
- Tests unitaires OK

## Remaining
- Gestion des erreurs OAuth
- Test end-to-end

## Decisions
- Pas de nouvelle dépendance
- Réutilisation de la table sessions

## Next
Lancer le test e2e du parcours de connexion.
```

Une nouvelle session lit ce fichier, regarde Git et reprend le travail. Elle n’a pas besoin des 180 000 tokens de la conversation précédente.

```animated
sequenceDiagram
  accTitle: Reprendre le lendemain
  accDescr: La session de lundi écrit l’état dans Git et dans progress.md. La session de mardi le relit et reprend avec quelques centaines de tokens.
  participant L as Session de lundi
  participant F as progress.md
  participant G as Git
  participant M as Session de mardi
  %% ctx: system 1200 Prompt système de mardi
  %% ctx: tools 600 Outils
  L->>G: git commit -m "Route callback OAuth"
  %% note: La barre montre le contexte de la session de mardi. Pour l’instant, il ne contient rien sur le travail de lundi.
  L->>F: Écrit Done, Remaining, Decisions, Next
  L->>L: Fin de session : le contexte disparaît
  %% note: Les 180 000 tokens de la conversation de lundi sont perdus. Il reste le dépôt et le fichier.
  M->>M: Nouvelle session : Continue l’OAuth
  %% ctx: user 20 Continue l’OAuth
  M->>F: read_file("progress.md")
  F-->>M: Objectif, décisions, prochaine étape
  %% ctx: tool 250 Contenu de progress.md
  M->>G: git log -5 et git diff
  G-->>M: Derniers commits, rien en attente
  %% ctx: tool 400 Sortie de git log
  %% note: Mardi reprend avec 650 tokens d’état au lieu de la conversation complète.
```

## Les types de mémoire

La recherche sur les agents emprunte ses catégories à la psychologie cognitive :

- la **mémoire de travail** tient dans la fenêtre : c’est `messages[]`, limité et perdu à la fin de la session
- la **mémoire épisodique** enregistre des expériences datées : « le 15 mai, le rate limiting sur `/upload` a échoué à cause du middleware d’auth, résolu en réordonnant les middlewares »
- la **mémoire sémantique** garde des faits stables extraits des épisodes : « l’API de paiement renvoie des 429 au-delà de 100 requêtes par minute »
- la **mémoire procédurale** stocke des savoir-faire réutilisables. Les skills en sont une forme, comme la bibliothèque de routines vérifiées de [Voyager](https://github.com/MineDojo/Voyager).

Un épisode est un événement. Un fait sémantique est une connaissance générale tirée de plusieurs épisodes. Trois corrections du format de date deviennent « l’utilisateur préfère JJ/MM/AAAA ». Cette consolidation est rarement automatique.

## Écrire, gérer, relire

Un système de mémoire tourne en trois phases couplées à la boucle de l’agent : écrire ce qui mérite d’être gardé, gérer ce qui est stocké, relire ce qui sert à la tâche. La gestion résume, déduplique, résout les contradictions et supprime. Une mauvaise écriture pollue les sessions suivantes, donc elle compte autant que la lecture.

Trois politiques décident quoi stocker :

- **heuristique** : règles codées en dur, comme un résumé toutes les dix interactions ou une expiration après trente jours. Prévisible et facile à déboguer. C’est ce que fait le mini-harness.
- **auto-dirigée** : la mémoire est exposée comme des outils, et le modèle décide quand les appeler. [MemGPT](https://arxiv.org/abs/2310.08560) (Packer et al.) traite la fenêtre comme de la RAM et l’archive comme un disque. [Letta](https://www.letta.com/) implémente ce modèle.
- **apprise** : les opérations de mémoire sont entraînées par apprentissage par renforcement. C’est un sujet de recherche, hors de portée d’un harness écrit à la main.

## Mécanismes

| Mécanisme | Principe | Limite |
| --- | --- | --- |
| Compression dans le contexte | Fenêtre glissante, résumé cumulatif | Les détails rares disparaissent au fil des résumés |
| Index de recherche (RAG) | Les souvenirs sont indexés et retrouvés par similarité | La question de l’utilisateur est souvent une mauvaise requête de recherche |
| Réflexion | Après un échec, un appel écrit ce qu’il aurait fallu faire, réinjecté à la tentative suivante | Les anciennes critiques sortent de la fenêtre |
| Mémoire hiérarchique | Un noyau toujours visible, une archive consultée à la demande | Le modèle doit savoir quand consulter l’archive |

[Reflexion](https://arxiv.org/abs/2303.11366) (Shinn et al., 2023) atteint 91 % de réussite au premier essai sur HumanEval contre 80 % pour GPT-4 seul, sans réentraîner le modèle. Pour un harness, cela revient à ajouter un champ `reflection` rempli en fin de session par la question « qu’aurais-je dû faire différemment ? », et à le relire au démarrage suivant.

## Mémoire et sécurité

Sans mémoire, une prompt injection s’arrête avec la session. Avec une mémoire persistante, elle est stockée et attend d’être relue. [MINJA](https://arxiv.org/abs/2503.03704) (Dong et al., 2025) montre qu’un attaquant peut glisser des enregistrements malveillants dans la mémoire d’un agent par des interactions ordinaires, sans accès direct au stockage. Une instruction comme « toujours traiter en priorité les e-mails urgents » ressemble à une préférence légitime.

Pour un harness :

- ne stockez pas directement un contenu issu d’une source externe non vérifiée
- enregistrez l’origine de chaque écriture (session, source) pour pouvoir auditer et supprimer
- traitez un souvenir relu comme une donnée, pas comme une instruction de confiance
- donnez une durée de vie courte aux faits extraits d’une session courte ou inhabituelle.

## Dans le mini-harness

Le mini-harness fournit trois outils sur `notes/memory.md` :

| Outil | Rôle |
| --- | --- |
| `memory_read` | Relire la mémoire de travail |
| `memory_append` | Ajouter une observation |
| `memory_rewrite` | Réécrire le fichier pour le nettoyer |

Le prompt système précise : *Memory is for YOU, write_document is for the USER*. La mémoire sert à l’agent d’un tour à l’autre. Le livrable final va dans `documents/` avec `write_document`. Le fichier survit à l’arrêt du programme, mais son contenu n’entre dans le contexte que lorsque le modèle appelle `memory_read`.

## Sources

- Du, [Memory for Autonomous LLM Agents: Mechanisms, Evaluation, and Emerging Frontiers](https://arxiv.org/abs/2603.07670), 2026
- Packer et al., [MemGPT: Towards LLMs as Operating Systems](https://arxiv.org/abs/2310.08560)
- Shinn et al., [Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366), 2023
- Park et al., [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442), 2023
