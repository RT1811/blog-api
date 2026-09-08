import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js"
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import meRouter from "./routes/me.js"

const app = express();

app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.READER_URL,
    process.env.DASHBOARD_URL,
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
}));

app.use("/api/auth", authRouter);
app.use("/api/me", meRouter);
app.use("/api/posts", postsRouter);
app.use("/api", commentsRouter);

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Internal server error",
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});