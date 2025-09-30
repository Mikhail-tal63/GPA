

import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String },
  privacy: { type: Boolean, default: false },
  status: { type: String, default: "" },
  semesters: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Semester" }
  ]
}, { timestamps: true });


export default mongoose.model("User", userSchema);
