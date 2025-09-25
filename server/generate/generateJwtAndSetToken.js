import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (user_id, res) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 يوم
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production", // آمن في البروكشن
  });

  return token;
};

export default generateTokenAndSetCookie;
