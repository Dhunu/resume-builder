"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Resume = {
  description: string;
  title: string;
  tags: string[];
  src: string;
};
export const AnimatedResumeDesign = ({
  resumes,
  autoplay = false
}: {
  resumes: Resume[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % resumes.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + resumes.length) % resumes.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div className="mx-auto max-w-sm px-4 py-5 font-sans antialiased sm:py-20 md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-10 sm:gap-32 md:grid-cols-2">
        <div>
          <div className="relative h-[60vh] w-full">
            <AnimatePresence>
              {resumes.map((resume, index) => (
                <motion.div
                  key={resume.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY()
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : resumes.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY()
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 flex origin-bottom items-center justify-center"
                >
                  <Image
                    src={resume.src}
                    alt={resume.title}
                    width={1000}
                    height={1500}
                    draggable={false}
                    className="aspect-[1/1.414] w-[70vw] rounded-xl object-fill object-center sm:h-[475px]"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            exit={{
              y: -20,
              opacity: 0
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut"
            }}
          >
            <h3 className="text-center text-2xl font-bold text-black dark:text-white sm:text-left">
              {resumes[active].title}
            </h3>
            <p className="text-center text-sm text-gray-500 dark:text-neutral-500 sm:text-left">
              {resumes[active].description}
            </p>
            <motion.p className="mt-8 text-center text-lg text-gray-500 dark:text-neutral-300 sm:text-left">
              {resumes[active].tags.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex justify-center gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
