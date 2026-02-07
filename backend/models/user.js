import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["user", "instructor"],
            default: "user",
        },

        photoUrl: {
            type: String,
            default:"",
        },

        enrolledCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
