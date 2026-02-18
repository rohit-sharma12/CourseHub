import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {

    const [title, setTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [disable, setDisable] = useState(true);

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
                if (res.data.sucess) {
                    setUploadVideoInfo({ videoUrl: res.data.data.url, publicId: res.data.data.public._id });
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
    }
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>Make changes and click to save.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="destructive">Remove lecture</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Input</Label>
                    <Input type="text" placeholder="Ex.Introduction to javaScript" />
                </div>
                <div className="my-5">
                    <Label>Video <span className="text-red-500">*</span></Label>
                    <Input type="file" onChange={fileChangedHandler} accept="video/*" placeholder="Ex.Introduction to javaScript" className="w-fit" />
                </div>
                <div className="flex items-center space-x-2 my-5">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Is this video FREE</Label>
                </div>
                {mediaProgress && (
                    <div className="my-4">
                        <Progress value={uploadProgress} />
                        <p>{uploadProgress}% uploadded</p>
                    </div>
                )}
                <div className="mt-4">
                    <Button>Update lecture</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab
