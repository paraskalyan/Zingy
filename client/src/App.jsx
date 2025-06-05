import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, createTheme, ThemeProvider } from 'flowbite-react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Login from './pages/Login'
import Home from './pages/Home'
import BlogPage from './pages/BlogPage'
import { BrowserRouter, Routes, Route } from 'react-router'
import Write from './pages/Write'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import PublicRoute from './components/PublicRoute'
import EditPage from './pages/EditPage'
import ProtectedRoute from './components/ProtectedRoute'

const customTheme = createTheme({
  button: {
    color: {
      primary: "bg-gray-900 text-white cursor-pointer rounded-full hover:bg-white hover:text-black focus:ring-1 focus:ring-gray-300 focus:outline-none border transition",
      secondary: "",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },

  modal: {
    header: {
      base: 'bg-white'
    },
    body: {
      base: 'bg-white'
    }
  },

  textInput: {
    field: {
      input: {
        colors: {
          custom: 'bg-[#f9f9f9] border border-gray-400 focus:ring-1 focus:ring-gray-300 focus:outline-none'
        },
        base: ' rounded-full border border-gray-400 focus:ring-1 focus:ring-gray-300 focus:outline-none',
      }
    }
  }
});

function App() {


  return (
    <>
      <ThemeProvider theme={customTheme}>

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>} />

            <Route path='/blog/:id' element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
            <Route path='/write' element={<ProtectedRoute><Write /></ProtectedRoute>} />
            <Route path='/profile/:id' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/post/:postId/edit' element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>

    </>
  )
}

export default App
