"use client";

import { Label } from "@radix-ui/react-label";
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

export default function Skills() {
  const { skills, setSkills } = useResume();

  if (skills.length === 0) return <AddSkill />;

  const deleteSkill = (id: number) => {
    const newSkills = skills.filter((skill) => skill.id !== id);
    setSkills(newSkills);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.skills = newSkills;
    localStorage.setItem("resume_data", JSON.stringify(resume_data));
  };
  return (
    <div className="mb-10 flex w-full gap-5">
      <h1 className="flex w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3">
        <div className="-rotate-90">S</div>
        <div className="-rotate-90">K</div>
        <div className="-rotate-90">I</div>
        <div className="-rotate-90">L</div>
        <div className="-rotate-90">L</div>
        <div className="-rotate-90">S</div>
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-5">
          {skills.map((skill, index) => (
            <div className="flex items-center gap-2" key={index}>
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
        <div className="mt-5">
          <AddSkill />
        </div>
      </div>
    </div>
  );
}

const AddSkill = () => {
  const { skills, setSkills } = useResume();

  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState<{
    name: string;
    proficiency: string | undefined;
  }>({
    name: "",
    proficiency: undefined
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          {skills.length === 0 ? "Add Skill" : "Add Another Skill"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex h-full w-full flex-col gap-5">
          <h1 className="mb-10 text-center text-xl font-semibold">Add Skill</h1>

          <div className="flex gap-5">
            <div className="w-full">
              <Label>Name</Label>
              <Input
                placeholder="React"
                onChange={(e) => setSkill({ ...skill, name: e.target.value })}
              />
            </div>
            <div className="w-full">
              <Label>Proficiency</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "w-full justify-between",
                      !skill?.proficiency && "text-neutral-400"
                    )}
                  >
                    {skill?.proficiency
                      ? skill.proficiency
                      : "Select proficiency"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search proficiency..."></CommandInput>

                    <CommandList>
                      <CommandEmpty>No proficiency found</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="beginner"
                          onSelect={(currentValue) => {
                            setSkill({ ...skill, proficiency: currentValue });
                            setOpen(false);
                          }}
                        >
                          Beginner
                        </CommandItem>
                        <CommandItem
                          value="intermediate"
                          onSelect={(currentValue) => {
                            setSkill({ ...skill, proficiency: currentValue });
                            setOpen(false);
                          }}
                        >
                          Intermediate
                        </CommandItem>
                        <CommandItem
                          value="advanced"
                          onSelect={(currentValue) => {
                            setSkill({ ...skill, proficiency: currentValue });
                            setOpen(false);
                          }}
                        >
                          Advanced
                        </CommandItem>
                        <CommandItem
                          value="expert"
                          onSelect={(currentValue) => {
                            setSkill({ ...skill, proficiency: currentValue });
                            setOpen(false);
                          }}
                        >
                          Expert
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mx-auto flex gap-5">
            <DialogClose asChild>
              <Button variant="destructive" className="w-20">
                Cancel
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                className="w-20"
                onClick={() => {
                  setSkills([
                    ...skills,
                    {
                      id: skills.length + 1,
                      name: skill?.name || "",
                      proficiency: skill?.proficiency || ""
                    }
                  ]);
                  setOpen(false);
                }}
              >
                Save
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
