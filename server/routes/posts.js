import { Router } from "express";
import { getPublishedPosts, getPublishedPostById, createPost, updatePost, deletePost } from "../controllers/posts.js";
import { authenticate } from "../middleware/authentication.js";
import { body } from "express-validator";

const router = Router();

const createPostValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required"),
];

const updatePostValidation = [
    body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty"),

    body("content")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Content cannot be empty"),

    body("published")
        .optional()
        .isBoolean()
        .withMessage("Published must be a boolean"),
];

router.get("/", getPublishedPosts);

router.get("/:id", getPublishedPostById);

router.post("/", authenticate, createPostValidation, createPost);

router.patch("/:id", authenticate, updatePostValidation, updatePost);

router.delete("/:id", authenticate, deletePost);

export default router;