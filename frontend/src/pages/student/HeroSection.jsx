import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CourseCard from "./CourseCard";
import { Search } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white">

            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">

                    <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full 
            bg-indigo-100 dark:bg-indigo-500/10 
            text-indigo-600 dark:text-indigo-400">
                        🚀 Learn • Grow
                    </span>

                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
                        Upgrade Your Skills with <br />
                        <span className="text-indigo-600 dark:text-indigo-400">
                            CourseHub LMS
                        </span>
                    </h1>

                    <form action="" className="mt-10 w-full max-w-xl">
                        <div className="flex items-center gap-2 p-2 rounded-2xl border bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                           
                            <Search className="text-gray-400 ml-2" size={20} />

                            <input
                                type="text"
                                placeholder="Search courses (React, Node, MERN...)"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 h-12 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder:text-gray-400"/>

                            <Button
                                type="submit"
                                className="h-11 px-6 rounded-xl">
                                Search
                            </Button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <Button size="lg">
                            Browse Courses <ArrowRight className="ml-2" />
                        </Button>

                    </div>
                </div>
            </section>

            <section className="bg-gray-50 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Popular Courses</h2>
                        <Button variant="ghost">View All</Button>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <CourseCard />
                        
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Start Learning Today 🚀
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Join thousands of learners building their future with CourseHub.
                </p>
                <Button size="lg" className="mt-8">
                    Join Now
                </Button>
            </section>
        </div>
    );
};

export default HeroSection;
