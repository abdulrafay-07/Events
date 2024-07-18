'use client'

import { useEffect, useState } from "react";

import { CreateEventForm } from "../../_components/create-event-form";
import { Loader2 } from "lucide-react";

import axios from "axios";
import { EventProps } from "@/types/event-props";

type EditEventProps = {
   params: {
      eventId: string;
   };
};

const EditEvent = ({
   params,
}: EditEventProps) => {
   const [isFetching, setIsFetching] = useState(true);
   const [event, setEvent] = useState<EventProps | null>(null);

   const getEvent = async () => {
      try {
         const response = await axios.get(`/api/get-single-event/${params.eventId}`);

         if (!response.data.success) {
            throw new Error(response.data.message);
         };

         setEvent(response.data.event);
      } catch (error: any) {
         console.log(error.response.data.message);
      } finally {
         setIsFetching(false);
      };
   };

   useEffect(() => {
      getEvent();
   }, []);

   if (isFetching) {
      return (
         <div className="flex justify-center items-center h-full py-32">
            <Loader2 className="h-20 w-20 text-slate-600 animate-spin" />
         </div>
      );
   }

   if (!event) {
      <div className="flex justify-center items-center h-full py-32">
         Event not found
      </div>
   };

   return (
      <div className="flex justify-center items-center h-full">
         <CreateEventForm
            event={event}
            id={params.eventId}
         />
      </div>
   )
};

export default EditEvent;