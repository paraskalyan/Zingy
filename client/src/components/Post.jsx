import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'
import Skeleton from './Skeleton';
import useFetchUser from '../hooks/useFetchUser';

const Post = ({ blog }) => {
    const { user, loading } = useFetchUser(blog.author);

    const navigate = useNavigate();
    const openBlogPage = () => {
        navigate(`/blog/${blog._id}`)
    }


    if (loading) return <Skeleton />

    return (
        <div onClick={openBlogPage} className=' space-y-1 flex bg-[#fafafa] flex-col justify-between  cursor-pointer hover:bg-[#f8f8f8] p-3 border border-[#e9e9e9] rounded-2xl'>
            <img className=' rounded-t-2xl hover:brightness-90' src={blog.image} />
            <h6 className='text-[14px] text-gray-700'>{blog.category}</h6>
            <h1 className='text-xl font-bold break-words'>{blog.title}</h1>
            {/* <h3 className='text-gray-700 text-[14px]' dangerouslySetInnerHTML={{ __html: blog.content }}></h3> */}
            <div className='flex gap-4 mt-1'>
                <img width={20} className='rounded-full' src={user.avatar} />
                <h6 className='text-gray-700 text-[14px]'>{user.fullName}</h6>
            </div>
        </div>
    )
}

export default Post