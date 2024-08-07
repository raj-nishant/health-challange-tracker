import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing.jsx";
import Auth from "./views/Auth.tsx";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import Dashboard from "./views/Dashboard.tsx";
import ProtectedRoute from "./components/routing/ProtectedRoute.jsx";
import PostContextProvider from "./contexts/PostContext.jsx";
import NavBar from "./components/common/Navbar.tsx";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
