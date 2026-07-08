import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-4  bg-blue-950 ">
      <div className="flex items-center gap-2 ">
        <span className="relative flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
        </span>
        <h1 className="text-xl font-bold text-white"> Uptime Monitor</h1>
      </div>

      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link
          to="/sign-in"
          className="bg-white py-2 px-4 rounded  text-center text-blue-950"
        >
          Sign in
        </Link>
      </SignedOut>
    </header>
  );
}
