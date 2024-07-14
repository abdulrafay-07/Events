interface HeaderProps {
   heading: string;
   paragraph: string;
};

export const Header = ({
   heading,
   paragraph
}: HeaderProps) => {
   return (
      <div className="text-center">
         <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            {heading}
         </h1>
         <p className="mb-4 text-muted-foreground">
            {paragraph}
         </p>
      </div>
   )
};