import mongoose from "mongoose";

type ConnectionProp = {
   isConnected?: number;
};

const connection: ConnectionProp = {};

export default async function databaseConnect() {
   if (connection.isConnected) {
      console.log("Already connected to the database");
      return;
   };

   try {
      const databaseConnection = await mongoose.connect(process.env.MONGODB_URI!);

      if (!databaseConnection) {
         console.log("Error connection to the database");
         return;
      };

      connection.isConnected = databaseConnection.connections[0].readyState;
      console.log("Database connected successfully");
   } catch (error) {
      console.log("Database connection failed, ERROR: ", error);
      // gracefully exit
      process.exit(1);
   };
};