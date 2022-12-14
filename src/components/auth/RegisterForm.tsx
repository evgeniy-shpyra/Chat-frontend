import React from 'react'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    errorMessageStyle,
    fieldContainerStyle,
    buttonStyle,
    errorFieldStyle,
    fieldStyle,
} from './styles'
import { IRegisterDate } from '../../models/models'

export interface IRegisterFields extends IRegisterDate {
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
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const onSubmit = (
        values: IRegisterFields,
        { setFieldError }: FormikHelpers<IRegisterFields>
    ) => {
        if (
            values.password.length < 5 ||
            values.username.length < 5 ||
            !values.email.includes('@')
        ) {
            if (!values.email.includes('@'))
                setFieldError(
                    'email',
                    'Incorrect email '
                )
            if (values.password.length < 5)
                setFieldError(
                    'password',
                    'Password should be min contain 5 characters'
                )
            if (values.username.length < 5)
                setFieldError(
                    'username',
                    'Username should be min contain 5 characters'
                )
            return
        }
        if (values.password != values.confirmPassword) {
            setFieldError(
                'password',
                'Confirm password must be the same as the password'
            )
            // toast.error('Confirm password must be the same as the password')
            return
        }
        handleSubmit({
            username: values.username,
            email: values.email,
            password: values.password,
        })
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
                                    id='username'
                                    name='username'
                                    placeholder='Username'
                                    className={
                                        errors.username && touched.username
                                            ? errorFieldStyle
                                            : fieldStyle
                                    }
                                    validate={validateRequired}
                                />
                                {errors.username && touched.username && (
                                    <div className={errorMessageStyle}>
                                        {errors.username}
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
                            <button className={`${buttonStyle} `} type='submit'>
                                Create account
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default RegisterForm
