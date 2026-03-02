import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoutes() {
  // get auth status
  const { isAuthenticated } = useAuth();
  // Outlet signifies user is authenticated and can navigate to protected routes
  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} replace />;
}
