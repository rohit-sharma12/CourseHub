import CourseSkeleton from "../../components/CourseSkeleton";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "../../api/courseApi";

const CourseCard = () => {
    const { data, isLoading, isError } = useGetPublishedCourseQuery();
    console.log(data?.courses);
    if (isError) return <h1>Some error is occured</h1>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <CourseSkeleton key={i} />
                ))
                : data?.courses && data.courses.map((course, i) => (
                    <Course key={i} course={course} />
                ))
            }
        </div>
    );
};

export default CourseCard;