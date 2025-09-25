import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  credits: {
    type: Number,
    default: 3
  },
});

const semesterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  courses: [courseSchema],
  gpa: {
    type: Number
  },
}, { timestamps: true });


semesterSchema.pre("save",
  function (next) {
    if (this.courses.length > 0) {
      const totalGrade = this.courses.reduce((acc, c) => acc + c.grade, 0);
      this.gpa = totalGrade / this.courses.length;
    }
    next();
  });

export default mongoose.model("Semester", semesterSchema);
