import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  return isSignedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;