import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/DBconfig.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:8080"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import authRoutes from "./routes/userRouter.js";
import semesterRoutes from "./routes/semesterRouter.js";

app.use("/api/users", authRoutes);
app.use("/api/semesters", semesterRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
