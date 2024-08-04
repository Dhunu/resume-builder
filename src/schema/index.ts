import { z } from "zod";

export const projectSchema = z.object({
  id: z.number(),
  imageUrl: z.string().url().optional(),
  name: z.string().min(1, { message: "Project name is required" }),
  features: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  live_link: z.string().url().optional(),
  repo_link: z.string().url().optional()
});
