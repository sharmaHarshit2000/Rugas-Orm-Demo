import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.model("User", userSchema);
