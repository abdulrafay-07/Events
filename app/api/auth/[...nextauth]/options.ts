import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import databaseConnect from "@/lib/database-connection";
import UserModel from "@/models/user";

import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
   providers: [
      CredentialsProvider({
         id: "credentials",
         name: "Credentials",
         credentials: {
            email: {
               label: "Email", type: "email", placeholder: "tylerdurden@gmail.com",
            },
            password: {
               label: "Password", type: "password",
            },
         },
         async authorize(credentials: any): Promise<any> {
            await databaseConnect();

            try {
               const user = await UserModel.findOne({
                  $or: [
                     { email: credentials.identifier },
                     { username: credentials.identifier},
                  ],
               });

               if (!user) {
                  throw new Error("User not found with the following credentials");
               };

               const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

               if (isPasswordCorrect) {
                  return user;
               } else {
                  throw new Error("Incorrect password");
               };
            } catch (error: any) {
               throw new Error(error || "An error occurred during authorization");
            };
         },
      })
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token._id = user._id?.toString();
            token.username = user.username;
         };

         return token;
      },
      // this session details goes into the "User" import from next-auth
      async session({ session, token }) {
         if (token) {
            session.user._id = token._id;
            session.user.username = token.username;
         };

         return session;
      },
   },
   pages: {
      signIn: "/login",
   },
   session: {
      "strategy": "jwt",
   },
   secret: process.env.NEXTAUTH_SECRET,
};