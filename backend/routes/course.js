import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse } from "../controllers/course.js";

const router = express.Router();

router.post("/",isAuthenticated, createCourse);

export default router