---
title: "Démonstration JavaScript"
order: 10
publishedAt: "2026-09-23"
updatedAt: "2026-09-25"
---

# Réserve ta place : démonstration des règles métier

Cette démonstration JavaScript permet de réserver et d’annuler une place à une séance de poterie. Elle sert à apprendre les tests comme documentation, Gherkin, JSDoc et la génération de diagrammes.

Elle fonctionne en mémoire pendant une exécution. Elle ne fournit ni site de réservation, ni API HTTP, ni base PostgreSQL. L’architecture web du cours est un exemple de conception distinct. Les identifiants sont fictifs et aucun compte n’est nécessaire.

## Préparer le dossier

Ouvre un terminal **à la racine du cours**, le dossier contenant package.json. Toutes les commandes de cette page s’exécutent à cet endroit, même si ce README est dans demo.

Le kit cible Node.js 24 et Python 3.12 pour les outils de documentation. Vérifie :

~~~sh
node --version
python3 --version
~~~

Pour les deux premières commandes de démonstration, Node suffit. Aucun téléchargement de dépendance n’est nécessaire :

~~~sh
npm run demo
npm test
~~~

La démonstration affiche :

~~~text
Réservation créée : confirmee
Après annulation : annulee
Nouvelle demande : Réservation déjà existante
~~~

La suite native doit exécuter six tests. Elle contrôle les places, les annulations, les doublons, l’indépendance des ateliers et quelques demandes invalides.

## Installer les outils de documentation et BDD

Une connexion Internet est nécessaire pour la première installation. Les versions JavaScript sont enregistrées dans package-lock.json.

~~~sh
npm ci
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-docs.txt
~~~

Sous Windows, utilise .venv\Scripts\python à la place de .venv/bin/python. Les scripts de diagrammes fournis ont été vérifiés sous macOS, pas sous Windows.

Mermaid CLI utilise un navigateur Chromium pour exporter les images. Avec Helium déjà installé sur macOS, tu peux éviter le téléchargement d’un autre navigateur :

~~~sh
PUPPETEER_SKIP_DOWNLOAD=true npm ci
export PUPPETEER_EXECUTABLE_PATH="/Applications/Helium.app/Contents/MacOS/Helium"
~~~

Choisis l’une des deux méthodes d’installation npm. Si tu as désactivé le téléchargement, fournis ensuite le chemin du navigateur pour la génération des diagrammes.

## Exécuter les scénarios métier

~~~sh
npm run test:bdd
~~~

Attendu : quatre scénarios et 23 étapes réussis. Le rapport est écrit dans .build/bdd.html. Les étapes invoquent les mêmes fonctions que les tests natifs.

Le format JSON est utilisé ici pour un petit contrôle de présence des scénarios. Cucumber le maintient pour compatibilité. Pour une nouvelle intégration de rapports plus poussée, étudie son format Messages.

## Voir une régression détectée

~~~sh
npm run demo:regression
~~~

Le script travaille dans une copie temporaire. Il remplace le refus lorsque le nombre de places occupées est supérieur ou égal à la capacité par un refus seulement au-delà de la capacité. Deux tests doivent échouer, puis le script confirme que cette régression a été détectée.

La commande globale réussit lorsque l’échec attendu a été observé. Elle ne modifie pas les sources du cours et supprime uniquement la copie temporaire qu’elle vient de créer.

## Construire la documentation

~~~sh
npm test
npm run test:bdd
npm run docs:api
npm run docs:deps
npm run docs:diagrams
.venv/bin/python -m mocodo --input cours-documentation/visuels/reservations.mcd --output_dir cours-documentation/visuels --colors brewer+1 --shapes arial
npm run check:links
.venv/bin/python scripts/preparer-site.py
.venv/bin/python -m mkdocs build --strict
~~~

Les schémas SVG livrés permettent de lire le cours sans installer le moteur de rendu. Pour une démonstration de génération, exécute toute la séquence ci-dessus. Une commande en échec doit être corrigée avant de passer à la suivante.

Ouvre le site local :

~~~sh
.venv/bin/python -m http.server 8000 --bind 127.0.0.1 --directory site
~~~

Dans le navigateur, ouvre [le parcours local](http://127.0.0.1:8000/documenter-son-projet-web-atelier-5h.html). Le menu Pratiquer mène aux résultats BDD et à la référence JSDoc. Arrête le serveur avec Ctrl+C.

Après une modification du code ou des sources documentaires, reconstruis les contenus concernés et le site. Le dossier .build/docs est une copie de construction. Modifie les fichiers originaux, jamais cette copie.

## Retrouver les fichiers

Le [prolongement JSDoc, TSDoc et TypeDoc](/documentation/12-documentation-editeur/) explique le survol dans VS Code. Son [exemple JavaScript](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/editeur/survol.js) se lance avec node demo/editeur/survol.js depuis la racine et affiche confirmee. La vérification des types et la génération TypeDoc sont des étapes optionnelles décrites dans ce prolongement.

| Fichier | Usage |
| --- | --- |
| [Règles de réservation](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/src/reservations.mjs) | Comportement et annotations JSDoc |
| [Scénarios métier](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/features/reservations.feature) | Exemples lus par les participants et exécutés par Cucumber |
| [Définitions des étapes](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/features/steps/reservations.mjs) | Liaison entre phrases et code |
| [Tests natifs](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/tests/reservations.test.mjs) | Exemples exécutables sans dépendance |
| [ADR](/documentation/13-adr-001/) | Raisons du choix retenu dans le kit |

## Dépanner

| Symptôme | Vérification | Résultat recherché |
| --- | --- | --- |
| Node ou npm introuvable | Installation et ouverture d’un nouveau terminal | Node 24 est reconnu |
| package.json introuvable | Dossier courant du terminal | Racine du cours |
| cucumber-js introuvable | Installation avec npm ci | Dépendances locales présentes |
| Zéro scénario exécuté | Chemins et forme du fichier cucumber.mjs | Quatre scénarios découverts |
| Le navigateur de rendu ne démarre pas | PUPPETEER_EXECUTABLE_PATH ou installation Puppeteer | Chromium ou Helium accessible |
| Construction MkDocs : rapport absent | Exécuter les tests BDD et JSDoc avant la préparation | .build/bdd.html et .build/api présents |

## Limites de la démonstration

La capacité est transmise par l’appelant pour raccourcir le code. Dans une application, elle viendrait d’un stockage maîtrisé par le serveur. L’historique est supposé interne et valide. Les fonctions ne constituent pas une frontière HTTP sécurisée. La réservation et l’annulation ne simulent pas plusieurs processus ni une transaction en base.

Signale un problème avec la commande, le résultat observé et la version de Node. Pour proposer une modification, actualise la règle, ses exemples et les tests concernés.
