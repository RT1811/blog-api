import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { createComment, getPostComments, getPublishedPost, updateComment, deleteComment } from "../api/posts";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Post() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [post, setPost] = useState(null);
    const [error, setError] = useState("");
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState("");

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

    async function handleDeleteComment(commentId) {
        const token = localStorage.getItem("token");

        try {
            await deleteComment(commentId, token);

            setComments((previousComments) => 
                previousComments.filter(
                    (comment) => comment.id !== commentId
                )
            );
        } catch(err) {
            setError(err.message);
        }
    }

    async function handleEditComment(e, commentId) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const updatedComment = await updateComment(commentId, editContent, token);

            setComments((previousComments) =>
                previousComments.map((comment) =>
                    comment.id === commentId
                        ? updatedComment
                        : comment
                )
            );

            setEditingCommentId(null);
            setEditContent("");
        } catch(err) {
            setError(err.message);
        }
    }

    function startEditing(comment) {
        setEditingCommentId(comment.id);
        setEditContent(comment.content);
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
                        {editingCommentId === comment.id ? (
                            <form
                                onSubmit={(e) =>
                                    handleEditComment(e, comment.id)
                                }
                            >
                                <textarea
                                    value={editContent}
                                    onChange={(e) =>
                                        setEditContent(e.target.value)
                                    }
                                />

                                <button type="submit">
                                    Save
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditingCommentId(null)
                                    }
                                >
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <p>{comment.content}</p>
                        )}

                        <p>By {comment.author.username}</p>

                        {comment.isUpdated && (
                            <span>Edited</span>
                        )}

                        {comment.author.id === user?.id &&
                            editingCommentId !== comment.id && (
                                <>
                                    <button
                                        onClick={() =>
                                            startEditing(comment)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDeleteComment(comment.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                    </article>
                ))}

                {user && (
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={commentContent}
                            onChange={(e) =>
                                setCommentContent(e.target.value)
                            }
                        />

                        <button type="submit">
                            Comment
                        </button>
                    </form>
                )}
            </section>
        </main>
    );
}