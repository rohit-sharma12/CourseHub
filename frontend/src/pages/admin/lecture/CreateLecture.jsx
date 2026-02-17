import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CreateLecture = () => {
    const [lectureTitle, setLectureTitle] = useState("");

    const isLoading = false;
    const navigate = useNavigate();

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
                    <Button variant="outline" onClick={() => navigate("/admin/course")}>Back to course</Button>
                    <Button disabled={isLoading} >
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
