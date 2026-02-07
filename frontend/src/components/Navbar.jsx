import { School, Menu, X, BookOpen, User, LayoutDashboard, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SidebarItem from "../SidebarItem";


const Navbar = () => {
    const user = true;
    const role = "instructor";

    const [theme, setTheme] = useState("light");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                        <School size={28} />
                        CourseHub
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                            className="p-2 rounded-lg border dark:border-slate-700"
                        >
                            {theme === "light" ? "🌙" : "☀️"}
                        </button>

                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-48">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem>
                                        <BookOpen size={16} className="mr-2" />
                                        My Learning
                                    </DropdownMenuItem>

                                    <DropdownMenuItem>
                                        <User size={16} className="mr-2" />
                                        Edit Profile
                                    </DropdownMenuItem>

                                    {role === "instructor" && (
                                        <DropdownMenuItem>
                                            <LayoutDashboard size={16} className="mr-2" />
                                            Dashboard
                                        </DropdownMenuItem>
                                    )}

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem className="text-red-500">
                                        <LogOut size={16} className="mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex gap-3">
                                <Button variant="outline">Login</Button>
                                <Button>Signup</Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-900 dark:text-white"
                        onClick={() => setOpen(true)}
                    >
                        <Menu size={26} />
                    </button>
                </div>
            </nav>
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-slate-900 z-50
                transform transition-transform duration-300
                ${open ? "translate-x-0" : "translate-x-full"}`}>
                
                <div className="flex items-center justify-between px-5 h-16 border-b dark:border-slate-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Menu
                    </h2>
                    <button onClick={() => setOpen(false)}>
                        <X />
                    </button>
                </div>

                <div className="p-5 space-y-3 text-gray-800 dark:text-gray-200">
                    <SidebarItem icon={<BookOpen size={18} />} text="My Learning" />
                    <SidebarItem icon={<User size={18} />} text="Edit Profile" />

                    {role === "instructor" && (
                        <SidebarItem
                            icon={<LayoutDashboard size={18} />}
                            text="Dashboard"
                        />
                    )}

                    <hr className="dark:border-slate-700 my-4" />

                    <SidebarItem
                        icon={<LogOut size={18} />}
                        text="Logout"
                        danger
                    />

                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="w-full mt-4 p-2 border rounded-lg dark:border-slate-800"
                    >
                        Toggle Theme
                    </button>
                </div>
            </div>
        </>
    );
};

export default Navbar;