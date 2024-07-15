import { Document, Schema } from "mongoose";

export interface Event extends Document {
   name: string;
   description: string;
   type: string;
   category: string;
   location: string;
   createdAt: Date;
   eventDate: Date;
};

export const eventSchema: Schema<Event> = new Schema({
   name: {
      type: String,
      required: [true, "Event name is required"],
      minlength: 3,
      maxlength: 20,
   },
   description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 10,
      maxlength: 200,
   },
   type: {
      type: String,
      required: [true, "Type is required"],
   },
   category: {
      type: String,
      required: [true, "Category is required"],
   },
   location: {
      type: String,
      required: [true, "Location is required"],
      minlength: 5,
      maxlength: 50,
   },
   createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
   },
   eventDate: {
      type: Date,
      required: true,
   },
});