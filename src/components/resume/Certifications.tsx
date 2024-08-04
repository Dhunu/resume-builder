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
import { certificationSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import Link from "next/link";

export default function Certifications() {
  const { certifications, setCertifications } = useResume();

  const deleteEducation = (id: number) => {
    const newCertifications = certifications.filter(
      (certification) => certification.id !== id
    );
    setCertifications(newCertifications);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.education = newCertifications;
    localStorage.setItem("resume_data", JSON.stringify(resume_data));
  };

  return (
    <div className="flex w-full flex-col justify-center gap-2 md:flex-row md:gap-5">
      <h1 className="hidden w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3 md:flex">
        <div className="-rotate-90">C</div>
        <div className="-rotate-90">E</div>
        <div className="-rotate-90">R</div>
        <div className="-rotate-90">T</div>
        <div className="-rotate-90">I</div>
        <div className="-rotate-90">F</div>
        <div className="-rotate-90">I</div>
        <div className="-rotate-90">C</div>
        <div className="-rotate-90">A</div>
        <div className="-rotate-90">T</div>
        <div className="-rotate-90">I</div>
        <div className="-rotate-90">O</div>
        <div className="-rotate-90">N</div>
        <div className="-rotate-90">S</div>
      </h1>
      <h1 className="flex justify-evenly rounded-lg border bg-neutral-50 py-3 text-base font-semibold uppercase leading-3 md:hidden">
        <div>C</div>
        <div>E</div>
        <div>R</div>
        <div>T</div>
        <div>I</div>
        <div>F</div>
        <div>I</div>
        <div>C</div>
        <div>A</div>
        <div>T</div>
        <div>I</div>
        <div>O</div>
        <div>N</div>
        <div>S</div>
      </h1>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap gap-2 md:gap-5">
          {certifications.map((certification, index) => (
            <div
              className="flex w-full justify-start gap-3 rounded-lg border bg-neutral-50 px-4 py-2 text-base"
              key={index}
            >
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex w-full justify-between">
                  <h2 className="text-lg font-medium">{certification.name}</h2>
                  <div className="flex gap-2 md:gap-5">
                    <EditCertification id={certification.id} />
                    <Dialog>
                      <DialogTrigger asChild>
                        <MdDelete className="h-5 w-5 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="flex flex-row">
                          Are you sure you want to delete
                          <span className="mx-1 font-semibold">
                            {certification.name}
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
                              onClick={() => deleteEducation(certification.id)}
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
                  <h3 className="font-medium">Name:</h3>
                  {certification.link ? (
                    <Link
                      href={certification.link}
                      className="text-sm font-light underline"
                    >
                      {certification.name}
                    </Link>
                  ) : (
                    <p className="text-sm font-light">{certification.name}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-base">
                  <h3 className="font-medium">Issued By:</h3>
                  <p className="text-sm font-light">
                    {certification.issued_by}
                  </p>
                </div>
                <div className="flex gap-5">
                  <div className="flex items-center gap-2 text-base">
                    <h3 className="font-medium">Issue Date:</h3>
                    <p className="text-sm font-light">
                      {certification.issue_date}
                    </p>
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

export const AddCertification = () => {
  const { certifications, setCertifications } = useResume();

  const form = useForm<z.infer<typeof certificationSchema>>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      id: certifications.length + 1,
      name: "",
      issued_by: "",
      issue_date: "",
      link: ""
    }
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof certificationSchema>) => {
    setCertifications([...certifications, data]);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.certifications = [...certifications, data];
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
          {certifications.length === 0
            ? "Add Certifications"
            : "Add Another Certifications"}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full max-h-[80vh] overflow-y-scroll py-10">
        <h2 className="w-full text-center text-2xl font-semibold">
          Certifications Details
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
                    <Input {...field} placeholder="What is Data Science?" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issued_by"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issued By</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Coursera | IBM" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issue_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue date</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Dec 2021" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://www.coursera.com/verify/sadansadjad"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" size="sm">
              Add Certification
            </Button>
          </form>
        </Form>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};

export const EditCertification = ({ id }: { id: number }) => {
  const { certifications, setCertifications } = useResume();

  const certification = certifications.find(
    (certification) => certification.id === id
  );

  if (!certification) return;

  const form = useForm<z.infer<typeof certificationSchema>>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      ...certification
    }
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof certificationSchema>) => {
    setCertifications([...certifications, data]);
    const resume_data = JSON.parse(localStorage.getItem("resume_data") || "{}");
    resume_data.certifications = [...certifications, data];
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
          Certification Details
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
                    <Input {...field} placeholder="What is Data Science?" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issued_by"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issued By</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Coursera | IBM" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issue_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue date</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Dec 2021" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://www.coursera.com/verify/sadansadjad"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" size="sm">
              Add Certification
            </Button>
          </form>
        </Form>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};
