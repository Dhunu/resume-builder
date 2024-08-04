"use client";

import ResumeHeader from "@/components/resume/Header";
import ResumePreview from "@/components/resume/ResumePreview";
import Contact from "@/components/resume/Contact";
import Summary from "@/components/resume/Summary";
import Skills from "@/components/resume/Skills";
import Projects from "@/components/resume/Projects";
import useResumePreview from "@/hooks/useResumePreview";
import { cn } from "@/lib/utils";
import Education from "@/components/resume/Education";
import Certifications from "@/components/resume/Certifications";

export default function Home() {
  const { show } = useResumePreview();

  return (
    <main
      className={cn(
        "flex flex-col gap-5 bg-slate-100 md:gap-10 2xl:flex-row",
        show &&
          "h-[800px] w-[100vw] items-center justify-center lg:h-[1100px] xl:h-full"
      )}
    >
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

          {/* Education */}
          <Education />

          {/* Certification */}
          <Certifications />
        </div>
      </div>

      {/* Resume Preview */}
      <ResumePreview />
    </main>
  );
}
