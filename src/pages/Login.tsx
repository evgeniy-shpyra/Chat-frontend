import React from 'react'
import FormContainer from '../components/FormContainer'
import LoginForm, { ILoginFormValues } from '../components/LoginForm'
import { titleStyle } from '../styles/form'

const Login = () => {
    
    const handleSubmit = (values: ILoginFormValues): void => {
        console.log(values)
    }

    return (
        <FormContainer>
            <h1 className={titleStyle}>Login</h1>
            <LoginForm handleSubmit={handleSubmit} />
        </FormContainer>
    )
}

export default Login
