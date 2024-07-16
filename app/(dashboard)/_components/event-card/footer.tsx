interface FooterProps {
   name: string;
   type: string;
   eventDate: Date;
};

export const Footer = ({
   name,
   type,
   eventDate,
}: FooterProps) => {   
   return (
      <div className="bg-white p-3">
         <p className="text-[15px] truncate max-w-[calc(100%-20px)]">
            {name}
         </p>
         <p className="transition-opacity text-[13px] text-muted-foreground truncate">
            <span className="font-bold">Event date:</span>{" "}
            {new Date(eventDate).toLocaleDateString()}
         </p>
         <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
            {type.charAt(0).toUpperCase() + type.slice(1)} event
         </p>
      </div>
   )
};