import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyPosts } from "../api/posts.js"
import { AuthContext } from "../context/AuthContext.jsx";
import { deleteAccount } from "../api/auth.js";

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
        <main className="dashboard-page">
            <div className="dashboard-header">
                <div>
                    <h1>My Posts</h1>
                    <p>Manage your drafts and published posts.</p>
                </div>

                <Link className="primary-link" to="/posts/new">
                    New Post
                </Link>
            </div>

            <div className="dashboard-post-list">
                {posts.map((post) => (
                    <article className="dashboard-post-card" key={post.id}>
                        <div className="post-card-header">
                            <h2>{post.title}</h2>

                            <span
                                className={
                                    post.published
                                        ? "status-badge published"
                                        : "status-badge draft"
                                }
                            >
                                {post.published ? "Published" : "Draft"}
                            </span>
                        </div>

                        <p>{post.content}</p>

                        <Link
                            className="edit-link"
                            to={`/posts/${post.id}/edit`}
                        >
                            Edit
                        </Link>
                    </article>
                ))}
            </div>

            <section className="danger-zone">
                <h2>Danger Zone</h2>
                <p>Deleting your account cannot be undone.</p>

                <button
                    className="danger-button"
                    onClick={handleDeleteAccount}
                >
                    Delete Account
                </button>
            </section>
        </main>
    );
}