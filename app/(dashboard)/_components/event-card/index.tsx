import Image from "next/image";
import Link from "next/link";

import { Actions } from "@/components/actions";
import { Footer } from "./footer";
import { Overlay } from "./overlay";
import { MoreHorizontal } from "lucide-react";

interface EventCardProps {
   id: unknown;
   name: string;
   type: string;
   category: string;
   eventDate: Date;
};

export const EventCard = ({
   id,
   name,
   type,
   category,
   eventDate,
}: EventCardProps) => {
   return (
      <Link href={`/event/${id}`}>
         <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <div className="relative flex-1 bg-amber-50">
               <Image
                  src={`/placeholders/${category}.png`}
                  alt={`${category} illustration`}
                  fill
                  className="object-cover"
               />
               <Overlay />
               <Actions
                  id={id}
                  side="right"
               >
                  <button
                     className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
                  >
                     <MoreHorizontal
                        className="text-white opacity-75 hover:opacity-100 transition-opacity"
                     />
                  </button>
               </Actions>
            </div>
            <Footer
               name={name}
               type={type}
               eventDate={eventDate}
            />
         </div>
      </Link>
   )
};