import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithStatus, stripeWebhook } from "../controllers/coursePurchase.js";

const router = express.Router();

router.post("/checkout/create-checkout-session", isAuthenticated, createCheckoutSession);

router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

// Temporary handlers
router.get("/course/:courseId/detail-with-status", isAuthenticated, getCourseDetailWithStatus, (req, res) => {
    res.send("Course detail with status");
});

router.get("/", isAuthenticated, getAllPurchasedCourse, (req, res) => {
    res.send("Purchase route working");
});

export default router;