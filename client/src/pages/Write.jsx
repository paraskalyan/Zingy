import axios from 'axios';
import { Button, Dropdown, DropdownItem, FileInput, Label, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router'
import Skeleton from '../components/Skeleton';
import { storage } from '../appwrite';
import { ID } from 'appwrite';
const Write = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'Select category',
        image: ''

    });
    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(false)

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

    const handleUpload = async () => {
        setImageLoading(true)
        try {
            const result = await storage.createFile(
                '6842eebd0035b1c921e7',
                ID.unique(),
                file
            );
            console.log('File uploaded:', result);

            const url = storage.getFileView('6842eebd0035b1c921e7', result.$id);
            setFormData({
                ...formData,
                image: url,
            })
        } catch (error) {
            console.error('Upload failed:', error);
        }
        finally {
            setImageLoading(false)
        }
    }

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
        <div className='my-10 mx-[15%] max-sm:mx-6 h-auto space-y-2'>
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
                    className='h-[400px] max-sm:h-[600px]'
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
                <div className='inline-flex max-sm:flex-col max-sm:w-full gap-3'>

                    <Label className="" color='black'>
                        Upload image
                    </Label>
                    <FileInput onChange={e => setFile(e.target.files[0])} id="file-upload" />
                    <Button onClick={handleUpload}>{imageLoading ? <span className='inline-flex gap-2'>Uploading <Spinner size='sm' color='light' /></span> : 'Upload'}</Button>
                </div>
                {uploadedUrl && <img width={500} src={uploadedUrl} />}

                <Button type='submit' className='max-sm:w-full max-sm:py-6' color='primary'>
                    Publish
                </Button>
            </form>
        </div>
    );
};

export default Write;
