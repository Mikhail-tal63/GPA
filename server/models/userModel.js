

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
<<<<<<< HEAD
  gpa: { type: Number, default: null }, 
=======
>>>>>>> 7f6f1997bded510172cb16b62cbe70ee96adca65
  semesters: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Semester" }
  ]
}, { timestamps: true });


export default mongoose.model("User", userSchema);
