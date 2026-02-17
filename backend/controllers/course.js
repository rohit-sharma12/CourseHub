import Course from "../models/course.js";
import { deleteMediaFromClodinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;

        if (!courseTitle || !category) {
            return res.status(400).json({
                message: "Course title and category must be provided",
            });
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            course,
        });

    } catch (error) {
        console.error("CREATE COURSE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
        });
    }
}

export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({ creator: userId })

        if (!courses) {
            return res.status(404).json({
                courses: [],
                message: "Courses not found"
            })
        }
        return res.status(200).json({
            courses,
        })
    } catch (error) {
        console.error("CREATE COURSE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
        });
    }
}

export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { courseTitle, subTitle, description, courseLevel, coursePrice, category } = req.body;
        const thumbnail = req.file;

        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found!",
            });
        };
        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split('/').pop().split('.')[0];
                await deleteMediaFromClodinary(publicId);
            }
            courseThumbnail = await uploadMedia(thumbnail.path)
        };

        const updatedData = { courseTitle, subTitle, courseLevel, category, coursePrice, description, courseThumbnail: courseThumbnail?.secure_url };

        course = await Course.findByIdAndUpdate(courseId, updatedData, { new: true });

        return res.status(200).json({
            course,
            message: "Courseupdated successsfully."
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: "Failed to create course",
        });
    }
}

export const getCourseById = async (req, res) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(500).json({
                message: "Course not found",
            }); 
        }
        return res.status(200).json({
            course
        });
    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get course by id",
        }); 
    }
}