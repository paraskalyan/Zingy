import React from 'react'
import Header from '../components/Header'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Spinner } from 'flowbite-react'
import Loader from '../components/Loader'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../redux/blog/blogSlice'

const Home = () => {
    // const [blogs, setBlogs] = useState(null)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs.blogs)
    const searchQuery = useSelector(state => state.searchQuery.searchQuery)
    console.log(searchQuery)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                console.log("gone")
                const res = await axios.get(`http://192.168.29.102:4000/api/blog/getAll?search=${searchQuery}`)
                // setBlogs(res.data)
                dispatch(setBlogs(res.data))

            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [searchQuery])

    if (loading) return <Loader />
    return (
        <div className='flex  mx-[10%] py-10 gap-4'>
            <div className='flex-[3] grid grid-cols-2 max-sm:grid-cols-1  gap-10'>
                {
                    blogs.map((blog, index) => {
                        return <Post key={index} blog={blog} />
                    })
                }
            </div>
            <div className='flex-[1] max-sm:hidden border-l border-l-gray-200 p-4'>
                <h1 className='text-3xl font-bold'>Unleash you thoughts</h1>
                <h6>Write your story</h6>
            </div>
        </div>
    )
}

export default Home