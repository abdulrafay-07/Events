import Image from "next/image";
import Link from "next/link";

import { Footer } from "./footer";
import { Overlay } from "./overlay";

interface EventCardProps {
   id: unknown;
   name: string;
   category: string;
   eventDate: Date;
};

export const EventCard = ({
   id,
   name,
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
            </div>
            <Footer
               name={name}
               eventDate={eventDate}
            />
         </div>
      </Link>
   )
};