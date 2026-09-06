import { Router } from "express";
import { authenticate } from "../middleware/authentication.js";
import { getMyPosts, getMyPostById } from "../controllers/posts.js";

const router = Router();

router.get("/posts", authenticate, getMyPosts);

router.get("/posts/:id", authenticate, getMyPostById);

export default router;