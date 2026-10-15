---
title: 'Fiche enseignant'
order: 11
publishedAt: "2026-10-15"
updatedAt: "2026-10-15"
---

# Fiche enseignant

Cette fiche est publique. Elle aide à conduire le module avec les mêmes supports que les apprenant·es. Le résultat attendu est une décision expliquée avec un schéma compréhensible, pas l'utilisation des six patterns.

## Préparer

Exécuter le [point de départ](/poo-patterns-frameworks/10-exercice/) avant la séance. Prévoir un espace de dessin partagé et ouvrir les [trois situations](/poo-patterns-frameworks/09-situations/). Révéler les contraintes progressivement. Les fiches de référence restent consultables pendant les échanges.

## Conduire J1

Le matin, demander « L'architecture est-elle bonne ? » avant de donner les changements. Faire préciser selon quelles contraintes. Exécuter le programme, lire ses assertions et dessiner ses responsabilités. Introduire ensuite les tarifs variables. Faire comparer une condition locale et une règle fournie à la réservation.

L'après-midi, révéler le fournisseur externe puis les notifications multiples. Un groupe présente son dessin, un autre joue la panne. Demander « Qu'est-ce qui a déjà réussi quand l'erreur arrive ? » Terminer chaque situation discutée par un mini ADR. Une petite extraction de fonction suffit si le groupe souhaite coder.

## Conduire J2

Le matin, reprendre la troisième situation avec une interface des places. Faire jouer physiquement les rôles événement, action, état, notification et rendu. Dessiner le cycle puis écrire quelques signatures d'API. Demander « Qui appelle votre code, et quand ? » pour faire apparaître l'inversion de contrôle.

L'après-midi, simuler un clic, une erreur et le retrait de la vue. Chercher qui retire chaque abonnement et chaque écouteur DOM. Coder éventuellement le store ou le montage, puis faire expliquer le résultat à un autre groupe. Garder un moment de restitution avant 16h.

## Observer et adapter

Observer si le groupe relie chaque abstraction à un besoin, distingue contrat et implémentation, représente les erreurs et nomme un coût. Demander « Quel changement devient plus simple ? » puis « Quel code devient plus difficile à suivre ? »

Si le temps manque, approfondir une alternative par situation et garder les mécanismes en schémas. Si TypeScript bloque, lire l'exemple ensemble sans demander sa réécriture. Si le groupe avance vite, faire varier un contrat existant, sans ajouter de routeur ou de framework complet.

Les pistes possibles sont une fonction Strategy pour le prix, un Adapter pour le format externe et des abonnements Observer pour les vues. Des appels explicites peuvent aussi être un bon choix. Repository et Decorator servent surtout à discuter les garanties et l'ordre des opérations. Ne pas distribuer de corrigé unique avant le débat.
