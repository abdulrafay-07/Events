'use client'

import Image from "next/image";
import Link from "next/link";

import { Actions } from "@/components/actions";
import { Overlay } from "../event-card/overlay";
import { Footer } from "./footer";
import { MoreHorizontal } from "lucide-react";

import { useSession } from "next-auth/react";

interface PublicEventCardProps {
   userId: string;
   username: string;
   eventId: string;
   eventName: string;
   type: string;
   category: string;
   eventDate: Date;
};

export const PublicEventCard = ({
   userId,
   username,
   eventId,
   eventName,
   type,
   category,
   eventDate,
}: PublicEventCardProps) => {
   const { data: session } = useSession();

   return (
      <Link href={`/event/${eventId}`}>
         <div className="group aspect-[100/127] bg-white border rounded-lg flex flex-col justify-between overflow-hidden">
            <div className="relative flex-1 bg-amber-50">
               <Image
                  src={`/placeholders/${category}.png`}
                  alt={`${category} illustration`}
                  fill
                  className="object-cover"
               />
               <Overlay />
               <Actions
                  id={eventId}
                  side="right"
                  showEditAndDelete={session?.user._id === userId}
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
               userId={userId}
               username={username}
               eventName={eventName}
               type={type}
               category={category}
               eventDate={eventDate}
            />
         </div>
      </Link>
   )
};