const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getMyPosts(token) {
    const response = await fetch(`${API_URL}/api/me/posts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch your posts");
    }

    return data;
}

export async function createPost(title, content, token) {
    const response = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title,
            content,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to create post");
    }

    return data;
}

export async function getMyPost(id, token) {
    const response = await fetch(
        `${API_URL}/api/me/posts/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch post");
    }

    return data;
}

export async function updatePost(id, updates, token) {
    const response = await fetch(
        `${API_URL}/api/posts/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to update post");
    }

    return data;
}

export async function deletePost(id, token) {
    const response = await fetch(
        `${API_URL}/api/posts/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete post");
    }
}