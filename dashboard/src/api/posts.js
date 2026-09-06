export async function getMyPosts(token) {
    const response = await fetch("http://localhost:3000/api/me/posts", {
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
    const response = await fetch("http://localhost:3000/api/posts", {
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
        `http://localhost:3000/api/me/posts/${id}`,
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

export async function updatePost(id, title, content, token) {
    const response = await fetch(
        `http://localhost:3000/api/posts/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to update post");
    }

    return data;
}