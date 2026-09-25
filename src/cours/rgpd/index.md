---
title: 'Le RGPD pour les développeur·euses'
order: 7
publishedAt: "2026-09-23"
updatedAt: "2026-09-24"
---

# Le RGPD pour les développeur·euses

Pour un·e développeur·euse, le **R**èglement **G**énéral sur la **P**rotection des **D**onnées (RGPD) fait partie de l’architecture d’un projet, au même titre que les performances, le schéma de base de données, l’API ou le choix de la stack.

Ce cours ne fait pas de vous un·e juriste. Il montre comment concevoir une application qui traite les données personnelles de façon transparente, sécurisée et proportionnée.

Pour un produit d’IA, lisez aussi le chapitre [Repères AI Act et RGPD](./01-reperes-ia-act-rgpd/), avec la pyramide des risques, les rôles et la méthode de classement d’un usage.

Le RGPD part d’un principe : **chaque donnée personnelle doit avoir une raison d’être.**

Pour chaque fonctionnalité, vous devez pouvoir répondre à ces questions :

- Pourquoi cette donnée est-elle collectée ?
- Est-elle nécessaire ?
- Quelle est sa base légale ?
- Qui peut y accéder ?
- Combien de temps est-elle conservée ?
- L’utilisateur peut-il la modifier ou la supprimer ?


**Référence :** RGPD art. 5 : [Principes relatifs au traitement des données personnelles](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre2).

Quand on développe une fonctionnalité, on commence souvent par la base de données :

Créer une table Users → Ajouter une colonne email → Créer un formulaire → Afficher le profil

Le RGPD demande de partir du besoin métier :

L'utilisateur souhaite créer un compte → Le produit doit permettre son authentification → Un traitement de données est nécessaire → L'email est indispensable → La base légale est le contrat → La donnée est stockée en base

**Une même donnée peut avoir plusieurs usages.** Une adresse email sert à l’authentification, à l’envoi des factures et à la newsletter. Chaque usage a sa base légale : contrat, obligation légale et consentement.

### Identifier les données personnelles

Une donnée personnelle est une information qui permet d’identifier une personne, directement ou indirectement.

Exemples :

- Nom
- Prénom
- Adresse e-mail
- Numéro de téléphone
- Adresse IP
- Cookie d’identification
- Photo
- Adresse postale
- Identifiant utilisateur
- Localisation GPS

Une combinaison d’informations (par exemple ville + date de naissance + profession) peut aussi identifier une personne.

Dès qu’une application traite ce type d’information, le RGPD s’applique.


**Références**

