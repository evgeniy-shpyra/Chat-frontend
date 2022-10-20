import React from 'react'
import { Link } from 'react-router-dom'
import authAPI from '../api/endpoints/authAPI'
import FormContainer from '../components/FormContainer'
import RegisterForm from '../components/RegisterForm'
import { IRegisterDate } from '../models/authModels'
import { titleStyle } from '../styles/form'

const Register = () => {
    const handleSubmit = async (values: IRegisterDate) => {
        console.log(values)

        const data = await authAPI
            .registration(values)
            .then((response) => response.data)
    }
    return (
        <>
            <FormContainer>
                <h1 className={titleStyle}>Create An Account</h1>
                <RegisterForm handleSubmit={handleSubmit} />
                <p className='text-paragraph text-[16px] text-center pt-[20px] '>
                    Already Have An Account?{' '}
                    <Link to='/login' className='underline'>
                        Sign In
                    </Link>
                </p>
            </FormContainer>
        </>
    )
}

export default Register
