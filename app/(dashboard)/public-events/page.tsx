'use client'

import { useEffect, useState } from "react";

import { EmptyEvents } from "../_components/empty-events";
import { PublicEventCard } from "../_components/public-event-card";
import { Loader2 } from "lucide-react";

import axios from "axios";

interface PublicEventProps {
   _id: string;
   username: string;
   event: {
      category: string;
      type: string;
      _id: string;
      name: string;
      description: string;
      location: string;
      createdAt: Date;
      eventDate: Date
   };
};

const PublicEvents = () => {
   const [isFetchingEvents, setIsFetchingEvents] = useState(true);
   const [eventsWithUserDetails, setEventsWithUserDetails] = useState<PublicEventProps[]>([]);

   const fetchAllEvents = async () => {
      setIsFetchingEvents(true);
      try {
         const response = await axios.get("/api/get-all-events");

         if (!response.data.success) {
            throw new Error(response.data.message);
         };

         console.log(response.data.events);
         
         setEventsWithUserDetails(response.data.events);
      } catch (error: any) {
         console.log(error.response.data.message);
      } finally {
         setIsFetchingEvents(false);
      };
   };

   useEffect(() => {
      fetchAllEvents();
   }, []);

   if (isFetchingEvents) {
      return (
         <div className="flex justify-center items-center h-full py-32">
            <Loader2 className="h-20 w-20 text-slate-600 animate-spin" />
         </div>
      );
   };

   return eventsWithUserDetails.length === 0 ? (
      <div className="flex flex-col items-center justify-center">
         <EmptyEvents />
         <h1 className="text-4xl font-semibold -mt-20 mb-1">No events found</h1>
      </div>
   ) : (
      <div className="max-w-[85%] mx-auto py-12">
         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-8 pb-10">
            {eventsWithUserDetails.map((eventWithUserDetail, index) => (
               <PublicEventCard
                  key={index}
                  userId={eventWithUserDetail._id}
                  username={eventWithUserDetail.username}
                  eventId={eventWithUserDetail.event._id}
                  eventName={eventWithUserDetail.event.name}
                  type={eventWithUserDetail.event.type}
                  category={eventWithUserDetail.event.category}
                  eventDate={eventWithUserDetail.event.eventDate}
               />
            ))}
         </div>
      </div>
   )
};

export default PublicEvents;