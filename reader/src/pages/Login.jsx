import { useState, useContext } from "react";
import { logIn } from "../api/auth.js";
import { AuthContext } from "../context/AuthContext.jsx";

function Login() {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");

    const { setUser } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = await logIn(username, password);

            localStorage.setItem("token", data.token);

            setUser(data.user);
        } catch(err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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

            <button type="submit">Log in</button>

            {error && <p>{error}</p>}
        </form>
    );
}

export default Login;