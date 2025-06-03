import axios from 'axios'
import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import useFetchUser from '../hooks/useFetchUser'
import Loader from '../components/Loader'
import Post from '../components/Post'
import EditProfile from '../components/EditProfile'

const Profile = () => {
    const { id } = useParams();
    const { user, loading } = useFetchUser(id);
    const currentUser = useSelector(state => state.user.currentUser);

    const [followers, setFollowers] = useState([]);
    const [blogs, setBlogs] = useState(null);
    const [openModal, setOpenModal] = useState(false);

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

        setFollowers(updatedFollowers); // Optimistic UI update

        const endpoint = isFollowing
            ? `http://localhost:4000/api/user/${targetId}/unfollow`
            : `http://localhost:4000/api/user/${targetId}/follow`;

        try {
            await axios.post(endpoint, { currentUser: currentId });
        } catch (error) {
            console.log('Follow/unfollow failed:', error);
            // Revert if API fails
            setFollowers(prev =>
                isFollowing ? [...prev, currentId] : prev.filter(uid => uid !== currentId)
            );
        }
    };

    if (loading) return <Loader />;

    const isFollowing = followers.includes(currentUser._id);

    return (
        <div className='mx-[15%] my-12'>
            <div className='flex items-center gap-3 p-3 border-b border-[#d9d9d9]'>
                <img className='rounded-full p-3 aspect-square bg-[#f8f8f8]' width={120} src={user.avatar} />

                <div className='flex-1 space-y-3'>
                    <h2 className='text-xl font-medium'>{user.username}</h2>
                    <h6 className='text-[14px]'>{user.bio}</h6>

                    {currentUser._id === id ? (
                        <Button color='primary' onClick={() => setOpenModal(true)}>Edit Profile</Button>
                    ) : (
                        <Button
                            color='primary'
                            onClick={() => toggleFollow(user._id, currentUser._id, isFollowing)}
                        >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                    )}

                    <EditProfile openModal={openModal} setOpenModal={setOpenModal} />
                </div>

                <div className='flex-1 flex gap-8'>
                    <div>
                        <h4>Posts</h4>
                        <h1 className='text-2xl font-semibold'>{blogs?.length}</h1>
                    </div>
                    <div>
                        <h4>Followers</h4>
                        <h1 className='text-2xl font-semibold'>{followers.length}</h1>
                    </div>
                    <div>
                        <h4>Following</h4>
                        <h1 className='text-2xl font-semibold'>{user.following.length}</h1>
                    </div>

                </div>
            </div>

            <div className='my-5'>
                <h1 className='font-bold text-2xl'>Posts</h1>
                <div className='grid grid-cols-3 gap-3 mt-5'>
                    {blogs && blogs.map(blog => (
                        <Post key={blog._id} blog={blog} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
