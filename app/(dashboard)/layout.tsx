import { Sidebar } from "@/components/sidebar/sidebar";

export default function RootLayout({
   children,
}: { children: React.ReactNode }) {
   return (
      <div className="bg-gray-100 flex min-h-screen">
         <Sidebar />
         <div className="pl-6 p-4">
            {children}
         </div>
      </div>
   );
};