import Semester from "../models/semesterModel.js";
import User from "../models/userModel.js";

export const getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find({ user: req.user._id }).lean();
    res.json({ semesters });
  } catch (err) {
    console.error("Error fetching semesters:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createSemester = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("USER:", req.user);

  try {
    const { name, courses } = req.body;
    const userId = req.user.id || req.user._id;


    const semester = new Semester({
      user: userId,
      name,
      courses,
    });
    await semester.save();

 
    await User.findByIdAndUpdate(userId, { $push: { semesters: semester._id } });

  
    const semesters = await Semester.find({ user: userId }).lean();

  
    res.status(201).json({ semesters });
  } catch (err) {
    console.error("Create semester error:", err);
    res.status(500).json({ message: "Failed to create semester" });
  }
};


export const deleteSemester = async (req, res) => {
  try {
    const { id } = req.params;  
    if (!id) return res.status(400).json({ message: "Semester ID is required" });

    const semester = await Semester.findByIdAndDelete(id);
    if (!semester) return res.status(404).json({ message: "Semester not found" });

    res.json({ message: "Semester deleted successfully" });
  } catch (err) {
    console.error("Delete semester error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


















































 /*<div className="flex-1">
              <h2 className="text-xl font-semibold">{formData.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={formData.privacy ? 'secondary' : 'default'}>
                  {formData.privacy ? 'Private' : 'Public'}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  Student
                </Badge>
              </div>
            </div>*/