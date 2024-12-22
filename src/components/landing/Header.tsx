import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <div className="absolute left-0 top-0 z-50 h-20 w-full bg-transparent text-white">
      <div className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between px-5">
        <Logo />
        <Button asChild>
          <Link href="/sign-up">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
