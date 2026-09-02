import { prisma } from "../lib/prisma.js"

export async function getPublishedPosts(req, res, next) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
            },
            orderBy: {
                publishedAt: "desc",
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishedAt: true,
                author: {
                    select: {
                        id: true,
                        username: true, 
                    },
                },
            },
        });

        res.status(200).json(posts);
    } catch(err) {
        next(err);
    }
}

export async function getPublishedPostById(req, res, next) {
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: Number(req.params.id),
                published: true,
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishedAt: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
        });

        if (!post) {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        res.status(200).json(post);
    } catch(err) {
        next(err);
    }
}