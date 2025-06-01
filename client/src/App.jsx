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

const customTheme = createTheme({
  button: {
    color: {
      primary: "bg-gray-900 text-white cursor-pointer rounded-full hover:bg-white hover:text-black focus:ring-1 focus:ring-gray-300 focus:outline-none transition",
      secondary: "",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
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
            <Route path='/blog/:id' element={<BlogPage />} />
            <Route path='/write' element={<Write />} />
            <Route path='/profile/:id' element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>

    </>
  )
}

export default App
