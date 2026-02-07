import CourseSkeleton from "../../components/CourseSkeleton";
import Course from "./Course";

const CourseCard = () => {
    let isLoading = true;

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    isLoading ? Array.from({ length: 8 }).map((_, index) => (<CourseSkeleton key={index} />
                    )) : (
                        <Course />
                    )
                }

            </div>
        </section >
    )
}

export default CourseCard;


