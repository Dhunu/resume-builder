"use client";

import { Button } from "./ui/button";
import generatePDF from "react-to-pdf";

export default function Header() {
  const getTargetElement = () => document.getElementById("resume-preview");
  return (
    <div className="flex h-16 w-full items-center justify-between px-5 md:px-10">
      <h1 className="font-serif text-lg font-bold sm:text-xl lg:text-2xl 2xl:text-3xl">
        Resume-Builder
      </h1>
      <Button onClick={() => generatePDF(getTargetElement)}>GET PDF</Button>
    </div>
  );
}
