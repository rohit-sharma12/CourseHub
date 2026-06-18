import CourseProgress from "../models/courseProgress.js";
import Course from "../models/course.js";

export const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        let courseProgress = await CourseProgress.findOne({ courseId, userId }).populate("courseId");
        const courseDetails = await Course.findById(courseId).populate('lectures');
        if (!courseDetails) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        if (!courseProgress) {
            return res.status(200).json({
                data: {
                    courseDetails,
                    progress: [],
                    completed: false
                }
            })
        }

        return res.status(200).json({
            data: {
                courseDetails,
                progress: courseProgress.lectureProgress,
                completed: courseProgress.completed
            }
        })

    } catch (error) {
        console.log(error);
    }
}

export const updateLectureProgress = async (req, res) => {
    try {
        const { courseId, lectureId } = req.params;
        const userId = req.id;

        let courseProgress = await CourseProgress.findOne({ courseId, userId });

        if (!courseProgress) {
            courseProgress = new CourseProgress({
                userId,
                courseId,
                completed: false,
                lectureProgress: [],

            });
        }
        const lectureIndex = courseProgress.lectureProgress.findIndex((lecture) => lecture.lectureId === lectureId);

        if (lectureIndex !== -1) {
            courseProgress.lectureProgress[lectureIndex].viewed = true;
        } else {
            courseProgress.lectureProgress.push({
                lectureId,
                viewed: true
            });
        }
        const lectureProgressLength = courseProgress.lectureProgress.filter((lectureProg) => lectureProg.viewed).length;
        const course = await Course.findById(courseId);
        if (course.lectures.length === lectureProgressLength) courseProgress.completed = true;

        await courseProgress.save();
        return res.status(200).json({
            message: ("Lecture progess updated successfully")
        })

    } catch (error) {
        console.log(error);

    }
}

export const markAsCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        const courseProgress = await CourseProgress.findOne({ courseId, userId });

        if (!courseProgress) {
            return res.status(404).json({
                message: "Course progress not found"
            });
        }

        courseProgress.lectureProgress.forEach((lecture) => {
            lecture.viewed = true;
        });

        courseProgress.completed = true;

        await courseProgress.save();

        return res.status(200).json({
            message: "Course marked as completed",
            progress: courseProgress
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const markAsInCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        const courseProgess = await CourseProgress.findOne({ courseId, userId });
        if (!courseProgess) return res.status(404).json({ message: "Course progress not found" });

        courseProgess.lectureProgress.map((lectureProgress) => lectureProgress.viewed = false);
        courseProgess.completed = false;
        await courseProgess.save();
        return res.status(200).json({
            message: "Course marked as incompleted"
        })
    } catch (error) {
        console.log(error);
    }
}