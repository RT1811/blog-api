const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getMe(token) {
    const response = await fetch(`${API_URL}/api/auth/me`, {
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
        `${API_URL}/api/auth/login`,
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

export async function deleteAccount(token) {
    const response = await fetch('${API_URL}/api/me', {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete account");
    }
}