import React from 'react'
import { Formik, Form, Field } from 'formik'
import {
    errorMessageStyle,
    fieldContainerStyle,
    submitButtonStyle,
    errorFieldStyle,
    fieldStyle,
} from '../styles/form'

export interface ILoginFormValues {
    email: string
    password: string
}
interface LoginFormProps {
    handleSubmit: (values: ILoginFormValues) => void
}

const validateRequired = (value: string, a: any) => {
    let error
    if (!value) {
        error = 'Required field!'
    }
    return error
}



const LoginForm = ({ handleSubmit }: LoginFormProps) => {
    const initialValues: ILoginFormValues = {
        email: '',
        password: '',
    }

    const onSubmit = (values: ILoginFormValues, actions: any) => {
        handleSubmit(values)
    }

    return (
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
                    </div>
                    <div className='text-center'>
                        <button
                            className={`${submitButtonStyle} `}
                            type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm
