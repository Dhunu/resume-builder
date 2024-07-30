"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import {
  resumeSchemaRequired,
  skillSchema,
  certificationSchema,
  educationSchema,
  projectSchema,
  experienceSchema,
  skillProficiency
} from "@/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const pdfOptions = {
  resolution: Resolution.HIGH,
  page: {
    margin: Margin.SMALL,
    format: "a4",
    orientation: "portrait"
  },
  canvas: {
    mimeType: "image/png",
    quantityRatio: 1
  },
  overrides: {
    pdf: {
      compress: true
    },
    canvas: {
      useCORS: true
    }
  }
};

export default function Home() {
  const resumeRequiredForm = useForm<z.infer<typeof resumeSchemaRequired>>({
    resolver: zodResolver(resumeSchemaRequired),
    defaultValues: {
      name: "",
      title: "",
      email: "",
      phone: "",
      address: "",
      pincode: "",
      portfolio_or_linkedin_profile: "",
      profile: ""
    }
  });

  const skillForm = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      proficiency: undefined
    }
  });

  const certificationForm = useForm<z.infer<typeof certificationSchema>>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      title: "",
      issue_authority: "",
      issue_date: "",
      certificate_url: ""
    }
  });

  const educationForm = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      field_of_stydy: "",
      start_date: "",
      end_date: "",
      percentage_or_cgpa: ""
    }
  });

  const projectForm = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      features: [],
      start_date: "",
      end_date: "",
      live_url: "",
      repo_url: ""
    }
  });

  const experienceForm = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      designation: "",
      start_date: "",
      end_date: "",
      description: ""
    }
  });

  const [skills, setSkills] = useState<z.infer<typeof skillSchema>[]>([]);
  const [skillModelOpen, setSkillModelOpen] = useState(false);
  return (
    <main className="grid grid-cols-2 gap-5 md:gap-10">
      {/* Resume Editor */}
      <div className="flex h-[90vh] w-full flex-col gap-5 overflow-y-scroll px-5 md:px-10">
        {/* Mandatory Fields */}
        <Form {...resumeRequiredForm}>
          <form className="space-y-6">
            <div className="mb-10 flex justify-center gap-5">
              <h1 className="flex w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3">
                <div className="-rotate-90">H</div>
                <div className="-rotate-90">E</div>
                <div className="-rotate-90">A</div>
                <div className="-rotate-90">D</div>
                <div className="-rotate-90">E</div>
                <div className="-rotate-90">R</div>
              </h1>
              <div className="flex flex-1 flex-col gap-5">
                <FormField
                  control={resumeRequiredForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Angel Saikia" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={resumeRequiredForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Title</FormLabel>
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
            </div>
            <div className="flex justify-center gap-5">
              <h1 className="flex w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3">
                <div className="-rotate-90">C</div>
                <div className="-rotate-90">O</div>
                <div className="-rotate-90">N</div>
                <div className="-rotate-90">T</div>
                <div className="-rotate-90">A</div>
                <div className="-rotate-90">C</div>
                <div className="-rotate-90">T</div>
              </h1>
              <div className="flex flex-1 flex-col gap-5">
                <FormField
                  control={resumeRequiredForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="developer@angelsaikia.com"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={resumeRequiredForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nagaon, Assam, India" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-5">
                  <FormField
                    control={resumeRequiredForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="+91-8011158661" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={resumeRequiredForm.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="782003" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={resumeRequiredForm.control}
                  name="portfolio_or_linkedin_profile"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Portfolio/ LinkedIn Profile</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://angelsaikia.com"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mb-10 flex justify-center gap-5">
              <h1 className="flex w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3">
                <div className="-rotate-90">D</div>
                <div className="-rotate-90">E</div>
                <div className="-rotate-90">S</div>
                <div className="-rotate-90">C</div>
                <div className="-rotate-90">R</div>
                <div className="-rotate-90">I</div>
                <div className="-rotate-90">P</div>
                <div className="-rotate-90">T</div>
                <div className="-rotate-90">I</div>
                <div className="-rotate-90">O</div>
                <div className="-rotate-90">N</div>
              </h1>
              <div className="flex flex-1 flex-col gap-5">
                <FormField
                  control={resumeRequiredForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Full Stack Web Developer"
                          className="h-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>

        <div className="flex flex-wrap justify-between gap-5">
          {/* Skills */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Skill</Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex h-full w-full flex-col">
                <h1 className="mb-10 text-center text-xl font-semibold">
                  Add Skill
                </h1>
                <Form {...skillForm}>
                  <form className="flex gap-5 space-y-2">
                    <FormField
                      control={skillForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-[200px] flex-1">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="React" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={skillForm.control}
                      name="proficiency"
                      render={({ field }) => (
                        <FormItem className="flex w-[200px] flex-col">
                          <FormLabel>Proficiency</FormLabel>

                          <Popover
                            open={skillModelOpen}
                            onOpenChange={setSkillModelOpen}
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={skillModelOpen}
                                  className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-neutral-400"
                                  )}
                                >
                                  {field.value
                                    ? field.value
                                    : "Select proficiency"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search proficiency..."></CommandInput>

                                <CommandList>
                                  <CommandEmpty>
                                    No proficiency found
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem
                                      value={skillProficiency.beginner}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Beginner
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.intermediate}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Intermediate
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.advanced}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Advanced
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.expert}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Expert
                                    </CommandItem>
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

          {/* Certification */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Certificate</Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex h-full w-full flex-col">
                <h1 className="mb-10 text-center text-xl font-semibold">
                  Add Skill
                </h1>
                <Form {...skillForm}>
                  <form className="flex gap-5 space-y-2">
                    <FormField
                      control={skillForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-[200px] flex-1">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="React" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={skillForm.control}
                      name="proficiency"
                      render={({ field }) => (
                        <FormItem className="flex w-[200px] flex-col">
                          <FormLabel>Proficiency</FormLabel>

                          <Popover
                            open={skillModelOpen}
                            onOpenChange={setSkillModelOpen}
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={skillModelOpen}
                                  className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-neutral-400"
                                  )}
                                >
                                  {field.value
                                    ? field.value
                                    : "Select proficiency"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search proficiency..."></CommandInput>

                                <CommandList>
                                  <CommandEmpty>
                                    No proficiency found
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem
                                      value={skillProficiency.beginner}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Beginner
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.intermediate}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Intermediate
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.advanced}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Advanced
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.expert}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Expert
                                    </CommandItem>
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

          {/* Education */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Education</Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex h-full w-full flex-col">
                <h1 className="mb-10 text-center text-xl font-semibold">
                  Add Skill
                </h1>
                <Form {...skillForm}>
                  <form className="flex gap-5 space-y-2">
                    <FormField
                      control={skillForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-[200px] flex-1">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="React" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={skillForm.control}
                      name="proficiency"
                      render={({ field }) => (
                        <FormItem className="flex w-[200px] flex-col">
                          <FormLabel>Proficiency</FormLabel>

                          <Popover
                            open={skillModelOpen}
                            onOpenChange={setSkillModelOpen}
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={skillModelOpen}
                                  className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-neutral-400"
                                  )}
                                >
                                  {field.value
                                    ? field.value
                                    : "Select proficiency"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search proficiency..."></CommandInput>

                                <CommandList>
                                  <CommandEmpty>
                                    No proficiency found
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem
                                      value={skillProficiency.beginner}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Beginner
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.intermediate}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Intermediate
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.advanced}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Advanced
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.expert}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Expert
                                    </CommandItem>
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

          {/* Project */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Project</Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex h-full w-full flex-col">
                <h1 className="mb-10 text-center text-xl font-semibold">
                  Add Skill
                </h1>
                <Form {...skillForm}>
                  <form className="flex gap-5 space-y-2">
                    <FormField
                      control={skillForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-[200px] flex-1">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="React" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={skillForm.control}
                      name="proficiency"
                      render={({ field }) => (
                        <FormItem className="flex w-[200px] flex-col">
                          <FormLabel>Proficiency</FormLabel>

                          <Popover
                            open={skillModelOpen}
                            onOpenChange={setSkillModelOpen}
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={skillModelOpen}
                                  className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-neutral-400"
                                  )}
                                >
                                  {field.value
                                    ? field.value
                                    : "Select proficiency"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search proficiency..."></CommandInput>

                                <CommandList>
                                  <CommandEmpty>
                                    No proficiency found
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem
                                      value={skillProficiency.beginner}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Beginner
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.intermediate}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Intermediate
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.advanced}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Advanced
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.expert}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Expert
                                    </CommandItem>
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

          {/* Experience */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Experience</Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex h-full w-full flex-col">
                <h1 className="mb-10 text-center text-xl font-semibold">
                  Add Skill
                </h1>
                <Form {...skillForm}>
                  <form className="flex gap-5 space-y-2">
                    <FormField
                      control={skillForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-[200px] flex-1">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="React" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={skillForm.control}
                      name="proficiency"
                      render={({ field }) => (
                        <FormItem className="flex w-[200px] flex-col">
                          <FormLabel>Proficiency</FormLabel>

                          <Popover
                            open={skillModelOpen}
                            onOpenChange={setSkillModelOpen}
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={skillModelOpen}
                                  className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-neutral-400"
                                  )}
                                >
                                  {field.value
                                    ? field.value
                                    : "Select proficiency"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search proficiency..."></CommandInput>

                                <CommandList>
                                  <CommandEmpty>
                                    No proficiency found
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem
                                      value={skillProficiency.beginner}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Beginner
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.intermediate}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Intermediate
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.advanced}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Advanced
                                    </CommandItem>
                                    <CommandItem
                                      value={skillProficiency.expert}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setSkillModelOpen(false);
                                      }}
                                    >
                                      Expert
                                    </CommandItem>
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="px-5 md:px-10">
        <div className="aspect-[1.41/1] border" id="resume-preview">
          <div className="grid h-full w-full grid-cols-3">
            <div className="col-span-1 h-full bg-blue-500"></div>
            <div className="col-span-2 h-full bg-red-500">
              <div className="flex h-[50%] w-full flex-col justify-center bg-slate-100 px-20">
                <h1 className="text-4xl font-semibold uppercase">
                  {resumeRequiredForm.getValues("name").split(" ")[0]}
                </h1>
                <h3 className="text-lg font-medium italic">
                  Full Stack Web Developer
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
