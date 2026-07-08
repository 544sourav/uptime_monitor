import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { Loading } from "../components/loading";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return (
    <div className="h-[calc(100vh-3.8rem)] flex items-center justify-center ">
      <Loading message="Checking your session..." />;
    </div>
  ); 
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;

  return <>{children}</>;
};
