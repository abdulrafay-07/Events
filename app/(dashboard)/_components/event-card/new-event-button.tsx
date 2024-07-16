import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CreateEventForm } from "../create-event-form";
import { Plus } from "lucide-react";

export const NewEventButton = () => {
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button
               className="col-span-1 aspect-[100/127] bg-slate-600 rounded-lg hover:bg-slate-800 flex flex-col items-center justify-center py-6 h-full"
               variant="outline"
            >
               <div />
               <Plus className="h-10 w-10 text-white stroke-1" />
               <p className="text-sm text-white font-white">
                  New Event
               </p>
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent className="p-0 max-w-[40rem]">
            <AlertDialogTitle>
               <CreateEventForm />
            </AlertDialogTitle>
            <AlertDialogDescription className="hidden">
               Create an Event
            </AlertDialogDescription>
         </AlertDialogContent>
      </AlertDialog>
   )
};