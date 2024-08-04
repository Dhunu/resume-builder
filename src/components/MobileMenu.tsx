"use client";

import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AddCertification } from "./resume/Certifications";
import { AddEducation } from "./resume/Education";
import { AddExperience } from "./resume/Experience";
import { AddProject } from "./resume/Projects";
import { AddSkill } from "./resume/Skills";
import useDropdownMenu from "@/hooks/useDropdownMenu";
import useResumePreview from "@/hooks/useResumePreview";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import useResume from "@/hooks/useResume";

export default function MobileMenu() {
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

  const handleReset = () => {
    resetResume();
    localStorage.removeItem("resume_data");
    setSaved(false);
  };

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
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <IoMenu className="h-8 w-8" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <h1 className="font-serif text-lg font-bold sm:text-xl lg:text-2xl 2xl:text-3xl">
            Resume-Builder
          </h1>
          <div className="mt-5 flex flex-col gap-5">
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
                show ? "block" : "hidden"
              )}
            >
              Print
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
