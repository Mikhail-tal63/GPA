import express from "express";
import { getSemesters, createSemester, deleteSemester } from "../controllers/semesterController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protectRoute); 

router.get("/", getSemesters);
router.post("/create", createSemester);
router.delete("/delete/:id", deleteSemester);

export default router;
