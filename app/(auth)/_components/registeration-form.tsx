'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";

import { registerSchema } from "@/validation-schemas/register";
import { ApiResponse } from "@/types/api-response";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export const RegisterationForm = () => {
   const [isFormSubmitting, setIsFormSubmitting] = useState(false);

   const { toast } = useToast();
   const router = useRouter();

   const form = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         username: "",
         email: "",
         password: "",
      },
   });

   const onSubmit = async (data: z.infer<typeof registerSchema>) => {
      setIsFormSubmitting(true);
      try {
         const response = await axios.post<ApiResponse>("/api/register", data);

         if (!response.data.success) {
            throw new Error(response.data.message);
         };

         toast({
            title: "Success",
            description: response.data.message,
         });

         router.replace("/");
      } catch (error) {
         const axiosError = error as AxiosError<ApiResponse>
         toast({
            title: "Registeration Failed",
            description: axiosError.response?.data.message,
            variant: "destructive",
         });
      } finally {
         setIsFormSubmitting(false);
      };
   };

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-[30rem] mx-auto font-medium"
         >
            <FormField
               control={form.control}
               name="username"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Username</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Tyler Durden"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input
                           type="email"
                           placeholder="tylerdurden@fightclub.com"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                        <Input
                           type="password"
                           placeholder="fightclub@tylerdurden"
                           className="font-extrabold placeholder:font-medium"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button
               type="submit"
               disabled={isFormSubmitting}
               className="w-full"
               size="icon"
            >
               {isFormSubmitting ? (
                  <Loader2 className="animate-spin" />
               ) : (
                  "Sign up"
               )}
            </Button>
         </form>
      </Form>
   )
};