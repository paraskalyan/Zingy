import axios from 'axios'
import { Button, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../redux/user/userSlice'

const EditProfile = ({ openModal, setOpenModal, user, onUserUpdate }) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        username: user.username || '',
        fullName: user.fullName || '',
        email: user.email || '',
        bio: user.bio || '',
    })




    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const res = await axios.put(`http://localhost:4000/api/user/updateuser/${user._id}`, formData, {
                withCredentials: true,
            })
            if (res) {
                console.log(res.data)
                dispatch(signIn(res.data.user))
                onUserUpdate(res.data.user)
            }
        }

        catch (error) {
            console.log(error)
        }

    }


    return (
        <div>
            <Modal size='md' show={openModal} onClose={() => setOpenModal(false)} >
                <ModalHeader>
                    Edit your Profile
                </ModalHeader>
                <ModalBody>
                    {/* <input onChange={handleChange} value={formData.username} name='username' color='custom' /> */}
                    <form onSubmit={handleSubmit}>

                        <TextInput onChange={handleChange} value={formData.username} name='username' color='custom' />
                        <TextInput onChange={handleChange} value={formData.fullName} color='custom' name='fullName' className='my-2' />
                        <TextInput onChange={handleChange} value={formData.email} name='email' color='custom' className='my-2' />
                        <TextInput onChange={handleChange} value={formData.bio} name='bio' color='custom' />
                        <Button type='submit' className='w-full mt-4' color='primary'>Update</Button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default EditProfile