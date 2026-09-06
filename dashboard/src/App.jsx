import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import MyPosts from "./pages/MyPosts.jsx";
import NewPost from "./pages/NewPost.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import EditPost from "./pages/EditPost.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    return (
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/" element={
                  <ProtectedRoute>
                    <MyPosts />
                  </ProtectedRoute>
                } />
                <Route path="/posts/new" element={
                  <ProtectedRoute>
                    <NewPost />
                  </ProtectedRoute>
                } />
                <Route path="posts/:id/edit" element={
                  <ProtectedRoute>
                    <EditPost />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;