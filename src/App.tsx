import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Avatar from './pages/Avatar'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {

    return (
        <BrowserRouter>
            <div className='w-screen font-main bg-background'>
                <Routes>
                    <Route path='/' element={<Chat />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/avatar' element={<Avatar />} />
                </Routes>
                <ToastContainer position='bottom-right' theme='light' />
            </div>
        </BrowserRouter>
    )
}
