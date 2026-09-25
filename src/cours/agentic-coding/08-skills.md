---
title: Créer un skill
order: 8
publishedAt: "2026-09-23"
updatedAt: "2026-09-24"
---

# Créer un skill

Votre harness sait agir : il a des outils. Il ne sait pas forcément bien agir dans un domaine précis. Une revue de code généraliste et une revue de sécurité, avec le même modèle et les mêmes outils, donnent des résultats très différents. La différence vient des instructions présentes dans le contexte au bon moment. C’est le rôle des skills.

## Définition

Un **skill** est un dossier qui contient un fichier `SKILL.md` : une procédure écrite en Markdown, précédée d’un nom et d’une description. Le harness le charge dans le contexte seulement quand la tâche le demande.

```text
prompt système  → envoyé à chaque appel
AGENTS.md       → chargé à chaque session
skill           → chargé quand la tâche correspond à sa description
```

Anthropic a publié le format en 2025 sous le nom [Agent Skills](https://agentskills.io/). Claude Code, Codex, OpenCode et Pi le lisent, et d’autres outils l’adoptent. Un même dossier de skill fonctionne donc dans plusieurs harnesses. Vérifiez la liste à jour sur le site du format.

## Chargement progressif

Un skill se charge en trois niveaux :

1. le nom et la description de chaque skill sont toujours dans le contexte, soit quelques dizaines de tokens par skill
2. le corps de `SKILL.md` entre dans le contexte quand le modèle décide que le skill correspond à la tâche
3. les fichiers annexes du dossier (scripts, exemples, références) sont lus seulement si la procédure y renvoie.

Suivez le contexte pendant une revue de sécurité :

```animated
sequenceDiagram
  accTitle: Charger un skill à la demande
  accDescr: Le modèle voit seulement la liste des skills. Le contenu de SKILL.md entre dans le contexte quand il le demande.
  participant U as Personne
  participant H as Harness
  participant M as Modèle
  participant F as Fichiers
  %% ctx: system 1200 Prompt système
  %% ctx: tools 600 Outils, dont skill
  %% ctx: system 150 Liste des skills : code-review, tech-report, data-analysis
  U->>H: Fais une revue de sécurité de src/router.js
  %% ctx: user 20 Fais une revue de sécurité de src/router.js
  H->>M: messages[] avec la liste des skills
  %% note: Le modèle voit trois noms et trois descriptions. Pas le contenu des skills.
  M-->>H: tool_call skill("code-review")
  %% ctx: assistant 15 skill("code-review")
  %% note: La description de code-review correspond à la demande. Le modèle demande le skill.
  H->>F: Lire .agents/skills/code-review/SKILL.md
  F-->>H: 60 lignes de procédure
  %% ctx: tool 900 Contenu de SKILL.md
  %% note: Le contenu complet entre dans le contexte seulement maintenant.
  H->>M: messages[]
  M-->>H: tool_call read_file("src/router.js")
  %% ctx: assistant 20 read_file("src/router.js")
  H->>F: read_file("src/router.js")
  F-->>H: 240 lignes
  %% ctx: tool 1600 Contenu de src/router.js
  H->>M: messages[]
  M-->>H: Revue : 2 problèmes critiques, 1 majeur
  %% ctx: assistant 400 Revue structurée
  %% note: Le format de la revue vient du skill : sévérité, extrait de code, suggestion.
```

Avec 85 skills installés, la liste coûte environ 10 000 tokens (voir le [chapitre 5](../05-context-engineering/)). Chaque skill non utilisé ne coûte que sa description.

## Anatomie

```text
.agents/skills/
└── code-review/
    ├── SKILL.md
    ├── checklist-securite.md   ← lu seulement si SKILL.md y renvoie
    └── scripts/
        └── find-secrets.sh     ← exécuté, pas lu
```

```markdown
---
name: code-review
description: Revue de code source centrée sur la sécurité et la robustesse.
  Utiliser quand la demande parle de review, audit, analyse de code ou
  qualité. Ne pas utiliser pour résumer un article, traduire ou générer
  du contenu.
---

# Code review

## Entrées
Un fichier, un dossier ou un diff. Demander le périmètre s’il manque.

## Étapes
1. Lire le code concerné et ses appelants directs
2. Chercher dans cet ordre : sécurité (injections, secrets exposés),
   robustesse (cas limites, erreurs silencieuses), maintenabilité
3. Pour chaque problème, vérifier qu’il est reproductible ou citer la ligne
4. Lancer `scripts/find-secrets.sh` sur le périmètre

## Résultat
Une section par problème : sévérité (critique, majeur, mineur), extrait
de code, suggestion concrète.

## Arrêt
Tout le périmètre est lu et chaque problème cite sa ligne.

## À ne pas faire
- Commenter le style ou l’indentation, le linter s’en charge
- Réécrire le code en entier
- Féliciter sans raison
```

Le nom ne contient que des lettres minuscules, des chiffres et des tirets. Il correspond exactement au nom du dossier. Selon l’outil, le dossier est `.agents/skills/`, `.claude/skills/` ou `~/.config/<outil>/skills/` pour des skills personnels valables dans tous vos projets.

## Le modèle choisit sur la description

Pour choisir un skill, le modèle ne lit que sa description. Elle doit dire ce que fait le skill, quand l’utiliser et quand ne pas l’utiliser.

Une description vague :

```yaml
description: Pour analyser du code
```

se déclenche pour presque toutes les tâches, ou pour aucune.

Une description précise donne les mots déclencheurs et les exclusions :

```yaml
description: Revue de code source centrée sur la sécurité et la robustesse.
  Utiliser quand la demande parle de review, audit, analyse de code ou
  qualité. Ne pas utiliser pour résumer un article, traduire ou générer
  du contenu.
```

Les exclusions comptent autant que les déclencheurs. Sans elles, un skill `code-review` se charge aussi quand vous demandez de résumer un article technique qui contient du code.

## Deux sortes de skills

Certains skills apportent un savoir que le modèle n’a pas : les conventions de votre projet, un format de sortie, des règles métier. D’autres décrivent une façon de travailler dans votre environnement : votre processus de revue, de release ou de déploiement.

Quelques skills publics montrent la variété du format :

- [Impeccable](https://github.com/pbakaus/impeccable) guide le travail de design et d’interface
- Ponytail pousse l’agent vers l’implémentation la plus courte qui fonctionne
- `skill-creator`, publié par Anthropic, aide à écrire un skill et à tester son déclenchement.

Un skill n’ajoute pas forcément un outil. Il apprend souvent une meilleure façon d’utiliser les outils existants.

## Deux façons de charger un skill

Dans Claude Code ou OpenCode, le modèle appelle un outil qui lit `SKILL.md`, et le contenu arrive comme résultat d’outil. C’est la version du diagramme ci-dessus.

Dans l’exercice du workshop, le harness détecte le skill avant la boucle et injecte son contenu dans le prompt système :

```typescript
// src/skills.ts
const skill = await detectSkill(mission);        // lit les descriptions, choisit ou renvoie null
const skillContent = skill ? await loadSkill(skill) : "";

const systemPrompt = `
Tu es un agent de recherche technique.
${skillContent ? `--- SKILL ACTIF : ${skill} ---\n${skillContent}` : ""}
`.trim();

console.log(skill ? `Skill chargé : ${skill} (${skillContent.length} caractères)` : "Aucun skill détecté");
```

La première version laisse le modèle choisir en cours de tâche. La seconde décide une seule fois, au début, et reste plus simple à déboguer.

## Écrire son skill

Choisissez une tâche que vous confiez régulièrement à un agent : préparer une petite fonctionnalité, analyser un bug, auditer une page, vérifier une API, produire un plan de test, documenter une décision. Évitez une procédure qui ne servira qu’une fois.

Le skill définit :

- les entrées attendues
- les étapes à suivre
- les preuves à recueillir
- le format du résultat
- la condition d’arrêt, observable
- les actions interdites.

Posez-vous la question pour chaque règle : doit-elle être chargée tout le temps dans `AGENTS.md`, ou seulement quand cette tâche arrive ?

## Tester le déclenchement

1. Relevez ce que l’agent sait du skill avant le premier essai : son nom et sa description apparaissent dans la liste des skills.
2. Faites une demande naturelle qui devrait le déclencher.
3. Si le premier essai échoue ou reste incertain, invoquez le skill explicitement, par exemple `/code-review` dans Claude Code.
4. Conservez la trace ou l’appel d’outil qui prouve que `SKILL.md` a été chargé.
5. Vérifiez que l’agent suit les étapes, rassemble les preuves et respecte l’arrêt.
6. Corrigez au moins une instruction ou la description à partir de l’essai.

## Pièges

| Problème | Conséquence | Correction |
| --- | --- | --- |
| Deux skills proches, `code-review` et `software-quality` | Le modèle choisit l’un ou l’autre au hasard | Fusionner, ou séparer leurs descriptions par des exclusions |
| 50 skills aux descriptions longues | Le contexte se remplit et le choix devient flou | Garder les skills utilisés, raccourcir les descriptions |
| Une règle valable partout rangée dans un skill | Elle manque quand le skill n’est pas chargé | La déplacer dans `AGENTS.md` |
| Un skill de 800 lignes | Il occupe le contexte une fois chargé | Découper en fichiers annexes lus à la demande |

## Sources

- [Agent Skills, spécification du format](https://agentskills.io/)
- [Anthropic, « Equipping agents for the real world with Agent Skills »](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Claude Code, documentation des skills](https://code.claude.com/docs/en/skills)
