import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-react'
import React from 'react'
import { FaPen } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { signOut } from '../redux/user/userSlice'
import { current } from '@reduxjs/toolkit'

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser)


  return (
    <div className='flex py-3 px-6 justify-between items-center  h-[7vh] border-b border-b-[#f8f8f8]'>
      <Link to='/'><img width='100' src='/logo-zingy.png' /></Link>
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