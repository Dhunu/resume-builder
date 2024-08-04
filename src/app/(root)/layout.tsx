"use client";

import Header from "@/components/Header";
import React, { useEffect } from "react";
import useResume from "@/hooks/useResume";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const {
    setHeader,
    setContact,
    setSummary,
    setSkills,
    setProjects,
    setCertifications,
    setEducation,
    setExperience
  } = useResume();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("resume_data") || "{}");

    if (data.header) {
      setHeader(data.header);
      setContact(data.contact);
      setSummary(data.summary);
      setSkills(data.skills);
      setProjects(data.projects);
      setCertifications(data.certifications);
      setEducation(data.education);
      setExperience(data.experience);
    }
  }, [
    setHeader,
    setContact,
    setSummary,
    setSkills,
    setProjects,
    setCertifications,
    setEducation,
    setExperience
  ]);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="h-full flex-1 pt-20">{children}</div>
    </div>
  );
}
