import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
    ],
}));

app.get("/api", (req, res) => {
    res.json({ message: "API is running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});