'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
   Select,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SelectCategories } from "./select-categories";
import { X } from "lucide-react";

import qs from "query-string"

export const EventOptions = () => {
   const [eventType, setEventType] = useState("");
   const [category, setCategory] = useState("");
   // this key is used to re-render the Select component when "X" is clicked
   const [key, setKey] = useState(0);

   const router = useRouter();
   const searchParams = useSearchParams();
   const type = searchParams.get("type");

   const resetOptions = () => {
      setEventType("");
      setCategory("");
      setKey(prevKey => prevKey + 1);
   };

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
         <Select key={key} onValueChange={setCategory}>
            <SelectTrigger className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-none rounded-md w-[130px]">
               <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectCategories />
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
            {(type || category) && (
               <Button size="icon" variant="ghost" className="self-center" onClick={resetOptions}>
                  <X />
               </Button>
            )}
         </div>
      </div>
   )
};