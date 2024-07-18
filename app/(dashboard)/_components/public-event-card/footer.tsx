import { useSession } from "next-auth/react";

interface FooterProps {
   userId: string;
   username: string;
   eventName: string;
   type: string;
   category: string;
   eventDate: Date;
};

export const Footer = ({
   userId,
   username,
   eventName,
   type,
   category,
   eventDate,
}: FooterProps) => {
   const { data: session } = useSession();

   return (
      <div className="bg-white p-3">
         <div className="text-[15px] truncate max-w-[calc(100%-20px)] font-medium flex flex-col">
            <p>{eventName}</p>
            <p className="text-muted-foreground">Host: {userId === session?.user._id ? "You" : username}</p>
         </div>
         <p className="transition-opacity text-[13px] text-muted-foreground truncate">
            <span className="font-bold">Event date:</span>{" "}
            {new Date(eventDate).toLocaleDateString()}
         </p>
         <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
            {type.charAt(0).toUpperCase() + type.slice(1)} event, {" "}
            {category.charAt(0).toUpperCase() + category.slice(1)} category
         </p>
      </div>
   )
};