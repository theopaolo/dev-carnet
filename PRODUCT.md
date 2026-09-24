# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two readers, in two situations:

- Learners after class. They come back alone, days or weeks later, to reread a chapter, find a command, or redo an exercise. Search, the table of contents and prev/next links serve them.
- The teacher projecting a page in front of the group. Text size buttons (A− / A+), fullscreen diagrams and the step-by-step animated diagrams serve this use.

Learners are developers in training. The courses were first taught at Ada Tech School. Each course states its own audience in its `index.md`. For example, Agentic coding targets developers who use a chat with copy-paste and have not set up a coding agent. The documentation course targets learners who have already built a web project.

## Product Purpose

A static site that publishes the author's own programming courses, written in Markdown. It lets a learner reread a course without the teacher, and lets the teacher present from the same pages in class. Success means a learner can understand a chapter on their own and find what they need again later.

## Positioning

The site is called Carnet. It holds the author's personal teaching materials: courses, reference material and teaching support. It is published under the ludique.dev brand at carnet.ludique.dev. The materials belong to the author, not to Ada Tech School.

## Operating Context

- Content lives in `src/cours/<course>/`. The course home page is `index.md` and chapters are the other `.md` files, ordered by `order` in frontmatter. `hidden: true` keeps a teacher-only page out of the build.
- `src/cours/documentation/` is generated from the `cours-documentation-web` repo by `node scripts/import-documentation.mjs` and is not edited by hand.
- Diagrams are written in Mermaid inside the Markdown. A flowchart fenced as ```` ```mermaid play ```` can be played connection by connection. Use it only when the order of the arrows carries meaning. The custom `animated` blocks are step-by-step sequence diagrams with a context bar.
- Deployed as a static site through GitHub Actions (`.github/workflows/deploy.yml`).

## Capabilities and Constraints

- Static Astro site. There is no server, no accounts and no stored learner data.
- No analytics or tracking. The only third-party requests allowed are fonts and Mermaid.
- French only. All interface copy stays in French and no translation is planned.
- Reader features: full-text search, a "Reprendre la lecture" link on the home page to the last page and section read (kept in `localStorage`), per-page table of contents, a sidebar that lists only the current course (or the fiches) with a link back to all courses, light and dark themes, adjustable text size, copy buttons on code blocks, fullscreen diagrams, flowchart playback, and a text version under each animated sequence diagram.
- The site name is Carnet.

## Brand Commitments

- The site does not carry the Ada or Ada Tech School brand. It carries ludique.dev, the author's brand for personal coding teaching. The site name is Carnet, shown in the top bar, the page titles and the home page.
- The courses address learners in French. Agentic coding uses "vous" and the documentation course uses "tu". Each course keeps its own form of address.

## Evidence on Hand

- Ten courses: Docker, Agentic coding, Documenter son projet web, Architecture logicielle, Lire, comprendre et améliorer une codebase, Méthodologie de projet numérique, Stories et backlog, Le RGPD pour les développeur·euses, Atelier SSG and Veille. Docker has three annex pages; Agentic coding has 13 chapters; Documentation has 15 published chapters and a hidden teacher guide.
- The documentation course ships SVG visuals in `src/cours/documentation/visuels/`, with their credits in the chapter `16-credits.md`.
- There is no ludique.dev logo or brand asset in the repo yet. Future work must not invent one.

## Product Principles

1. Reading comes first. Every page has to work for a learner alone, without the teacher's spoken explanations.
2. The same page serves self-study and projection. Features for one use must not break the other.
3. Markdown stays the source. Authors write plain `.md`, and the site handles presentation.
4. Nothing about the learner leaves their browser. Preferences stay in `localStorage` and nothing is tracked.

## Accessibility & Inclusion

- Readers can change text size, and the layout keeps working at every size. The root font size stays at 100% so the browser setting is respected.
- Diagrams carry an accessible title and description (`accTitle` / `accDescr`), and animated diagrams have a text version.
- Animated diagrams stop animating under `prefers-reduced-motion`.
