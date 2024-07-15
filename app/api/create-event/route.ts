import { NextRequest } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

import databaseConnect from "@/lib/database-connection";
import UserModel from "@/models/user";
import { Event } from "@/models/event";

export async function POST(request: NextRequest) {
   await databaseConnect();

   const session = await getServerSession(authOptions);
   const userData = session?.user;

   if (!session || !userData) {
      return Response.json({
         success: false,
         message: "Not Authenticated",
      }, {
         status: 404
      });
   };

   try {
      const { name, description, type, category, location, createdAt, eventDate } = await request.json();

      const user = await UserModel.findOne({
         username: userData.username
      });

      if (!user) {
         return Response.json({
            success: false,
            message: "User not found"
         }, {
            status: 404
         });
      };

      const event = {
         name,
         description,
         type,
         category,
         location,
         createdAt,
         eventDate,
      };

      user.events.push(event as Event);

      await user.save();

      return Response.json({
         success: true,
         message: "Event successfully created",
      }, {
         status: 200
      });
   } catch (error: any) {
      console.error("Error creating an event :: CREATE EVENT :: ERROR", error);
      return Response.json({
         success: false,
         message: "Error creating an event",
      }, {
         status: 500
      }); 
   };
};