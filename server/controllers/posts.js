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