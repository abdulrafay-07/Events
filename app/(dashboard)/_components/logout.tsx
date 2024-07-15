'use client'

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const Logout = () => {
   const handleLogout = () => {
      signOut({
         callbackUrl: "/login"
      });
   };

   return (
      <Button size="icon" onClick={handleLogout}>
         <LogOut className="h-5 w-5" />
      </Button>
   )
};