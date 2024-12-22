import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { testimonials } from "@/constants";

export default function Testimonials() {
  return (
    <div className="relative flex h-[40rem] flex-col items-center justify-center overflow-hidden rounded-md antialiased">
      <h1 className="py-5 text-center text-2xl font-bold text-white sm:py-20 sm:text-4xl lg:text-5xl">
        Testimonials
      </h1>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
