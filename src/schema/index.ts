import { z } from "zod";

export const skillSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: "Skill name is required" }),
  proficiency: z
    .enum(["beginner", "intermediate", "advanced", "expert"])
    .optional()
});

export const projectSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: "Project name is required" }),
  description: z
    .string()
    .min(1, { message: "Project description is required" }),
  technologies: z
    .array(z.string())
    .min(1, { message: "Minimum one technology is required" }),
  live_link: z.string().url().optional(),
  repo_link: z.string().url().optional()
});

export const educationSchema = z.object({
  id: z.number(),
  institution: z.string().min(1, { message: "Institution name is required" }),
  degree: z.string().min(1, { message: "Degree name is required" }),
  field_of_study: z.string().min(1, { message: "Field of study is required" }),
  start_date: z.string().min(1, { message: "Start date is required" }),
  end_date: z.string().min(1, { message: "End date is required" })
});

export const certificationSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: "Certification name is required" }),
  issued_by: z.string().min(1, { message: "Authority name is required" }),
  issue_date: z.string().min(1, { message: "Issue date is required" }),
  link: z.string().url().optional()
});

export const experienceSchema = z.object({
  id: z.number(),
  company: z.string().min(1, { message: "Company name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  start_date: z.string().min(1, { message: "Start date is required" }),
  end_date: z.string().min(1, { message: "End date is required" }),
  responsibilities: z.array(z.string()).default([])
});
