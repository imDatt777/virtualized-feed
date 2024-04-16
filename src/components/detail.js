/* eslint-disable react-hooks/exhaustive-deps */

// Importing NPM Dependencies
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Importing Component
import Post from "./post";

// Importing Assets
import back from "../static/images/back.svg";

// Importing API URL
import { API_FETCH_POST } from "../utilities/apiURLs";

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [postResponse, setPostResponse] = useState({});

    /**
     * FetchPost
     *
     * @param {number} id
     */
    const fetchPost = async (id) => {
        const response = await fetch(API_FETCH_POST(id), {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
            },
        });

        const data = await response.json();
        setPostResponse(data);
    };

    useEffect(() => {
        if (id) {
            fetchPost(id);
        }
    }, []);

    return (
        <div className='detail p-[20px] border-solid border-l-[1px] border-r-[1px] border-[#DAE4ED] w-[500px] mx-auto h-[100vh]'>
            <img
                className='cursor-pointer mb-[15px]'
                src={back}
                alt='Back'
                onClick={() => {
                    navigate("/");
                }}
            />
            <Post post={postResponse} isDetail />
        </div>
    );
};

export default Detail;
