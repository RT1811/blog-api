import { Router } from "express";
import { getPostComments } from "../controllers/comments.js";
import { authenticate } from "../middleware/authentication.js"

const router = Router();

const commentValidation = [
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Comment cannot be empty"),
];

router.get("/posts/:postId/comments", getPostComments);
router.post("/posts/:postId/comments", authenticate, commentValidation, createComment);

export default router;