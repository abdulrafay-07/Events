import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const Logout = () => {
   return (
      <Button className="w-full space-x-3">
         <LogOut className="h-6 w-6" />
         <span className="text-lg ">Logout</span>
      </Button>
   )
};