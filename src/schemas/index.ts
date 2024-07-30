import { z } from 'zod';

export const enum skillProficiency {
  beginner = 'Beginner',
  intermediate = 'Intermediate',
  advanced = 'Advanced',
  expert = 'Expert'
}

export const resumeSchemaRequired = z.object({
  // header
  name: z.string(),
  title: z.string(),

  // contact
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  pincode: z.string(),
  portfolio_or_linkedin_profile: z.string().url(),

  // profile
  profile: z.string()
});

export const skillSchema = z.object({
  name: z.string(),
  proficiency: z
    .enum(['beginner', 'intermediate', 'advanced', 'expert'])
    .optional()
});

export const certificationSchema = z.object({
  title: z.string(),
  issue_authority: z.string(),
  issue_date: z.string(),
  certificate_url: z.string().url()
});

export const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field_of_stydy: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  percentage_or_cgpa: z.string().optional()
});

export const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  start_date: z.string(),
  end_date: z.string(),
  live_url: z.string().url(),
  repo_url: z.string().url()
});

export const experienceSchema = z.object({
  company: z.string(),
  designation: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  description: z.string()
});
