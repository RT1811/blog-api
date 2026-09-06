import { useEffect, useState } from "react";
import { getMyPost, updatePost, deletePost } from "../api/posts.js";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [published, setPublished] = useState(false);

    useEffect(() => {
        async function loadPost() {
            const token = localStorage.getItem("token");

            try {
                const post = await getMyPost(id, token);

                setTitle(post.title);
                setContent(post.content);
                setPublished(post.published);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadPost();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            await updatePost(id, { title, content }, token);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    }

    async function handlePublishToggle() {
        const token  = localStorage.getItem("token");

        try {
            const updatedPost = await updatePost(id, { published: !published }, token);

            setPublished(updatedPost.published);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete() {
        const token = localStorage.getItem("token");

        try {
            await deletePost(id, token);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button type="submit">Save Changes</button>
            <button type="button" onClick={handlePublishToggle}>{published ? "Unpublish" : "Publish"}</button>
            <button type="button" onClick={handleDelete}>Delete Post</button>
        </form>
    );
}