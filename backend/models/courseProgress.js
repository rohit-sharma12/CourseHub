import mongoose from "mongoose";

const lectureProgress = new mongoose.Schema(
    {
        lectureId: {type: String},
        viewed: { type: Boolean }
    });

const courseProgressSchema = new mongoose.Schema({
    userId: { type: String },
    courseId: { type: String },
    completed: { type: Boolean },
    lectureProgress: [lectureProgress],
})

const courseProgress = mongoose.model("courseProgress", courseProgressSchema);

export default courseProgress;