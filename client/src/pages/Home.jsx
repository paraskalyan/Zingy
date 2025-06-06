import React from 'react'
import Header from '../components/Header'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Blockquote, Spinner } from 'flowbite-react'
import Loader from '../components/Loader'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../redux/blog/blogSlice'

const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Believe you can and you're halfway there.",
    "Stay hungry. Stay foolish.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Do something today that your future self will thank you for.",
    "Don't watch the clock; do what it does. Keep going.",
    "Everything you’ve ever wanted is on the other side of fear.",
    "Dream big and dare to fail.",
    "Your time is limited, don’t waste it living someone else’s life.",
    "Great things never came from comfort zones."
];



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
                const res = await axios.get(`http://localhost:4000/api/blog/getAll?search=${searchQuery}`)
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
        <div className='flex items-start mx-[10%] max-sm:mx-6 py-10 gap-4'>
            <div className='flex-[3] grid lg:grid-cols-2 grid-cols-1  gap-10'>
                {
                    blogs.map((blog, index) => {
                        return <Post key={index} blog={blog} />
                    })
                }
            </div>
            <div className='flex-[1] space-y-10 max-sm:hidden border-l border-l-gray-200 p-4'>
                <h1 className='text-2xl font-bold'>Get motivated and write powerful stories</h1>
                {quotes.map((quote, index) => {
                    return (
                        <Blockquote key={index} className='text-black'>
                            <span className='text-[#838383]'>"{quote}"</span>
                        </Blockquote>
                    )
                })}
            </div>
        </div>
    )
}

export default Home