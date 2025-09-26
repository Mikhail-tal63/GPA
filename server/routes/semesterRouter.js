import express from "express";
import { getSemesters, createSemester, deleteSemester } from "../controller/SemesterController.js";
import protactRoute from "../middleware/ProtactRoate.js";

const router = express.Router();



router.get("/getSemesters", protactRoute, getSemesters);
router.post("/create", protactRoute, createSemester);
router.delete("/delete/:id", protactRoute, deleteSemester);

export default router;
