import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

import databaseConnect from "@/lib/database-connection";
import UserModel from "@/models/user";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
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
      const { searchParams } = new URL(request.url);

      let type = searchParams.get("type");
      if (type == "invite-only") {
         type = type.split("-").join(" ");
      };

      const category = searchParams.get("category");

      const userId = new mongoose.Types.ObjectId(user._id);

      let matchStage: any = { _id: userId };
      if (type && category) {
         matchStage = { ...matchStage, "events.type": type, "events.category": category };
      } else if (type) {
         matchStage = { ...matchStage, "events.type": type };
      } else if (category) {
         matchStage = { ...matchStage, "events.category": category };
      }

      const userWithEvents = await UserModel.aggregate([
         { $match: { _id: userId } },
         { $unwind: "$events" },
         { $match: matchStage },
         { $group: { _id: "$_id", events: { $push: "$events" } } }
      ]);

      if (!userWithEvents || userWithEvents.length === 0) {
         return Response.json({
            success: false,
            message: "No user events found",
         }, {
            status: 404
         });
      }
   
      return new NextResponse(JSON.stringify({
         success: true,
         events: userWithEvents[0].events,
      }), {
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