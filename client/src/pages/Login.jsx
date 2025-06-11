import axios from 'axios'
import { Alert, Button, Spinner, Toast, ToastToggle } from 'flowbite-react'
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { signIn } from '../redux/user/userSlice'
import { Link, useNavigate } from 'react-router'
import OAuth from '../components/OAuth'
import { HiExclamation } from 'react-icons/hi'

const baseUrl =
    import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api";

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

            const res = await axios.post(`${baseUrl}/auth/login`, formData, {
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
        <div className='flex min-h-screen'>
            {/* <div className='flex-1 h-full relative'>
                <img className='brightness-50 grayscale' src='https://images.pexels.com/photos/839443/pexels-photo-839443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
            </div> */}


            <div className='flex-1  hidden bg-[#f5f5f5] lg:flex flex-col justify-evenly items-center '>
                <img src='/blog.svg' width={600} alt="Logo" />
                <h1 className='font-bold text-4xl'>Tell your story on ZINGY</h1>
            </div>
            <div className='flex-1 flex flex-col relative  items-center justify-center '>
                <h1 className='font-bold text-[2.5rem]'>Welcome back!</h1>
                <h1 className='font-bold text-lg my-4'>Log in into your account</h1>
                <form onSubmit={handleFormSubmit} className='flex flex-col gap-2'>
                    <input name='username' onChange={handleInputChange} placeholder='Enter your username' required type='text' className='outline-blue-500 w-[320px] border rounded-full border-gray-300 px-3 py-3' />
                    <input name='password' onChange={handleInputChange} placeholder='Enter your password' required type='password' className='outline-blue-500 border rounded-full border-gray-300 px-3 py-3' />
                    <Button color='primary' type='submit' className='mt-3 cursor-pointer outline-none'>{loading ? <Spinner light /> : 'Log in'}</Button>
                    <p className='text-center'>or</p>
                    <OAuth text='Log in with Google' />
                </form>
                <h1 className='mt-10'>Not a member? <Link to='/signup' className='text-blue-700 hover:underline'>Sign up here</Link></h1>
                {error &&

                    <Toast className='absolute top-2 transition'>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                            <HiExclamation className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm text-white font-normal">{error}</div>
                        <ToastToggle />
                    </Toast>
                }
            </div>


            {/* {error && <Alert className='mt-10 bg-black' color="failure" onDismiss={() => setError(null)}>
                <span className="font-medium">{error}</span>
            </Alert>} */}

        </div>
    )
}

export default Login