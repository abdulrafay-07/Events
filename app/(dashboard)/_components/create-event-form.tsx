'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";

import { createEventSchema } from "@/validation-schemas/create-event";
import { ApiResponse } from "@/types/api-response";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import {
   Select,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { SelectCategories } from "./select-categories";
import { format } from "date-fns";
import { Loader2, CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { SelectType } from "./select-type";

export const CreateEventForm = () => {
   const [isCreating, setIsCreating] = useState(false);

   const router = useRouter();
   const { toast } = useToast();

   const form = useForm<z.infer<typeof createEventSchema>>({
      resolver: zodResolver(createEventSchema),
      defaultValues: {
         name: "",
         description: "",
         location: "",
         createdAt: new Date(),
      },
   });

   const onSubmit = async (data: z.infer<typeof createEventSchema>) => {
      setIsCreating(true);
      try {
         const response = await axios.post<ApiResponse>("/api/create-event", data);

         if (!response.data.success) {
            throw new Error(response.data.message);
         };

         toast({
            title: "Success",
            description: response.data.message,
         });
      } catch (error) {
         const axiosError = error as AxiosError<ApiResponse>
         toast({
            title: "Event Creation Failed",
            description: axiosError.response?.data.message,
            variant: "destructive",
         });

         router.replace("/");
      } finally {
         setIsCreating(false);
      };
   };

   return (
      <div className="flex flex-col gap-4 w-full max-w-[40rem] mx-auto bg-white shadow-2xl px-16 py-10 rounded-xl">
         <h1 className="text-3xl text-center lg:text-4xl font-extrabold tracking-tight mb-2">Create an event</h1>
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-6 font-medium"
            >
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="eSports Grand Final"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                           <Textarea
                              placeholder="In 2024, IEM Cologne returns to the Lanxess Arena where 24 of the world's best teams will compete for a $1M prize pool."
                              className="resize-none"
                              {...field}
                              rows={3}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="flex gap-x-3">
                  <FormField
                     control={form.control}
                     name="category"
                     render={({ field }) => (
                        <FormItem className="w-1/2">
                           <Select defaultValue={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectCategories
                                 all={false}
                              />
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="type"
                     render={({ field }) => (
                        <FormItem className="w-1/2">
                           <Select defaultValue={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Event Type" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectType />
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="IEM Cologne 2024, the Lanxess Arena."
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                     <FormItem className="flex flex-col">
                        <FormLabel>Date of the Event</FormLabel>
                        <Popover>
                           <PopoverTrigger asChild>
                              <FormControl>
                                 <Button
                                    variant="outline"
                                    className={cn(
                                       "pl-3 text-left font-normal",
                                       !field.value && "text-muted-foreground"
                                    )}
                                 >
                                    {field.value ? (
                                       format(field.value, "PPP")
                                    ) : (
                                       <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                 </Button>
                              </FormControl>
                           </PopoverTrigger>
                           <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                 mode="single"
                                 selected={field.value}
                                 onSelect={field.onChange}
                                 disabled={(date) =>
                                    date < new Date()
                                 }
                                 initialFocus
                              />
                           </PopoverContent>
                        </Popover>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button
                  type="submit"
                  className="w-full"
                  disabled={isCreating}
               >
                  {isCreating ? (
                     <Loader2 className="animate-spin" />
                  ) : (
                     "Create an event"
                  )}
               </Button>
            </form>
         </Form>
      </div>
   )
};