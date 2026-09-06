import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts.js";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            await createPost(title, content, token);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <main>
            <h1>New Post</h1>

            <form onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post..."
                />

                <button type="submit">Save Draft</button>
            </form>

            {error && <p>{error}</p>}
        </main>
    );
}