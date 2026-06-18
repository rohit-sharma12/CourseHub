import Filter from './Filter'
import CourseSkeleton from "../../components/CourseSkeleton";
import SearchResult from './SearchResult';
import { useGetSearchCoursesQuery } from '../../api/courseApi';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortByPrice, setSortByPrice] = useState("");

    const { data, isLoading } = useGetSearchCoursesQuery({
        searchQuery: query,
        categories: selectedCategories,
        sortByPrice
    });
    const isEmpty = !isLoading && data?.courses.length === 0;

    const handleFilterChange = (categories, price) => {
        setSelectedCategories(categories);
        setSortByPrice(price)
    }

    return (
        <div className='max-w-7xl mx-auto p-4 md:p-8'>
            <div className='my-4'>
                <h1 className='font-bold text-xl ms:text-2xl'>result for "{query}"</h1>
                <p>Showing result for {" "}
                    <span className='text-blue-800 font-bold italic'>{query}</span>
                </p>
            </div>
            <div className='flex flex-col md:flex-row gap-10'>
                <Filter handleFilterChange={handleFilterChange} />
                <div className='flex-1'>
                    {
                        isLoading ? (
                            Array.from({ length: 3 }).map((_, idx) => (
                                <CourseSkeleton key={idx} />
                            ))
                        ) : isEmpty ? (
                            <h1>Course Not Found!</h1>
                        ) : (
                            data?.courses?.map((course) => (
                                <SearchResult key={course._id} course={course} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Search