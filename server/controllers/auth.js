import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

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

        res.status(201).json({
            id: user.id,
            username: user.username,
        });
    } catch (err) {
        next(err);
    }
}