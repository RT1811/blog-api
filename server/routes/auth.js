import { Router } from "express";
import { body } from "express-validator";
import { signUp, logIn, getMe } from "../controllers/auth.js";
import { authenticate } from "../middleware/authentication.js";

const router = Router();

const authValidation = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];

router.post("/signup", authValidation, signUp);
router.post('/login', authValidation, logIn);
router.get("/me", authenticate, getMe);

export default router;