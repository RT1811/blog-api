import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostComments, getPublishedPost } from "../api/posts";

export default function Post() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [error, setError] = useState("");
    const [comments, setComments] = useState([]);

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
                        <p>{comment.context}</p>
                        <p>By {comment.author.username}</p>
                        {comment.isUpdated && <span>Edited</span>}
                    </article>
                ))}
            </section>
        </main>
    );
}