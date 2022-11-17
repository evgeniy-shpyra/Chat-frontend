import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import FormContainer from '../components/auth/FormContainer'
import Preloader from '../components/Preloader'
import RegisterForm from '../components/auth/RegisterForm'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { IOtherUserData, IRegisterDate } from '../models/models'
import { errorIsShown, registration } from '../redux/features/authSlice'
import { titleStyle } from '../styles/form'

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
    const dispatch = useAppDispatch()

    const { error, authStatus } = useAppSelector((state) => state.auth)

    const navigate = useNavigate()

    React.useEffect(() => {
        
    }, [authStatus])


    React.useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(errorIsShown())
        }
    }, [error])

    const handleSubmit = async (values: IRegisterDate) => {
        dispatch(registration(values)).then((res)=> {
            if(res.meta.requestStatus === 'fulfilled')
                navigate('/set-avatar')
        } )
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
