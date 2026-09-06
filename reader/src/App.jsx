import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    return (
      <BrowserRouter>

      <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;