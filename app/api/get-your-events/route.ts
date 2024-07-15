import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

import databaseConnect from "@/lib/database-connection";
import UserModel from "@/models/user";
import mongoose from "mongoose";

export async function GET() {
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
      const userId = new mongoose.Types.ObjectId(user._id);

      const userWithEvents = await UserModel.aggregate([
         { $match: {_id: userId} },
         { $unwind: "$events" },
         { $sort: {"events.createdAt": -1} },
         { $group: {_id: "$_id", events: {$push: "$events"}} },
      ]);

      console.log("events", userWithEvents)

      if (!userWithEvents || userWithEvents.length === 0) {
         return new Response(JSON.stringify({
            success: false,
            message: "No user events found",
         }), {
            status: 404
         });
      };

      return Response.json({
         success: true,
         events: userWithEvents[0].events,
      }, {
         status: 200
      });
   } catch (error) {
      console.error("Error getting user personal events :: GET YOUR EVENT :: ERROR", error);
      return Response.json({
         success: false,
         message: "Error getting user personal events",
      }, {
         status: 500
      }); 
   };
};