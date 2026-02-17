import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import RichTextEditor from "../../../components/RichTextEditor";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation, useGetCourseByIdQuery } from "../../../api/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: '',
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: ""
    });
    const params = useParams();
    const courseId = params.courseId;

    const { data: courseByIdData, isLoading: courseByIdLoading } = useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});

    useEffect(() => {
        if (courseByIdData?.course) {
            const course = courseByIdData?.course
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: ""
            })
        }
    }, [courseByIdData]);

    const [previewThumbnail, setPreviewThumbnail] = useState("");
    const navigate = useNavigate();
    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    };
    const selectCategory = (value) => {
        setInput({ ...input, category: value })
    };
    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value })
    };

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file)
        }
    };

    const updateCoursesHandler = async () => {
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("subTitle", input.subTitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("courseThumbnail", input.courseThumbnail);

        await editCourse({ formData, courseId });
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course update.")
        }
        if (isSuccess) {
            toast.error(data.message || "Failed to update course.")
        }
    }, [isSuccess, error])

    if(courseByIdLoading) return <Loader2 className="h-6 w-6 animate-spin" />

    const isPublished = true;

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between" >
                <div>
                    <CardTitle>Basic Course Information
                        <CardDescription>
                            Make changes to your courses here.Click save when you completed.
                        </CardDescription>
                    </CardTitle>
                </div>
                <div className="space-x-2">
                    <Button variant="outline">
                        {isPublished ? "Unpublished" : "Published"}
                    </Button>
                    <Button>
                        Remove Course
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Title</Label>
                        <input type="text" value={input.courseTitle} onChange={changeEventHandler} placeholder="Ex. Fullstack Developer" name="courseTitle" />
                    </div>
                </div>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Subtitle</Label>
                        <input type="text" value={input.subTitle} onChange={changeEventHandler} placeholder="Ex. Fullstack Developer" name="subTitle" />
                    </div>
                </div>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Description</Label>
                        <RichTextEditor input={input} setInput={setInput} />
                    </div>
                    <div className="flex items-center gap-5">
                        <div>
                            <Label>Category</Label>
                            <Select onValueChange={selectCategory}>
                                <SelectTrigger className="w-full max-w-48">
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next JS"></SelectItem>
                                        <SelectItem value="MERN Stack">MERN Stack</SelectItem>
                                        <SelectItem value="HTML">HTML</SelectItem>
                                        <SelectItem value="mobile">Mobile Developemnt</SelectItem>
                                        <SelectItem value="springboot">SpringBoot</SelectItem>
                                        <SelectItem value="AI/ML">AI/ML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Course Level</Label>
                            <Select onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-full max-w-48">
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Price</Label>
                            <input type="number" name="coursePrice" value={input.coursePrice} onChange={changeEventHandler} placeholder="999" className="w-full" />
                        </div>

                    </div>
                    <div>
                        <Label>Course Thumbnail</Label>
                        <input type="file" accept="image/*" className="w-fit" onChange={selectThumbnail} />
                        {
                            previewThumbnail && (
                                <img src={previewThumbnail} className="w-64 my-2" alt="courseThumbnail" />
                            )
                        }
                    </div>
                    <div>
                        <Button variant="outline" onClick={() => navigate('/admin/course')}>Cancel</Button>
                        <Button disabled={isLoading} onClick={updateCoursesHandler}>
                            {
                                isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                    </>
                                ) : (
                                    "Save"
                                )
                            }
                        </Button>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default CourseTab
