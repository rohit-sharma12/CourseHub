import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        courseTitle: {
            type: String,
            required: true,
        },
        subTitle: {
            type: String
        },
        description: {
            type: String,
            required: true,
        },
        coursePrice: {
            type: Number,
            required: true,
            min: 0,
        },
        courseThumbnail: {
            type: String,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        lectures: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lecture",
            },
        ],
        enrolledStudents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        category: {
            type: String,
            required: true,
        },
        creator: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        courseLevel: {
            type: String,
            enum: ["Beginner", "Medium", "Advanced"],
            default: "beginner",
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },
    }, { timestamps: true, }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;