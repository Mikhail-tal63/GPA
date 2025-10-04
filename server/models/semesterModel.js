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
    type: Number,
    default: null // أحسن من undefined أو NaN
  },
}, { timestamps: true });

// semesterSchema.pre("save", function (next) {
//   if (this.courses && this.courses.length > 0) {
//     // نضمن إن كل القيم أرقام
//     const validGrades = this.courses
//       .map(c => Number(c.grade))
//       .filter(g => !isNaN(g));

//     if (validGrades.length > 0) {
//       const totalGrade = validGrades.reduce((acc, g) => acc + g, 0);
//       this.gpa = totalGrade / validGrades.length;
//     } else {
//       this.gpa = null; // مفيش قيم صالحة
//     }
//   }
//   next();
// });

export default mongoose.model("Semester", semesterSchema);