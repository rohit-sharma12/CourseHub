import { Button } from "@/components/ui/button";

const Course = () => {
  return (
      <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-950 border dark:border-slate-800 hover:shadow-xl transition">
          <img
              src="https://i.ytimg.com/vi/1i8R-iJiEi8/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB7xe35RgNbuVXDFO7OoGmaJltvNw"
              alt="course"
              className="w-full h-40 object-cover"
          />
          <div className="p-5">
              <h3 className="font-semibold text-lg">
                  Full-Stack MERN Development
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Build real-world projects with MERN stack.
              </p>
              <Button size="sm" className="mt-4 w-full">
                  Enroll Now
              </Button>
          </div>
      </div>
  )
}

export default Course
