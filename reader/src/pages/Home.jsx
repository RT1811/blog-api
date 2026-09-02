import { useEffect, useState } from "react";
import { getPublishedPosts } from "../api/posts.js";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPosts() {
            try {
                const data = getPublishedPosts();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main>
            {posts.map((post) => (
                <article key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>

                    <p>
                        By {post.author?.username ?? "Deleted User"}
                    </p>
                </article>
            ))}
        </main>
    );
}