import { Schema, model, Document } from "mongoose";
import { UserDetails } from "../interfaces/user.details";

interface UserDetailsDocument extends Document, UserDetails {
  setImgUrl: (filename: string) => void;
}

const userDetailsSchema = new Schema<UserDetailsDocument>(
  {
    username:{
        type: String,
    },
    profilePictureURL: {
      type: String,
    },
    totalTasks: {
      type: Number,
    },
    completedTasks: {
      type: Number,
    },
    user_id: {
      type: String,
    },
    level:{
      type: Number,
    }
  },
  {
    versionKey: false,
  }
);

const userDetailsModel = model<UserDetailsDocument>('userDetails', userDetailsSchema);

export default userDetailsModel;