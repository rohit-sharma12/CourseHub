import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoute from "./routes/course.js";
import mediaRoute from "./routes/media.js";
import purchaseRoute from "./routes/purchaseCourse.js";
import courseProgressRoute from "./routes/courseProgress.js";

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//apis
app.use("/api/v1/media", mediaRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.listen(PORT, () => {
    console.log(`Server runningat ${PORT}`);
})