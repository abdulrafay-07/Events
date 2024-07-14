import mongoose, { Document, Schema } from "mongoose";
import { Event, eventSchema } from "./event";

export interface User extends Document {
   username: string;
   email: string;
   password: string;
   events: Event[];
};

const userSchema: Schema<User> = new Schema({
   username: {
      type: String,
      required: [true, "Username is required"],
      minlength: 3,
      maxlength: 20,
   },
   email: {
      type: String,
      required: [true, "Email is required"],
      match: /.+\@.+\..+/,
   },
   password: {
      type: String,
      required: [true, "Password is required"],
   },
   events: [eventSchema],
});

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", userSchema);

export default UserModel;