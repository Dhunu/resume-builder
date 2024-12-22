import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/ThemeProvider";
import CustomClerkProvider from "@/providers/CustomClerkProvider";

const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://resume-builder.angelsaikia.com"),
  title: "Resume Builder - Build resume in seconds",
  description:
    "A simple resume builder, build your resume in minutes, download it as PDF",
  openGraph: {
    title: "Resume Builder - Build resume in seconds",
    description:
      "A simple resume builder, build your resume in minutes, download it as PDF",
    type: "website",
    locale: "en_IN",
    url: "https://resume-builder.angelsaikia.com",
    siteName: "Resume Builder"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CustomClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen font-roboto antialiased",
            fontRoboto.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </CustomClerkProvider>
  );
}
