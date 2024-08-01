import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto"
});

export const metadata: Metadata = {
  title: "Resume Builder - A simple resume builder",
  description:
    "A simple resume builder, build your resume in minutes, download it as PDF"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-roboto min-h-screen antialiased",
          fontRoboto.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
