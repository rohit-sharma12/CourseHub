import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "../../../api/courseApi";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {

    const [lectureTitle, setLectureTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [disable, setDisable] = useState(true);
    const params = useParams();
    const { courseId, lectureId } = params;

    const { data: lectureData } = useGetLectureByIdQuery(lectureId);

    const lecture = lectureData?.lecture;

    useEffect(() => {
        if (lecture) {
            setLectureTitle(lecture.lectureTitle);
            setIsFree(lecture.isPreviewFree);
            setUploadVideoInfo(lecture.videoInfo);
        }
    },[lecture])

    const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation();
    const [removeLecture, {data:removeData, isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveLectureMutation();

    const fileChangedHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setMediaProgress(true);
            try {
                const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round((loaded * 100) / total))
                    }
                });
                if (res.data.success) {

                    setUploadVideoInfo({ videoUrl: res.data.data.url, publicId: res.data.data.public_id });
                    console.log("UPLOAD RESPONSE:", res.data);
                    setDisable(false);
                    toast.success(res.data.message);
                }


            } catch (error) {
                console.log(error);
                toast.error("video uploaded failed");
            } finally {
                setMediaProgress(false)
            }
        }
    };

    const editLectureHandler = async () => {
        if (!uploadVideoInfo) {
            toast.error("Please upload a video first");
            return;
        }

        await editLecture({
            lectureTitle,
            isPreviewFree: isFree,
            videoInfo: uploadVideoInfo,
            courseId,
            lectureId
        });
    };


    const removeLectureHandler = async () => {
        await removeLecture(lectureId);
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message);
        }
        if (error) {
            toast.error(error.data.message);
        }
    }, [isSuccess, error]);

    useEffect(() => {
        if (removeSuccess) {
            toast.success(removeData.message);
        }

    }, [removeSuccess]);

    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>Make changes and click to save.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={removeLectureHandler} variant="destructive">Remove lecture</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title</Label>
                    <Input value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} type="text" placeholder="Ex.Introduction to javaScript" />
                </div>
                <div className="my-5">
                    <Label>Video <span className="text-red-500">*</span></Label>
                    <Input type="file" onChange={fileChangedHandler} accept="video/*" placeholder="Ex.Introduction to javaScript" className="w-fit" />
                </div>
                <div className="flex items-center space-x-2 my-5">
                    <Switch
                        checked={isFree}
                        onCheckedChange={setIsFree}
                    />

                    <Label htmlFor="airplane-mode">Is this video FREE</Label>
                </div>
                {mediaProgress && (
                    <div className="my-4">
                        <Progress value={uploadProgress} />
                        <p>{uploadProgress}% uploadded</p>
                    </div>
                )}
                <div className="mt-4">
                    <Button onClick={editLectureHandler}>Update lecture</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab
