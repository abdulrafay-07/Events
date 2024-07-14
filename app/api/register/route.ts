import { NextRequest } from "next/server";

import databaseConnect from "@/lib/database-connection";
import UserModel from "@/models/user";

import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
   await databaseConnect();

   try {
      const { username, email, password } = await request.json();

      const existingUserByEmail = await UserModel.findOne({
         email,
      });

      if (existingUserByEmail) {
         return Response.json({
            success: false,
            message: "User already exists with this email",
         }, {
            status: 400
         });
      } else {
         const hashedPassword = await bcrypt.hash(password, 10);
         
         const user = new UserModel({
            username,
            email,
            password: hashedPassword,
            events: [],
         });

         await user.save();

         return Response.json({
            success: true,
            message: "User registered successfully",
         }, {
            status: 201
         });
      };
   } catch (error: any) {
      console.error("Error registering the user :: REGISTER :: ERROR", error.message);
      return Response.json({
         success: false,
         message: "Error registering the user",
      }, {
         status: 500,
      });
   };
};