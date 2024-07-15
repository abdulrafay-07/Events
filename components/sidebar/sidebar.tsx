import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

import { PageList } from "./page-list";

import { cn } from "@/lib/utils";

const font = Poppins({
   subsets: ["latin"],
   weight: ["600"],
});

export const Sidebar = () => {
   return (
      <div className="bg-white shadow-2xl py-4 flex flex-col justify-between w-full max-w-[18rem]">
         <div className="flex flex-col gap-10">
            <Link href="/" className="pr-10 pl-4">
               <div className="flex gap-x-4 items-center">
                  <Image
                     src="/events.png"
                     alt="logo"
                     width={40}
                     height={40}
                  />
                  <span
                     className={cn(
                        "font-semibold text-2xl",
                        font.className
                     )}
                  >
                     Events
                  </span>
               </div>
            </Link>
            <PageList />
         </div>
      </div>
   )
};