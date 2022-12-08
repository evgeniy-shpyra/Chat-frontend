import React from 'react'
import { Formik, Form, Field } from 'formik'
import {
    errorMessageStyle,
    fieldContainerStyle,
    buttonStyle,
    errorFieldStyle,
    fieldStyle,
} from './styles'
import { ILoginDate } from '../../models/models'

interface LoginFormProps {
    handleSubmit: (values: ILoginDate) => void
}

const validateRequired = (value: string, a: any) => {
    let error
    if (!value) {
        error = 'Required field!'
    }
    return error
}

const LoginForm = ({ handleSubmit }: LoginFormProps) => {
    const initialValues: ILoginDate = {
        username: '',
        password: '',
    }

    const onSubmit = (values: ILoginDate, actions: any) => {
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
                                id='username'
                                name='username'
                                placeholder='Username'
                                validate={validateRequired}
                                className={
                                    errors.username && touched.username
                                        ? errorFieldStyle
                                        : fieldStyle
                                }
                            />
                            {errors.username && touched.username && (
                                <div className={errorMessageStyle}>
                                    {errors.username}
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
                        <button className={`${buttonStyle} `} type='submit'>
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm
