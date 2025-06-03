import axios from 'axios';
import { Button, Dropdown, DropdownItem } from 'flowbite-react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router'
import Skeleton from '../components/Skeleton';
const Write = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'Select category',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleContentChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            content: value,
        }));
    };

    const handleCategorySelect = (selectedCategory) => {
        setFormData((prev) => ({
            ...prev,
            category: selectedCategory,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const res = await axios.post('http://localhost:4000/api/blog/create', formData, {
                withCredentials: true
            })
            if (res) {
                console.log(res.data.message)
                navigate(`/blog/${res.data.post._id}`)
            }

        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='my-10 mx-[15%] h-auto space-y-2'>
            <h1 className='font-semibold text-center text-2xl mb-5'>Write your story</h1>
            <form className='space-y-6' onSubmit={handleFormSubmit}>
                <input
                    onChange={handleInputChange}
                    name='title'
                    placeholder='Title'
                    className='outline-none w-full text-[1.5rem]'
                />

                <ReactQuill
                    theme='snow'
                    className='h-[400px]'
                    value={formData.content}
                    placeholder='Write your content'
                    onChange={handleContentChange}
                />

                <div className='my-4'>
                    <Dropdown label={formData.category} dismissOnClick={true}>
                        {['Programming', 'Lifestyle', 'Science', 'Health'].map((cat) => (
                            <DropdownItem key={cat} onClick={() => handleCategorySelect(cat)}>
                                {cat}
                            </DropdownItem>
                        ))}
                    </Dropdown>
                </div>

                <Button type='submit' color='primary'>
                    Publish
                </Button>
            </form>
        </div>
    );
};

export default Write;
