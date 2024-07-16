'use client'

import { useEffect, useState } from "react";

import { EmptyEvents } from "./empty-events";
import { NewEventButton } from "./event-card/new-event-button";
import { EventCard } from "./event-card/index"; 
import { Loader2 } from "lucide-react";

import axios from "axios";

import { Event } from "@/models/event";

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
         <div className="flex justify-center items-center h-full py-32">
            <Loader2 className="h-20 w-20 text-slate-600 animate-spin" />
         </div>
      );
   }

   return events.length === 0 ? (
      <EmptyEvents />
   ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-8 pb-10">
         <NewEventButton />
         {events.map((event: Event, index) => (
            <EventCard
               key={index}
               id={event._id}
               name={event.name}
               category={event.category}
               eventDate={event.eventDate}
            />
         ))}
      </div>
   )
};