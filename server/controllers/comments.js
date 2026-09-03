import { prisma } from "../lib/prisma.js"
import { validationResult } from "express-validator";

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

export async function createComment(req, res, next) {
    const postId = Number(req.params.postId);
    const { content } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

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

        if(!post) {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                authorId: req.userId,
                postId,
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

        res.status(201).json(comment);
    } catch(err) {
        next(err);
    }
}