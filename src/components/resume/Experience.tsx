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
import { experienceSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import Link from "next/link";
import { TagsInput } from "react-tag-input-component";
import toast from "react-hot-toast";

export default function Experience() {
  const { experience, setExperience } = useResume();

  const deleteExperience = (id: number) => {
    const newExperience = experience.filter((exp) => exp.id !== id);
    setExperience(newExperience);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.experience = newExperience;
    localStorage.setItem("resume_data", JSON.stringify(resume_data));
  };

  return (
    <div className="flex w-full justify-center gap-5">
      <h1 className="flex w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3">
        <div className="-rotate-90">E</div>
        <div className="-rotate-90">X</div>
        <div className="-rotate-90">P</div>
        <div className="-rotate-90">E</div>
        <div className="-rotate-90">R</div>
        <div className="-rotate-90">I</div>
        <div className="-rotate-90">E</div>
        <div className="-rotate-90">N</div>
        <div className="-rotate-90">C</div>
        <div className="-rotate-90">E</div>
      </h1>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap gap-5">
          {experience.map((exp, index) => (
            <div
              className="flex w-full justify-start gap-3 rounded-lg border bg-neutral-50 px-4 py-2 text-base"
              key={index}
            >
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex w-full justify-between">
                  <h2 className="text-lg font-medium">{exp.company}</h2>
                  <div className="flex gap-5">
                    <EditExperience id={exp.id} />
                    <Dialog>
                      <DialogTrigger asChild>
                        <MdDelete className="h-5 w-5 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="flex flex-row">
                          Are you sure you want to delete
                          <span className="mx-1 font-semibold">
                            {exp.company}
                          </span>
                          ?
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              variant="destructive"
                              onClick={() => deleteExperience(exp.id)}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-base">
                  <h3 className="font-medium">Company Name:</h3>
                  <p className="text-sm font-light">{exp.company}</p>
                </div>
                <div className="flex items-center gap-2 text-base">
                  <h3 className="font-medium">Position:</h3>
                  <p className="text-sm font-light">{exp.position}</p>
                </div>
                <div className="flex gap-5">
                  <div className="flex items-center gap-2 text-base">
                    <h3 className="font-medium">Start Date:</h3>
                    <p className="text-sm font-light">{exp.start_date}</p>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <h3 className="font-medium">End Date:</h3>
                    <p className="text-sm font-light">{exp.end_date}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium">Responsibilities:</h3>
                  <ul className="list-inside list-disc">
                    {exp.responsibilities.map((resp, index) => (
                      <li key={index} className="text-sm font-light">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const AddExperience = () => {
  const { experience, setExperience } = useResume();

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      id: experience.length + 1,
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      responsibilities: []
    }
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof experienceSchema>) => {
    setExperience([...experience, data]);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.experience = [...experience, data];
    localStorage.setItem("resume_data", JSON.stringify(resume_data));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start font-medium"
          size="sm"
          variant="ghost"
        >
          {experience.length === 0
            ? "Add Experience"
            : "Add Another Experience"}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full max-h-[80vh] overflow-y-scroll py-10">
        <h2 className="w-full text-center text-2xl font-semibold">
          Experience Details
        </h2>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Google" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Software Developer I" />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Dec 2021" />
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
                      <Input {...field} placeholder="Jan 2023" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibilities</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onChange={field.onChange}
                      name="responsibilities"
                      placeHolder="Add a responsibility"
                      onExisting={(technology) => technology}
                      beforeAddValidate={(technology, existingTechnologies) => {
                        if (existingTechnologies.includes(technology)) {
                          toast.error("Technology already exists");
                          return false;
                        }
                        toast.success("Technology added");
                        return true;
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" size="sm">
              Add Experience
            </Button>
          </form>
        </Form>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};

export const EditExperience = ({ id }: { id: number }) => {
  const { experience, setExperience } = useResume();

  const exp = experience.find((exp) => exp.id === id);

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      ...exp
    }
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof experienceSchema>) => {
    setExperience([...experience, data]);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.experience = [...experience, data];
    localStorage.setItem("resume_data", JSON.stringify(resume_data));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <MdEditDocument className="h-5 w-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="h-full max-h-[80vh] overflow-y-scroll py-10">
        <h2 className="w-full text-center text-2xl font-semibold">
          Experience Details
        </h2>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Google" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Software Developer I" />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Dec 2021" />
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
                      <Input {...field} placeholder="Jan 2023" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibilities</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onChange={field.onChange}
                      name="responsibilities"
                      placeHolder="Add a responsibility"
                      onExisting={(technology) => technology}
                      beforeAddValidate={(technology, existingTechnologies) => {
                        if (existingTechnologies.includes(technology)) {
                          toast.error("Technology already exists");
                          return false;
                        }
                        toast.success("Technology added");
                        return true;
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" size="sm">
              Add Experience
            </Button>
          </form>
        </Form>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};
