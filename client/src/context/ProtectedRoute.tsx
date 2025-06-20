import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import type { PropsWithChildren } from "react";


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <p>Loading...</p>; // bisa diganti skeleton
  if (!user) return <Navigate to="/login" />;

  return children;
};
