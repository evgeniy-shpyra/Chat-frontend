import React from 'react'
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik'
import { fieldTextStyle, submitButtonStyle } from '../styles/form'

interface IFormValues {
    name: string
    email: string
    password: string
    repeatPassword: string
}

const validateRequired = (value: string, a: any) => {
    let error
    if (!value) {
        error = 'Required field!'
    }
    return error
}

const fieldStyle: string = `${fieldTextStyle} w-[400px] border-2`
const errorFieldStyle: string = `${fieldStyle} text-[#FF3B3B] border-[#FF3B3B]`
const errorMessageStyle: string =
    'absolute bottom-[8px] left-[0px] text-[#FF3B3B] text-[14px]'
const fieldContainerStyle: string = 'relative pb-[30px]'

const RegisterForm = () => {
    const initialValues: IFormValues = {
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
    }

    const handleSubmit = (values: IFormValues, actions: any) => {
        console.log({ values, actions })

        if (values.password != values.repeatPassword) {
            actions.setErrors({ repeatPassword: 'Password retry error' })
        }
    }

    return (
        <Formik
            validateOnBlur
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isValidating }) => (
                <Form>
                    <div className='flex-col'>
                        <h1 className='text-[34px] text-gray_60 font-medium text-center pb-[40px]'>
                            Signup
                        </h1>
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
                                id='repeatPassword'
                                name='repeatPassword'
                                placeholder='Repeat password'
                                type='password'
                                validate={validateRequired}
                                className={
                                    errors.repeatPassword &&
                                    touched.repeatPassword
                                        ? `${errorFieldStyle} mp-[30px]`
                                        : `${fieldStyle} mp-[30px]`
                                }
                            />
                            {errors.repeatPassword &&
                                touched.repeatPassword && (
                                    <div className={errorMessageStyle}>
                                        {errors.repeatPassword}
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

export default RegisterForm
