import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import FormContainer from '../components/FormContainer'
import RegisterForm from '../components/RegisterForm'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { IRegisterDate } from '../models/models'
import { errorIsShown, registration } from '../redux/features/userSlice'
import { titleStyle } from '../styles/form'

const Register = () => {
    const dispatch = useAppDispatch()

    const { isAuth, error } = useAppSelector((state) => state.user)

    const navigate = useNavigate()
    React.useEffect(() => {
        if (isAuth) {
            navigate('/avatar')
        }
    }, [isAuth])

    React.useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(errorIsShown())
        }
    }, [error])

    const handleSubmit = async (values: IRegisterDate) => {
        dispatch(registration(values))
    }

    return (
        <>
            <FormContainer>
                <h1 className={titleStyle}>Create An Account</h1>
                <RegisterForm handleSubmit={handleSubmit} />
                <p className='text-paragraph text-[16px] text-center pt-[20px] '>
                    Already Have An Account?{' '}
                    <Link to='/login' className='underline'>
                        Log In
                    </Link>
                </p>
            </FormContainer>
        </>
    )
}

export default Register
