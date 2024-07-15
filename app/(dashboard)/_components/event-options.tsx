'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
   Select,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { SelectCategories } from "./select-categories";
import { Button } from "@/components/ui/button";

import qs from "query-string";

export const EventOptions = () => {
   const [eventType, setEventType] = useState("");
   const [category, setCategory] = useState("all");

   const router = useRouter();
   const searchParams = useSearchParams();
   const type = searchParams.get("type");

   const categories = ["All", "Conference", "Workshop", "Webinar", "Concert", "Meetup", "Networking", "Seminar", "Party", "Festival", "Exhibition", "Competition", "Training", "Charity", "Sports"];

   useEffect(() => {
      const url = qs.stringifyUrl({
         url: "/",
         query: {
            category: category,
            type: eventType,
         }
      }, {skipEmptyString: true, skipNull: true});

      router.push(url);
   }, [eventType, category]);

   return (
      <div className="flex items-center gap-x-5">
         <Select onValueChange={setCategory}>
            <SelectTrigger className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-none rounded-md w-[130px]">
               <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectCategories all={true} />
         </Select>
         <div className="flex gap-x-3">
            <Button
               variant={type === "public" ? "secondary" : "ghost"}
               size="lg"
               onClick={() => setEventType(type === "public" ? "" : "public")}
            >
               Public
            </Button>
            <Button
               variant={type === "invite-only" ? "secondary" : "ghost"}
               size="lg"
               onClick={() => setEventType(type === "invite-only" ? "" : "invite-only")}
            >
               Invite only
            </Button>
         </div>
      </div>
   )
};