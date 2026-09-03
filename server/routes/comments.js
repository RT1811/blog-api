import { Router } from "express";
import { getPostComments } from "../controllers/comments.js";

const router = Router();

router.get("/posts/:postId/comments", getPostComments);

export default router;