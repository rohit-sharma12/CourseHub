import { Edit } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Lecture = ({ lecture, courseId, index }) => {
    const navigate = useNavigate();
    const goToUpdateLecture = () => {
        navigate(`${lecture._id}`)
    }
    return (
        <div className="flex items-center justify-between bg-[#F7F9FA]  dark:bg-slate-950 px-4 py-2 rounded-md my-2 dark:text-white">
            <h1 className="font-bold text-gray-800 dark:text-gray-100">Lecture - {index + 1} {lecture.lectureTitle}</h1>
            <Edit className="cursor-pointer text-gray-600 drak:text-gray-300 hover:text-blue-600 dark:hover-text-400" onClick={goToUpdateLecture} size={20} />
        </div>
    )
}

export default Lecture
