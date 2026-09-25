---
title: 'Docker Cheat-Sheet'
order: 3
publishedAt: "2026-09-23"
updatedAt: "2026-09-24"
---

# Docker Cheat-Sheet

## Modèle mental

- `Dockerfile` → décrit comment construire une **image**
- `Image` → environnement exécutable immuable contenant l’application et ses dépendances
- `Container` → instance en cours d’exécution d’une image
- `Docker Compose` → orchestre plusieurs services et conteneurs
- `Volume` → conserve ou partage des données en dehors du cycle de vie d’un conteneur
- `Registry` → stocke et distribue les images Docker
- `Git` → stocke et versionne le code source  
    

Une même image peut lancer plusieurs conteneurs avec des commandes différentes :

```plaintext
image API
├── api      → uvicorn app.main:app
├── migrate  → alembic upgrade head
└── worker   → python worker.py
```

---

# État de Docker

```bash
docker --version

docker info        # daemon, drivers, stockage...
docker ps          # conteneurs actifs
docker ps -a       # tous les conteneurs
docker images      # images locales
docker stats       # CPU / mémoire en direct
docker system df   # occupation disque Docker
```

---

# Images

## Build

```bash
# Dockerfile dans le dossier courant
docker build -t app:1.0 .

# Contexte ./app
docker build -t app:1.0 ./app

# Dockerfile spécifique
docker build -t app:1.0 -f app/Dockerfile .

# Sans cache
docker build --no-cache -t app:1.1 .

# Met à jour l'image de base
docker build --pull -t app:1.1 .
```

`-t` signifie **tag** :

```text
app:1.0
│   └── version/tag
└────── nom de l'image
```

Une image est immuable : un nouveau build produit une nouvelle image.

En développement, un **bind mount** permet cependant de modifier le code sans rebuild.

## Pull / suppression

```bash
docker pull nginx:alpine
docker image rm app:1.0
docker image prune
```

---

# Conteneurs

```bash
docker run -d \
  --name web \
  -p 8080:80 \
  nginx:alpine
```

```text
-d              arrière-plan
--name web      nom du conteneur
-p 8080:80      HOST:CONTAINER
-e VAR=value    variable d'environnement
-v SRC:DEST     volume / bind mount
--rm            supprime après arrêt
-it             terminal interactif
```

Exemple éphémère :

```bash
docker run --rm -it alpine sh
```

Arrêter / supprimer :

```bash
docker stop web
docker rm web
docker rm -f web
```

---

# Logs & debug

```bash
docker logs web
docker logs --tail 100 -f web
docker exec -it web sh
docker top web
docker port web
```

`docker exec` exécute une commande **dans un conteneur déjà lancé**.

---

# Ports

```bash
docker run -p 8080:80 nginx
```

signifie :

```text
machine hôte       conteneur
localhost:8080  →  :80
```

Dans Compose :

```yaml
ports:
  - "8080:80"
```

Attention :

```dockerfile
EXPOSE 80
```

documente le port attendu par l'image, mais **ne publie pas le port sur l'hôte**.

---

# Réseau Docker Compose

Compose crée automatiquement un réseau `default`.

Les services peuvent se joindre par leur **nom de service**.

```yaml
services:
  api:
    # ...

  db:
    image: postgres:16
```

Depuis `api` :

```text
db:5432
```

désigne PostgreSQL.

Exemple :

```text
postgresql://user:password@db:5432/app
```

## Attention à localhost

Depuis votre ordinateur :

```text
localhost = votre ordinateur
```

Depuis un conteneur :

```text
localhost = ce conteneur lui-même
```

Donc depuis `api` :  
on ne fait pas : `localhost:5432`  
mais on indique le service : `db:5432`

---

# Volumes

Les conteneurs sont considérés comme remplaçables.

Sans volume, leurs données disparaissent lorsque le conteneur est supprimé.

## Volume nommé

```yaml
services:
  db:
    image: postgres:16

    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

```text
Postgres
    │
    ▼
db_data
```

`db_data` survit à la suppression/recréation du conteneur.

Typiquement utilisé pour :

- bases de données ;
- uploads ;
- fichiers utilisateurs ;
- données applicatives persistantes.

## Bind mount

```yaml
volumes:
  - ./src:/app/src
```

```text
machine hôte       conteneur
./src           ↔  /app/src
```

Utilisé surtout en développement pour avoir :

```text
modification IDE
      ↓
fichier modifié dans le conteneur
      ↓
hot reload
```

### Résumé

| Type | Usage |
| --- | --- |
| bind mount | partager des fichiers avec l'hôte |
| volume | persister des données Docker |

---

# Node et `node_modules`

Éviter de monter les `node_modules` macOS/Windows dans Linux :

```yaml
volumes:
  - .:/app
  - /app/node_modules
```

Le code vient de l'hôte, mais `/app/node_modules` reste propre au conteneur Linux.

---

# Docker Compose

```bash
docker compose up
docker compose up -d
docker compose up -d --build
docker compose ps
docker compose logs -f
docker compose logs -f api
docker compose exec api sh
docker compose restart api
docker compose down
```

Cibler un service :

```bash
docker compose up -d --build api
```

Voir la configuration réellement résolue :

```bash
docker compose config
```

Pour vérifier :

- variables ;
- anchors ;
- extensions ;
- includes ;
- fichiers Compose combinés.

---

# `depends_on`

## Simple

```yaml
api:
  depends_on:
    - db
```

Garantit l'ordre de démarrage, mais pas que PostgreSQL soit prêt.

## Avec healthcheck

```yaml
db:
  image: postgres:16

  healthcheck:
    test:
      - CMD-SHELL
      - pg_isready -U postgres
    interval: 5s
    timeout: 5s
    retries: 10
