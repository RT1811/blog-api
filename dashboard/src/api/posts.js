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