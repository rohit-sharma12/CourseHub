import Stripe from "stripe";
import Course from "../models/course.js";
import { CoursePurchase } from "../models/purchaseCourse.js";
import Lecture from "../models/lecture.js";
import User from "../models/user.js";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable. Set STRIPE_SECRET_KEY in your .env');
}

const stripe = new Stripe(stripeSecret);

export const createCheckoutSession = async (req, res) => {

    try {
        const userId = req.id;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found!' });

        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount: course.coursePrice,
            status: "pending"
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: course.courseTitle,
                            images: [course.courseThumbnail],
                        },
                        unit_amount: course.coursePrice * 100,
                    },
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:5173/course-progress/${courseId}`,
            cancel_url: `http://localhost:5173/course-detail/${courseId}`,
            metadata: {
                courseId,
                userId,
            },
            shipping_address_collection: {
                allowed_countries: ["IN"],
            },
        });

        if (!session.url) {
            return res.status(400).json({ message: "Error while creating session" });
        };

        newPurchase.paymentId = session.id;
        await newPurchase.save();

        return res.status(200).json({
            success: true,
            url: session.url,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "CreatecheckoutSession failed" });
    }
}

export const stripeWebhook = async (req, res) => {
    let event;

    try {
        const playloadString = JSON.stringify(req.body, null, 2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

        const header = stripe.webhooks.generateTestHeaderString({
            payload: playloadString,
            secret,
        })
        event = stripe.webhooks.constructEvent(playloadString, header, secret);
    } catch (err) {
        console.log("Webhook signature verification failed.", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {

        try {
            const session = event.data.object;

            const purchase = await CoursePurchase.findOne({
                paymentId: session.id,
            }).populate("courseId");

            if (!purchase) {
                return res.status(404).json({ message: "Purchase not found" });
            }

            if (session.amount_total) {
                purchase.amount = session.amount_total / 100;
            }

            purchase.status = "completed";
            if (purchase.courseId && purchase.courseId.lectures.length > 0) {
                await Lecture.updateMany(
                    { _id: { $in: purchase.courseId.lectures } },
                    { $set: { isPreviewFree: true } }
                );
            }
            await purchase.save();

            await User.findByIdAndUpdate(
                purchase.userId,
                { $addToSet: { enrolledCourses: purchase.courseId._id } },
                { new: true }
            );
            await Course.findByIdAndUpdate(
                purchase.courseId._id,
                { $addToSet: { enrolledStudents: purchase.userId } },
                { new: true }
            );
        } catch (error) {
            console.log("Error updating purchase:", error);
            return res.status(500).json({ message: "Webhook DB update failed" });
        }
    }

    res.status(200).json({ received: true });
};

export const getCourseDetailWithStatus = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        const course = await Course.findById(courseId).populate("creator").populate("lectures");

        const purchased = await CoursePurchase.findOne({ userId, courseId });

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        return res.status(200).json({
            course,
            purchased: !!purchased,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "sERVER ERROR" })
    }
}

export const getAllPurchasedCourse = async (_, res) => {
    try {
        const purchasedCourse = await CoursePurchase.find({ status: "completed" }).populate("courseId");
        if (!purchasedCourse) {
            return res.status(404).json({
                purchasedCourse: [],
            });
        }
        return res.status(200).json({
            purchasedCourse,
        })
    } catch (error) {
        console.log(error);
    }
}