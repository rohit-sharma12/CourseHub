import { Skeleton } from "@/components/ui/skeleton";

const CourseSkeleton = () => {
    return (
        <div className="w-full rounded-xl overflow-hidden bg-white dark:bg-slate-950 border dark:border-slate-800">
            <Skeleton className="w-full h-40" />

            <div className="p-5 space-y-3">
                <Skeleton className="h-5 w-4/5" />

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-9 w-full mt-4 rounded-md" />
            </div>
        </div>
       
    );
};

export default CourseSkeleton;
