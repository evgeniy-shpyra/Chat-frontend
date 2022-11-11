import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { AuthStatusEnum } from './models/models'
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import { checkAuth } from './redux/features/authSlice'
import Preloader from './components/Preloader'
import { WebSocketContext } from './WebSocket'

const App: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { authStatus, isLoading } = useAppSelector((state) => state.auth)


    React.useEffect(() => {
        if (localStorage.getItem('token')) dispatch(checkAuth())
        else navigate('/login')
    }, [])

    React.useEffect(() => {
        if (authStatus === AuthStatusEnum.Logout) navigate('/login')
    }, [authStatus])

    // const ws = React.useContext(WebSocketContext)

    // console.log(ws)

    return (
        // <React.StrictMode>
        <>
            <div className='w-screen font-main bg-background_1'>
                <Routes>
                    <Route path='/*' element={<Main />} />
                    <Route
                        path='/register'
                        element={<Register />}
                    />
                    <Route path='/login' element={<Login />} />
                </Routes>
                <ToastContainer position='bottom-right' theme='light' />
            </div>
            {isLoading && <Preloader />}
        </>
        // </React.StrictMode>
    )
}

export default App
