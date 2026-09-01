# Blog API

## Project Structure

```text
blog-api/
├── server/
│   ├── prisma/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── app
│
├── reader/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── api/
│       └── context/
│
└── dashboard/
    └── src/
        ├── pages/
        ├── components/
        ├── api/
        └── context/

## Applications

server/
- Express REST API
- Prisma/PostgreSQL
- JWT authentication
- Authorization and ownership rules

reader/
- Public blog frontend
- Read published posts
- Read/create/edit/delete comments
- User signup/login

dashboard/
- Author dashboard
- Create/edit/delete posts
- Draft management
- Publish/unpublish posts

## Data Model

User
- Posts
- Comments

Post
- Author
- Comments

Comment
- Author
- Post
```
## MVP Roadmap

1. Authentication
2. Public post feed
3. Single post
4. Read comments
5. Create comments
6. Edit/delete own comments
7. My Posts dashboard
8. Create drafts
9. Edit saved posts
10. Publish/unpublish
11. Delete posts
12. Delete account
13. Deployment
