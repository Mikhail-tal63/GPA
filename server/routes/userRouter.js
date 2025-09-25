import express from "express";
import { signupUser, loginUser, getMe, searchUsers,getUserById   } from "../controller/UserController.js";
import protactRoute from "../middleware/ProtactRoate.js";



const app = express();


const router = express.Router();

router.post("/signup", signupUser);
router.post("/login",  loginUser);
router.get("/me", protactRoute, getMe);
router.get("/searchUsers", protactRoute, searchUsers);
router.get("/searchUsers", protactRoute, searchUsers);
router.get("/:id", protactRoute, getUserById);

export default router;
                      