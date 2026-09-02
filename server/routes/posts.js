import { Router } from "express";
import { getPublishedPosts, getPublishedPostById } from "../controllers/posts.js";

const router = Router();

router.get("/", getPublishedPosts);

router.get("/:id", getPublishedPostById);

export default router;