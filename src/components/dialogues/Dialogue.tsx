import React from 'react'
import Avatar from '../Avatar'

interface IDialogueProps {
    name: string
    massage?: string
    imagePath: string
}

const Dialogue = ({massage="You don't have any messages ", name, imagePath }: IDialogueProps) => {

    let reduceMassage: string = ''

    if(massage.length > 30){
        reduceMassage = massage.slice(0, 27).trim() + '...'
    }
    else reduceMassage = massage.trim()

    return (
        <li key={name} className='flex py-[15px] px-[30px] ] mr-[14px] ml-[6px] rounded cursor-pointer ease-linear duration-50 hover:bg-background_4'>
            <Avatar imagePath={imagePath} size={65} />
            <div className='flex-auth w-full flex flex-col justify-between pl-[16px] pr-[20px] py-[2px]'>
                <h3 className='text-[21px] text-paragraph font-medium'>
                    {name}
                </h3>
                <p className='text-[16px] text-paragraph whitespace-nowrap'>{reduceMassage}</p>
            </div>
        </li>
    )
}

export default Dialogue
