import { Sidebar } from "@/components/sidebar/sidebar";

export default function RootLayout({
   children,
}: { children: React.ReactNode }) {
   return (
      <div>
         <Sidebar />
         {children}
      </div>
   );
};