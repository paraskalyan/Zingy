import axios from 'axios'
import { Button } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Post from '../components/Post'
import EditProfile from '../components/EditProfile'
import { useParams } from 'react-router'
import useFetchUser from '../hooks/useFetchUser'
import Loader from '../components/Loader'

const Profile = () => {
    const { id } = useParams();
    const { user, loading } = useFetchUser(id)
    const currentUser = useSelector(state => state.user.currentUser)
    const [blogs, setBlogs] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const getUserBlogs = async () => {
            const res = await axios.get(`http://localhost:4000/api/user/getUserBlogs/${id}`)
            setBlogs(res.data)
        }
        getUserBlogs();
    }, [id])

    const followUser = async (targetId, currentId) => {
        try {

            const res = await axios.post(`http://localhost:4000/api/user/${targetId}/follow`,
                {
                    currentUser: currentId
                }
            )
            console.log(res.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    if (loading) return <Loader />

    return (
        <div className='mx-[15%] my-12 '>
            <div className=' h-[150px] bg-gradient-to-r from-pink-700 to-purple-700'>

            </div>
            <div className=' flex items-center gap-3 p-3 border-b border-[#d9d9d9]'>
                <img className='rounded-lg relative bottom-12 bg-[#f8f8f8] v' width={150} src={user.avatar} />
                <div className='flex-1'>
                    <h2 className='text-xl font-bold'>{user.username}</h2>
                    <h6 className='text-[14px]'>{user.bio}</h6>
                    {
                        currentUser._id === id ?
                            <Button onClick={() => setOpenModal(true)}>Edit Profile</Button> :
                            <Button onClick={() => followUser(id, currentUser._id)}>{user.followers.includes(currentUser._id) ? 'Following' : 'Follow'}</Button>
                    }
                    <EditProfile openModal={openModal} setOpenModal={setOpenModal} />
                </div>
                <div className='flex-1 flex gap-8 '>
                    <div>
                        <h4 >Followers</h4>
                        <h1 className='text-2xl font-bold'>{user.followers.length}</h1>
                    </div>

                    <div>
                        <h4 >Following</h4>
                        <h1 className='text-2xl font-bold'>{user.following.length}</h1>
                    </div>

                </div>
            </div>
            <div className='my-5'>
                <h1 className='font-bold text-2xl'>Posts</h1>
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