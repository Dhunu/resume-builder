import Image from "next/image";
import React from "react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="group relative h-40 w-40 overflow-hidden rounded-lg">
        <Image
          src="/images/img.jpg"
          width={160}
          height={160}
          className="absolute top-0 z-10 scale-125 object-cover opacity-100 duration-500 group-hover:-z-10 group-hover:rotate-45 group-hover:scale-[200%] group-hover:opacity-0"
          alt="Profile Picture"
        />
        <Image
          src="/images/sumu.jpg"
          width={160}
          height={160}
          alt="Profile Picture"
          className="-z-10 opacity-50 duration-300 group-hover:z-10 group-hover:scale-95 group-hover:opacity-100"
        />
        <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/40 opacity-0 group-hover:opacity-100" />
        <div className="absolute left-0 top-0 -z-10 flex h-full w-full scale-50 items-center justify-center text-2xl font-bold text-white group-hover:z-30 group-hover:scale-100 group-hover:delay-200 group-hover:duration-500">
          Abhinab
        </div>
      </div>
    </div>
  );
}
