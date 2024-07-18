'use client'

import Image from "next/image";
import Link from "next/link";

import { Overlay } from "../event-card/overlay";
import { Footer } from "./footer";

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