import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
    const { currentUser } = useAuth();

    return (
        <Routes>
            {/* Protected Routes: Agar user logged-in nahi hai, toh login par bhejo */}
            <Route path="/" element={currentUser ? <Dashboard /> : <Navigate to="/auth" />} />
            <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/auth" />} />
            
            {/* Auth Routes */}
            <Route path="/auth" element={!currentUser ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!currentUser ? <Signup /> : <Navigate to="/" />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default ProjectRoutes;