import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ClickToAction() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-lg bg-gradient-to-r from-indigo-700 to-purple-900 px-6 py-6 md:px-12 md:py-12 lg:px-16 lg:py-16 xl:flex xl:items-center">
        <div className="xl:w-0 xl:flex-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Ready to dive in?
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
            Start building your professional resume today
          </p>
        </div>

        <Button className="h-20 w-80 text-xl" asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
