'use client'

import { Sidebar } from "@/components/sidebar/sidebar";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({
   children,
}: { children: React.ReactNode }) {
   return (
      <div className="bg-gray-100 flex min-h-screen w-full">
         <Sidebar />
         <SessionProvider>
            <div className="px-8 py-16 w-full">
               {children}
            </div>
         </SessionProvider>
      </div>
   );
};