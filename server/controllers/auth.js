import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export async function signUp(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { username, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (existingUser) {
            return res.status(409).json({
                error: "Username already exists",
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                passwordHash,
            },
        });

        res.status(200).json({
            id: user.id,
            username: user.username,
        });
    } catch (err) {
        next(err);
    }
}

export async function logIn(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!user) {
            return res.status(401).json({
                error: "Invalid username or password",
            });
        }

        const match = await bcrypt.compare(password, user.passwordHash);

        if (!match) {
            return res.status(401).json({
                error: "Invalid username or password",
            });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                username: user.username,
            },
        });
    } catch(err) {
        next(err);
    }
}

export async function getMe(req, res, next) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                id: true,
                username: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}