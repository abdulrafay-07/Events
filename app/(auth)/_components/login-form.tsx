'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { AxiosError } from "axios";

import { loginSchema } from "@/validation-schemas/login";
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

export const LoginForm = () => {
   const [isFormSubmitting, setIsFormSubmitting] = useState(false);

   const { toast } = useToast();
   const router = useRouter();

   const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         identifier: "",
         password: "",
      },
   });

   const onSubmit = async (data: z.infer<typeof loginSchema>) => {
      setIsFormSubmitting(true);
      try {
         const result = await signIn("credentials", {
            redirect: false,
            identifier: data.identifier,
            password: data.password,
         });

         if (result?.error) {
            if (result.error === "CredentialsSignin") {
               toast({
                  title: "Login failed",
                  description: "Incorrect username or password",
                  variant: "destructive",
               });
            } else {
               toast({
                  title: "Error",
                  description: result.error,
                  variant: "destructive",
               });
            };
         };

         if (result?.url) {
            router.replace("/");
         };
      } catch (error) {
         const axiosError = error as AxiosError<ApiResponse>
         toast({
            title: "Login Failed",
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
               name="identifier"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email/Username</FormLabel>
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
                  "Login"
               )}
            </Button>
         </form>
      </Form>
   )
};