import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
const protactRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "unauthenticated no token" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const user = await User.findById(decoded.user_id).select("-password");
        console.log(user)
        req.user = user;


        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("error in protactRoute ", err.message)
    }
}
export default protactRoute;