import axios from 'axios'
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import useFetchUser from '../hooks/useFetchUser'
import Loader from '../components/Loader'
import Post from '../components/Post'
import EditProfile from '../components/EditProfile'
import { HiOutlineTrash } from 'react-icons/hi'
import { signOut } from '../redux/user/userSlice'

const Profile = () => {
    const { id } = useParams();
    // const { user, loading, setUser } = useFetchUser(id);
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();

    const [followers, setFollowers] = useState([]);
    const [blogs, setBlogs] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const dispatch = useDispatch()

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/user/${id}`);
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [id]);


    // Sync followers once user is fetched
    useEffect(() => {
        if (user) {
            setFollowers(user.followers || []);
        }
    }, [user]);

    useEffect(() => {
        const getUserBlogs = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/user/getUserBlogs/${id}`);
                setBlogs(res.data);
            } catch (error) {
                console.log('Failed to fetch blogs:', error);
            }
        };
        getUserBlogs();
    }, [id]);

    const toggleFollow = async (targetId, currentId, isFollowing) => {
        const updatedFollowers = isFollowing
            ? followers.filter(uid => uid !== currentId)  // Unfollow
            : [...followers, currentId];                 // Follow

        setFollowers(updatedFollowers);

        const endpoint = isFollowing
            ? `http://localhost:4000/api/user/${targetId}/unfollow`
            : `http://localhost:4000/api/user/${targetId}/follow`;

        try {
            await axios.post(endpoint, { currentUser: currentId }, { withCredentials: true });
        } catch (error) {
            console.log('Follow/unfollow failed:', error);
            setFollowers(prev =>
                isFollowing ? [...prev, currentId] : prev.filter(uid => uid !== currentId)
            );
        }
    };

    const deleteAccount = async () => {
        try {
            const res = await axios.delete(`http://localhost:4000/api/user/deleteuser/${currentUser._id}`, {
                withCredentials: true,
            })
            console.log(res.data)
            if (res) {
                dispatch(signOut())
                navigate('/login')
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    if (loading) return <Loader />;

    const isFollowing = followers.includes(currentUser._id);

    return (
        <div className='mx-[15%] max-sm:mx-6 my-12 max-sm:my-2'>
            <div className='flex max-sm:flex-col  items-center justify-between gap-3 p-3 border-b border-[#d9d9d9]'>
                <div className='flex max-sm:flex-col items-center gap-4'>
                    <img className='rounded-full p-3 aspect-square bg-[#f8f8f8]' width={120} src={user.avatar} />
                    <div>
                        <h2 className='text-xl font-semibold max-sm:text-center'>{user.fullName}</h2>
                        <h6 className='text-[14px] mb-4'>{user.bio}</h6>
                        {currentUser._id === id ? (
                            <div className='flex gap-5'>
                                <Button color='primary' onClick={() => setOpenModal(true)}>Edit Profile</Button>
                                <Button onClick={() => setDeleteModal(true)} color='primary' className='bg-red-700'>Delete account</Button>
                            </div>

                        ) : (
                            <Button
                                color='primary'
                                className='max-sm:w-full '
                                onClick={() => toggleFollow(user._id, currentUser._id, isFollowing)}
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </Button>
                        )}

                    </div>
                </div>
                <div>
                    <div className='flex-1 flex gap-8'>
                        <div>
                            <h4>Posts</h4>
                            <h1 className='text-2xl font-semibold text-center'>{blogs?.length}</h1>
                        </div>
                        <div>
                            <h4>Followers</h4>
                            <h1 className='text-2xl font-semibold text-center'>{followers.length}</h1>
                        </div>
                        <div>
                            <h4>Following</h4>
                            <h1 className='text-2xl font-semibold text-center'>{user.following.length}</h1>
                        </div>

                    </div>

                </div>
            </div>

            <EditProfile openModal={openModal} setOpenModal={setOpenModal} user={user} setUser={setUser} />
            <Modal
                show={deleteModal} size="md" onClose={() => setDeleteModal(false)} popup>
                <ModalHeader className=''>Confirm Delete</ModalHeader>
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineTrash className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete your account?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button className='' onClick={deleteAccount} color="failure">
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            <div className='my-5'>
                <h1 className='font-bold text-2xl'>Posts</h1>
                <div className='grid lg:grid-cols-3 grid-cols-1 gap-3 mt-5'>
                    {blogs && blogs.map(blog => (
                        <Post key={blog._id} blog={blog} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
