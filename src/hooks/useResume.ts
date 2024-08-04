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
  proficiency: string;
};

type Project = {
  id: number;
  name: string;
  features: string[];
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
    "I am a Full Stack Web Developer with 3 years of experience in building web applications. I specialize in JavaScript and have worked with React, Node.js, and Express.js. I am passionate about learning new technologies and building scalable applications. I am looking for opportunities to work on challenging projects and grow as a developer.",
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
      proficiency: "advanced"
    },
    {
      id: 4,
      name: "Next.js",
      proficiency: "intermediate"
    },
    {
      id: 5,
      name: "Express.js",
      proficiency: "advanced"
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
    }
  ],
  projects: [
    {
      id: 1,
      name: "Blogify",
      features: [
        "User authentication",
        "Create, update, and delete posts",
        "Like and comment on posts"
      ],
      technologies: ["React", "Node.js", "Express.js", "MongoDB"],
      live_link: "https://blogify.vercel.app",
      repo_link: "https://github.com/Dhunu/blogify"
    },
    {
      id: 2,
      name: "Safar Sathi",
      features: [
        "Search for goods",
        "Track orders in realtime",
        "Get notifications for order status"
      ],
      technologies: ["React", "Node.js", "Express.js", "MongoDB"],
      live_link: "https://safar-sathi.vercel.app",
      repo_link: "https://github.com/Dhunu/safar-sathi"
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Science",
      start_date: "2022",
      end_date: "2025",
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
    },
    {
      id: 3,
      degree: "Higher Secondary School",
      start_date: "2014",
      end_date: "2016",
      field_of_study: "Science",
      institution: "Ramanujan Junior College"
    }
  ],
  certifications: [
    {
      id: 1,
      issue_date: "2019",
      issued_by: "Coursera",
      link: "https://www.coursera.org/account/accomplishments/certificate/9J5Z7ZQ7T4JU",
      name: "What is Data Science?"
    },
    {
      id: 2,
      issue_date: "2020",
      issued_by: "Coursera",
      link: "https://www.coursera.org/account/accomplishments/certificate/9J5Z7ZQ7T4JU",
      name: "Tools of Data Science"
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
