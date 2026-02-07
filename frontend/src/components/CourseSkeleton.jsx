import { Skeleton } from "@/components/ui/skeleton";

const CourseSkeleton = () => {
    return (
        <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-950 border dark:border-slate-800">
            <Skeleton className="w-full h-36" />
            <div className="px-5 py-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-4 w-6 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
                <Skeleton className="h-9 w-16" />
            </div>
            <Skeleton className="h-4 w-1/4" />
        </div>
    );
};

export default CourseSkeleton;
