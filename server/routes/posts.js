import { Router } from "express";
import { getPublishedPosts, getPublishedPostById, createPost } from "../controllers/posts.js";
import { authenticate } from "../middleware/authentication.js";
import { body } from "express-validator";

const router = Router();

const postValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required"),
];

router.get("/", getPublishedPosts);

router.get("/:id", getPublishedPostById);

router.post("/", authenticate, postValidation, createPost);

router.patch("/:id", authenticate, postValidation, updatePost);

export default router;