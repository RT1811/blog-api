const API_URL = "http://localhost:3000/api/posts";

export async function getPublishedPosts() {
    const response = await fetch(API_URL);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch posts");
    }

    return data;
}