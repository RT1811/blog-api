const API_URL = "http://localhost:3000/api/posts";

export async function getPublishedPosts() {
    const response = await fetch(API_URL);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch posts");
    }

    return data;
}

export async function getPublishedPost(id) {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch post");
    }

    return data;
}

export async function getPostComments(postId) {
    const response = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch comments");
    }

    return data;
}

export async function createComment(postId, content, token) {
    const response = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to create comment");
    }

    return data;
}