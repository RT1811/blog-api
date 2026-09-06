import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyPosts } from "../api/posts.js"

export default function Myposts() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

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

    async function handleDeleteAccount() {
        const token = localStorage.getItem("token");

        try {
            await deleteAccount(token);

            localStorage.removeItem("token");
            setUser(null);
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <main>
            <h1>My Posts</h1>
            <button onClick={handleDeleteAccount}>Delete Account</button>

            <Link to="/posts/new">New Post</Link>

            {posts.map((post) => (
                <article key={post.id}>
                    <h2>{post.title}</h2>

                    <p>
                        {post.published ? "Published" : "Draft"}
                    </p>

                    <p>{post.content}</p>

                    <Link to={`/posts/${post.id}/edit`}>Edit</Link>
                </article>
            ))}
            
        </main>
    );
}