```

Puis :

```yaml
api:
  depends_on:
    db:
      condition: service_healthy
```

```text
db démarre
   ↓
healthcheck OK
   ↓
api démarre
```

Pour une tâche ponctuelle :

```yaml
api:
  depends_on:
    migrate:
      condition: service_completed_successfully
```

```text
db healthy
   ↓
migrate
   ↓ exit 0
api
```

---

# Variables d'environnement

```yaml
environment:
  PORT: 3000
  DATABASE_URL: ${DATABASE_URL}
```

Valeur par défaut :

```yaml
PORT: ${PORT:-3000}
```

Variable obligatoire :

```yaml
SECRET_KEY: ${SECRET_KEY:?SECRET_KEY is required}
```

Dans Node :

```js
process.env.PORT
```

Dans Python :

```python
os.environ["PORT"]
```

---

# Secrets

Éviter :

```yaml
SECRET_KEY: mon-super-secret
```

dans un fichier versionné.

En développement :

```text
.env
```

gitignored :

```gitignore
.env
.env.*
```

et `.dockerignore` :

```dockerignore
.env
.env.*
```

Puis :

```yaml
environment:
  SECRET_KEY: ${SECRET_KEY}
```

## Docker secrets

```yaml
services:
  api:
    secrets:
      - auth_secret

secrets:
  auth_secret:
    file: ./secrets/auth_secret
```

Disponible dans :

```text
/run/secrets/auth_secret
```

Attention : un Docker Secret est généralement exposé comme **fichier**, pas automatiquement comme variable d'environnement.

---

# Extensions / anchors Compose

Pour éviter de dupliquer :

```yaml
x-api: &api
  build: .
  environment:
    DATABASE_URL: ${DATABASE_URL}

services:
  migrate:
    <<: *api
    command: python manage.py migrate

  api:
    <<: *api
    command: python manage.py runserver
```

```text
x-api
├── migrate
└── api
```

`x-*` : extension Compose.

`&api` : crée une anchor YAML.

`*api` : réutilise l'anchor.

`<<:` : fusionne la configuration.

---

# Multi-stage Dockerfile

Un **seul Dockerfile** peut contenir plusieurs stages.

```dockerfile
# ----- base -----

FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app

# ----- dev -----

FROM base AS dev
COPY requirements-dev.txt .

RUN pip install \
    --no-cache-dir \
    -r requirements-dev.txt

COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# ----- builder -----
FROM base AS builder
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev
COPY requirements.txt .
RUN pip wheel \
    --wheel-dir /wheels \
    -r requirements.txt


# ----- production -----

FROM base AS production
COPY --from=builder /wheels /wheels
RUN pip install \
    --no-cache-dir \
    /wheels/*
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Relation :

```text
base
├── dev
└── builder
      ↓
  production
```

En développement :

```yaml
build:
  context: .
  target: dev
```

Pour staging / production :

```bash
docker build \
  --target production \
  -t app:abc123 \
  .
```

Important :

```text
DEV
→ image target dev

STAGING
→ image target production

PRODUCTION
→ même image target production
```

Staging n'a normalement **pas besoin de son propre stage Docker**.

---

# Registry

Un registry stocke les images Docker.

Exemples :

- Docker Hub ;
- GitHub Container Registry ;
- Forgejo Container Registry ;
- GitLab Registry.

Login :

```bash
docker login git.example.org
```

Tag :

```bash
docker tag app:1.0 \
  git.example.org/theo/app:1.0
```

Push :

```bash
docker push \
  git.example.org/theo/app:1.0
```

Pull :

```bash
docker pull \
  git.example.org/theo/app:1.0
```

---

# Git → Registry → Deploy

Pattern recommandé :

```text
Git commit abc123
        ↓
      tests
        ↓
docker build
        ↓
app:abc123
        ↓
    Registry
      ↙   ↘
 staging  production
```

Principe :

> **Build once, deploy many.**

Staging et production utilisent idéalement **exactement la même image**.

Ce qui change :

```text
configuration
secrets
URL
base de données
ressources
```

Pas le code ni l'image.

---

# Nettoyage

```bash
docker container prune
docker image prune
docker network prune
docker volume prune
```

Nettoyage global :

```bash
docker system prune
```

Plus agressif :

```bash
docker system prune -a
```

Les volumes ne sont **pas supprimés par défaut**.

Pour les inclure :

```bash
docker system prune --volumes
```

⚠️ À utiliser avec précaution.

Avec Compose :

```bash
docker compose down
```

supprime les conteneurs et réseaux du projet mais conserve les volumes nommés.

```bash
docker compose down -v
```

supprime aussi les volumes.

Pour PostgreSQL, cela peut signifier :

```text
base de données supprimée
```

---

# Rappels mentaux

- **Image ≠ conteneur** : l'image est le modèle, le conteneur son instance.
- Les conteneurs doivent être considérés comme **remplaçables**.
- Les données importantes vont dans des **volumes** ou services externes.
- `EXPOSE` documente ; `ports` / `-p` publient.
- Entre conteneurs Compose, utiliser `db:5432`, pas une IP.
- `localhost` dans un conteneur désigne ce conteneur.
- Un conteneur devrait généralement avoir **une responsabilité principale**.
- Une même image peut servir à `api`, `migrate`, `worker`, etc.
- Un Dockerfile multi-stage peut produire une image `dev` et une image `production`.
- **Staging et production devraient idéalement utiliser la même image.**
- Dockeriser dépend surtout du **runtime et de la plateforme de déploiement**.
