import ClickToAction from "@/components/landing/ClickToAction";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ResumeDesigns from "@/components/landing/ResumeDesigns";
import Testimonials from "@/components/landing/Testimonials";
import React from "react";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-zinc-950">
      <div className="relative min-h-screen w-full">
        <Header />
        <Hero />
      </div>
      <ResumeDesigns />
      <Testimonials />
      <ClickToAction />
    </main>
  );
}
