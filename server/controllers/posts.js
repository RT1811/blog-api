import { validationResult } from "express-validator";
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

export async function getMyPosts(req, res, next) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: req.userId,
            },
            orderBy: {
                updatedAt: "desc",
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                publishedAt: true,
                updatedAt: true,
            },
        });

        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}

export async function createPost(req, res, next) {
    const { title, content } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
           error: errors.array()[0].msg,
        });
    }

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: req.userId,
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                publishedAt: true,
                updatedAt: true,
            },
        });

        res.status(201).json(post);
    } catch(err) {
        next(err);
    }
}

export async function getMyPostById(req, res, next) {
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: Number(req.params.id),
                authorId: req.userId,
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
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

export async function updatePost(req, res, next) {
    const postId = Number(req.params.id);
    const { title, content, published } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
           error: errors.array()[0].msg,
        });
    }

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                id: true,
                publishedAt: true,
                authorId: true,
            },
        });

        if (!post) {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        if (post.authorId !== req.userId) {
            return res.status(403).json({
                error: "You cannot edit this post",
            });
        }

        const data = {};

        if (title !== undefined) {
            data.title = title;
        }

        if (content !== undefined) {
            data.content = content;
        }

        if (published !== undefined) {
            data.published = published;

            if (published && !post.publishedAt) {
                data.publishedAt = new Date();
            }
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data,
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                publishedAt: true,
                updatedAt: true,
            }     ,       
        });

        res.status(200).json(updatedPost);
    } catch(err) {
        next(err);
    }
}

export async function deletePost(req, res, next) {
    const postId = Number(req.params.id);

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                id: true,
                authorId: true,
            },
        });

        if (!post) {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        if (post.authorId !== req.userId) {
            return res.status(403).json({
                error: "You cannot delete this post",
            });
        }

        await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        res.status(204).send();
    } catch(err) {
        next(err);
    }
}