import Course from "../models/course.js";
import Lecture from "../models/lecture.js";
import { deleteMediaFromClodinary, deleteVideoFromClodinary, uploadMedia } from "../utils/cloudinary.js";

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

export const getPublishedCourse = async (_, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate({ path: "creator", select: "name photoUrl" })
        if (!courses) {
            return res.status(404).json({
                message: "Course not found!"
            })
        }

        return res.status(200).json({
            courses
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get published courses",
        });
    }
}

export const getSearchCourses = async (req, res) => {
    try {
        const { query: searchQuery, categories, sortByPrice } = req.query;

        const filter = {};
        if (searchQuery) {
            const regex = new RegExp(searchQuery, "i");
            filter.$or = [
                { courseTitle: regex },
                { subTitle: regex },
                { description: regex },
            ];
        }

        if (categories) {
            const cats = categories.split(",").map((c) => decodeURIComponent(c));
            filter.category = { $in: cats };
        }

        let query = Course.find(filter).populate({ path: "creator", select: "name photoUrl" });

        if (sortByPrice) {
            if (sortByPrice === "low-to-high") query = query.sort({ coursePrice: 1 });
            else if (sortByPrice === "high-to-low") query = query.sort({ coursePrice: -1 });
        }

        const courses = await query.exec();

        return res.status(200).json({ courses });
    } catch (error) {
        console.error("SEARCH COURSES ERROR:", error);
        return res.status(500).json({ message: "Failed to search courses" });
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
        const { courseId } = req.params;
        console.log('GET COURSE BY ID REQ PARAMS:', courseId);
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
        console.error("GET COURSE BY ID ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get course by id",
        });
    }
}

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;

        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message: "Lecture title is required"
            })
        }
        const lecture = await Lecture.create({ lectureTitle });
        const course = await Course.findById(courseId);
        if (course) {
            course.lectures.push(lecture._id);
            await course.save()
        };

        return res.status(200).json({
            lecture,
            message: "Lecture created successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create lecture",
        });
    }
}

export const getLecture = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId).populate("lectures");

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        return res.status(200).json({
            lectures: course.lectures
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get lecture",
        });
    }
};

export const editLecture = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { lectureTitle, videoInfo, isPreviewFree } = req.body;
        const { courseId, lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            })
        }
        if (lectureTitle) lecture.lectureTitle = lectureTitle;
        if (videoInfo) {
            lecture.videoUrl = videoInfo.videoUrl ?? lecture.videoUrl;
            lecture.publicId = videoInfo.publicId ?? lecture.publicId;
        }

        console.log("VIDEO INFO:", req.body.videoInfo);
        if (typeof isPreviewFree === "boolean") {
            lecture.isPreviewFree = isPreviewFree;
        }

        await lecture.save();

        const course = await Course.findById(courseId)
        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(200).json({
            lecture,
            message: "Lecture updated successfully."
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get lecture",
        });
    }
}

export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndUpdate(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            })
        }
        if (lecture.publicId) {
            await deleteVideoFromClodinary(lecture.publicId);
        }

        await Course.updateOne(
            { lectures: lectureId },
            { $pull: { lectures: lectureId } }
        )
        return res.status(200).json({
            lecture,
            message: "Lecture remove successfully."
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to remove lecture",
        });
    }
}

export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            })
        }
        return res.status(200).json({
            lecture,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get lecture by id",
        });
    }
}
export const togglePublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found!"
            });
        }
        course.isPublished = publish === "true";
        await course.save();

        const statusMessage = course.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({
            message: `Course is ${statusMessage}`
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update status",
        });
    }
}

