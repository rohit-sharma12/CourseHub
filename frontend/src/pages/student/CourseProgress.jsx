import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, CirclePlay } from "lucide-react";
import { useCompleteCourseMutation, useGetCourseProgressQuery, useIncompleteCourseMutation, useUpdateLectureProgressMutation } from "../../api/courseProgressApi.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams()
  const courseId = params.courseId;

  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markComplete, isSuccess: completedSucccess }] = useCompleteCourseMutation();
  const [incompleteCourse, { data: markInComplete, isSuccess: inCompletedSucccess }] = useIncompleteCourseMutation();

  useEffect(() => {
    if (completedSucccess) {
      refetch()
      toast.success(markComplete.message);
    }
    if (inCompletedSucccess) {
      refetch()
      toast.success(markInComplete.message);
    }
  }, [completedSucccess, inCompletedSucccess]);


  const [currentLecture, setCuurentLecture] = useState(null);

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Faoled to load course details</p>

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  const initialLecture = currentLecture || courseDetails.lectures && courseDetails.lectures[0];

  const isLecutreCompleted = (lectureId) => {
    return progress.some(
      (prog) =>
        prog.lectureId === lectureId &&
        prog.viewed
    );
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };


  const handleSelectLecture = (lecture) => {
    setCuurentLecture(lecture)
    handleLectureProgress(lecture?._id)
  };


  const handleCompleteCourse = async () => {
    await completeCourse(courseId)
  };

  const handleIncomplete = async () => {
    await incompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button onClick={completed ? handleIncomplete : handleCompleteCourse} variant={completed ? "outline" : "default"}>
          {
            completed ? (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" /><span>Completed</span>{" "}
              </div>
            ) : (
              "Mark as Complete"
            )
          }

        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture?._id)}
            />
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-medium">
              {
                `Lecture ${courseDetails.lectures.findIndex((lec) => lec._id.toString() === (currentLecture?._id || initialLecture._id)?.toString()) + 1} : ${currentLecture?.lectureTitlem || initialLecture.lectureTitle}`
              }
            </h3>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {
              courseDetails?.lectures.map((lecture) => (
                <Card key={lecture._id} onClick={() => handleSelectLecture(lecture)} className={`mb-3 hover:cursor-pointer transition transfor ${lecture._id === currentLecture?._id ? "bg-gray-200" : "dark:bg-gray-800"} `}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {
                        isLecutreCompleted(lecture._id) ? (
                          <CheckCircle size={24} className="text-green-500 mr-2" />
                        ) : (
                          <CirclePlay size={24} className="text-gray-500 mr-2" />
                        )
                      }
                      <div className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </div>
                    </div>
                    {
                      isLecutreCompleted(lecture._id) && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                          <CheckCircle size={16} />
                          completed
                        </span>
                      )
                    }

                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default CourseProgress
