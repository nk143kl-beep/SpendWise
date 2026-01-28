import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import GenericPage from "./components/GenericPage/GenericPage";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import Reports from "./components/Reports/Reports";
import Profile from "./components/Profile/Profile";
import "./App.css";

function App() {
  const getStoredUser = () => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    if (userData && userData.expiry && Date.now() > userData.expiry) {
      localStorage.removeItem('user');
      return null;
    }
    return userData;
  };

  const [user, setUser] = useState(getStoredUser());
  const location = useLocation();

  useEffect(() => {
    // Re-check user state on every route change to stay in sync and check expiry
    setUser(getStoredUser());
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="app-container">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="content">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Auth onLogin={(u) => setUser(u)} />} />
          <Route path="/signup" element={<Auth onLogin={(u) => setUser(u)} />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/:pageId" element={<GenericPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
