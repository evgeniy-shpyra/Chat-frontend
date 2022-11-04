import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { AuthStatusEnum } from './models/models'
import Avatar from './pages/Avatar'
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import { checkAuth } from './redux/features/userSlice'

export default function App() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { authStatus } = useAppSelector((state) => state.user)

    React.useEffect(() => {
        if (localStorage.getItem('token')) dispatch(checkAuth())
        else navigate('/login')
    }, [])

    React.useEffect(() => {
        if (authStatus === AuthStatusEnum.Logout) navigate('/login')
    }, [authStatus])

    return (
        <React.StrictMode>
            <div className='w-screen font-main bg-background_1'>
                <Routes>
                    <Route path='/*' element={<Main />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/setAvatar' element={<Avatar />} />
                </Routes>
                <ToastContainer position='bottom-right' theme='light' />
            </div>
        </React.StrictMode>
    )
}
