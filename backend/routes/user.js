import express from "express";
import { getUserProfile, login, logout, register, updateProfile } from "../controllers/user.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.get("/profile", isAuthenticated, getUserProfile);
router.get("/logout", logout);
router.put("/profile/update", isAuthenticated, upload.single("profilePhoto"), updateProfile)

export default router;