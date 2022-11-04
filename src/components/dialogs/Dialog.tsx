import React from 'react'

interface IDialogProps {
    name: string
    massage: string
    avatarUrl: string
}

const Dialog = ({ name, massage, avatarUrl }: IDialogProps) => {

    let reduceMassage: string = ''

    if(massage.length > 30){
        reduceMassage = massage.slice(0, 27).trim() + '...'
    }
    else reduceMassage = massage.trim()

    return (
        <li key={name} className='flex py-[18px] px-[35px] cursor-pointer'>
            <img
                src={avatarUrl}
                className='h-[75px] w-[75px] object-cover rounded-full'
            />
            <div className='h-[75px] flex flex-col justify-between py-[5px] pl-[16px] pr-[20px]'>
                <h3 className='text-[24px] text-paragraph font-medium'>
                    {name}
                </h3>
                <p className='text-[18px] text-paragraph whitespace-nowrap'>{reduceMassage}</p>
            </div>
        </li>
    )
}

export default Dialog
