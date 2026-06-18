import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
    return (
        <Link to={`course-detail/${course?._id}`}>
            <Card className="w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                    <img
                        src={course?.courseThumbnail}
                        alt="course"
                        className="w-full h-30 object-cover"
                    />
                </div>

                <CardContent className="px-5 py-4 space-y-3">
                    <h1 className="font-bold text-lg truncate hover:underline">
                        {course?.courseTitle}
                    </h1>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-7 h-7 cursor-pointer">
                                <AvatarImage src={course?.creator?.photoUrl || "https://github.com/shadcn.png"} />
                                <AvatarFallback>RS</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-sm">
                                {course?.creator?.name}
                            </span>
                        </div>

                        <Badge className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                            {course?.courseLevel}
                        </Badge>
                    </div>

                    <div className="text-lg font-bold">
                        ₹{course?.coursePrice}
                    </div>
                </CardContent>

            </Card>
        </Link>

    );
};

export default Course;