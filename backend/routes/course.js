import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse, createLecture, editCourse, getCourseById, getCreatorCourses, getLecture } from "../controllers/course.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/", isAuthenticated, createCourse);
router.get("/", isAuthenticated, getCreatorCourses);
router.put('/:courseId', isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.get('/:courseId', isAuthenticated, getCourseById);
router.post("/:courseId/lecture", isAuthenticated, createLecture);
router.get("/:courseId/lecture", isAuthenticated, getLecture);

export default router