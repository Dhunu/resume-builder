import React from "react";
import { AnimatedResumeDesign } from "./AnimatedResumeDesign";
import { resumeDesigns } from "@/constants";

export default function ResumeDesigns() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-zinc-900 to-zinc-950">
      <h1 className="py-5 text-center text-2xl font-bold text-white sm:py-20 sm:text-4xl lg:text-5xl">
        Our Resume Designs
      </h1>
      <AnimatedResumeDesign resumes={resumeDesigns} autoplay />
    </section>
  );
}
