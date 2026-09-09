# Blog API

A full-stack blogging platform built with React, Express, PostgreSQL, Prisma, and JWT authentication.

The project is split into three applications:

- **Reader** — public-facing blog where users can read posts and interact with comments.
- **Dashboard** — authenticated author interface for creating and managing posts.
- **Server** — REST API responsible for authentication, authorization, posts, comments, and persistence.

Built as part of [The Odin Project](https://www.theodinproject.com/) NodeJS curriculum.

## Live Demo

- **Reader:** [Live Reader](https://blog-api-one-lyart.vercel.app/)
- **Author Dashboard:** [Live Dashboard](https://blog-api-dashboard-self.vercel.app/)

> Accounts created through the Reader can also be used to sign into the Dashboard.

## Features

### Reader

- View all published posts
- View individual posts and their comments
- Create an account and log in
- Create comments on published posts
- Edit and delete your own comments
- Log out
- Posts remain readable if their author deletes their account

### Author Dashboard

- Log in using an existing account
- View your published posts and drafts
- Create new drafts
- Edit existing posts
- Publish and unpublish posts
- Delete posts
- Delete your account
- Confirmation prompts for destructive actions

### Backend

- REST API built with Express
- PostgreSQL database accessed through Prisma ORM
- JWT-based authentication
- Password hashing with bcrypt
- Request validation with express-validator
- Route-level authentication middleware
- Ownership checks for posts and comments
- Public/private separation between published posts and drafts
- CORS configuration for separate reader and dashboard frontends

## Tech Stack

### Frontend

- React
- React Router
- Vite
- CSS

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- bcryptjs
- express-validator

### Deployment

- **Reader:** Vercel
- **Dashboard:** Vercel
- **API:** Render
- **Database:** Neon PostgreSQL

## Project Structure

```text
blog-api/
├── server/
│   ├── controllers/
│   ├── generated/
│   ├── lib/
│   │   └── prisma.js
│   ├── middleware/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   └── prisma.config.js
│
├── reader/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vercel.json
│
├── dashboard/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vercel.json
│
└── README.md
```

## Architecture

```text
                  ┌─────────────────┐
                  │     Reader      │
                  │     React       │
                  └────────┬────────┘
                           │
                           │ HTTP / JSON
                           │
┌─────────────────┐        ▼
│    Dashboard    │ ──► Express REST API
│      React      │        │
└─────────────────┘        │
                           │ Prisma
                           ▼
                    PostgreSQL / Neon
```

Both frontends communicate with the same REST API.

The Reader exposes public blog functionality while the Dashboard provides authenticated authoring functionality.

## Data Model

### User

A user can:

- Author multiple posts
- Create multiple comments

### Post

A post contains:

- Title
- Content
- Published/draft status
- Publication date
- Last updated date
- Optional author
- Comments

### Comment

A comment contains:

- Content
- Creation date
- Edited status
- Author
- Parent post

### Deletion Behaviour

The database relationships intentionally use different deletion rules:

- Deleting a **post** also deletes its comments.
- Deleting a **user** deletes their comments.
- Posts written by a deleted user are preserved.
- Preserved posts display their author as **Deleted User**.

This allows published content to survive account deletion while removing user-created comments.

## API

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Create an account |
| `POST` | `/api/auth/login` | Log in and receive a JWT |
| `GET` | `/api/auth/me` | Get the authenticated user |
| `DELETE` | `/api/me` | Delete the authenticated account |

### Posts

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/posts` | Get published posts |
| `GET` | `/api/posts/:id` | Get a published post |
| `GET` | `/api/me/posts` | Get the current user's posts |
| `GET` | `/api/me/posts/:id` | Get one of the current user's posts |
| `POST` | `/api/posts` | Create a draft |
| `PATCH` | `/api/posts/:id` | Update or publish/unpublish a post |
| `DELETE` | `/api/posts/:id` | Delete a post |

### Comments

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/posts/:postId/comments` | Get comments for a published post |
| `POST` | `/api/posts/:postId/comments` | Create a comment |
| `PATCH` | `/api/comments/:id` | Edit your comment |
| `DELETE` | `/api/comments/:id` | Delete your comment |

Protected endpoints require:

```http
Authorization: Bearer <token>
```

## Authentication and Authorization

When a user logs in, the API issues a signed JWT containing the user's ID.

Authenticated frontend requests send the token using the `Authorization` header:

```http
Authorization: Bearer <JWT>
```

Authentication middleware verifies the token and attaches the authenticated user's ID to the request.

Authorization is enforced on the server. For example:

- Users can only edit or delete their own comments.
- Users can only edit or delete their own posts.
- Draft posts are only available to their author.
- Public post endpoints only return published posts.

Frontend controls such as hiding Edit or Delete buttons are used for user experience, while the API remains the authority for access control.

## Local Development

### Prerequisites

- Node.js
- npm
- PostgreSQL

Clone the repository:

```bash
git clone https://github.com/RT1811/blog-api.git
cd blog-api
```

### Server

```bash
cd server
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/blog_api
JWT_SECRET=your-secret-key
```

Apply the database migrations and generate Prisma Client:

```bash
npx prisma migrate dev
npx prisma generate
```

Start the API:

```bash
npm start
```

The API runs on:

```text
http://localhost:3000
```

### Reader

From the repository root:

```bash
cd reader
npm install
npm run dev
```

By default the Reader runs on:

```text
http://localhost:5173
```

The frontend falls back to the local API at:

```text
http://localhost:3000
```

For a deployed API, set:

```env
VITE_API_URL=https://your-api.example.com
```

### Dashboard

From the repository root:

```bash
cd dashboard
npm install
npm run dev
```

By default the Dashboard runs on:

```text
http://localhost:5174
```

The Dashboard runs separately from the Reader and communicates with the same API.

For a deployed API:

```env
VITE_API_URL=https://your-api.example.com
```

## Deployment

The production application uses:

```text
Reader       → Vercel
Dashboard    → Vercel
API          → Render
Database     → Neon PostgreSQL
```

The backend uses the following production environment variables:

```env
DATABASE_URL=
JWT_SECRET=
READER_URL=
DASHBOARD_URL=
```

Both frontend deployments use:

```env
VITE_API_URL=
```

Production database migrations are applied with:

```bash
npx prisma migrate deploy
```

## What I Learned

This project provided practical experience with:

- Designing and consuming a REST API
- Separating frontend and backend applications
- JWT-based authentication
- Server-side authorization and ownership checks
- Relational database modelling
- Prisma relations and deletion behaviour
- Managing public and protected resources
- React authentication state
- CRUD operations across multiple related resources
- CORS between independently deployed frontends and APIs
- Environment variables across development and production
- Deploying a multi-application project using Vercel, Render, and Neon

## Author

**Ritwick Thakur**

- GitHub: [@RT1811](https://github.com/RT1811)
