import { Sidebar } from "@/components/sidebar/sidebar";

export default function RootLayout({
   children,
}: { children: React.ReactNode }) {
   return (
      <div className="bg-gray-100 flex min-h-screen w-full">
         <Sidebar />
         <div className="px-8 py-16 w-full">
            {children}
         </div>
      </div>
   );
};