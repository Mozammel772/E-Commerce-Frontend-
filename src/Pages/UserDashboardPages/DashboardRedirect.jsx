// DashboardRedirect.jsx
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const DashboardRedirect = () => {
    const { user, loading: authLoading } = useAuth();
    const { role, isLoading: roleLoading } = useRole();

    if (authLoading || roleLoading) {
        return <LoadingSpinner/>
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role === "admin") {
        return <Navigate to="/admin-dashboard" replace />;
    }

    if (role === "user") {
        return <Navigate to="/user-dashboard" replace />;
    }

    // Optional fallback
    return <Navigate to="/" replace />;
};

export default DashboardRedirect;
