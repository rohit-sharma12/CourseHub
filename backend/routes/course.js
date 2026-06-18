import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCreatorCourses, getLecture, getLectureById, getPublishedCourse, removeLecture, togglePublishCourse, getSearchCourses } from "../controllers/course.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/", isAuthenticated, createCourse);
router.get("/published-courses", isAuthenticated, getPublishedCourse)
router.get("/", isAuthenticated, getCreatorCourses);
router.get("/search", isAuthenticated, getSearchCourses);
router.put('/:courseId', isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.get('/:courseId', isAuthenticated, getCourseById);
router.post("/:courseId/lecture", isAuthenticated, createLecture);
router.get("/:courseId/lecture", isAuthenticated, getLecture);
router.post("/:courseId/lecture/:lectureId", isAuthenticated, editLecture);
router.delete("/lecture/:lectureId", isAuthenticated, removeLecture);
router.get("/lecture/:lectureId", isAuthenticated, getLectureById);
router.patch("/:courseId", isAuthenticated, togglePublishCourse);
export default router