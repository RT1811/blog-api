import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { createComment, getPostComments, getPublishedPost } from "../api/posts";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Post() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [post, setPost] = useState(null);
    const [error, setError] = useState("");
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");

    useEffect(() => {
        async function loadPost() {
            try {
                const postData = await getPublishedPost(id);
                const commentData = await getPostComments(id);

                setPost(postData);
                setComments(commentData);
            } catch(err) {
                setError(err.message);
            }
        }

        loadPost();
    }, [id]);

    async function handleCommentSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const newComment = await createComment(
                id,
                commentContent,
                token,
            );

            setComments((previousComments) => [
                ...previousComments,
                newComment,
            ]);

            setCommentContent("");
        } catch(err) {
            setError(err.message);
        }
    }

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

            <section>
                <h2>Comments</h2>

                {comments.map((comment) => (
                    <article key={comment.id}>
                        <p>{comment.content}</p>
                        <p>By {comment.author.username}</p>
                        {comment.isUpdated && <span>Edited</span>}
                    </article>
                ))}

                {user && (
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        />

                        <button type="submit">Comment</button>
                    </form>
                )}
            </section>
        </main>
    );
}