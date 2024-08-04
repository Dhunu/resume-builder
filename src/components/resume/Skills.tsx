"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";

import useResume from "@/hooks/useResume";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command";
import useDropdownMenu from "@/hooks/useDropdownMenu";
import { useForm } from "react-hook-form";
import { skillSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";

export default function Skills() {
  const { skills, setSkills } = useResume();

  const deleteSkill = (id: number) => {
    const newSkills = skills.filter((skill) => skill.id !== id);
    setSkills(newSkills);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.skills = newSkills;
    localStorage.setItem("resume_data", JSON.stringify(resume_data));
  };
  return (
    <div className="mb-10 flex w-full flex-col gap-2 md:flex-row md:gap-5">
      <h1 className="hidden w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3 md:flex">
        <div className="-rotate-90">S</div>
        <div className="-rotate-90">K</div>
        <div className="-rotate-90">I</div>
        <div className="-rotate-90">L</div>
        <div className="-rotate-90">L</div>
        <div className="-rotate-90">S</div>
      </h1>
      <h1 className="flex justify-evenly rounded-lg border bg-neutral-50 py-3 text-base font-semibold uppercase leading-3 md:hidden">
        <div>S</div>
        <div>K</div>
        <div>I</div>
        <div>L</div>
        <div>L</div>
        <div>S</div>
      </h1>
      <div className="flex flex-1 flex-col">
        <div className="flex w-full flex-col gap-2 md:flex-row md:flex-wrap md:gap-5">
          {skills.map((skill, index) => (
            <div
              className="flex w-full items-center justify-between gap-2 md:w-auto"
              key={index}
            >
              <div className="left-3 flex items-center gap-2 rounded-lg border bg-neutral-50 p-2 text-base">
                <span className="font-semibold">{skill.name}</span>
                <span>-</span>
                <span>{skill.proficiency}</span>
              </div>

              <Dialog>
                <DialogTrigger>
                  <MdDelete className="h-5 w-5 cursor-pointer" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="flex flex-row">
                    Are you sure you want to delete
                    <span className="mx-1 font-semibold">
                      {skill.name}
                    </span>{" "}
                    skill?
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        onClick={() => deleteSkill(skill.id)}
                      >
                        Delete
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const AddSkill = () => {
  const { skills, setSkills } = useResume();
  const { setDropdownOpen } = useDropdownMenu();

  const [open, setOpen] = useState(false);

  const [openProficiency, setOpenProficiency] = useState(false);

  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      id: skills.length + 1,
      name: ""
    }
  });

  const onSubmit = (data: z.infer<typeof skillSchema>) => {
    setSkills([...skills, data]);
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
          {skills.length === 0 ? "Add Skill" : "Add Another Skill"}
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className="mb-10 text-center text-xl font-semibold">
              Add Skill
            </h1>
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="React" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="proficiency"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Proficiency</FormLabel>
                    <FormControl>
                      <Popover
                        open={openProficiency}
                        onOpenChange={setOpenProficiency}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openProficiency}
                            className={cn(
                              "w-full justify-between",
                              field.value && "text-neutral-400"
                            )}
                          >
                            {field.value ? field.value : "Select proficiency"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[221px] p-0">
                          <Command>
                            <CommandInput placeholder="Search proficiency..."></CommandInput>

                            <CommandList>
                              <CommandEmpty>No proficiency found</CommandEmpty>
                              <CommandGroup>
                                <CommandItem
                                  value="beginner"
                                  onSelect={(currentValue) => {
                                    field.onChange(currentValue);
                                    setOpenProficiency(false);
                                  }}
                                >
                                  Beginner
                                </CommandItem>
                                <CommandItem
                                  value="intermediate"
                                  onSelect={(currentValue) => {
                                    field.onChange(currentValue);
                                    setOpenProficiency(false);
                                  }}
                                >
                                  Intermediate
                                </CommandItem>
                                <CommandItem
                                  value="advanced"
                                  onSelect={(currentValue) => {
                                    field.onChange(currentValue);
                                    setOpenProficiency(false);
                                  }}
                                >
                                  Advanced
                                </CommandItem>
                                <CommandItem
                                  value="expert"
                                  onSelect={(currentValue) => {
                                    field.onChange(currentValue);
                                    setOpenProficiency(false);
                                  }}
                                >
                                  Expert
                                </CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-5">
              <Button
                type="button"
                className="w-full"
                variant="destructive"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                  setDropdownOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Add Skill
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
