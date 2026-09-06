import { useEffect, useState } from "react";
import { getPublishedPosts } from "../api/posts.js";
import { Link } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await getPublishedPosts();
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
        <main className="home-page">
            <h1>Latest Posts</h1>

            <div className="post-list">
                {posts.map((post) => (
                    <article className="post-card" key={post.id}>
                        <h2>
                            <Link to={`/posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </h2>

                        <p className="post-meta">
                            By {post.author?.username ?? "Deleted User"}
                        </p>

                        <p>{post.content}</p>
                    </article>
                ))}
            </div>
        </main>
    );
}