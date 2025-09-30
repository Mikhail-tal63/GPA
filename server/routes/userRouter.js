import express from "express";
import { signupUser, loginUser, getMe, searchUsers,getUserById ,updateProfile ,logoutUser  } from "../controller/UserController.js";
import protactRoute from "../middleware/ProtactRoate.js";



const app = express();


const router = express.Router();
logoutUser
router.post("/signup", signupUser);
router.post("/login",  loginUser);
router.get("/me", protactRoute, getMe);
router.put("/update", protactRoute, updateProfile);
router.get("/searchUsers", protactRoute, searchUsers);
router.get("/searchUsers", protactRoute, searchUsers);
router.post("/logout" , protactRoute,logoutUser )


router.get("/:id", protactRoute, getUserById);

export default router;
