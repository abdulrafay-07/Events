import { Event } from "@/models/event";

export interface ApiResponse {
   success: boolean;
   message: string;
   events?: Event[];
};