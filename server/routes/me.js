import { Router } from "express";
import { authenticate } from "../middleware/authentication.js";
import { getMyPosts, getMyPostById } from "../controllers/posts.js";
import { deleteAccount } from "../controllers/auth.js";

const router = Router();

router.get("/posts", authenticate, getMyPosts);

router.get("/posts/:id", authenticate, getMyPostById);

router.delete("/", authenticate, deleteAccount);

export default router;