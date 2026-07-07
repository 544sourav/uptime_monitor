import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children :ReactNode}) => {
    const {isLoaded,isSignedIn} = useAuth();
    if (!isLoaded) return <p className="text-white">Loading...</p>;
    if (!isSignedIn) return <Navigate to="/sign-in" replace />;

    return <>{children}</>;
};