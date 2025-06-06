import { Alert, Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import axios from 'axios'
import { useSelector } from 'react-redux'
import OAuth from '../components/OAuth'
import { Link } from 'react-router'

const Signup = () => {
    const user = useSelector((state) => state.user.currentUser)
    console.log("Selector value changed:", user);

    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        setLoading(true)
        const trimmedData = {
            ...formData,
            username: formData.username.replace(/\s/g, ""),
        };
        const fields = ['username', 'fullName', 'email', 'password'];
        const hasEmpty = fields.some(field => formData[field].trim() === '');

        if (hasEmpty) {
            console.log("Fill all values");
            return;
        }
        else {
            try {

                const res = await axios.post('http://localhost:4000/api/auth/signup', trimmedData)
                if (res) {
                    console.log(res.data.message)
                    setSuccess(true)
                    setLoading(false)
                }
            }
            catch (error) {
                console.log(error.response.data.message)
                setError(error.response.data.message)
                setLoading(false)
            }

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
        <div className='flex flex-row-reverse items-center mx-auto justify-center h-screen'>
            <div className=' flex-1 hidden py-4 bg-[#f5f5f5] h-full lg:flex flex-col justify-evenly items-center '>
                <img width={600} src='/singup.svg' />
            </div>
            <div className='flex-1 flex flex-col items-center justify-center'>
                <h1 className='font-bold text-[2.5rem]'>Welcome to ZINGY!</h1>

                <h1 className='font-bold text-lg my-4'>Sign up</h1>
                <form onSubmit={handleFormSubmit} className='flex flex-col gap-2'>
                    <input name='username' onChange={handleInputChange} placeholder='Enter username' required type='text' className='outline-blue-500 w-[320px] border rounded-full border-gray-300 px-3 py-3' />
                    <input name='fullName' onChange={handleInputChange} placeholder='Enter Full name' required type='text' className='outline-blue-500 w-[320px] border rounded-full border-gray-300 px-3 py-3' />
                    <input name='email' onChange={handleInputChange} placeholder='Enter your email address' required type='email' className='outline-blue-500 w-[320px] border rounded-full border-gray-300 px-3 py-3' />
                    <input minLength={8} name='password' onChange={handleInputChange} placeholder='Enter your password' required type='password' className='outline-blue-500 border rounded-full border-gray-300 px-3 py-3' />
                    <Button type='submit' color='primary' className='mt-3 cursor-pointer outline-none'>{loading ? <Spinner light /> : 'Sign up'}</Button>
                    <OAuth text='Sign up with Google' />
                </form>
                <h1 className='mt-10'>Already a member? <Link to='/login' className='text-blue-700 hover:underline'>Log in here</Link></h1>

                {error && <Alert className='mt-10' color="failure" onDismiss={() => setError(null)}>
                    <span className="font-medium">{error}</span>
                </Alert>}
                {success && <Alert className='mt-10' color="green" onDismiss={() => setSuccess(false)}>
                    <span className="font-medium">Sign up successful</span>  </Alert>}
            </div>
        </div>
    )
}

export default Signup