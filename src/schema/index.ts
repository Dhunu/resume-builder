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
  technologies: z.array(z.string()).default([]),
  live_link: z.string().url().optional(),
  repo_link: z.string().url().optional()
});
