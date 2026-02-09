import CourseSkeleton from "../../components/CourseSkeleton";
import Course from "./Course";

const courses = [1, 2, 3, 4, 5, 6];

const CourseCard = () => {
    const isLoading = false;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <CourseSkeleton key={i} />
                ))
                : courses.map((_, i) => (
                    <Course key={i} />
                ))
            }
        </div>
    );
};

export default CourseCard;
