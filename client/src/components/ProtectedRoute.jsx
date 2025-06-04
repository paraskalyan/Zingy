import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../pages/Login';

const ProtectedRoute = ({ children }) => {
    const currentUser = useSelector(state => state.user.currentUser);
    return currentUser ? children : <Login />
}

export default ProtectedRoute