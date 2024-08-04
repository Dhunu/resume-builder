"use client";

import { useState } from "react";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagsInput } from "react-tag-input-component";

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
import { projectSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import toast from "react-hot-toast";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import useDropdownMenu from "@/hooks/useDropdownMenu";

export default function Projects() {
  const { projects, setProjects } = useResume();

  const deleteProject = (id: number) => {
    const newProjects = projects.filter((project) => project.id !== id);
    setProjects(newProjects);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.projects = newProjects;
    localStorage.setItem("resume_data", JSON.stringify(resume_data));
  };

  return (
    <div className="flex w-full flex-col justify-center gap-2 md:flex-row md:gap-5">
      <h1 className="hidden w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3 md:flex">
        <div className="-rotate-90">P</div>
        <div className="-rotate-90">R</div>
        <div className="-rotate-90">O</div>
        <div className="-rotate-90">J</div>
        <div className="-rotate-90">E</div>
        <div className="-rotate-90">C</div>
        <div className="-rotate-90">T</div>
        <div className="-rotate-90">S</div>
      </h1>
      <h1 className="flex justify-evenly rounded-lg border bg-neutral-50 py-3 text-base font-semibold uppercase leading-3 md:hidden">
        <div>P</div>
        <div>R</div>
        <div>O</div>
        <div>J</div>
        <div>E</div>
        <div>C</div>
        <div>T</div>
        <div>S</div>
      </h1>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap gap-2 md:gap-5">
          {projects.map((project, index) => (
            <div
              className="flex w-full justify-start gap-3 rounded-lg border bg-neutral-50 px-4 py-2 text-base"
              key={index}
            >
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex w-full justify-between">
                  <h2 className="text-lg font-medium">{project.name}</h2>
                  <div className="flex gap-2 md:gap-5">
                    <EditProject id={project.id} />
                    <Dialog>
                      <DialogTrigger asChild>
                        <MdDelete className="h-5 w-5 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="flex flex-row">
                          Are you sure you want to delete
                          <span className="mx-1 font-semibold">
                            {project.name}
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
                              onClick={() => deleteProject(project.id)}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-normal">Features:</h3>
                  <p className="text-sm font-light">{project.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-normal">Technologies Used:</h3>
                  <ul className="flex list-disc flex-col gap-1 pl-5">
                    {project.technologies.map((technology, index) => (
                      <li className="text-sm font-light" key={technology}>
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
                {project.live_link && (
                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <h3 className="text-base font-normal">Live Link:</h3>
                    <Link
                      href={project.live_link}
                      className="truncate text-sm underline"
                    >
                      {project.live_link}
                    </Link>
                  </div>
                )}

                {project.repo_link && (
                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <h3 className="text-base font-normal">Repository Link:</h3>
                    <Link
                      href={project.repo_link}
                      className="text-sm underline"
                    >
                      {project.repo_link}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const AddProject = () => {
  const { projects, setProjects } = useResume();
  const { dropdownOpen, setDropdownOpen } = useDropdownMenu();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      id: projects.length + 1,
      name: "",
      description: "",
      technologies: [],
      live_link: "",
      repo_link: ""
    }
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof projectSchema>) => {
    setProjects([...projects, data]);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.projects = [...projects, data];
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
          {projects.length === 0 ? "Add Project" : "Add Another Project"}
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="h-full max-h-[80vh] overflow-y-scroll py-5"
      >
        <h2 className="w-full text-center text-2xl font-semibold">
          Project Details
        </h2>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Blogify" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="A blog application" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onChange={field.onChange}
                      name="technologies"
                      placeHolder="React.js, Next.js, TailwindCSS"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="live_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://blogify.angelsaikia.com"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Link to the live version of the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repo_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://github.com/blogify"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Link to the repository of the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-5">
              <Button
                variant="destructive"
                type="button"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                  setDropdownOpen(false);
                }}
                size="sm"
                className="w-full"
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

export const EditProject = ({ id }: { id: number }) => {
  const { projects, setProjects } = useResume();

  const project = projects.find((project) => project.id === id);

  if (!project) return;

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      id: project.id,
      name: project.name,
      description: project.description,
      technologies: project.technologies,
      live_link: project.live_link,
      repo_link: project.repo_link
    }
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof projectSchema>) => {
    setProjects([...projects, data]);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.projects = [...projects, data];
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
          Project Details
        </h2>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Blogify" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Features</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="A blog application" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Technologies</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onChange={field.onChange}
                      name="technologies"
                      placeHolder="React.js, Next.js, TailwindCSS"
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
            <FormField
              control={form.control}
              name="live_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://blogify.angelsaikia.com"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repo_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://github.com/blogify"
                    />
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
