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

export default function Projects() {
  const { projects, setProjects } = useResume();

  if (projects.length === 0) return <AddProject />;

  return (
    <div className="mb-10 flex justify-center gap-5">
      <h1 className="flex w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3">
        <div className="-rotate-90">P</div>
        <div className="-rotate-90">R</div>
        <div className="-rotate-90">O</div>
        <div className="-rotate-90">J</div>
        <div className="-rotate-90">E</div>
        <div className="-rotate-90">C</div>
        <div className="-rotate-90">T</div>
        <div className="-rotate-90">S</div>
      </h1>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-5">
          {projects.map((skill, index) => (
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
        <AddProject />
      </div>
    </div>
  );
}

const AddProject = () => {
  const { projects, setProjects } = useResume();

  const [feature, setFeature] = useState<string>("");
  const [technology, setTechnology] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<{
    name: string;
    features: string[];
    technologies: string[];
    live_link: string;
    repo_link: string;
  }>({
    name: "",
    features: [],
    technologies: [],
    live_link: "",
    repo_link: ""
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Project</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex h-full w-full flex-col gap-5">
          <h1 className="mb-10 text-center text-xl font-semibold">
            Add Project
          </h1>

          <div className="flex flex-col gap-5">
            <div className="w-full">
              <Label>Name</Label>
              <Input
                placeholder="React"
                onChange={(e) =>
                  setProject({ ...project, name: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <Label>Features</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Added authentication with JWT tokens."
                  value={feature}
                  onChange={(e) => setFeature(e.target.value)}
                />
                <Button
                  onClick={() =>
                    setProject({
                      ...project,
                      features: [...project.features, feature]
                    })
                  }
                >
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-col text-sm">
                {project.features.map((feature, index) => (
                  <div className="flex justify-between gap-2" key={index}>
                    <div className="flex flex-wrap gap-1">
                      <span>{index + 1}.</span>
                      <span>{feature}</span>
                    </div>
                    <MdDelete
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => {
                        const newFeatures = project.features.filter(
                          (item) => item !== feature
                        );
                        setProject({ ...project, features: newFeatures });
                      }}
                    />
                  </div>
                ))}
              </div>
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
                  setProjects([
                    ...projects,
                    {
                      id: projects.length + 1,
                      ...project
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
