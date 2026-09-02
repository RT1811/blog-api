import { Router } from "express";
import { getPublishedPosts } from "../controllers/posts.js";

const router = Router();

router.get("/", getPublishedPosts);

export default router;