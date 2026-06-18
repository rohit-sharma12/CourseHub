import CourseSkeleton from "../../components/CourseSkeleton";
import Course from "./Course";

const MyLearning = () => {
    const isLoading = false;
    const myLearningCourses = [1, 2];

    return (
        <div className='max-w-4xl max-auto my-20 px-4 md:px-0'>
            <h1 className="font-bold text-2xl px-5">My Learning</h1>
            <div className="my-5">
                {isLoading ? (
                    <CourseSkeleton />
                ) : myLearningCourses.length === 0 ? (<p>You are not enrolled in any couses</p>) : (
                    <div className="px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {
                            [1, 2].map((course, i) => <Course key={i} />)
                        }
                    </div>
                )

                }
            </div>
        </div>
    )
}

export default MyLearning
