import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Course = () => {
    return (
        <Card className="w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">

            <div className="relative">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjkyLdzU766t6qG7fdGhuF1A1jOpMiU0yBmQ&s"
                    alt="course"
                    className="w-full h-30 object-cover"
                />
            </div>

            <CardContent className="px-5 py-4 space-y-3">
                <h1 className="font-bold text-lg truncate hover:underline">
                    Next & React.js Course
                </h1>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-7 h-7 cursor-pointer">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>RS</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">
                            Rohit Sharma
                        </span>
                    </div>

                    <Badge className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        Advanced
                    </Badge>
                </div>

                <div className="text-lg font-bold">
                    ₹ 999
                </div>
            </CardContent>

        </Card>
    );
};

export default Course;
