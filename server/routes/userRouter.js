import express from "express";
import { signupUser, loginUser, getMe } from "../controller/UserController.js";
import protactRoute from "../middleware/ProtactRoate.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/me", protactRoute, getMe);

export default router;
