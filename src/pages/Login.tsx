import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormContainer from '../components/FormContainer'
import LoginForm from '../components/LoginForm'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { ILoginDate } from '../models/models'
import { errorIsShown, login } from '../redux/features/userSlice'
import { titleStyle } from '../styles/form'

const Login = () => {
    const dispatch = useAppDispatch()
    const { isAuth, error } = useAppSelector((state) => state.user)

    const navigate = useNavigate()

    React.useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

    React.useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(errorIsShown())
        }
    }, [error])

    const handleSubmit = (values: ILoginDate): void => {
        dispatch(login(values))
    }

    return (
        <FormContainer>
            <h1 className={titleStyle}>Login</h1>
            <LoginForm handleSubmit={handleSubmit} />
            <p className='text-paragraph text-[16px] text-center pt-[20px] '>
                Have you had not an account yet?{' '}
                <Link to='/register' className='underline'>
                    Sign In
                </Link>
            </p>
        </FormContainer>
    )
}

export default Login
