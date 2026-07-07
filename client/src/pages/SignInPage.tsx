import {SignIn} from "@clerk/clerk-react"

export const SignInPage=()=>{
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4.5rem)] bg-white">
        <SignIn routing="path" path="/sign-in" />
      </div>
    );
}