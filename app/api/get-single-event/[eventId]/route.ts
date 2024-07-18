import { NextRequest } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

import databaseConnect from "@/lib/database-connection";
import UserModel from "@/models/user";
import mongoose from "mongoose";

export async function GET(request: NextRequest, {params}: { params: { eventId: string } }) {
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
      const userId = new mongoose.Types.ObjectId(user._id);

      const userWithEvent = await UserModel.aggregate([
         { $match: {_id: userId} },
         { $unwind: "$events" },
         { $match: {"events._id": new mongoose.Types.ObjectId(eventId)} },
         { $replaceRoot: { newRoot: "$events" } }
      ]);

      if (!userWithEvent || userWithEvent.length === 0) {
         return Response.json({
            success: false,
            message: "No user events found",
         }, {
            status: 404
         });
      };

      return Response.json({
         success: true,
         event: userWithEvent[0],
      }, {
         status: 200,
      })
   } catch (error) {
      console.error("Error getting an event :: GET SINGLE EVENT :: ERROR", error);
      return Response.json({
         success: false,
         message: "Error getting an event",
      }, {
         status: 500
      }); 
   };
};