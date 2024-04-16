/* eslint-disable react-hooks/exhaustive-deps */

// Importing NPM Dependencies
import React from "react";

// Importing Component
import Attachments from "./primary/attachments";

const Post = (props) => {
    const { post = {}, postClickHandler = () => {}, isDetail = false } = props;

    return (
        <section
            className='post-container p-[5px] flex mt-[10px] cursor-pointer'
            onClick={postClickHandler}
        >
            <aside className='profile'>
                <img
                    className='h-[30px] w-[30px] rounded-full'
                    src={post?.author?.profilePictureUrl}
                    alt='Profile'
                />
            </aside>
            <div className='details ml-[10px]'>
                <h3 className='name text-[16px] leading-5'>
                    {post?.author?.name}
                </h3>
                <p className='text text-[12px] leading-4 mt-[8px]'>
                    {post?.text}
                </p>
                <div className='attachments mt-[8px] flex'>
                    <Attachments
                        postsData={post?.attachments}
                        isDetail={isDetail}
                    />
                </div>
            </div>
        </section>
    );
};

export default Post;
