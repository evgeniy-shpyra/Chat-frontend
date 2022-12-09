import React from 'react'

interface FormContainerProps {
    children?: React.ReactNode
}

const FormContainer = ({ children }: FormContainerProps) => {
    return (
        <div className='min-h-full flex justify-center items-center w-full'>
            <div className='bg-second_bg mx-[10px] p-[20px] rounded-[15px] sm:rounded-[15px] md:p-[35px] lg:p-[40px] xl:p-[50px] '>
                {children}
            </div>
        </div>
    )
}

export default FormContainer
