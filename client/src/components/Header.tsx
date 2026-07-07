import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-4  bg-blue-950 ">
      <div className="flex items-center gap-2 ">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <h1 className="text-xl font-bold text-white"> Uptime Monitor</h1>
      </div>

      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link to="/sign-in" className="bg-white py-2 px-4 rounded  text-center text-blue-950" >Sign in</Link>
      </SignedOut>
    </header>
  );
}
