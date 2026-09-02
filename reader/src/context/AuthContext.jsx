import { createContext, useEffect, useState } from "react";
import { getMe } from "../api/auth.js";

function logOut() {
    localStorage.removeItem("token");
    setUser(null);
}

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const currentUser = await getMe(token);
                setUser(currentUser);
            } catch {
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

     return (
        <AuthContext.Provider value={{ user, setUser, loading, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}