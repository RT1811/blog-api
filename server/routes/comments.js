import { Router } from "express";
import { getPostComments, createComment, updateComment, deleteComment } from "../controllers/comments.js";
import { authenticate } from "../middleware/authentication.js"
import { body } from "express-validator";

const router = Router();

const commentValidation = [
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Comment cannot be empty"),
];

router.get("/posts/:postId/comments", getPostComments);
router.post("/posts/:postId/comments", authenticate, commentValidation, createComment);
router.patch("/comments/:id", authenticate, commentValidation, updateComment);
router.delete("/comments/:id", authenticate, deleteComment);

export default router;