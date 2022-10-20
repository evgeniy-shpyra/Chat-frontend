import React from 'react'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    errorMessageStyle,
    fieldContainerStyle,
    submitButtonStyle,
    errorFieldStyle,
    fieldStyle,
} from '../styles/form'
import { IRegisterDate } from '../models/authModels'

export interface IRegisterFields {
    name: string
    email: string
    password: string
    confirmPassword: string
}


interface RegisterFormProps {
    handleSubmit: (values: IRegisterDate) => void
}


const validateRequired = (value: string, a: any) => {
    let error
    if (!value) {
        error = 'Required field!'
    }
    return error
}

const RegisterForm = ({ handleSubmit }: RegisterFormProps) => {
    const initialValues: IRegisterFields = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const onSubmit = (values: IRegisterFields, actions: any) => {
        if (values.password != values.confirmPassword) {
            actions.setErrors({
                confirmPassword: true,
                password: true,
            })
            toast.error('Confirm password must be the same as the password')
        } else {
            handleSubmit({
                name: values.name,
                email: values.email,
                password: values.password,
            })
        }
    }

    return (
        <>
            <Formik
                validateOnBlur
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className='flex-col'>
                            <div className={fieldContainerStyle}>
                                <Field
                                    id='name'
                                    name='name'
                                    placeholder='Name'
                                    className={
                                        errors.name && touched.name
                                            ? errorFieldStyle
                                            : fieldStyle
                                    }
                                    validate={validateRequired}
                                />
                                {errors.name && touched.name && (
                                    <div className={errorMessageStyle}>
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className={fieldContainerStyle}>
                                <Field
                                    id='email'
                                    name='email'
                                    placeholder='Email'
                                    validate={validateRequired}
                                    className={
                                        errors.email && touched.email
                                            ? errorFieldStyle
                                            : fieldStyle
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className={errorMessageStyle}>
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div className={fieldContainerStyle}>
                                <Field
                                    id='password'
                                    name='password'
                                    placeholder='Password'
                                    type='password'
                                    validate={validateRequired}
                                    className={
                                        errors.password && touched.password
                                            ? errorFieldStyle
                                            : fieldStyle
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className={errorMessageStyle}>
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            <div className={fieldContainerStyle}>
                                <Field
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    placeholder='Confirm password'
                                    type='password'
                                    validate={validateRequired}
                                    className={
                                        errors.confirmPassword &&
                                        touched.confirmPassword
                                            ? `${errorFieldStyle} mp-[30px]`
                                            : `${fieldStyle} mp-[30px]`
                                    }
                                />
                                {errors.confirmPassword &&
                                    touched.confirmPassword && (
                                        <div className={errorMessageStyle}>
                                            {errors.confirmPassword}
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className='text-center'>
                            <button
                                className={`${submitButtonStyle} `}
                                type='submit'
                            >
                                Create account
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <ToastContainer position='bottom-right' theme='light' />
        </>
    )
}

export default RegisterForm
