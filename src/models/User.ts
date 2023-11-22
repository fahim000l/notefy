import { Schema, model, models } from "mongoose";

export interface DTUser {
  email: string;
  userName: string;
  password?: string;
  profilePic?: string;
}

const userSchema = new Schema<DTUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
