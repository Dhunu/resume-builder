"use client";

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";

export default function Hero() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        className="mx-auto max-w-5xl px-4 text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug"
      >
        Elevate your career with a standout <br /> resume{" "}
        <Highlight className="text-black dark:text-white">in minutes</Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
