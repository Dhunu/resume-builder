import Header from "@/components/Header";
import React from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">{children}</div>
        </div>
    );
}
