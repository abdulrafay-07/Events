import Image from "next/image";
import Link from "next/link";

export const EmptyEvents = () => {
   return (
      <div className="flex flex-col items-center justify-center -mt-16">
         <Image
            src="/no-events-found.png"
            alt="no events found"
            className="w-1/2"
            width={500}
            height={500}
         />
         <h1 className="text-4xl font-semibold -mt-16 mb-1">No events found</h1>
         <p className="text-muted-foreground">
            Maybe try{" "}
               <Link href="/create-event" className="text-black">
                  creating one?
               </Link>
         </p>
      </div>
   )
};