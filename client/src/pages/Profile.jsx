import axios from 'axios'
import { Button } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Post from '../components/Post'
import EditProfile from '../components/EditProfile'

const Profile = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const [blogs, setBlogs] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const getUserBlogs = async () => {
            const res = await axios.get(`http://localhost:4000/api/user/getUserBlogs/${currentUser._id}`)
            setBlogs(res.data)
        }
        getUserBlogs();
    }, [])

    return (
        <div className='mx-[15%] my-12 '>
            <div className=' h-[150px] bg-gradient-to-r from-pink-700 to-purple-700'>

            </div>
            <div className=' flex items-center gap-3 p-3 border-b border-[#d9d9d9]'>
                <img className='rounded-lg relative bottom-12 bg-[#f8f8f8] v' width={150} src={currentUser.avatar} />
                <div className='flex-1'>
                    <h2 className='text-xl font-bold'>{currentUser.username}</h2>
                    <h6 className='text-[14px]'>{currentUser.bio}</h6>
                    <Button onClick={() => setOpenModal(true)}>Edit Profile</Button>
                    <EditProfile openModal={openModal} setOpenModal={setOpenModal} />
                </div>
                <div className='flex-1 flex gap-8 '>
                    <div>
                        <h4 >Followers</h4>
                        <h1 className='text-2xl font-bold'>{currentUser.followers.length}</h1>
                    </div>

                    <div>
                        <h4 >Following</h4>
                        <h1 className='text-2xl font-bold'>{currentUser.following.length}</h1>
                    </div>

                </div>
            </div>
            <div className='my-5'>
                <h1 className='font-bold text-2xl'>Your posts</h1>
                <div className='grid grid-cols-3 gap-3 mt-5'>
                    {blogs &&
                        blogs.map((blog, index) => {
                            return (
                                <Post key={index} blog={blog} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile