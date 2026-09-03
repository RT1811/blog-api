import { prisma } from "../lib/prisma.js"

export async function getPostComments(req, res, next) {
    const postId = Number(req.params.postId);
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: postId,
                published: true,
            },
            select: {
                id: true,
            },
        });

        if (!post) {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        const comments = await prisma.comment.findMany({
            where: {
                postId,
            },
            orderBy: {
                createdAt: "asc",
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                isUpdated: true,
                author: {
                    select: {
                        id: true,
                        username: true, 
                    },
                },
            },
        });

        res.status(200).json(comments);
    } catch(err) {
        next(err);
    }
}