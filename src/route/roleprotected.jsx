import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const RoleProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleProtectedRoute;
