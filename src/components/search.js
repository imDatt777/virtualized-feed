// Importing NPM Dependencies
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importing Context
import { useFeed } from "../context";

// Importing Asset
import searchIcon from "../static/images/search.svg";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const { feed } = useFeed();

    // Debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Search function
    const search = (query) => {
        const filteredResults = feed.filter((item) =>
            item.text.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    // Debounced search function
    const debouncedSearch = debounce(search, 300);

    // Event handler for input change
    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.length >= 3) {
            setIsDropdownOpen(true);
            debouncedSearch(query);
        } else {
            setIsDropdownOpen(false);
        }
    };

    const listItemClickHandler = (item) => {
        navigate(`/post/${item?.id}`);
    };

    useEffect(() => {
        return () => {
            // Cleanup
            setIsDropdownOpen(false);
        };
    }, []);

    return (
        <div className='bg-[#dae4ed] py-[15px] flex justify-center sticky top-0 z-10'>
            <div
                className={`input-container h-[30px] bg-white flex items-center w-[240px] ${
                    isDropdownOpen ? "rounded-t-lg" : "rounded-lg "
                }`}
            >
                <img
                    className='search h-[20px] w-[20px]'
                    src={searchIcon}
                    alt='Search'
                />
                <input
                    className={`focus:outline-none ml-[20px]  ${
                        isDropdownOpen ? "" : "rounded-lg "
                    }`}
                    type='text'
                    value={searchQuery}
                    onChange={handleInputChange}
                />
            </div>
            {isDropdownOpen && (
                <ul
                    className='search-list absolute top-[40px] bg-white w-[240px] px-[10px] h-[150px] 
                    overflow-y-auto rounded-b-lg border-[1px]'
                >
                    {searchResults.map((result, index) => (
                        <li
                            className='border-b-[1px] py-[5px] cursor-pointer'
                            key={index}
                            onClick={listItemClickHandler.bind(this, result)}
                        >
                            {result.text.substring(0, 20) + "..."}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
