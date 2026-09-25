---
title: "Exemples et corrigés"
order: 11
publishedAt: "2026-09-23"
updatedAt: "2026-09-25"
---

# Exemples, fichiers exécutables et corrigés

Compare ton travail avec ces exemples et corrigés. Ils concernent Réserve ta place. Pour les adapter à un autre projet, vérifie ses règles.

## 1. Une réponse utile au support

Question : « Alice a annulé, il reste une place, pourquoi ne peut-elle pas réserver ? »

Réponse : « L’annulation libère la place, mais conserve sa réservation. Le service refuse une nouvelle création pour la même personne et la même séance. Une autre personne peut prendre la place. »

Retrouve l’exemple refusé dans les scénarios, puis sa raison dans l’ADR. Si la réponse n’est pas acceptable pour le métier, note une demande d’évolution.

## 2. Un classement Diátaxis

| Document proposé | Classement | Question du lecteur |
| --- | --- | --- |
| Créer sa première réservation avec le kit | Tutoriel | Comment apprendre le fonctionnement ? |
| Relancer les scénarios après modification | Guide pratique | Comment accomplir cette tâche ? |
| Paramètres et erreurs de reserver | Référence | Quelle valeur peut être passée ? |
| Conservation des annulations | Explication | Pourquoi avoir choisi ce comportement ? |

Le classement porte sur l’intention de la page. Une FAQ mêlant toutes ces intentions gagnera souvent à renvoyer vers des pages ciblées.

## 3. Une règle précise

Remplace « les annulations sont bien gérées » par « une annulation conserve la réservation et libère sa place. Répéter l’annulation conserve le statut annulé. »

Pour vérifier la seconde phrase, ajoute un test qui appelle deux fois `annuler` sur la même réservation.

## 4. Une procédure vérifiable

Le [README complet](/documentation/10-demonstration/) est le document à essayer. Une autre personne doit retrouver le dossier de départ, les prérequis et le résultat attendu sans explication supplémentaire.

Le programme principal doit afficher successivement une réservation confirmée, une réservation annulée et le refus d’une nouvelle création.

## 5. Une architecture lisible

