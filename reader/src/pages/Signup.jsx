import { useState } from "react";
import { signUp } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await signUp(username, password);
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <main className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                <button type="submit">Sign up</button>

                {error && <p>{error}</p>}
            </form>
        </main>
    );
}

export default Signup;