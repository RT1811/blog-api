const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function signUp(username, password) {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Signup failed");
    }

    return data;
}

export async function logIn(username, password) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Login failed");
    }

    return data;
}

export async function getMe(token) {
    const response = await fetch('${API_URL}/api/auth/me', {
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