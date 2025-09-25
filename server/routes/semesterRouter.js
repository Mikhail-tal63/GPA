import express from "express";
import { getSemesters, createSemester, deleteSemester } from "../controller/SemesterController.js";
const router = express.Router();



router.get("/", getSemesters);
router.post("/create", createSemester);
router.delete("/delete/:id", deleteSemester);

export default router;
