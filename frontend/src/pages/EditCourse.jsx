import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CourseTab from "./admin/course/CourseTab";

const EditCourse = () => {
    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
                <h1 className="font-bold text-xl">Add Details information regarding course</h1>
                <Link to="lecture">
                    <Button variant="link" className="hover:text-blue-600">
                        Go to lectures page
                    </Button>
                </Link>
            </div>
            <CourseTab/>
        </div>
    )
}

export default EditCourse
