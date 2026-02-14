import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom";
import { useCreateCourseMutation } from "../../../api/courseApi";
import { toast } from "sonner";

const CreateCourse = () => {
    const navigate = useNavigate();
    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");

    const [createCourse, { data, isLoading, error, isSuccess }] = useCreateCourseMutation();

    const getSelectedCategory = (value) => {
        setCategory(value)
    };
    const createCourseHandler = async () => {
        await createCourse({ courseTitle, category })
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course created.");
            navigate("/admin/course")
        }
        if (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    }, [isSuccess, error]);

    return (
        <div className="max-w-xl mx-auto my-20 px-4">
            <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

            <div className="space-y-6">
                <div>
                    <Label>Course Title</Label>
                    <Input
                        type="text"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="Enter course title"
                    />
                </div>
                <div>
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-full max-w-48">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="next.js">Next JS</SelectItem>
                                <SelectItem value="mern">MERN Stack</SelectItem>
                                <SelectItem value="html">HTML</SelectItem>
                                <SelectItem value="mobile">Mobile Developemnt</SelectItem>
                                <SelectItem value="springboot">SpringBoot</SelectItem>
                                <SelectItem value="ai/ml">AI/ML</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => navigate("/admin/course")}>Back</Button>
                    <Button disabled={isLoading} onClick={createCourseHandler} >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            "Create Course"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
