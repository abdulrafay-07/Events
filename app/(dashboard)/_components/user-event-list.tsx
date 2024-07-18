'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { EmptyEvents } from "./empty-events";
import { NewEventButton } from "./event-card/new-event-button";
import { EventCard } from "./event-card/index"; 
import { Loader2 } from "lucide-react";

import axios from "axios";

import { Event } from "@/models/event";

export const UserEventList = () => {
   const [isFetchingUserEvents, setIsFetchingUserEvents] = useState(true);
   const [events, setEvents] = useState([]);

   const searchParams = useSearchParams();

   const fetchUserEvents = async () => {
      setIsFetchingUserEvents(true);
      try {
         const response = await axios.get("/api/get-your-events");
         
         if (!response.data.success) {
            throw new Error(response.data.message);
         };

         setEvents(response.data.events);
      } catch (error: any) {
         console.log(error.response.data.message);
      } finally {
         setIsFetchingUserEvents(false);
      };
   };

   const fetchCustomEvents = async (type: string | null, category: string | null) => {
      setIsFetchingUserEvents(true);
      try {
         const response = await axios.get("/api/get-custom-events", {
            params: {
               type,
               category,
            }
         });

         if (!response.data.success) {
            throw new Error(response.data.message);
         };
         setEvents(response.data.events);
      } catch (error: any) {
         setEvents([]);
         console.log(error.response.data);
      } finally {
         setIsFetchingUserEvents(false);
      };
   };

   const type = searchParams.get("type");
   const category = searchParams.get("category");
   useEffect(() => {

      if (type || category) {
         fetchCustomEvents(type, category);
      } else {
         fetchUserEvents();
      };
   }, [searchParams]);

   if (isFetchingUserEvents) {
      return (
         <div className="flex justify-center items-center h-full py-32">
            <Loader2 className="h-20 w-20 text-slate-600 animate-spin" />
         </div>
      );
   }

   return events.length === 0 ? (
      <div className="flex flex-col items-center justify-center">
         <EmptyEvents />
         <h1 className="text-4xl font-semibold -mt-16 mb-1">No events found</h1>
         {(!type && !category) && (
            <p className="text-muted-foreground">
               Maybe try{" "}
               <Link href="/create-event" className="text-black">
                  creating one?
               </Link>
            </p>
         )}
      </div>
   ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-8 pb-10">
         <NewEventButton />
         {events.map((event: Event, index) => (
            <EventCard
               key={index}
               id={event._id}
               name={event.name}
               type={event.type}
               category={event.category}
               eventDate={event.eventDate}
            />
         ))}
      </div>
   )
};