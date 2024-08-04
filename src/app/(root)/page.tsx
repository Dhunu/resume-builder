"use client";

import { useState } from "react";

import ResumeHeader from "@/components/resume/Header";
import ResumePreview from "@/components/resume/ResumePreview";
import useResume from "../../hooks/useResume";
import Contact from "@/components/resume/Contact";
import Summary from "@/components/resume/Summary";
import Skills from "@/components/resume/Skills";
import Projects from "@/components/resume/Projects";
import useResumePreview from "@/hooks/useResumePreview";
import { cn } from "@/lib/utils";

export default function Home() {
  const { show } = useResumePreview();

  return (
    <main className="flex flex-col gap-5 bg-slate-100 md:gap-10 2xl:flex-row">
      {/* Resume Editor */}
      <div
        className={cn(
          "flex w-full flex-col gap-5 px-5 pb-10 pt-5 md:px-10 2xl:pb-5",
          show && "hidden"
        )}
      >
        {/* Mandatory Fields */}
        <div className="space-y-6">
          <ResumeHeader />
          <Contact />
          <Summary />
        </div>

        <div className="flex flex-wrap gap-5">
          {/* Skills */}
          <Skills />

          {/* Projects */}
          <Projects />
        </div>
      </div>

      {/* Resume Preview */}
      <ResumePreview />
    </main>
  );
}
