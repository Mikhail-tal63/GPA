import Semester from "../models/semesterModel.js";


export const getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find({ user: req.user._id });
    const cumulativeGPA = semesters.length
      ? semesters.reduce((acc, s) => acc + s.gpa, 0) / semesters.length
      : 0;
    res.json({ semesters, cumulativeGPA });
  } catch (err) {
    res.status(500).json({ message: "Failed to load semesters" });
  }
};


export const createSemester = async (req, res) => {
  try {
    const { name, courses } = req.body;
    const semester = new Semester({
      user: req.user._id,
      name,
      courses,
    });
    await semester.save();
    res.status(201).json(semester);
  } catch (err) {
    res.status(500).json({ message: "Failed to create semester" });
  }
};

// Delete a semester
export const deleteSemester = async (req, res) => {
  try {
    const { id } = req.params;
    const semester = await Semester.findOneAndDelete({ _id: id, user: req.user._id });
    if (!semester) return res.status(404).json({ message: "Semester not found" });
    res.json({ message: "Semester deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete semester" });
  }
};
