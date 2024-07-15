'use client'

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const Logout = () => {
   const handleLogout = () => {
      signOut({
         callbackUrl: "/login"
      });
   };

   return (
      <Button onClick={handleLogout}>
         Logout
      </Button>
   )
};