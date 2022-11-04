import React from 'react'

interface FormContainerProps {
    children?: React.ReactNode
}

const FormContainer = ({ children }: FormContainerProps) => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='bg-second_bg p-[50px] rounded-[20px]'>
                {children}
            </div>
        </div>
    )
}

export default FormContainer
