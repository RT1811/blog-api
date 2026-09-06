import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return null;
}

    function handleLogout() {
        logOut();
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <Link to="/">My Posts</Link>
            <Link to="/posts/new">New Post</Link>

            {user && (
                <>
                    <span>{user.username}</span>
                    <button onClick={handleLogout}>
                        Log Out
                    </button>
                </>
            )}
        </nav>
    );
}