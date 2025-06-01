import React from 'react'
import Header from '../components/Header'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Spinner } from 'flowbite-react'
import Loader from '../components/Loader'
import Post from '../components/Post'

const Home = () => {
    const [blogs, setBlogs] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/blog/getAll')
                setBlogs(res.data)
                console.log(res.data)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    if (loading) return <Loader />
    return (
        <div className='flex  mx-[10%] py-10 gap-4'>
            <div className='flex-[3] grid grid-cols-2  gap-10'>
                {
                    blogs.map((blog, index) => {
                        return <Post key={index} blog={blog} />
                    })
                }
            </div>
            <div className='flex-[1] border-l border-l-gray-200 p-4'>
                <h1 className='text-3xl font-bold'>Unleash you thoughts</h1>
                <h6>Write your story</h6>
            </div>
        </div>
    )
}

export default Home