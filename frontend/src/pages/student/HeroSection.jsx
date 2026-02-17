import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Course from "./Course";
import { Search } from "lucide-react";
import { useState } from "react";
import CourseCard from "./CourseCard";

const HeroSection = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white">

            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

                {/* Background Glow Effects */}
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-32 flex flex-col items-center text-center">

                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 mb-6 px-5 py-2 text-sm rounded-full 
      bg-indigo-100/60 dark:bg-indigo-500/10 
      text-indigo-600 dark:text-indigo-400 backdrop-blur-md border border-indigo-200/50 dark:border-indigo-500/20">
                        🚀 Learn • Grow • Build
                    </span>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl">
                        Master In-Demand Skills <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            with CourseHub LMS
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                        Learn from industry experts. Build real-world projects.
                        Upgrade your career with our modern learning platform.
                    </p>

                    {/* Search Box */}
                    <form className="mt-10 w-full max-w-2xl">
                        <div className="flex items-center gap-3 p-3 rounded-2xl 
        bg-white/70 dark:bg-slate-900/70 
        backdrop-blur-xl border border-gray-200 dark:border-slate-700 
        shadow-xl focus-within:ring-2 focus-within:ring-indigo-500 transition">

                            <Search className="text-gray-400 ml-2" size={22} />

                            <input
                                type="text"
                                placeholder="Search courses (React, Node, MERN...)"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 h-12 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder:text-gray-400"
                            />

                            <Button
                                type="submit"
                                className="h-11 px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition">
                                Search
                            </Button>
                        </div>
                    </form>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex gap-4">
                        <Button size="lg" className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90">
                            Get Started
                        </Button>

                        <Button size="lg" variant="outline" className="px-8">
                            Browse Courses <ArrowRight className="ml-2" />
                        </Button>
                    </div>

                    {/* Social Proof */}
                    <div className="mt-12 grid grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="text-2xl font-bold">10K+</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Active Students</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">500+</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Courses</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">4.9★</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Average Rating</p>
                        </div>
                    </div>

                </div>
            </section>


            <div className="bg-gray-50 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-6 py-20">

                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Popular Courses</h2>
                    </div>
                    <CourseCard />
                </div>
            </div>


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
