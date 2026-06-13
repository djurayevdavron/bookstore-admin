import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string;
}

function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const token: string | null =
  localStorage.getItem("token");

const userRole: string | null =
  localStorage.getItem("role");
  if (!token) {
    return <Navigate to="/" />;
  }
  if (role && role !== userRole) {
    return <Navigate to="/books" />;
  }
  return children;
}
export default ProtectedRoute;
