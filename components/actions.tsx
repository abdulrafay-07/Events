'use client'

import { useState } from "react";

import { ConfirmAction } from "./confirm-action";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link2, Trash2 } from "lucide-react";

import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/api-response";
import { useRouter } from "next/navigation";

interface ActionProps {
   id: unknown;
   children: React.ReactNode;
   side?: DropdownMenuContentProps["side"];
   sideOffset?: DropdownMenuContentProps["sideOffset"];
};

export const Actions = ({
   id,
   children,
   side,
   sideOffset
}: ActionProps) => {
   const [isDeletingEvent, setIsDeletingEvent] = useState(false);

   const { toast } = useToast();
   const router = useRouter();

   const copyLink = () => {
      navigator.clipboard.writeText(
         `${window.location.origin}/event/${id}`
      );

      toast({
         title: "Success",
         description: "Link Copied"
      });
   };

   const onDelete = async () => {
      setIsDeletingEvent(true);
      try {
         const response = await axios.delete(`/api/delete-event/${id}`);

         if (!response.data.success) {
            throw new Error(response.data.message);
         };

         toast({
            title: "Success",
            description: response.data.message,
         });

         window.location.reload();
      } catch (error) {
         const axiosError = error as AxiosError<ApiResponse>
         toast({
            title: "Event Deletion Failed",
            description: axiosError.response?.data.message,
            variant: "destructive",
         });
      } finally {
         setIsDeletingEvent(false);
      };
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            {children}
         </DropdownMenuTrigger>
         <DropdownMenuContent
            onClick={(e) => e.stopPropagation()}
            side={side}
            sideOffset={sideOffset}
            className="w-60"
         >
            <DropdownMenuItem
               onClick={copyLink}
               className="p-3 cursor-pointer"
            >
               <Link2 className="h-4 w-4 mr-2" />
               Copy event link
            </DropdownMenuItem>
            <ConfirmAction
               onConfirm={onDelete}
               header="Delete event?"
               description="This will delete the event and all of its contents."
               disabled={isDeletingEvent}
            >
               <Button
                  variant="ghost"
                  className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
               >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
               </Button>
            </ConfirmAction>
         </DropdownMenuContent>
      </DropdownMenu>
   )
};