import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormContainer from '../components/auth/FormContainer'
import LoginForm from '../components/auth/LoginForm'
import { text, titleStyle } from '../components/auth/styles'
import Preloader from '../components/Preloader'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { ILoginDate } from '../models/models'
import { errorIsShown, login } from '../redux/features/authSlice'


const Login = () => {
    const dispatch = useAppDispatch()
    const { error, isLoading } = useAppSelector((state) => state.auth)

    const navigate = useNavigate()

    React.useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(errorIsShown())
        }
    }, [error])

    const handleSubmit = (values: ILoginDate): void => {
        dispatch(login(values)).then((res: any) => {
            if (!res.error) navigate('/')
        })
    }

    return (
        <>
            <FormContainer>
                <h1 className={titleStyle}>Login</h1>
                <LoginForm handleSubmit={handleSubmit} />
                <p className={text}>
                    Have you had not an account yet?{' '}
                    <Link to='/register' className='underline'>
                        Sign In
                    </Link>
                </p>
            </FormContainer>
        </>
    )
}

export default Login
