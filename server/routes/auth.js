import { Router } from "express";
import { body } from "express-validator";
import { signUp, logIn } from "../controllers/auth.js";

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

export default router;