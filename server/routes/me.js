import { Router } from "express";
import { authenticate } from "../middleware/authentication.js";
import { getMyPosts } from "../controllers/posts.js";

const router = Router();

router.get("/posts", authenticate, getMyPosts);

export default router;