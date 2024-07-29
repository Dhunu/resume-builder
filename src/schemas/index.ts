import { z } from 'zod';

export const resumeSchema = z.object({
  // header
  name: z.string(),
  title: z.string(),

  // contact
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  pincode: z.string(),
  portfolio: z.string().url(),

  // profile
  profile: z.string(),

  // skills
  skills: z.array(z.string()).optional(),

  // certifications
  certifications: z
    .array(
      z.object({
        title: z.string(),
        authority: z.string(),
        date: z.string(),
        url: z.string().url()
      })
    )
    .optional(),

  // education
  education: z
    .array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        field: z.string(),
        start: z.string(),
        end: z.string(),
        score: z.string().optional()
      })
    )
    .optional(),

  // projects
  projects: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        features: z.array(z.string()),
        start: z.string(),
        end: z.string(),
        liveUrl: z.string().url(),
        repoUrl: z.string().url()
      })
    )
    .optional(),

  // experience
  experience: z
    .array(
      z.object({
        company: z.string(),
        title: z.string(),
        start: z.string(),
        end: z.string(),
        description: z.string()
      })
    )
    .optional()
});
