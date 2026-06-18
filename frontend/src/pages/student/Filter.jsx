import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent, SelectLabel, SelectGroup } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";
import { useState } from "react";

const categories = [
    { id: "mern", label: "MERN" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "fullstack", label: "Full Stack" },
    { id: "javascript", label: "JavaScript" },
    { id: "dsa", label: "DSA" },
    { id: "react", label: "React" },
    { id: "nextjs", label: "NEXT JS" },
    { id: "nodejs", label: "Node.js" },
    { id: "mongodb", label: "MongoDB" },
    { id: "express", label: "Express" },
    { id: "python", label: "Python" },
    { id: "django", label: "Django" },
    { id: "data-science", label: "Data Science" },
    { id: "machine-learning", label: "Machine Learning" },
    { id: "devops", label: "DevOps" },
    { id: "cloud-computing", label: "Cloud Computing" },
    { id: "cyber-security", label: "Cyber Security" },
    { id: "mobile-development", label: "Mobile Development" },
    { id: "ui-ux", label: "UI/UX Design" },
];

const Filter = ({ handleFilterChange }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortByPrice, setSortByPrice] = useState("");

    const handleCategoryChange = (categoryId) => {
        const newCategories = selectedCategories.includes(categoryId)
            ? selectedCategories.filter((id) => id !== categoryId)
            : [...selectedCategories, categoryId];

        setSelectedCategories(newCategories);
        handleFilterChange(newCategories, sortByPrice);
    };

    const selectByPriceHandler = (selectedValue) => {
        setSortByPrice(selectedValue);
        handleFilterChange(selectedCategories, selectedValue);
    };


    return (
        <div className="w-full md:w-[20%]">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
                <Select onValueChange={selectByPriceHandler}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort by price</SelectLabel>
                            <SelectItem value="low">Low to Hight</SelectItem>
                            <SelectItem value="high">High to Low</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Separator className="my-2" />
            <div>
                <h1 className="font-semibold mb-2">CATEGORY</h1>
                {
                    categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2 my-2">
                            <Checkbox id={category?.id} onCheckedChange={() => handleCategoryChange(category?.id)} />

                            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-700">
                                {category.label}
                            </Label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Filter
