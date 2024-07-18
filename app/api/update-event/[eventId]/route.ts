import { NextRequest } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

import databaseConnect from "@/lib/database-connection";
import UserModel from "@/models/user";
import mongoose from "mongoose";

export async function PUT(request: NextRequest, {params}: { params: { eventId: string } }) {
   const eventId = params.eventId;

   await databaseConnect();

   const session = await getServerSession(authOptions);
   const user = session?.user;

   if (!session || !user) {
      return Response.json({
         success: false,
         message: "Not Authenticated",
      }, {
         status: 404
      });
   };

   try {
      const { name, description, type, category, location, createdAt, eventDate } = await request.json();

      const updatedUserWithEvent = UserModel.findOneAndUpdate(
         {
            email: user.email,
            "events._id": eventId,
         },
         {
            $set: {
               "events.$.name": name,
               "events.$.description": description,
               "events.$.type": type,
               "events.$.category": category,
               "events.$.location": location,
               "events.$.eventDate": eventDate,
            },
         }, { new: true },
      );

      console.log(updatedUserWithEvent);

      if (!updatedUserWithEvent) {
         return Response.json({
            success: false,
            message: "Event not found",
         }, {
            status: 404
         });
      };

      return Response.json({
         success: true,
         message: "Event updated Successfully",
      }, {
         status: 200
      });
   } catch (error) {
      console.error("Error updating an event :: UPDATE EVENT :: ERROR", error);
      return Response.json({
         success: false,
         message: "Error updating an event",
      }, {
         status: 500
      });  
   };
};