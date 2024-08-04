"use client";

import { useReactToPrint } from "react-to-print";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import useResume from "@/hooks/useResume";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AddSkill } from "./resume/Skills";
import { AddProject } from "./resume/Projects";
import useDropdownMenu from "@/hooks/useDropdownMenu";

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

  const { open, setOpen } = useDropdownMenu();

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
      ? `${header.name.split(" ").join("_")}_Resume`
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
        <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
          <DropdownMenuTrigger asChild>
            <Button>Add Section</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex w-full flex-col gap-1">
            <DropdownMenuLabel className="text-center">
              Sections
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <AddSkill />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AddProject />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Add Education")}>
              Education
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Add Certifications")}>
              Certifications
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Add Experience")}>
              Experience
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Add Custom")}>
              Custom
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
