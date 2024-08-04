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
  photo: string;
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
  proficiency?: Proficiency;
};

type Project = {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  live_link?: string;
  repo_link?: string;
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
    photo:
      "https://firebasestorage.googleapis.com/v0/b/resume-builder-54cdd.appspot.com/o/images%2F1722751965098IMG%204019-01%203.jpg?alt=media&token=5eb03946-dca5-4108-8c80-f8d35c2b89c0",
    name: "Angel Saikia",
    title: "Full Stack Web Developer"
  },
  contact: {
    email: "developer@angelsaikia.com",
    phone: "+91-8011158661",
    location: "Nagaon, Assam, India",
    website: "https://angelsaikia.com",
    linkedIn: "https://www.linkedin.com/in/angel-saikia/"
  },
  summary:
    "I am a Full Stack Web Developer. I specialize in Next.js and have worked with React, Node.js, and Express.js. I am passionate about learning new technologies and building scalable applications. I am looking for opportunities to work on challenging projects and grow as a developer.",
  skills: [
    {
      id: 1,
      name: "JavaScript",
      proficiency: "advanced"
    },
    {
      id: 2,
      name: "React",
      proficiency: "advanced"
    },
    {
      id: 3,
      name: "Node.js",
      proficiency: "intermediate"
    },
    {
      id: 4,
      name: "Next.js",
      proficiency: "intermediate"
    },
    {
      id: 6,
      name: "MongoDB",
      proficiency: "intermediate"
    },
    {
      id: 7,
      name: "Firebase",
      proficiency: "intermediate"
    },
    {
      id: 8,
      name: "Tailwind CSS",
      proficiency: "advanced"
    }
  ],
  projects: [
    {
      id: 1,
      name: "Blogify",
      description: "A bloging website where you can share your experiences",
      technologies: ["Next.js", "Node.js", "Shadcn UI", "Tailwind CSS"],
      live_link: "https://blogify.angelsaikia.com",
      repo_link: "https://github.com/Dhunu/blogify"
    },
    {
      id: 2,
      name: "Safar Sathi",
      description:
        "A applications to solve the logistics problem in Indian truck industry",
      technologies: ["Next.js", "Node.js", "Tailwind CSS"],
      live_link: "https://safar-sathi.vercel.app",
      repo_link: "https://github.com/Dhunu/safar-sathi"
    },
    {
      id: 3,
      name: "Upload File",
      description: "A simple file upload application",
      technologies: [
        "Next.js",
        "Tailwind CSS",
        "Clerk",
        "Firebase Firestore",
        "Firebase Storage"
      ],
      live_link: "https://upload-file-drag-and-drop.angelsaikia.com/",
      repo_link: "https://github.com/Dhunu/uploadFileDragAndDrop"
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Science",
      start_date: "2022",
      end_date: "Present",
      field_of_study: "Data Science and Applications",
      institution: "Indian Institute of Information Technology, Madras"
    },
    {
      id: 2,
      degree: "Full Stack Web Development",
      start_date: "2022",
      end_date: "2023",
      field_of_study: "Java Backend Development",
      institution: "Masai School"
    }
  ],
  certifications: [
    {
      id: 1,
      issue_date: "Dec 2021",
      issued_by: "Coursera | IBM",
      link: "https://www.coursera.org/account/accomplishments/verify/X83GZ7ZTDRK4",
      name: "What is Data Science?"
    },
    {
      id: 2,
      issue_date: "Dec 2021",
      issued_by: "Coursera | IBM",
      link: "https://www.coursera.org/account/accomplishments/verify/8FE84K78BTHT",
      name: "Tools for Data Science"
    }
  ],
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
        photo: "",
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
