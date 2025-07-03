# 🥘 **le projet ChatApp – Fullstack Application**  

This application consists of two main parts:
- **Backend**: 
- **Frontend**: 

---

## 📋 Prerequisites

Before setting up the full application, ensure you have the following installed on your machine:

- Node.js (>= 18.x)
- Yarn or npm
- Docker & Docker Compose
- PostgreSQL client (optional)
- Git

---

# Comment démarrer le projet ChatApp

### Configuration des fichiers `.env`

#### À la racine du projet (`.env`) :

```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=password
POSTGRES_DB=chatapp
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

RABBITMQ_USER=admin
RABBITMQ_PASSWORD=password
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672

REDIS_HOST=redis
REDIS_PORT=6379
```

#### Dans `backend/.env` :

```env
DATABASE_URL="postgresql://admin:password@postgres:5432/graphproject"
FRONTEND_URL=http://localhost
FRONTEND_DOMAIN=localhost
JWT_ACCESS_TOKEN_SECRET=your_jwt_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
CSRF_SECRET=your_csrf_secret
CSRF_COOKIE_NAME="__Host-dx.x-csrf-token"

TOKEN_COOKIE_MODE=false
NODE_ENV=development

RABBITMQ_URL=amqp://admin:password@rabbitmq:5672
RABBITMQ_USER=admin
RABBITMQ_PASSWORD=password
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672

REDIS_HOST=redis
REDIS_PORT=6379

POSTGRES_USER=admin
POSTGRES_PASSWORD=password
POSTGRES_DB=chatapp
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
```

---

### Démarrage du projet complet

Depuis le dossier **`project-web-chatapp/`** :

#### 1. Construire et démarrer tous les services en arrière-plan :

```bash
docker compose up -d --build
```

Cette commande lance :
- le back-end (NestJS)
- le front-end
- la base de données Postgres
- RabbitMQ
- Redis

#### 2. Exécuter les migrations Prisma dans le conteneur NestJS :

```bash
docker compose exec nestjs sh
```

Dans le conteneur NestJS, exécuter :

```bash
npx prisma migrate dev --name init
```

Puis quitter le conteneur :

```bash
exit
```

#### 3. Si le front-end ne s'est pas lancé automatiquement, lancer-le manuellement :

```bash
docker compose up -d frontend
```

---

Une fois ces étapes terminées, l'application est disponible sur :

```
http://localhost
```

---

