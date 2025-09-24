const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester",
        required: true
    },
    courseName: String,
    creditHours: Number,
    grade: String
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);