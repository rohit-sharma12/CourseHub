import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateLectureMutation } from "../../../api/courseApi";
import {toast} from "sonner";

const CreateLecture = () => {
    const [lectureTitle, setLectureTitle] = useState("");
    const params = useParams();
    const courseId = params.courseId;

    const navigate = useNavigate();

    const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation();

    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.messssage);
        }
        if (error) {
            toast.error(error.data.messssage);
        }
    }, [isSuccess, error])

    return (
        <div className="max-w-xl mx-auto my-20 px-4">
            <h1 className="text-2xl font-bold mb-6">Create New Lecture</h1>

            <div className="space-y-6">
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        placeholder="Enter course title"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)}>Back to course</Button>
                    <Button disabled={isLoading} onClick={createLectureHandler}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            "Create Lecture"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateLecture
