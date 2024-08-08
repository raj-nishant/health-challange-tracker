import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing.js";
import Auth from "./views/Auth.tsx";

import Dashboard from "./views/Dashboard.tsx";
import ProtectedRoute from "./components/routing/ProtectedRoute.tsx";
import NavBar from "./components/common/Navbar.tsx";

function App() {
  return (
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
  );
}

export default App;
