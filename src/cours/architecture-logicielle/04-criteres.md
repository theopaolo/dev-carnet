---
title: 'Critères d’un choix technique'
order: 4
publishedAt: "2026-09-23"
updatedAt: "2026-09-24"
---

# Les critères d'un choix technique

Compare les options à partir de critères définis avant l'évaluation. Sinon, il devient facile d'adapter les critères à l'option que l'on préfère déjà.

## Les critères les plus communs

**Maintenabilité.** Dans six mois, quelqu'un d'autre pourra-t-il comprendre, corriger et faire évoluer ce choix ? La techno est-elle documentée ? L'équipe la connaît-elle ? Trouve-t-on des réponses quand on cherche une erreur ?

**Complexité.** Compte les services, les dépendances et les couches que l'option ajoute. Chacun demande de la configuration, du suivi et des connaissances pour diagnostiquer une panne. Ce coût apparaît à chaque correction et à chaque évolution du projet.

**Évolutivité (scaling).** Estime la charge réaliste et son évolution. Dimensionner un outil pour une charge très supérieure aux prévisions ajoute des coûts sans répondre au besoin actuel. Demande quelle charge l'option supporte et combien coûterait une migration si cette limite était dépassée.

**Délai et coût.** Intègre le temps d'apprentissage, l'implémentation, l'hébergement et les licences. Une technologie inconnue de l'équipe peut coûter plus cher qu'une option déjà maîtrisée, même si elle obtient de meilleurs résultats sur un autre critère.

**Réversibilité.** Évalue le travail nécessaire pour changer d'option : migration des données, adaptation du code, formation et interruption de service. Une décision facile à inverser peut être testée rapidement. Une décision coûteuse à inverser mérite une comparaison documentée dans un ADR.

**Maturité de la solution.** La simplicité et la maturité sont deux critères distincts. Une solution récente peut être simple. Une solution ancienne peut accumuler de nombreuses options et demander davantage de configuration.

Pour évaluer la maturité, regarde la fréquence des versions, la durée de support, le traitement des failles, le nombre de mainteneurs actifs et la stabilité des interfaces. Pour évaluer la simplicité, compte les composants, les configurations et les connaissances nécessaires à l'exploitation.

**Sécurité.** Vérifie les recommandations auprès des organismes et spécifications concernés, puis contrôle leur date. Consulte par exemple OWASP, les avis de sécurité associés aux CVE et les RFC. Pour le stockage des mots de passe, la [fiche OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) recommande Argon2id pour une nouvelle application et réserve bcrypt aux systèmes anciens où Argon2 et scrypt ne sont pas disponibles.

**Observabilité.** Détermine ce que l'équipe doit pouvoir expliquer pendant un incident. Les journaux, métriques et traces doivent permettre de relier une erreur à une requête, d'identifier le composant concerné et de mesurer la durée du problème. Collecter des données sans question opérationnelle produit du volume sans aider au diagnostic.

**Testabilité.** Évalue la possibilité de tester les règles métier sans dépendre d'un réseau ou d'un service tiers, la durée de la suite de tests et la reproductibilité des environnements. Une architecture difficile à isoler ralentit la détection des régressions.

**Interopérabilité.** Liste les systèmes qui échangent des données, les formats, les protocoles et les règles de version. Un contrat d'API doit préciser comment un consommateur ancien réagit lorsqu'un champ ou une opération change.

## Critères de contexte et de valeurs

Certains projets ajoutent des critères liés aux droits d'usage, à l'organisation qui maintient le produit ou au lieu d'hébergement des données.

**Licence.** La licence définit les droits d'utilisation, de modification et de redistribution. Vérifie aussi les conditions commerciales, l'accès au code source et les possibilités d'export. Ces éléments déterminent ce que le client pourra faire si l'éditeur arrête le produit ou change ses tarifs.

**Gouvernance et santé du projet.** Identifie qui maintient la technologie : une entreprise, une fondation ou une communauté. La popularité passée ne suffit pas. Regarde la fréquence des versions, le traitement des signalements de sécurité, le nombre de mainteneurs actifs, les règles de gouvernance et la politique de compatibilité. Une dépendance tenue par une seule personne ou qui rompt souvent son API augmente le travail de suivi et de migration.

**Souveraineté.** Demande où sont stockées les données, quelle juridiction s'applique, comment les exporter et qui peut couper le service. Pour des données personnelles ou de santé, la réglementation et le contrat peuvent imposer des conditions d'hébergement supplémentaires. Prévoir la sortie dès le choix initial permet d'estimer le format d'export, le délai et le coût d'une migration.

**Dépendances.** Chaque dépendance ajoute du code à auditer, des mises à jour à suivre et une API susceptible d'évoluer. Par exemple, le `fetch` natif suffit pour de nombreux appels HTTP simples dans les navigateurs modernes. Dans ce cas, ajouter Axios introduit une dépendance sans apporter de capacité nécessaire. Axios reste pertinent si le projet a besoin de ses fonctions propres ou doit prendre en charge des environnements que `fetch` ne couvre pas.

## Éliminer les options incompatibles puis comparer

Une contrainte élimine une option. Un critère sert ensuite à comparer les options restantes.

1.  Liste les contraintes et retire les options qui ne les respectent pas.
2.  Choisis quatre à six critères qui correspondent au projet.
3.  Attribue leur poids avant d'évaluer les options.
4.  Définis une même échelle de notation pour toutes les options.
5.  Ajoute la source de chaque note ou marque-la comme hypothèse.
6.  Modifie un poids à la fois pour vérifier si le résultat dépend d'un seul jugement fragile.

Voici une grille d'exercice pour un outil associatif de réservation de salles. Les deux options respectent deux contraintes posées avant la comparaison : hébergement dans l'Union européenne et export complet des réservations. Les poids vont de 1 à 3. Les notes vont de 1, résultat défavorable, à 5, résultat favorable.

| Critère | Poids | SaaS, note | SaaS, résultat | Auto-hébergé, note | Auto-hébergé, résultat |
| --- | --- | --- | --- | --- | --- |
| Délai de mise en route | 3   | 5   | 15  | 2   | 6   |
| Exploitation technique | 3   | 5   | 15  | 2   | 6   |
| Coût estimé sur 3 ans | 2   | 2   | 4   | 4   | 8   |
| Souveraineté des données | 3   | 2   | 6   | 5   | 15  |
| Réversibilité | 2   | 3   | 6   | 5   | 10  |
| Total |     |     | 46  |     | 45  |

Dans cet exemple, le SaaS réduit le délai de mise en route et le besoin de compétences internes. L'option auto-hébergée donne davantage de contrôle sur les données, réduit le coût estimé sur trois ans et facilite la migration. Un point d'écart sépare les deux totaux : passer le poids du coût de 2 à 3 suffit à inverser le résultat. Ce genre d'écart se tranche avec le client, pas avec la grille. L'ADR conserve la comparaison et la raison du choix.

## Évaluer aussi le coût des critères de valeur

Un critère de valeur doit être évalué comme les autres. Une option auto-hébergée et limitée en dépendances peut demander plus de temps, des compétences internes et davantage d'exploitation. Inscris ces coûts dans la comparaison afin que la décision reste révisable si le contexte change.

## Ressources

- Software Engineering Institute, [Deriving Architectural Tactics: A Step Toward Methodical Architectural Design](https://www.sei.cmu.edu/documents/704/2003_005_001_14213.pdf), annexe sur les scénarios de qualité.
- ISO, [ISO/IEC 25010:2023](https://www.iso.org/standard/78176.html), modèle de qualité des produits logiciels et systèmes informatiques.
