"use client";

import { useState } from "react";

import ResumeHeader from "@/components/resume/Header";
import ResumePreview from "@/components/resume/ResumePreview";
import useResume from "../../hooks/useResume";
import Contact from "@/components/resume/Contact";
import Summary from "@/components/resume/Summary";
import Skills from "@/components/resume/Skills";
import Projects from "@/components/resume/Projects";

export default function Home() {
  const { resumeRef } = useResume();

  const [mandatoryFields, setMandatoryFields] = useState<{
    name: string;
    title: string;
    email: string;
    address: string;
    phone: string;
    pincode: string;
    portfolio: string;
    description: string;
  }>({
    name: "",
    title: "",
    email: "",
    address: "",
    phone: "",
    pincode: "",
    portfolio: "",
    description: ""
  });

  return (
    <main className="flex flex-col gap-5 bg-slate-100 pb-10 pt-10 md:gap-10 2xl:flex-row">
      {/* Resume Editor */}
      <div className="flex w-full flex-col gap-5 px-5 md:px-10">
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
