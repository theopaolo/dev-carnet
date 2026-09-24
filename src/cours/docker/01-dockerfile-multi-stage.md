---
title: 'Dockerfile multi-stage'
order: 1
---

# Dockerfile multi-stage

Un Dockerfile multi-stage déclare plusieurs étapes (stages) dans un seul fichier. Chaque environnement construit l’étape dont il a besoin.

## Exemple Python (FastAPI)

```dockerfile
# ---------- Base commune ----------
FROM python:3.12-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app


# ---------- Développement ----------
FROM base AS dev
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements-dev.txt .
RUN pip install --no-cache-dir -r requirements-dev.txt
COPY . .
CMD ["uvicorn","app.main:app","--host","0.0.0.0","--port","8000","--reload"]


# ---------- Build des dépendances ----------
FROM base AS builder
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip wheel \
    --no-cache-dir \
    --wheel-dir /wheels \
    -r requirements.txt


# ---------- Production ----------
FROM base AS production
COPY --from=builder /wheels /wheels
RUN pip install \
    --no-cache-dir \
    /wheels/* \
    && rm -rf /wheels

COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```mermaid
flowchart TD
    Base["base<br/>Python + config commune"]

    Base --> Dev["dev<br/>outils dev + reload"]

    Base --> Builder["builder<br/>gcc + libpq-dev<br/>compile les dépendances"]

    Builder --> Production["production<br/>runtime minimal"]

    Dev --> Local["Développement local"]
    Production --> Staging["Staging"]
    Production --> Prod["Production"]
```

`builder` ne se déploie pas. C’est une étape intermédiaire qui compile les dépendances en wheels.

En local, Compose demande un stage précis avec `target` :

```
services:
  api:
    build:
      context: .
      target: dev
```

Docker construit alors jusqu’au stage `dev`, qui lance Uvicorn avec `--reload`.

## Exemple Node : le Dockerfile en un seul stage

```dockerfile
FROM node:24
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

Ce Dockerfile fonctionne, mais l’image finale embarque des outils inutiles en production :

- TypeScript ;
- Vite ;
- ESLint ;
- Vitest ;
- fichiers source ;
- outils de build ;
- `devDependencies`.

Le multi-stage découpe ce fichier en étapes spécialisées.

## Stage `base`

```dockerfile
FROM node:24-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
```

`base` contient ce que les autres stages partagent : Node.js, le dossier de travail et les fichiers `package.json`.

## Stage `dev`

```dockerfile
FROM base AS dev
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
```

Cette image peut contenir :

- dépendances de développement ;
- TypeScript ;
- Vite ;
- hot reload ;
- code source ;
- outils de debug.

Compose sélectionne ce stage avec `target` :

```yaml
build:
  context: .
  target: dev
```

## Stage `build`

```
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build
```

Ce stage compile les sources TypeScript dans `dist/`. Il ne fait rien d’autre.

## Stage `production`

```dockerfile
FROM node:24-alpine AS production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
CMD ["node", "dist/server.js"]
```

La ligne qui compte :

```dockerfile
COPY --from=build /app/dist ./dist
```

Elle copie seulement le résultat du stage `build`.

```mermaid
flowchart TD
    Base["base"]

    Base --> Dev["dev"]
    Base --> Build["build"]

    Build -->|"COPY --from=build"| Production["production"]

    Dev --> DevInfo["sources<br/>devDependencies<br/>Vite<br/>tests"]

    Production --> ProdInfo["dist/<br/>prod dependencies<br/>runtime"]
```

L’image de production n’a donc pas besoin de contenir :

- les tests ;
- ESLint ;
- Vite ;
- TypeScript ;
- les outils de build ;
- les devDependencies.

Résultat :

- des images plus petites ;
- moins de surface d’attaque ;
- des démarrages et transferts plus rapides ;
- une séparation claire entre build et runtime.
