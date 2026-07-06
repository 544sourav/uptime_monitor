import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <h1>Uptime Monitor</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link to="/sign-in">Sign in</Link>
      </SignedOut>
    </header>
  );
}
