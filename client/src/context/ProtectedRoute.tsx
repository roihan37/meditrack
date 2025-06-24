import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import FallbackLoader from "@/components/FallbackLoader";


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <FallbackLoader/>; // bisa diganti skeleton
  if (!user) return <Navigate to="/login" />;

  return children;
};
