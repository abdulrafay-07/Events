'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const PageList = () => {
   const [url, setUrl] = useState("/");

   const pathname = usePathname();

   useEffect(() => {
      setUrl(pathname);
   }, [pathname]);

   const pages = [
      {
         name: "Home",
         href: "/",
         isActive: pathname === "/",
      },
      {
         name: "Your events",
         href: "/your-events",
         isActive: pathname === "/your-events",
      },
      {
         name: "Create an event",
         href: "/create-event",
         isActive: pathname === "/create-event",
      },
      {
         name: "Public events",
         href: "/public-events",
         isActive: pathname === "/public-events",
      },
   ];

   return (
      <div className="flex flex-col gap-3 pl-4 pr-7">
         {pages.map((page) => (
            <Link href={page.href} key={page.name}>
               <Button
                  variant={page.isActive ? "secondary" : "ghost"}
                  className="w-full text-xl justify-start"
               >
                  {page.name}
               </Button>
            </Link>
         ))}
      </div>
   )
};