import { createRef } from "react";
import { create } from "zustand";

interface ResumeStore {
  resumeRef: React.MutableRefObject<HTMLDivElement | null>;
  header: Header;
  contact: Contact;
  summary: string;
  skills: Skill[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  experience: Experience[];

  setHeader: (data: Header) => void;
  setContact: (data: Contact) => void;
  setSummary: (data: string) => void;
  setSkills: (data: Skill[]) => void;
  setProjects: (data: Project[]) => void;
  setEducation: (data: Education[]) => void;
  setCertifications: (data: Certification[]) => void;
  setExperience: (data: Experience[]) => void;

  resetResume: () => void;
}

type Header = {
  name: string;
  title: string;
};

type Contact = {
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedIn: string;
};

type Skill = {
  id: number;
  name: string;
  proficiency: string;
};

type Project = {
  id: number;
  name: string;
  features: string[];
  technologies: string[];
  live_link: string;
  repo_link: string;
};

type Education = {
  id: number;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
};

type Certification = {
  id: number;
  name: string;
  issued_by: string;
  issue_date: string;
  link: string;
};

type Experience = {
  id: number;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
};

const ref =
  createRef<HTMLDivElement | null>() as React.MutableRefObject<HTMLDivElement | null>;

const useResume = create<ResumeStore>()((set) => ({
  resumeRef: ref,
  header: {
    name: "",
    title: ""
  },
  contact: {
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedIn: ""
  },
  summary: "",
  skills: [],
  projects: [],
  education: [],
  certifications: [],
  experience: [],
  setHeader: (data: Header) => set({ header: data }),
  setContact: (data: Contact) => set({ contact: data }),
  setSummary: (data: string) => set({ summary: data }),
  setSkills: (data: Skill[]) => set({ skills: data }),
  setProjects: (data: Project[]) => set({ projects: data }),
  setEducation: (data: Education[]) => set({ education: data }),
  setCertifications: (data: Certification[]) => set({ certifications: data }),
  setExperience: (data: Experience[]) => set({ experience: data }),
  resetResume: () => {
    set({
      header: {
        name: "",
        title: ""
      },
      contact: {
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedIn: ""
      },
      summary: "",
      skills: [],
      projects: [],
      education: [],
      certifications: [],
      experience: []
    });
  }
}));

export default useResume;
