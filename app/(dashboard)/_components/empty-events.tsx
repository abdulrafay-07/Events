import Image from "next/image";

export const EmptyEvents = () => {
   return (
      <Image
         src="/no-events-found.png"
         alt="no events found"
         className="w-1/2"
         width={500}
         height={500}
      />
   )
};