La [vue de contexte](https://github.com/theopaolo/cours-documentation-web/blob/main/cours-documentation/visuels/c4-contexte.svg) permet à une personne extérieure de nommer les utilisateurs et le service de courriel. La [vue de conteneurs](https://github.com/theopaolo/cours-documentation-web/blob/main/cours-documentation/visuels/c4-conteneurs.svg) distingue le navigateur, le serveur et PostgreSQL. Ce sont des modèles de l’application fictive, pas une découverte automatique du kit.

Source utilisée pour la vue de contexte, incluse automatiquement dans le site :


~~~text
C4Context
    title Réserve ta place : contexte du système fictif
    Person(participant, "Participant", "Réserve une place")
    Person(organisateur, "Organisateur", "Publie les ateliers")
    System(reservations, "Réserve ta place", "Gère les ateliers et les réservations")
    System_Ext(courriels, "Service de courriels", "Envoie les confirmations")
    Rel(participant, reservations, "Consulte et réserve")
    Rel(organisateur, reservations, "Publie et consulte")
    Rel(reservations, courriels, "Demande un envoi")
    UpdateRelStyle(reservations, courriels, $offsetX="-45", $offsetY="-65")
    UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")

~~~


En lecture Markdown directe, ouvrir le [fichier source](https://github.com/theopaolo/cours-documentation-web/blob/main/cours-documentation/visuels/c4-contexte.mmd).

## 6. Du MCD au modèle relationnel

Une Personne peut n’avoir aucune réservation. Une Réservation concerne exactement une Personne et un Atelier. Le couple personne-atelier doit être unique selon la règle retenue.


~~~text
Personne: id personne, nom
Effectuer, 0N Personne, 11 Réservation
Réservation: id réservation, date création, statut
Concerner, 11 Réservation, 0N Atelier
Atelier: id atelier, titre, date atelier, capacité

~~~


[Fichier Mocodo](https://github.com/theopaolo/cours-documentation-web/blob/main/cours-documentation/visuels/reservations.mcd).


~~~text
erDiagram
    Personnes ||--o{ Reservations : effectue
    Ateliers ||--o{ Reservations : concerne
    Personnes {
      int id PK
      string nom
    }
    Ateliers {
      int id PK
      string titre
      datetime date_atelier
      int capacite
    }
    Reservations {
      int id PK
      datetime date_creation
      string statut
      int personne_id FK
      int atelier_id FK
    }

~~~


[Fichier Mermaid ER](https://github.com/theopaolo/cours-documentation-web/blob/main/cours-documentation/visuels/reservations-erd.mmd).

Les clés étrangères matérialisent les liens. La règle d’unicité du couple demande une contrainte supplémentaire. Dans l’exercice Bibi d’objets, deux emprunts successifs du même objet par la même personne doivent au contraire rester possibles.

## 7. Une décision, un commentaire et une implémentation

L’[ADR rempli](/documentation/13-adr-001/) décrit les options et la restriction choisie. Voici l’implémentation et ses annotations, extraites du fichier réellement exécuté lors de la construction du site :


~~~javascript
import { CONFIRMEE, ANNULEE } from './statuts.mjs';

/** Règles de réservation de la démonstration en mémoire. @module reservations */

/**
 * @typedef {Object} Reservation
 * @property {string} personne Identifiant fictif de la personne.
 * @property {string} atelier Identifiant fictif de la séance.
 * @property {'confirmee'|'annulee'} statut Une annulation conserve la réservation.
 */

/**
 * Réserve une place et conserve la réservation dans la liste reçue.
 * Une seconde réservation reste interdite après annulation.
 * @param {Reservation[]} reservations Historique partagé pendant un scénario.
 * @param {Object} demande Identifiants et capacité de la séance.
 * @param {string} demande.personne Identifiant non vide.
 * @param {string} demande.atelier Identifiant non vide.
 * @param {number} demande.capacite Nombre entier de places, supérieur ou égal à zéro.
 * @returns {Reservation} La réservation créée.
 * @throws {Error} Demande invalide, réservation déjà existante ou atelier complet.
 * @example
 * reserver([], { personne: 'alice', atelier: 'poterie', capacite: 1 });
 */
export function reserver(reservations, { personne, atelier, capacite }) {
  if (
    typeof personne !== 'string' || !personne.trim() ||
    typeof atelier !== 'string' || !atelier.trim() ||
    !Number.isSafeInteger(capacite) || capacite < 0
  ) {
    throw new Error('Demande invalide');
  }

  if (reservations.some(r => r.personne === personne && r.atelier === atelier)) {
    throw new Error('Réservation déjà existante');
  }

  const occupees = reservations.filter(
    r => r.atelier === atelier && r.statut === CONFIRMEE
  ).length;
  if (occupees >= capacite) {
    throw new Error('Atelier complet');
  }

  const reservation = { personne, atelier, statut: CONFIRMEE };
  reservations.push(reservation);
  return reservation;
}

/**
 * Libère une place en conservant la réservation dans l'historique.
 * Répéter l'annulation ne crée pas de nouvelle modification métier.
 * @param {Reservation} reservation Réservation issue de cette démonstration.
 * @returns {void}
 */
export function annuler(reservation) {
  reservation.statut = ANNULEE;
}

~~~


[Fichier JavaScript](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/src/reservations.mjs). JSDoc génère en parallèle une référence navigable. L’inclusion ci-dessus montre le fichier complet, elle n’analyse pas les annotations.

## 8. Des tests qui vérifient les effets

Les tests vérifient les réservations créées, les refus et l’absence d’ajout lorsque la demande échoue.


~~~javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { reserver, annuler } from '../src/reservations.mjs';

test('la dernière place peut être réservée, la demande suivante est refusée', () => {
  const historique = [];
  assert.equal(reserver(historique, {
    personne: 'alice', atelier: 'poterie', capacite: 1
  }).statut, 'confirmee');
  assert.throws(() => reserver(historique, {
    personne: 'bob', atelier: 'poterie', capacite: 1
  }), { message: 'Atelier complet' });
  assert.equal(historique.length, 1);
});

test('une annulation libère la place pour une autre personne', () => {
  const historique = [];
  annuler(reserver(historique, {
    personne: 'alice', atelier: 'poterie', capacite: 1
  }));
  reserver(historique, { personne: 'bob', atelier: 'poterie', capacite: 1 });
  assert.deepEqual(historique.map(r => r.statut), ['annulee', 'confirmee']);
});

test('une même personne ne peut pas réserver à nouveau après annulation', () => {
  const historique = [];
  annuler(reserver(historique, {
    personne: 'alice', atelier: 'poterie', capacite: 1
  }));
  assert.throws(() => reserver(historique, {
    personne: 'alice', atelier: 'poterie', capacite: 1
  }), { message: 'Réservation déjà existante' });
  assert.equal(historique.length, 1);
});

test('les ateliers possèdent des capacités indépendantes', () => {
  const historique = [];
  reserver(historique, { personne: 'alice', atelier: 'poterie', capacite: 1 });
  reserver(historique, { personne: 'alice', atelier: 'dessin', capacite: 1 });
  assert.equal(historique.length, 2);
});

test('une capacité nulle refuse la première réservation', () => {
  assert.throws(() => reserver([], {
    personne: 'alice', atelier: 'poterie', capacite: 0
  }), { message: 'Atelier complet' });
});

test('une demande invalide ne modifie pas l’historique', () => {
  for (const demande of [
    { personne: '', atelier: 'poterie', capacite: 1 },
    { personne: 'alice', atelier: '', capacite: 1 },
    { personne: 'alice', atelier: 'poterie', capacite: -1 },
    { personne: 'alice', atelier: 'poterie', capacite: 1.5 }
  ]) {
    const historique = [];
    assert.throws(() => reserver(historique, demande), { message: 'Demande invalide' });
    assert.equal(historique.length, 0);
  }
});

~~~


[Fichier de tests](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/tests/reservations.test.mjs).

La démonstration npm run demo:regression modifie une copie temporaire. Deux tests échouent, car le contrôle de capacité accepte à tort une demande lorsque toutes les places sont déjà prises.

## 9. Un scénario relié au code


~~~gherkin
# language: fr
Fonctionnalité: Réserver une place à un atelier
  Les participants peuvent réserver une place disponible.
  L'association conserve les annulations et interdit une seconde réservation
  pour la même personne et la même séance, même après annulation.

  Scénario: Réserver la dernière place
    Étant donné un atelier de 1 place
    Quand Alice réserve une place
    Alors sa réservation est confirmée
    Et l'historique contient 1 réservation

  Scénario: Refuser une réservation lorsque l'atelier est complet
    Étant donné un atelier de 1 place
    Et Bob possède une réservation confirmée
    Quand Alice réserve une place
    Alors la demande est refusée avec "Atelier complet"
    Et l'historique contient 1 réservation

  Scénario: Conserver l'interdiction de réserver à nouveau après annulation
    Étant donné un atelier de 1 place
    Et Alice possède une réservation annulée
    Quand Alice réserve une place
    Alors la demande est refusée avec "Réservation déjà existante"
    Et l'historique contient 1 réservation

  Scénario: Libérer la place pour une autre personne
    Étant donné un atelier de 1 place
    Et Bob possède une réservation annulée
    Quand Alice réserve une place
    Alors sa réservation est confirmée
    Et l'historique contient 2 réservations

~~~


[Fichier Gherkin](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/features/reservations.feature).


~~~javascript
import { Before, Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { reserver, annuler } from '../../src/reservations.mjs';

Before(function () {
  this.historique = [];
  this.resultat = undefined;
  this.erreur = undefined;
});

Given('un atelier de {int} place', function (capacite) {
  this.capacite = capacite;
});

Given(/^(Alice|Bob) possède une réservation (confirmée|annulée)$/, function (personne, statut) {
  const reservation = reserver(this.historique, {
    personne, atelier: 'poterie', capacite: this.capacite
  });
  if (statut === 'annulée') annuler(reservation);
});

When('Alice réserve une place', function () {
  try {
    this.resultat = reserver(this.historique, {
      personne: 'Alice', atelier: 'poterie', capacite: this.capacite
    });
  } catch (erreur) {
    this.erreur = erreur;
  }
});

Then('sa réservation est confirmée', function () {
  assert.equal(this.erreur, undefined);
  assert.equal(this.resultat?.statut, 'confirmee');
});

Then('la demande est refusée avec {string}', function (message) {
  assert.equal(this.resultat, undefined);
  assert.equal(this.erreur?.message, message);
});

Then("l'historique contient {int} réservation(s)", function (nombre) {
  assert.equal(this.historique.length, nombre);
});

~~~


[Définitions d’étapes](https://github.com/theopaolo/cours-documentation-web/blob/main/demo/features/steps/reservations.mjs).

La fonction appelée par l’étape est celle utilisée dans le programme. Une assertion indépendante compare son résultat à l’attendu. Le scénario prépare son propre état, afin de pouvoir s’exécuter sans dépendre du précédent.

## Inclure des sources dans MkDocs

Le hook ci-dessous traite uniquement des marqueurs explicites et des chemins autorisés. Pour voir son effet, construire le site et ouvrir cette page. Une source absente ou un chemin non autorisé fait échouer la construction.


~~~python
"""Inclure des exemples explicitement choisis dans la documentation de l'atelier."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCES = {
    "demo/editeur/survol.js": "javascript",
    "demo/editeur/capacite.ts": "typescript",
    "demo/src/reservations.mjs": "javascript",
    "demo/features/reservations.feature": "gherkin",
    "demo/features/steps/reservations.mjs": "javascript",
    "demo/tests/reservations.test.mjs": "javascript",
    "cours-documentation/visuels/c4-contexte.mmd": "text",
    "cours-documentation/visuels/reservations.mcd": "text",
    "cours-documentation/visuels/reservations-erd.mmd": "text",
    "cours-documentation/visuels/adr-annulation.mmd": "text",
    "scripts/mkdocs_hook.py": "python",
}


def on_page_markdown(markdown, **kwargs):
    def include(match):
        name = match.group(1)
        if name not in SOURCES:
            raise ValueError("Source non autorisée pour la documentation : " + name)
        content = (ROOT / name).read_text(encoding="utf-8")
        return "\n~~~" + SOURCES[name] + "\n" + content + "\n~~~\n"

    return re.sub(r"<!-- inclure: ([\w/.-]+) -->", include, markdown)

~~~


[Fichier du hook](https://github.com/theopaolo/cours-documentation-web/blob/main/scripts/mkdocs_hook.py).

Ce petit mécanisme convient à quelques exemples pédagogiques choisis. Une extraction de signatures ou de commentaires de tout un langage demande un analyseur existant, comme JSDoc, TypeDoc ou un gestionnaire mkdocstrings.
