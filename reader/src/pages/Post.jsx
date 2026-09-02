import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPublishedPost } from "../api/posts";

export default function Post() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPost() {
            try {
                const data = await getPublishedPost(id);
                setPost(data);
            } catch(err) {
                setError(err.message);
            }
        }

        loadPost();
    }, [id]);

    if (error) {
    return <p>{error}</p>;
}

    if (!post) {
        return <p>Loading...</p>;
    }

     return (
        <main>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>By {post.author?.username ?? "Deleted User"}</p>
        </main>
    );
}