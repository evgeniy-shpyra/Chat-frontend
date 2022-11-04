import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'

const InputMassage = () => {
    const initialValues: { massage: string } = {
        massage: '',
    }

    React.useEffect(() => {}, [])

    const handleSubmit = (values: { massage: string }) => {
        console.log(values)
    }

    return (
        <div className='flex-none pb-[35px] pt-[30px] px-[35px]'>
            <div className='relative'>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <button
                            type='submit'
                            className='absolute right-[30px] top-2/4 -translate-y-[13.5px]'
                        >
                            <img
                                src='./assets/icons/arrow_right.svg'
                                className='w-[40px] h-[27px] object-cover'
                            />
                        </button>
                        <Field
                            id='massage'
                            name='massage'
                            className='h-[60px] w-full rounded-[10px] px-[30px] outline-none bg-white placeholder:text-[16px] placeholder:text-gray_30 text-[18px] text-gray_40'
                            placeholder='Enter your message...'
                        />
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default InputMassage
