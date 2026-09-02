import { useState } from "react";
import { useParams } from "react-router-dom";
import { getPublishedPost } from "../api/posts";

export default function Post() {
    const { id } = useParams();

    const [post, setPost] = useState(null);


    useEffect(() => {
        async function loadPost() {
            const data = await getPublishedPost(id);
            setPost(data);
        }

        loadPost();
    }, [id]);

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