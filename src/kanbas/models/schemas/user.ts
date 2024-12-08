import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date },
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN"],
      required: true,
    },
    loginId: { type: String, unique: true },
    section: { type: String, required: true },
    lastActivity: { type: Date },
    totalActivity: { type: String },
  },
  { collection: "users" }
);

const UserModel = model("User", userSchema);

export default UserModel;
