import { NextRequest } from "next/server";

import databaseConnect from "@/lib/database-connection";
import UserModel from "@/models/user";

export async function GET(request: NextRequest) {
   await databaseConnect();

   try {
      const eventsWithUserDetails = await UserModel.aggregate([
         { $unwind: "$events" },
         { $sort: {"events.createdAt": -1} },
         {
            $project: {
               _id: 1,
               username: 1,
               event: "$events",
            },
         },
      ]);

      if (!eventsWithUserDetails) {
         return Response.json({
            success: false,
            message: "No events found",
         }, {
            status: 401,
         });
      };

      return Response.json({
         success: true,
         events: eventsWithUserDetails,
      }, {
         status: 200,
      });
   } catch (error) {
      console.error("Error getting all events :: GET ALL EVENTS :: ERROR", error);
      return Response.json({
         success: false,
         message: "Error getting all events",
      }, {
         status: 500,
      });
   };
};