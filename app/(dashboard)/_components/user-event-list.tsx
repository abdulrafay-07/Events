'use client'

import { useEffect, useState } from "react";

import { EmptyEvents } from "./empty-events";
import { Loader2 } from "lucide-react";

import axios from "axios";

export const UserEventList = () => {
   const [isFetchingUserEvents, setIsFetchingUserEvents] = useState(true);
   const [events, setEvents] = useState([]);

   const fetchUserMessages = async () => {
      try {
         const response = await axios.get("/api/get-your-events");
         
         if (!response.data.success) {
            throw new Error(response.data.message);
         };

         setEvents(response.data.events);
      } catch (error: any) {
         console.log(error.response.data);
      } finally {
         setIsFetchingUserEvents(false);
      };
   };

   useEffect(() => {
      fetchUserMessages();
   }, []);

   if (isFetchingUserEvents) {
      return (
         <div className="flex justify-center items-center h-full">
            <Loader2 className="h-20 w-20 text-slate-600 animate-spin" />
         </div>
      );
   }

   return events.length === 0 ? (
      <EmptyEvents />
   ) : (
      <div className="h-full">
         User Event List
      </div>
   )
};