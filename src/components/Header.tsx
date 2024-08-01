"use client";

import { useReactToPrint } from "react-to-print";
import { Button } from "./ui/button";
import useResume from "@/hooks/useResume";
import { useState } from "react";

export default function Header() {
  const [saved, setSaved] = useState(false);
  const {
    resumeRef,
    header,
    contact,
    summary,
    skills,
    projects,
    education,
    certifications,
    experience,
    resetResume
  } = useResume();

  const saveToLocalStorage = () => {
    const data = {
      header,
      contact,
      summary,
      skills,
      projects,
      education,
      certifications,
      experience
    };
    localStorage.setItem("resume_data", JSON.stringify(data));
    setSaved(true);
  };

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: header.name
      ? header.name.split(" ").join("_") + "_Resume"
      : "Resume",
    removeAfterPrint: true
  });

  const handleReset = () => {
    resetResume();
    localStorage.removeItem("resume_data");
    setSaved(false);
  };
  return (
    <div className="fixed z-10 flex h-16 w-full items-center justify-between bg-white px-5 md:px-10">
      <h1 className="font-serif text-lg font-bold sm:text-xl lg:text-2xl 2xl:text-3xl">
        Resume-Builder
      </h1>
      <div className="flex gap-5">
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={saveToLocalStorage}>Save</Button>
        <Button
          onClick={handlePrint}
          disabled={!saved}
          className="disabled:cursor-not-allowed"
        >
          Print
        </Button>
      </div>
    </div>
  );
}
