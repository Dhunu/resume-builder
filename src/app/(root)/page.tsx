'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { resumeSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Home() {
  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      // header
      name: '',
      title: '',

      // contact
      email: '',
      phone: '',
      address: '',
      portfolio: '',

      // profile
      profile: '',

      // skills
      skills: [''],

      // certifications
      certifications: [{ title: '', authority: '', date: '', url: '' }],

      // education
      education: [
        { institution: '', degree: '', start: '', end: '', score: '' }
      ],

      // projects
      projects: [
        {
          title: '',
          description: '',
          features: [''],
          start: '',
          end: '',
          liveUrl: '',
          repoUrl: ''
        }
      ],

      // experience
      experience: [
        { title: '', company: '', start: '', end: '', description: '' }
      ]
    }
  });

  const addMoreCretificate = () => {};

  const addMoreEducation = () => {};

  const addMoreProjects = () => {};

  const addMoreExperience = () => {};
  return (
    <main className="mt-10 grid grid-cols-2 gap-5 px-5 md:px-10">
      {/* Resume Editor */}
      <div className="flex max-h-[88vh] w-full flex-col overflow-y-scroll border-r pb-20">
        <Form {...form}>
          <form className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-2 p-2">
              <h1 className="text-2xl font-semibold uppercase">
                Personal Information
              </h1>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Angel Saikia" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className="text-gray-400">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Full Stack Web Developer"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-2 p-2">
              <h1 className="text-2xl font-semibold uppercase">
                Contact Information
              </h1>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="angelsaikia333@gmail.com"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+91-8011158661" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nagaon, Assam, India" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pin Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="782003" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio/ LinkedIn</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://angelsaikia.com" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* About */}
            <div className="space-y-2 p-2">
              <h1 className="text-2xl font-semibold uppercase">About</h1>
              <FormField
                control={form.control}
                name="profile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="A full stack web developer with 3 years of experience"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Skills */}
            <div className="space-y-2 p-2">
              <h1 className="text-2xl font-semibold uppercase">
                Skills (Optional)
              </h1>
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="React.js, Node.js, TypeScript, Next.js"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Certification */}
            <div className="space-y-2 p-2">
              <h1 className="text-2xl font-semibold uppercase">
                Certification (Optional)
              </h1>
              <FormField
                control={form.control}
                name="certifications"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Title"
                            value={field.value?.[0]?.title}
                            className="w-2/3"
                          />
                          <Input
                            placeholder="Issue Date"
                            value={field.value?.[0]?.date}
                            className="w-1/3"
                          />
                        </div>
                        <Input
                          placeholder="Authority"
                          value={field.value?.[0]?.authority}
                        />
                        <Input
                          placeholder="URL"
                          value={field.value?.[0]?.url}
                        />
                      </div>
                    </FormControl>
                    <Button type="button" onClick={addMoreCretificate}>
                      Add More
                    </Button>
                  </FormItem>
                )}
              />
            </div>

            {/* Education */}
            <div className="space-y-2 p-2">
              <h1 className="text-2xl font-semibold uppercase">
                Education (Optional)
              </h1>
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Input
                          placeholder="Institutuion"
                          value={field.value?.[0]?.institution}
                        />
                        <Input
                          placeholder="Degree"
                          value={field.value?.[0]?.degree}
                        />
                        <Input
                          placeholder="Field of Study"
                          value={field.value?.[0]?.field}
                        />

                        <div className="flex gap-2">
                          <Input
                            placeholder="Start Date"
                            value={field.value?.[0]?.start}
                          />
                          <Input
                            placeholder="End Date"
                            value={field.value?.[0]?.end}
                          />
                        </div>
                        <Input
                          placeholder="Score (Optional)"
                          value={field.value?.[0]?.score}
                        />
                      </div>
                    </FormControl>
                    <Button type="button" onClick={addMoreEducation}>
                      Add More
                    </Button>
                  </FormItem>
                )}
              />
            </div>

            {/* Projects */}
            <div className="space-y-2 p-2">
              <h1 className="text-2xl font-semibold uppercase">
                Projects (Optional)
              </h1>
              <FormField
                control={form.control}
                name="projects"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Input
                          placeholder="Title"
                          value={field.value?.[0]?.title}
                        />
                        <Textarea
                          placeholder="Description"
                          value={field.value?.[0]?.description}
                        />

                        <div className="flex flex-col gap-2">
                          <h2 className="text-lg font-medium text-muted-foreground">
                            Features
                          </h2>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Features"
                              value={field.value?.[0]?.features?.[0]}
                            />
                            <Button type="button" className="w-24">
                              Add
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Start Date"
                            value={field.value?.[0]?.start}
                          />
                          <Input
                            placeholder="End Date"
                            value={field.value?.[0]?.end}
                          />
                        </div>
                        <Input
                          placeholder="URL"
                          value={field.value?.[0]?.liveUrl}
                        />
                        <Input
                          placeholder="Repository URL"
                          value={field.value?.[0]?.repoUrl}
                        />
                      </div>
                    </FormControl>
                    <Button type="button" onClick={addMoreProjects}>
                      Add More
                    </Button>
                  </FormItem>
                )}
              />
            </div>

            {/* Experience */}
            <div className="space-y-2 p-2">
              <h1 className="text-2xl font-semibold uppercase">
                Experience (Optional)
              </h1>
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Input
                          placeholder="Conpany Name"
                          value={field.value?.[0]?.company}
                        />
                        <Input
                          placeholder="Designation"
                          value={field.value?.[0]?.title}
                        />

                        <div className="flex gap-2">
                          <Input
                            placeholder="Start Date"
                            value={field.value?.[0]?.start}
                          />
                          <Input
                            placeholder="End Date"
                            value={field.value?.[0]?.end}
                          />
                        </div>

                        <Textarea
                          placeholder="Description"
                          value={field.value?.[0]?.description}
                        />
                      </div>
                    </FormControl>
                    <Button type="button" onClick={addMoreExperience}>
                      Add More
                    </Button>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
      {/* Resume Preview */}
      <div className="h-20 w-full bg-red-500"></div>
    </main>
  );
}
