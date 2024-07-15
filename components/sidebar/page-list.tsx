'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { House, CalendarPlus2, BookPlus } from "lucide-react";

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
         icon: House,
      },
      {
         name: "Create an event",
         href: "/create-event",
         isActive: pathname === "/create-event",
         icon: CalendarPlus2,
      },
      {
         name: "Public events",
         href: "/public-events",
         isActive: pathname === "/public-events",
         icon: BookPlus,
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
                  <page.icon className="mr-2" /> {page.name}
               </Button>
            </Link>
         ))}
      </div>
   )
};