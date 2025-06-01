import axios from 'axios'
import { Alert, Button, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { signIn } from '../redux/user/userSlice'
import { useNavigate } from 'react-router'
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        setLoading(true)


        try {

            const res = await axios.post('http://localhost:4000/api/auth/login', formData, {
                withCredentials: true,
            })
            if (res) {
                dispatch(signIn(res.data))
                navigate('/')
                setSuccess(true)
                setLoading(false)
            }
        }
        catch (error) {
            setError(error.response.data.message)
            setLoading(false)
            console.log(error)
        }



    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            {/* <div className='flex-1 h-full relative'>
                <img className='brightness-50 grayscale' src='https://images.pexels.com/photos/839443/pexels-photo-839443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
            </div> */}
            <div className=' flex flex-col items-start justify-center'>

                <h1 className='font-bold text-2xl my-4'>Log in into your account</h1>
                <form onSubmit={handleFormSubmit} className='flex flex-col gap-2'>
                    <input name='username' onChange={handleInputChange} placeholder='Enter your username' required type='text' className='outline-blue-500 w-[320px] border rounded-full border-gray-300 px-3 py-3' />
                    <input name='password' onChange={handleInputChange} placeholder='Enter your password' required type='password' className='outline-blue-500 border rounded-full border-gray-300 px-3 py-2' />
                    <Button type='submit' className='mt-3 cursor-pointer outline-none'>{loading ? <Spinner light /> : 'Log in'}</Button>
                    <Button type='button' outline className='outline-none' color='dark' >
                        <span className='mx-2'>Log in with Google </span>
                        <FaGoogle />
                    </Button>
                </form>
            </div>
            {error && <Alert className='mt-10' color="failure" onDismiss={() => setError(null)}>
                <span className="font-medium">{error}</span>
            </Alert>}
        </div>
    )
}

export default Login