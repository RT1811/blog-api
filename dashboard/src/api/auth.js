export async function getMe(token) {
    const response = await fetch("http://localhost:3000/api/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to get user");
    }

    return data;
}

export async function logIn(username, password) {
    const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Login failed");
    }

    return data;
}