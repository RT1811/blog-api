import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyPosts } from "../api/posts.js"

export default function Myposts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPosts() {
            const token = localStorage.getItem("token");

            try {
                const data = await getMyPosts(token);
                setPosts(data);
            } catch(err) {
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
            <h1>My Posts</h1>

            <Link to="/posts/new">New Post</Link>

            {posts.map((post) => (
                <article key={post.id}>
                    <h2>{post.title}</h2>

                    <p>
                        {post.published ? "Published" : "Draft"}
                    </p>

                    <p>{post.content}</p>
                </article>
            ))}
        </main>
    );
}