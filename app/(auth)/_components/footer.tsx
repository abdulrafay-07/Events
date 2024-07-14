import Link from "next/link";

interface FooterProps {
   paragraph: string;
   link: string;
   href: string;
};

export const Footer = ({
   paragraph,
   link,
   href,
}: FooterProps) => {
   return (
      <div className="text-center">
         <p>
            {paragraph}{' '}
            <Link href={href} className="text-[#0F172A] font-medium hover:text-[#0F172AE6] duration-200 transition">
               {link}
            </Link>
         </p>
      </div>
   )
};