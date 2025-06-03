import React from 'react'
import Comment from '../components/Comment'
import { Link, useNavigate, useParams } from 'react-router'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Loader from '../components/Loader';
import useFetchUser from '../hooks/useFetchUser';
import { Button, Modal, ModalBody, ModalHeader, Popover } from 'flowbite-react';
import { useSelector } from 'react-redux'
import { HiDotsVertical, HiOutlineExclamationCircle, HiOutlineTrash } from 'react-icons/hi'
import PostMenu from '../components/PostMenu';

const modalTheme = {
    root: {
        base: 'bg-white text-black'
    },
    header: {
        base: 'bg-white text-black',
    },
    body: {
        base: 'bg-white'
    }
}


function BlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const currentUser = useSelector(state => state.user.currentUser)
    const navigate = useNavigate();

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

    const [openModal, setOpenModal] = useState(false)

    const handlePostDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:4000/api/blog/deletepost/${id}/${currentUser._id}`, {
                withCredentials: true
            })
            console.log(res)
            if (res) {
                navigate('/')
                setOpenModal(false)
            }
        }
        catch (error) {
            console.log(error)

        }
    }

    if (loading || userLoading) {
        return <Loader />
    }
    return (
        <div className=' mx-[25%] relative  space-y-2 text-justify py-10'>
            <PostMenu setOpenModal={setOpenModal} />
            <Modal theme={modalTheme}
                show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader className=''>Confirm Delete</ModalHeader>
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineTrash className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this post?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button className='' color="failure" onClick={handlePostDelete}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <h6 className='text-[13px] text-gray-700'>
                Published May 30, 2025</h6>
            <h1 className='text-4xl font-bold'>{blog.title}</h1>
            <div className='flex gap-2 items-center'>
                <Link to={`/profile/${blog.author}`}><img width={40} className='rounded-full' src={user.avatar} /></Link>
                <h6 className='text-[13px] text-gray-700'>By {user.username}</h6>
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


// const PostMenu = ({ setOpenModal }) => {
//     const [open, setOpen] = useState(false);
//     const navigate = useNavigate();
//     const { id } = useParams();
//     return (
//         <Popover
//             open={open}
//             onOpenChange={setOpen}
//             className='border-none shadow-md'
//             arrow={false}
//             content={
//                 <div className='flex flex-col w-[140px] items-start gap-3 text-[14px] p-3 px-6 text-[#5d5d5d] border-none'>
//                     <button onClick={() => navigate(`/post/${id}/edit`)} className='cursor-pointer hover:text-black'>Edit post</button>
//                     <button onClick={() => setOpenModal(true)} className='cursor-pointer text-red-500 hover:text-red-700'>Delete post</button>
//                 </div>
//             }
//         >
//             <button className='cursor-pointer'><HiDotsVertical size={20} color='gray' /></button>
//         </Popover>
//     )
// }

export default BlogPage