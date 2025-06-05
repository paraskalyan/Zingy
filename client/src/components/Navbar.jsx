import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-react'
import React, { useCallback } from 'react'
import { FaPen, FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { signOut } from '../redux/user/userSlice'
import { current } from '@reduxjs/toolkit'
import debounce from 'lodash/debounce';
import { setBlogs } from '../redux/blog/blogSlice'
import axios from 'axios'
import { setSearchQuery } from '../redux/search/searchSlice'


const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()

  // const fetchSearchResults = async (query) => {
  //   if (query.trim()) {
  //     try {
  //       const res = await axios.get(`http://localhost:4000/api/blog/search?q=${query}`);
  //       const data = res.data
  //       console.log(data)
  //       dispatch(setBlogs(data));
  //     } catch (error) {
  //       console.error('Search error:', error);
  //     }
  //   }
  // };

  const debouncedSearch = useCallback(
    debounce((q) => dispatch(setSearchQuery(q)), 500),
    []
  );
  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };


  return (
    <div className='flex py-3 px-6 justify-between items-center  h-[7vh] border-b border-b-[#f8f8f8]'>
      <Link to='/'><img width='100' src='/logo-zingy.png' /></Link>
      <div className='flex items-center gap-2 bg-[#f7f7f7] px-4 py-2 rounded-full'>
        <FaSearch size={15} color='gray' />
        <input onChange={handleChange} className=' outline-none ' placeholder='Search blogs' />
      </div>
      <div className='flex items-center gap-4'>

        {currentUser ?
          <>
            <Link to='/write' className='flex items-center gap-1 mx-4'><span>Write</span><span><FaPen /></span> </Link>
            <UserAvatar />
            {/* <Link to='/profile'><img className='rounded-full' width={30} src={currentUser.avatar} /></Link>
            <Button onClick={handleLogout} style={{ cursor: 'pointer' }} color='red' >Log out</Button> */}
          </>

          :
          <>
            <Link to='/login'>
              <Button style={{ cursor: 'pointer' }} outline color='dark' >Log in</Button>
            </Link>
            <Link to='/signup'>
              <Button style={{ cursor: 'pointer' }} color='dark'>Sign up</Button>
            </Link>
          </>
        }
      </div>
    </div>
  )
}


const UserAvatar = () => {
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(signOut())
    navigate('/login')
  }
  return (
    <div>
      <Dropdown
        label={<Avatar alt="User settings" img={currentUser.avatar} rounded />}
        arrowIcon={false}

        inline
        style={{ cursor: 'pointer' }}
      >
        <DropdownHeader>
          <span className="block text-sm ">{currentUser.username}</span>
          <span className="block truncate text-sm font-medium">{currentUser.email}</span>
        </DropdownHeader>
        <DropdownItem onClick={() => navigate(`/profile/${currentUser._id}`)}>Profile</DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
      </Dropdown>
    </div>
  )
}


export default Navbar