

import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String },
  avatarPath: { type: String },
  iconUrl: { type: String },
  privacy: { type: Boolean, default: false },
  status: { type: String, default: "" },
  gpa: { type: Number, default: null },
  semesters: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Semester" }
  ]
}, { timestamps: true });


export default mongoose.model("User", userSchema);
