interface FooterProps {
   name: string;
   eventDate: Date;
};

export const Footer = ({
   name,
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
      </div>
   )
};