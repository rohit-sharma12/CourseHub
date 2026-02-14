import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CourseTab = () => {
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
                        <input type="text" placeholder="Ex. Fullstack Developer" name="courseTitle" />
                    </div>
                </div>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Subtitle</Label>
                        <input type="text" placeholder="Ex. Fullstack Developer" name="courseTitle" />
                    </div>
                </div>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Subtitle</Label>
                        <input type="text" placeholder="Ex. Become a Fullstack Developer" name="subTitle" />
                    </div>
                </div>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Description</Label>
                        <RichTextEditor />
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default CourseTab
