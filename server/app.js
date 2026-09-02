import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js"
import postsRouter from "./routes/posts.js";

const app = express();

app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
    ],
}));

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

app.get("/api", (req, res) => {
    res.json({ message: "API is running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});