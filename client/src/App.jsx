import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Toaster} from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './components/Navbar'
import Register from './auth/Register'
import Login from './auth/Login'
import Post from './Pages/Post'
import ProtectedPage from './Context/ProtectedPage'
import Profile from './Pages/Profile'
import Articles from './Pages/Articles'
import BlogPage from './Pages/BlogPage'


function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<ProtectedPage><Profile /></ProtectedPage>} />
        <Route path='/post' element={<ProtectedPage><Post/></ProtectedPage>} />
        <Route path='/blog' element={<BlogPage/>} />
        <Route path='/articles' element={<Articles/>} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
