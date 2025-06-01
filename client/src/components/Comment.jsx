import React from 'react'
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'

const Comment = () => {
    return (
        <div className='border-b space-y-4 border-gray-200 p-3'>
            <div className='flex gap-3'>
                <img width={50} height={20} className='rounded-full' src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' />
                <div>
                    <h6>Kathleen Sharma</h6>
                    <h6 className='text-[14px]'>Dec 3, 2024</h6>
                </div>
            </div>
            <p>Great post. You are amazing.</p>
            <div className=' flex gap-8'>
                <span className='flex items-center gap-1'><button className=' cursor-pointer '><AiOutlineHeart /></button> 355</span>
                <span className='flex items-center gap-1'><AiOutlineComment /> 4 replies</span>
            </div>
        </div>
    )
}

export default Comment