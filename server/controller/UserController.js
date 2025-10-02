import Semester from "../models/semesterModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../generate/generateJwtAndSetToken.js";


export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate({
        path: "semesters",
        options: { sort: { createdAt: -1 } } // اختياري، ترتيب من الأحدث
      })
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // تحويل _id إلى id لكل semester
    const mappedSemesters = (user.semesters || []).map((s) => ({
      ...s,
      id: s._id,
      gpa: s.gpa ?? 0
    }));

    // حسب الـ cumulative GPA لو تحب
    const cumulativeGPA =
      mappedSemesters.reduce((acc, s) => acc + (s.gpa || 0), 0) /
      (mappedSemesters.length || 1);

    res.json({
      user: {
        ...user,
        semesters: mappedSemesters,
        gpa: cumulativeGPA
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const searchUsers = async (req, res) => {
  const query = req.query.q || "";
  if (!query.trim()) return res.json([]);

  const regex = new RegExp(query, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }]
  }).select("name email avatarUrl privacy status gpa semesters");


  const result = users.map(u => ({
    id: u._id,
    name: u.name,
    email: u.email,
    avatarUrl: u.avatarUrl,
    privacy: u.privacy,
    status: u.status,
    gpa: u.privacy ? undefined : u.gpa,
    semesters: u.privacy ? undefined : u.semesters,
  }));

  res.json(result);
};


export const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 })
        res.status(200).json({ message: "user looged out sexyfully" })
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("error in login ", err.message)
    }
}
export const getMe = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("getMe error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, status, privacy, newPassword, avatarUrl, avatarPath, iconUrl, iconPath } = req.body;

    if (name !== undefined) user.name = name;
    if (status !== undefined) user.status = status;
    if (privacy !== undefined) user.privacy = privacy;

    // تحديث الباسورد لو مرسل من الفرونت
    if (newPassword && newPassword.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // تحديث الصور
    if (avatarUrl) user.avatarUrl = avatarUrl;
    if (avatarPath) user.avatarPath = avatarPath;
    if (iconUrl) user.iconUrl = iconUrl;
    if (iconPath) user.iconPath = iconPath;

    await user.save();

    // رجّع بيانات المستخدم بدون الباسورد
    const { password, ...userData } = user._doc || user.toObject();

    res.json({
      message: "Profile updated",
      user: userData,
    });
  } catch (error) {
    console.error("updateProfile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });


    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {


  const { email, password } = req.body;

  try {


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentialss" });
    }


    const isPasswordCorrect = await bcrypt.compare(password, user.password || "");
    console.log("Comparing passwords:", password, user.password);
    console.log("Password match:", isPasswordCorrect ? "✅" : "❌");

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentialsss" });
    }

    const token = generateTokenAndSetCookie(user._id, res);
    const { password: pwd, ...userData } = user._doc;

    res.status(200).json({
      message: "Login successful",
      user: userData,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
