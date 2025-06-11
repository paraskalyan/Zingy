import axios from 'axios'
import { Button, FileInput, Modal, ModalBody, ModalHeader, Spinner, TextInput, Toast, ToastToggle } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../redux/user/userSlice'
import Loader from './Loader'
import { HiCheck } from 'react-icons/hi'
import { storage } from '../appwrite'
import { ID } from 'appwrite'

const baseUrl =
    import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api";

const EditProfile = ({ openModal, setOpenModal, user, setUser }) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        username: user.username || '',
        fullName: user.fullName || '',
        email: user.email || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState()


    const handleUpload = async () => {
        try {
            const result = await storage.createFile(
                '6842eebd0035b1c921e7',
                ID.unique(),
                file
            );
            console.log('File uploaded:', result);

            const url = storage.getFileView('6842eebd0035b1c921e7', result.$id);
            return url;
        } catch (error) {
            console.error('Upload failed:', error);
        }

    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        let updatedAvatar = formData.avatar;

        // If user selected a new file, upload and get URL
        if (file) {
            const uploadedUrl = await handleUpload();
            if (uploadedUrl) {
                updatedAvatar = uploadedUrl.toString(); // Important: convert from URL object to string
            }
        }

        const updatedData = {
            ...formData,
            avatar: updatedAvatar
        };
        console.log(updatedData)

        try {
            setLoading(true);
            const res = await axios.put(`${baseUrl}/user/updateuser/${user._id}`, updatedData, {
                withCredentials: true,
            });

            if (res) {
                console.log(res.data);
                dispatch(signIn(res.data.user));
                setSuccess(res.data.message);
                setUser(res.data.user);
                setOpenModal(false); // Close modal on success
            }
        } catch (error) {
            console.error(error);
            setError("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <Modal size='md' show={openModal} onClose={() => setOpenModal(false)} >
                <ModalHeader onClick={() => setSuccess(null)}>
                    <span className='text-black nunito'>Edit your Profile</span>
                </ModalHeader>
                <ModalBody>
                    {/* <input onChange={handleChange} value={formData.username} name='username' color='custom' /> */}
                    <form onSubmit={handleSubmit} className='space-y-2 nunito'>
                        <div className='flex items-center gap-4'>
                            <img width={50} src={user.avatar} className='rounded-full' />
                            <FileInput onChange={e => setFile(e.target.files[0])} />
                        </div>

                        <label className='font-semibold text-[14px]'>Username</label>
                        <input name='username' onChange={handleChange} value={formData.username} className='input-field' />
                        <label className='font-semibold text-[14px]'>Full Name</label>
                        <input name='fullName' onChange={handleChange} value={formData.fullName} className='input-field' />
                        <label className='font-semibold text-[14px]'>Email</label>
                        <input name='email' onChange={handleChange} value={formData.email} className='input-field' />
                        <label className='font-semibold text-[14px]'>Bio</label>
                        <textarea name='bio' onChange={handleChange} value={formData.bio} className='input-field resize-none ' />

                        <Button type='submit' className='w-full mt-4' color='primary'>{loading ? <span>Updating <Spinner size='sm' /></span> : 'Update'}</Button>
                    </form>
                    {success && <Toast className='mx-auto'>
                        <div className="inline-flex top-3 h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                            <HiCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">{success}</div>
                        <ToastToggle />
                    </Toast>}
                </ModalBody>
            </Modal>
        </div>
    )
}

export default EditProfile