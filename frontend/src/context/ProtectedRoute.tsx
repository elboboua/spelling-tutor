import { Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { token } = useAuth();
    const navigate = useNavigate();
    if (!token) {
        navigate("/login");
        return <Navigate to="/login" />;
    }

    return children;
}
