import axios from 'axios'
import { Button, Dropdown, DropdownItem } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill-new'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const baseUrl =
    import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api";

function EditPage() {
    const { postId } = useParams();

    const [formData, setFormData] = useState({});
    const currentUser = useSelector(state => state.user.currentUser)


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`${baseUrl}/blog/${postId}`)
                console.log(res.data)
                setFormData(res.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchPost();
    }, [postId])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)

        try {
            const res = await axios.put(`${baseUrl}/blog/updatepost/${postId}/${currentUser._id}`, formData, {
                withCredentials: true
            })
            console.log(res)
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='my-10 mx-[15%] max-sm:mx-6 h-auto space-y-2'>
            <h1 className='text-3xl font-semibold mb-5'>Edit post</h1>
            <form className='space-y-3' onSubmit={handleFormSubmit}>
                <input
                    name='title'
                    placeholder='Title'
                    className='outline-none w-full text-[1.5rem]'
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                />

                <ReactQuill
                    theme='snow'
                    className='min-h-[400px]'
                    placeholder='Write your content'
                    value={formData.content}
                    onChange={(value) => {
                        setFormData({ ...formData, content: value });
                    }}
                />

                <div className='my-4'>
                    <Dropdown label={formData.category} dismissOnClick={true}>
                        {['Programming', 'Lifestyle', 'Science', 'Health'].map((cat) => (
                            <DropdownItem key={cat} onClick={() => setFormData({ ...formData, category: cat })}>
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
    )
}

export default EditPage