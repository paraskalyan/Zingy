import React from 'react'
import Comment from '../components/Comment'
import { Link, useParams } from 'react-router'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Loader from '../components/Loader';
import useFetchUser from '../hooks/useFetchUser';
import { Button } from 'flowbite-react';
import { useSelector } from 'react-redux'

function BlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const currentUser = useSelector(state => state.user.currentUser)

    const { user, loading: userLoading } = useFetchUser(blog ? blog.author : null);


    useEffect(() => {

        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/blog/${id}`)
                if (res) setBlog(res.data)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchBlog();
    }, [id])

    const followUser = () => {

    }

    if (loading || userLoading) {
        return <Loader />
    }
    return (
        <div className=' mx-[25%] space-y-2 text-justify py-10'>
            <h6 className='text-[13px] text-gray-700'>
                Published May 30, 2025</h6>
            <h1 className='text-4xl font-bold'>{blog.title}</h1>
            <div className='flex gap-2 items-center'>
                <Link to={`/profile/${blog.author}`}><img width={20} src={user.avatar} /></Link>
                <h6 className='text-[13px] text-gray-700'>By {user.username}</h6>
                {currentUser._id !== blog.author ?
                    <Button onClick={followUser} size='sm'>Follow</Button> : ''
                }
            </div>
            <p className='mt-10' dangerouslySetInnerHTML={{ __html: blog.content }}>

            </p>
            <h1 className='text-2xl font-bold mt-20'>Responses</h1>
            <div className='space-y-5'>
                {blog.comments.length > 0 ?
                    blog.comments.map((item, index) => {
                        <Comment />
                    })
                    : <h1>Be first to comment on this post</h1>
                }
            </div>
        </div>
    )
}

export default BlogPage