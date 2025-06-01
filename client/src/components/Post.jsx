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
        <div onClick={openBlogPage} className=' space-y-2 flex flex-col justify-between cursor-pointer hover:bg-[#f8f8f8] p-3 shadow-md'>
            <img className=' hover:brightness-90' src='https://codesupply.co/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fix6yojsv%2Fproduction%2Ffb67e96e45b30f4f561fe34b54e9fa866ea5ad9d-1600x900.webp&w=1080&q=95' />
            <h6 className='text-[14px] text-gray-700'>{blog.category}</h6>
            <h1 className='text-xl font-bold'>{blog.title}</h1>
            {/* <h3 className='text-gray-700 text-[14px]' dangerouslySetInnerHTML={{ __html: blog.content }}>   </h3> */}
            <div className='flex gap-4 mt-3'>
                <img width={20} className='rounded-full' src={user.avatar} />
                <h6 className='text-gray-700 text-[14px]'>{user.username}</h6>
            </div>
        </div>
    )
}

export default Post