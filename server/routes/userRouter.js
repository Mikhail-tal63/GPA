import express from "express";
import { register, login, getCurrentUser } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protectRoute, getCurrentUser);

export default router;