RGPD art. 4 [(Définition des données personnelles)](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre1#Article4)

CNIL - [Qu’est-ce qu’une donnée personnelle ?](https://www.cnil.fr/fr/definition/donnee-personnelle)

France num - [Qu’est-ce qu’une donnée personnelle ?](https://www.francenum.gouv.fr/formations/rgpd-quest-ce-quune-donnee-personnelle)

### Lister les fonctionnalités

Par exemple :

- Création d’un compte
- Authentification
- Paiement
- Newsletter
- Support
- Statistiques
- Journalisation
- Notifications

Chaque fonctionnalité devient un traitement.

### Décrire le traitement

Pour chaque traitement, répondez aux mêmes questions.

| **Question** | **Exemple** |
| --- | --- |
| Pourquoi existe-t-il ? | Permettre la connexion |
| Qui est concerné ? | Les utilisateurs inscrits |
| Quelles données ? | Email, mot de passe |
| Qui y accède ? | Utilisateur + administrateur |
| Combien de temps ? | Jusqu’à suppression du compte |

### Justifier chaque donnée collectée

| **Donnée** | **Obligatoire** | **Pourquoi ?** |
| --- | --- | --- |
| Email | Oui | Connexion |
| Nom | Oui | Personnalisation |
| Prénom | Oui | Personnalisation |
| Mot de passe (hashé) | Oui | Authentification |
| Avatar | Non | Personnalisation |

_Une donnée sans usage défini ne se collecte pas._


**Références**

- RGPD art. 5.1.c - [Principe de minimisation](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre2#Article5)
- CNIL - [Minimisation des données](https://www.cnil.fr/fr/minimiser-les-donnees-collectees)

### Choisir la bonne base légale

Appliquer le RGPD ne veut pas dire demander le consentement pour tout. Le consentement est **une** des six bases légales prévues par l’article 6. Une application web en utilise surtout quatre :

| **Base légale** | **Quand l’utiliser ?** |
| --- | --- |
| Contrat | Fournir le service demandé |
| Consentement | Newsletter, marketing, options facultatives |
| Obligation légale | Facturation, comptabilité |
| Intérêt légitime | Sécurité, lutte contre la fraude |

Exemples :

| **Traitement** | **Base légale** | **Consentement ?** |
| --- | --- | --- |
| Création du compte | Contrat | ❌ Non |
| Paiement d’un abonnement | Contrat | ❌ Non |
| Envoi d’une facture | Contrat + obligation légale | ❌ Non |
| Conservation des factures | Obligation légale | ❌ Non |
| Newsletter | Consentement | ✅ Oui |
| Publicité ciblée | Consentement | ✅ Oui |

Créer un compte revient à conclure un contrat. Les données strictement nécessaires à ce contrat (adresse email, mot de passe, abonnement…) n’ont pas besoin d’un consentement séparé.


**Références**

- [RGPD art. 6](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre2#Article6)

- CNIL : [Les bases légales](https://www.cnil.fr/fr/les-bases-legales)
- CNIL : [Le contrat](https://www.cnil.fr/fr/les-bases-legales/contrat)
- CNIL : [Le consentement](https://www.cnil.fr/fr/les-bases-legales/consentement)

### Définir une durée de conservation

Chaque donnée a une durée de conservation.

| **Traitement** | **Donnée** | **Base légale** | **Durée** |
| --- | --- | --- | --- |
| Compte | Email | Contrat | Jusqu’à suppression du compte |
| Paiement | Historique | Contrat + obligation légale | 10 ans |
| Newsletter | Email | Consentement | Jusqu’au retrait du consentement |

Aucune donnée ne se conserve « pour toujours » sans justification.


**Références**

- RGPD art. 5.1.e, [Limitation de la conservation](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre2#Article5)
- CNIL : [Durées de conservation](https://www.cnil.fr/fr/passer-laction/les-durees-de-conservation-des-donnees)

### Prévoir les droits des utilisateurs

Une personne doit pouvoir, sans démarche compliquée :

- consulter ses données
- modifier ses données
- télécharger ses données
- supprimer son compte
- retirer son consentement
- contacter le responsable du traitement.

La plupart de ces droits deviennent des endpoints de l’API :

```plaintext
GET    /me
PATCH  /me
GET    /me/export
DELETE /me
POST   /newsletter/unsubscribe
```


**Références**

- RGPD [art. 12 à 23](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre3)
- CNIL - [Les droits des personnes](https://www.cnil.fr/fr/respecter-les-droits-des-personnes/repondre-aux-demandes-dexercice-des-droits)
- **Guide pratique durées de conservation**

### Et ensuite ?

Avec les réponses à ces questions, vous pouvez produire :

- le registre des traitements (modèle CNIL) ;
- la politique de confidentialité ;
- les mentions d’information ;
- la checklist Privacy by Design ;
- les besoins techniques (API, base de données, durées de rétention, suppression).

## Exemple de cartographie des traitements

| **Fonctionnalité** | **Traitement** | **Données** | **Base légale** | **Durée** | **Obligatoire** | **Modifiable** | **Suppression** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Création de compte | Créer un utilisateur | Email | Contrat | Jusqu’à suppression du compte | ✅   | ✅   | ✅   |
| Création de compte | Authentification | Mot de passe (hash) | Contrat | Jusqu’à suppression | ✅   | Oui (changer le mot de passe) | ✅   |
| Profil | Personnalisation | Nom | Contrat | Jusqu’à suppression | ✅   | ✅   | ✅   |
| Profil | Personnalisation | Prénom | Contrat | Jusqu’à suppression | ✅   | ✅   | ✅   |
| Profil | Avatar | Avatar | Consentement / Contrat\* | Jusqu’à suppression | ❌   | ✅   | ✅   |
| Paiement | Facturation | Adresse | Contrat | 10 ans | ✅   | Oui tant que facture non émise | Non avant délai légal |
| Paiement | Historique d’abonnement | Date d’achat | Contrat + obligation légale | 10 ans | ✅   | ❌   | Non avant délai |
| Paiement | Facture | Nom + adresse | Obligation légale | 10 ans | ✅   | Non après émission | Non avant délai |
| Newsletter | Envoi d’emails | Email | Consentement | Jusqu’au retrait | ❌   | —   | ✅   |
| Sécurité | Logs de connexion | IP  | Intérêt légitime | 6 mois (à adapter) | Automatique | ❌   | Suppression automatique |
| Support | Répondre aux demandes | Email + contenu | Contrat / intérêt légitime | Durée du support + archivage | ❌   | Non | Oui selon contexte |

## Côté BDD

| **Table** | **Colonne** | **Donnée personnelle ?** | **Pourquoi ?** | **Traitement** |
| --- | --- | --- | --- | --- |
| users | id  | ✅   | Identifiant technique, rattaché à une personne | Compte |
| users | email | ✅   | Connexion | Compte |
| users | first_name | ✅   | Affichage | Profil |
| users | last_name | ✅   | Affichage | Profil |
| users | password_hash | ✅   | Authentification | Compte |
| users | avatar_url | ✅   | Profil | Profil |
| users | created_at | ⚠️ Oui | Audit | Compte |
| subscriptions | started_at | ⚠️ Oui | Historique | Abonnement |
| invoices | billing_address | ✅   | Facturation | Paiement |

## Quand l’utilisateur clique sur « Supprimer mon compte »

| **Élément** | **Action** |
| --- | --- |
| Profil | Supprimé |
| Avatar | Supprimé |
| Préférences | Supprimées |
| Palettes publiques | Anonymisées ou supprimées selon le choix du produit |
| Historique de paiement | Conservé |
| Factures | Conservées |
| Logs | Purge automatique après la durée prévue |

### Fiche par fonctionnalité

**Finalité :**

**Base légale :**

**Durée de conservation :**

**Peut être modifiée ? :**

**Peut être supprimée ? :**

**Qui y a accès ? :**

**Références RGPD / CNIL :**
