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
import useMatchMedia from 'use-match-media-hook'
import { changeDeviceType, closeAllWindows } from './redux/features/appSlice'
import { clearDialogues } from './redux/features/dialoguesSlice'

const queries = [
    '(max-width: 639px)',
    '(min-width: 640px) and (max-width: 1023px)',
    '(min-width: 1024px)',
]

const App: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { authStatus, isLoading } = useAppSelector((state) => state.auth)

    React.useEffect(() => {
        if (localStorage.getItem('token')) dispatch(checkAuth())
        else navigate('/login')
    }, [])

    React.useEffect(() => {
        if (authStatus === AuthStatusEnum.Logout) {
            dispatch(clearDialogues())
            dispatch(closeAllWindows())
            navigate('/login')
        }
    }, [authStatus])

    const [isMobile, isTablet, isDesktop] = useMatchMedia(queries)

    React.useLayoutEffect(() => {
        dispatch(changeDeviceType({ isMobile, isTablet, isDesktop }))
    }, [isMobile, isTablet, isDesktop])

    return (
        // <React.StrictMode>
        <>
            <div className='h-full overflow-hidden font-main bg-background_1'>
                <Routes>
                    <Route path='/*' element={<Main />} />
                    <Route path='/register' element={<Register />} />
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
