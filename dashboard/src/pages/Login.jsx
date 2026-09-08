import { useState, useContext } from "react";
import { logIn } from "../api/auth.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = await logIn(username, password);

            localStorage.setItem("token", data.token);

            setUser(data.user);
            navigate("/");
        } catch(err) {
            setError(err.message);
        }
    }

    return (
        <main className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Dashboard Login</h1>

                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Log In</button>

                {error && <p>{error}</p>}
            </form>
        </main>
    );
}

export default Login;