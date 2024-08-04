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
import useResumePreview from "@/hooks/useResumePreview";
import { AddEducation } from "./resume/Education";
import { AddCertification } from "./resume/Certifications";
import { AddExperience } from "./resume/Experience";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "./ui/dialog";

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

  const { show, setShow } = useResumePreview();
  const { dropdownOpen, setDropdownOpen } = useDropdownMenu();

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
      <div className="hidden gap-5 md:flex">
        <DropdownMenu
          open={dropdownOpen}
          onOpenChange={() => setDropdownOpen(!dropdownOpen)}
        >
          <DropdownMenuTrigger
            asChild
            className={cn(show ? "hidden" : "block")}
          >
            <Button>Add Section</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="hidden w-full flex-col gap-1 md:flex">
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
            <DropdownMenuItem asChild>
              <AddEducation />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AddCertification />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AddExperience />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Reset</Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Are you sure?</h1>
            <p className="text-lg">
              This will remove all the data from the resume.
            </p>
            <div className="flex gap-5">
              <Button onClick={handleReset} variant="destructive">
                Yes
              </Button>
              <Button>Cancel</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          onClick={saveToLocalStorage}
          className={cn(show ? "hidden" : "block")}
        >
          Save
        </Button>
        <Button
          disabled={!saved}
          className="disabled:cursor-not-allowed 2xl:hidden"
          onClick={() => setShow(!show)}
        >
          {show ? "Hide" : "Show"} Preview
        </Button>
        <Button
          onClick={handlePrint}
          disabled={!saved}
          className={cn(
            "block disabled:cursor-not-allowed",
            show ? "block" : "hidden md:block"
          )}
        >
          Print
        </Button>
      </div>
      <MobileMenu />
    </div>
  );
}
