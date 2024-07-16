import { Event } from "@/models/event";
import { User } from "@/models/user";

import { Document } from "mongoose";

export interface ApiResponse {
   success: boolean;
   message: string;
   event: Document<unknown, {}, User> & User & Required<{
      _id: unknown;
   }>;
   events?: Event[];
};