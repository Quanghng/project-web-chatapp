# 🥘 Eatstagram Backend

This is the **backend GraphQL server** for the **EAT Project** – a platform built with **NestJS**, **GraphQL**, **JWT-based authentication**, **CSRF protection**, and **Prisma ORM**. The backend communicates with a PostgreSQL database running in a Docker container.

---

## 📋 Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (>= 18.x)
- **Yarn** or **npm**
- **Docker** & **Docker Compose**
- **PostgreSQL client** (optional, for manual DB inspection)

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Quanghng/graphql-project.git
cd backend
```

### 2. Configure environment variables

Create a `.env` file in the root with the following content:

```env
DATABASE_URL="postgresql://admin:password@localhost:5434/graphproject"
FRONTEND_URL=hhttp://localhost:5174
FRONTEND_DOMAIN=localhost
JWT_ACCESS_TOKEN_SECRET=your_jwt_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
CSRF_SECRET=your_csrf_secret
CSRF_COOKIE_NAME="__Host-dx.x-csrf-token"

# mode de transmission du token d'acces
# false=> le token est attendu dans un header Authorization: BEARER...
# true=> le token est attendu dans un cookie nommé 'jwt' 
TOKEN_COOKIE_MODE=flase
NODE_ENV=development
```

### 3. Start the PostgreSQL container

```bash
npm run db:dev:up
```

This will start a PostgreSQL database accessible at `localhost:5432`.

### 4. Install dependencies

```bash
yarn install
# or
npm install
```

### 5. Generate Prisma client

```bash
npx prisma generate
```

### 6. Apply migrations (optional if schema already exists)

```bash
npx prisma migrate dev --name init
```

### 7. Start the server

```bash
yarn start:dev
# or
npm run start:dev
```

The server will be running at:  
`http://localhost:3333/graphql` for GraphQL  
`http://localhost:3333/api/v1` for REST (Auth + Swagger)

---

## 🚀 API Overview

### GraphQL API (`/graphql`)

#### 📘 User

- `getUser(id: Int!): User`
- `updateUser(inputs: ModifyUserDto!): User`
- `User.threads: [Thread]`

#### 📘 Thread

- `getThreads(): [Thread]`
- `getThread(threadId: Int!): Thread`
- `postThread(inputs: PostThreadDto!): Thread`
- `modifyThread(inputs: ModifyThreadDto!): Thread`
- `deleteThread(threadId: Int!): Thread`
- `likeThread(threadId: Int!): Thread`
- `unlikeThread(threadId: Int!): Thread`
- `Thread.comments: [Comment]`
- `Thread.user: User`

#### 📘 Comment

- `getComments(threadId: Int!): [Comment]`
- `postComment(inputs: PostCommentDto!): Comment`
- `Comment.user: User`

### REST API (`/api/v1/auth`)

| Endpoint         | Method | Description                           | Auth Required |
|------------------|--------|---------------------------------------|---------------|
| `/signup`        | POST   | Register a new user                   | CSRF Token |
| `/signin`        | POST   | Log in and receive JWT + CSRF token   | CSRF Token |
| `/logout`        | POST   | Log out and invalidate token          | Access JWT |
| `/refresh`       | POST   | Refresh tokens securely               | Refresh JWT |

> **Note:** Tokens are issued as HttpOnly cookies. CSRF token protection can be enabled via `CsrfGuard`.

---

## 🛡️ Authentication & Security

- **JWT**: Access and Refresh tokens stored in cookies.
- **CSRF Protection**: Built-in with support for custom guards.
- **Helmet**: Basic HTTP header security.
- **CORS**: Configured for requests from the frontend (`FRONTEND_URL`).
- **ValidationPipe**: Ensures DTOs are validated globally.

---

## 📦 Tech Stack

- **NestJS** with **GraphQL Code First**
- **Prisma** (ORM for PostgreSQL)
- **JWT & Cookie-based Auth**
- **CSRF Guard**
- **DataLoader** for N+1 GraphQL problem
- **Docker** for DB management

---


---

## 🧪 Testing (WIP)

TODO

---
