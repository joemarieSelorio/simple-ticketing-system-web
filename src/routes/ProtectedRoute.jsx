import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../utils/auth.util";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated && !isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;