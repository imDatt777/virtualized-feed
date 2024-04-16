// Importing NPM Dependencies
import React from "react";

const User = (props) => {
    const { user } = props;

    return (
        <div className='flex mb-[8px] items-center'>
            <img
                className='h-[30px] w-[30px] rounded-full'
                src={user?.profilePictureUrl}
                alt='User Profile'
            />
            <p className='text-[12px] leading-4 ml-[10px]'>{user?.name}</p>
        </div>
    );
};

const Users = (props) => {
    const { users } = props;

    return (
        <div className='sticky top-[60px] left-[100%] w-[200px] p-[10px]'>
            <h3 className='text-[14px] leading-5 mb-[10px] font-medium'>
                Members
            </h3>
            {users.map((user, idx) => (
                <User key={idx} user={user} />
            ))}
        </div>
    );
};

export default Users;
