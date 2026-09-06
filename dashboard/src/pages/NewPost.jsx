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
        <main className="editor-page">
            <form className="editor-form" onSubmit={handleSubmit}>
                <h1>New Post</h1>

                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="editor-actions">
                    <button type="submit">Save Draft</button>
                </div>
            </form>
        </main>
    );
}