// controllers/userController.js
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../generate/generateJwtAndSetToken.js";




export const searchUsers = async (req, res) => {
  const query = req.query.q || "";
  if (!query.trim()) return res.json([]);

  const regex = new RegExp(query, "i"); // search case-insensitive
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }]
  }).select("name email avatarUrl privacy status gpa semesters");

  // إخفاء GPA و semesters لو المستخدم private
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


export const getMe = async (req, res) => {
 const user = await User.findById(decoded.user_id).select("-password");

  res.json(user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, status, privacy, password } = req.body;

  if (name) user.name = name;
  if (status) user.status = status;
  if (privacy !== undefined) user.privacy = privacy;
  if (password) user.password = password; // تأكد تعمل hash قبل الحفظ

  await user.save();
  res.json({
    message: "Profile updated",
    user: {
      name: user.name,
      email: user.email,
      status: user.status,
      privacy: user.privacy,
      avatarUrl: user.avatarUrl
    },
  });
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

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT + set cookie
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
  console.log("Received login request:", req.body);

    const { email, password } = req.body;

    try {
    console.log("Login attempt:", email, password);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
console.log("User found:", user);
      
       console.log("Comparing passwords:", password, user.password);
const isMatch = await bcrypt.compare(password, user.password);
console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateTokenAndSetCookie(user._id, res);

        const { password: pwd, ...userData } = user._doc;

        res.status(200).json({
            message: "Login successful",
            user: userData,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
