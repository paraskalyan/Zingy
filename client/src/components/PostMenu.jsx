import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { HiDotsVertical } from 'react-icons/hi';

const PostMenu = ({ setOpenModal }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div className="relative inline-block text-left">
            <button className='cursor-pointer' onClick={() => setOpen(!open)}>
                <HiDotsVertical size={20} color="gray" />
            </button>

            {open && (
                <div className="absolute right-0 z-10 mt-2 w-40 bg-[#fcfcfc] border border-[#f8f8f8] rounded-md shadow-sm ">
                    <div className="py-1">
                        <button
                            onClick={() => {
                                setOpen(false);
                                navigate(`/post/${id}/edit`);
                            }}
                            className="block w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Edit Post
                        </button>
                        <button
                            onClick={() => {
                                setOpen(false);
                                setOpenModal(true);
                            }}
                            className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                            Delete Post
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostMenu;
