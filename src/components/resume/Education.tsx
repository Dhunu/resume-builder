"use client";

import { useState } from "react";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useResume from "@/hooks/useResume";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { educationSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import useDropdownMenu from "@/hooks/useDropdownMenu";

export default function Education() {
  const { education, setEducation } = useResume();

  const deleteEducation = (id: number) => {
    const newEducation = education.filter((edu) => edu.id !== id);
    setEducation(newEducation);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.education = newEducation;
    localStorage.setItem("resume_data", JSON.stringify(resume_data));
  };

  return (
    <div className="flex w-full flex-col justify-center gap-2 md:flex-row md:gap-5">
      <h1 className="hidden w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3 md:flex">
        <div className="-rotate-90">E</div>
        <div className="-rotate-90">D</div>
        <div className="-rotate-90">U</div>
        <div className="-rotate-90">C</div>
        <div className="-rotate-90">A</div>
        <div className="-rotate-90">T</div>
        <div className="-rotate-90">I</div>
        <div className="-rotate-90">O</div>
        <div className="-rotate-90">N</div>
      </h1>
      <h1 className="flex justify-evenly rounded-lg border bg-neutral-50 py-3 text-base font-semibold uppercase leading-3 md:hidden">
        <div>E</div>
        <div>D</div>
        <div>U</div>
        <div>C</div>
        <div>A</div>
        <div>T</div>
        <div>I</div>
        <div>O</div>
        <div>N</div>
      </h1>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap gap-2 md:gap-5">
          {education.map((edu, index) => (
            <div
              className="flex w-full justify-start gap-3 rounded-lg border bg-neutral-50 px-4 py-2 text-base"
              key={index}
            >
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex w-full justify-between">
                  <h2 className="text-lg font-medium">{edu.degree}</h2>
                  <div className="flex gap-2 md:gap-5">
                    <EditEducation id={edu.id} />
                    <Dialog>
                      <DialogTrigger asChild>
                        <MdDelete className="h-5 w-5 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="flex flex-row">
                          Are you sure you want to delete
                          <span className="mx-1 font-semibold">
                            {edu.degree}
                          </span>{" "}
                          ?
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              variant="destructive"
                              onClick={() => deleteEducation(edu.id)}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="flex gap-2 text-base md:items-center">
                  <h3 className="font-medium">Field of Study:</h3>
                  <p className="text-sm font-light">{edu.field_of_study}</p>
                </div>
                <div className="flex gap-2 text-base md:items-center">
                  <h3 className="font-medium">Institution:</h3>
                  <p className="text-sm font-light">{edu.institution}</p>
                </div>
                <div className="flex gap-5">
                  <div className="flex items-center gap-2 text-base">
                    <h3 className="font-medium">Start Date:</h3>
                    <p className="text-sm font-light">{edu.start_date}</p>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <h3 className="font-medium">End Date:</h3>
                    <p className="text-sm font-light">{edu.end_date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const AddEducation = () => {
  const { education, setEducation } = useResume();
  const { setDropdownOpen } = useDropdownMenu();

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      id: education.length + 1,
      degree: "",
      field_of_study: "",
      institution: "",
      start_date: "",
      end_date: ""
    }
  });

  const onSubmit = (data: z.infer<typeof educationSchema>) => {
    setEducation([...education, data]);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.education = [...education, data];
    localStorage.setItem("resume_data", JSON.stringify(resume_data));
    setOpen(false);
    form.reset();
    setDropdownOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start font-medium"
          size="sm"
          variant="ghost"
        >
          {education.length === 0 ? "Add Education" : "Add Another Education"}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full max-h-[80vh] overflow-y-scroll py-5">
        <h2 className="w-full text-center text-2xl font-semibold">
          Education Details
        </h2>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Bachelor of Science" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="field_of_study"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field of Study</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Data Science and Application"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Indian Institute of Information Technology, Madras"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="2022" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Present" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-5">
              <Button
                className="w-full"
                size="sm"
                variant="destructive"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                  setDropdownOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full" size="sm">
                Add Project
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const EditEducation = ({ id }: { id: number }) => {
  const { education, setEducation } = useResume();

  const edu = education.find((edu) => edu.id === id);

  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      ...edu
    }
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof educationSchema>) => {
    setEducation([...education, data]);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.education = [...education, data];
    localStorage.setItem("resume_data", JSON.stringify(resume_data));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <MdEditDocument className="h-5 w-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="h-full max-h-[80vh] overflow-y-scroll py-5">
        <h2 className="w-full text-center text-2xl font-semibold">
          Project Details
        </h2>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Bachelor of Science" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="field_of_study"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field of Study</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Data Science and Application"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Indian Institute of Information Technology, Madras"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="2022" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Present" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" size="sm">
              Add Project
            </Button>
          </form>
        </Form>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};
