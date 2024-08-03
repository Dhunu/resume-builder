import useResume from "@/hooks/useResume";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGlobe, FaLocationDot, FaPhone, FaStar } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

export default function ResumePreview() {
  const {
    resumeRef,
    header,
    contact,
    summary,
    skills,
    projects,
    education,
    certifications,
    experience
  } = useResume();
  return (
    <div
      className="mx-auto mb-5 grid aspect-[1/1.41451613] h-[1200px] shrink-0 grid-cols-3 shadow-lg 2xl:mr-10"
      id="resume-preview"
      ref={resumeRef}
    >
      <div className="col-span-1 h-full w-full bg-[#163853] text-white">
        {/* Image */}
        <div className="flex h-[23%] items-center justify-center">
          <Image
            src="/images/img.jpg"
            alt="profile_img"
            width={200}
            height={200}
            className="h-[185px] w-[185px] rounded-full border-[6px] border-white object-cover"
          />
        </div>

        <div className="mx-8 flex flex-col">
          {/* Contact */}
          <div className="w-full">
            <h2 className="font-lato text-[20px] font-extrabold uppercase leading-[28px] tracking-widest">
              CONTACT
            </h2>
            <div className="mt-1 h-0.5 w-full bg-white" />

            <div className="mt-5 flex h-[120px] flex-col justify-between">
              <div className="flex gap-2 text-center">
                <FaPhone className="h-[14px] w-[14px] self-center" />
                <p className="text-[13px]">{contact.phone}</p>
              </div>
              <div className="flex gap-2 text-center">
                <MdAlternateEmail className="h-[14px] w-[14px] self-center" />
                <Link href={`mailto:${contact.email}`} className="text-[13px]">
                  {contact.email}
                </Link>
              </div>
              <div className="flex gap-2 text-center">
                <FaLocationDot className="h-[14px] w-[14px] self-center" />
                <p className="text-[13px]">{contact.location}</p>
              </div>
              <div className="flex gap-2 text-center">
                <FaGlobe className="h-[14px] w-[14px] self-center" />
                <Link href={contact.website} className="text-[13px]">
                  {contact.website}
                </Link>
              </div>
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mt-10 w-full">
              <h2 className="font-lato text-[20px] font-extrabold uppercase leading-[28px] tracking-widest">
                SKILLS
              </h2>
              <div className="mt-1 h-0.5 w-full bg-white" />

              <ul className="mt-5 flex list-disc flex-col gap-5">
                {skills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-5"
                  >
                    <div className="text-sm">{skill.name}</div>
                    {skill.proficiency && (
                      <p className="flex items-center gap-1">
                        {skill.proficiency === "beginner" &&
                          [1, 1].map((_, index) => (
                            <FaStar key={index} className="h-[12px] w-[12px]" />
                          ))}
                        {skill.proficiency === "intermediate" &&
                          [1, 1, 1].map((_, index) => (
                            <FaStar key={index} className="h-[12px] w-[12px]" />
                          ))}
                        {skill.proficiency === "advanced" &&
                          [1, 1, 1, 1].map((_, index) => (
                            <FaStar key={index} className="h-[12px] w-[12px]" />
                          ))}
                        {skill.proficiency === "expert" &&
                          [1, 1, 1, 1, 1].map((_, index) => (
                            <FaStar key={index} className="h-[12px] w-[12px]" />
                          ))}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-2 h-full w-full bg-white">
        {/* Header */}
        <div className="flex h-[23%] w-full flex-col justify-center px-20">
          <h1 className="font-lato text-4xl font-semibold uppercase">
            <span className="font-extrabold text-slate-700">
              {header.name.split(" ")[0]}
            </span>
            {header.name
              .split(" ")
              .slice(1)
              .map((word) => (
                <span className="font-normal text-[#163853]" key={word}>
                  {" "}
                  {word}
                </span>
              ))}
          </h1>
          <p className="my-2 text-xl uppercase text-slate-500">
            {header.title}
          </p>
          <div className="mt-2 h-1 w-16 bg-[#163853]" />
        </div>

        {/* About */}
        <div className="mx-8">
          <h2 className="font-lato text-[20px] font-extrabold uppercase leading-[28px] tracking-widest text-[#163853]">
            About
          </h2>
          <div className="mt-1 h-[2px] w-full bg-[#163853]" />
          <p className="mt-5 h-[120px] text-[13px] text-slate-500">{summary}</p>
        </div>

        {/* Projects */}
        {
          <div className="mx-8 mt-10">
            <h2 className="font-lato text-[20px] font-extrabold uppercase leading-[28px] tracking-widest text-[#163853]">
              PROJECTS
            </h2>
            <div className="mt-1 h-[2px] w-full bg-[#163853]" />
          </div>
        }
      </div>
    </div>
  );
}
