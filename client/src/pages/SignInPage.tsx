import { SignIn, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Loading } from "../components/loading";

export const SignInPage = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex h-[calc(100vh-4.5rem)] items-center justify-center bg-white">
        <Loading message="Preparing sign-in..." fullScreen={false} />
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-[calc(100vh-4.5rem)] items-center justify-center bg-white">
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
};