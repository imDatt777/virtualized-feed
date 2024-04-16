/* eslint-disable react-hooks/exhaustive-deps */

// Importing NPM Dependencies
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FixedSizeList as List } from "react-window";

// Importing Components
import Search from "./search";
import Users from "./users";
import Post from "./post";

// Importing Context
import { useFeed } from "../context";

// Importing API URLS
import { API_FETCH_ALL_POSTS, API_FETCH_USERS } from "../utilities/apiURLs";

const Feed = () => {
    const feedRef = useRef(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);

    const { feed, setFeed } = useFeed();
    const navigate = useNavigate();

    /**
     * FetchFeed
     */
    const fetchFeed = async (pageNo) => {
        setLoading(true);

        const response = await fetch(API_FETCH_ALL_POSTS(pageNo), {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
            },
        });

        const newData = await response.json();

        setData((prevData) => [...prevData, ...newData?.data]);
        setLoading(false);
    };

    /**
     * FetchUsers
     */
    const fetchUsers = async () => {
        const response = await fetch(API_FETCH_USERS, {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
            },
        });

        const data = await response.json();
        setUsers(data);
    };

    /**
     * HandleScroll
     */
    const handleScroll = () => {
        // Calculate how close the user is to the bottom
        const scrollPos = window.innerHeight + window.scrollY;
        const scrollMax = document.body.offsetHeight;

        if (scrollPos >= scrollMax - 1) {
            // User has reached the bottom, load more items
            setPage((prevPage) => prevPage + 1);
        }
    };

    /**
     * PostClickHandler
     *
     * @param {Object} item
     */
    const postClickHandler = (item) => {
        navigate(`/post/${item?.id}`);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        fetchUsers();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setFeed(data);
        } else {
            fetchFeed(1);
        }
    }, [data]);

    useEffect(() => {
        fetchFeed(page);
    }, [page]);

    const Row = ({ index, style }) => (
        <div style={style}>
            <Post
                post={feed[index]}
                postClickHandler={postClickHandler.bind(this, feed[index])}
            />
        </div>
    );

    return (
        <div className='search-feed relative'>
            <Search />
            <Users users={users} />
            <div
                className='feed p-[20px] border-solid border-l-[1px] 
                border-r-[1px] border-[#DAE4ED] w-[500px] mx-auto -mt-[430px]'
                ref={feedRef}
            >
                <List
                    className='list'
                    height={640}
                    itemCount={feed && feed.length}
                    itemSize={190}
                    width={460}
                >
                    {Row}
                </List>
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default Feed;
