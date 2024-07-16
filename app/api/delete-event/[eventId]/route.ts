import { NextRequest } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

import databaseConnect from "@/lib/database-connection";
import UserModel from "@/models/user";

export async function DELETE(request: NextRequest, { params }: { params: { eventId: string } }) {
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
      const result = await UserModel.updateOne(
         { _id: user._id },
         { $pull: { events: { _id: eventId } } },
      );

      if (result.modifiedCount === 0) {
         return Response.json({
            success: false,
            message: "Event not found",
         }, {
            status: 404
         });
      };

      return Response.json({
         success: true,
         message: "Event deleted",
      }, {
         status: 200
      });
   } catch (error: any) {
      console.error("Error deleting an event :: DELETE EVENT :: ERROR", error);
      return Response.json({
         success: false,
         message: "Error deleting an event",
      }, {
         status: 500
      }); 
   }
};