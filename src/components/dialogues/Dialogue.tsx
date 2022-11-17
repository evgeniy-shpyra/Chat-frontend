import React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../Avatar'

interface IDialogueProps {
    id: number
    name: string
    massage?: string
    imagePath: string
    isActive: boolean
}

const Dialogue = ({
    massage = "You don't have any messages ",
    id,
    name,
    imagePath,
    isActive,
}: IDialogueProps) => {
    const navigate = useNavigate()

    let reduceMassage: string = ''

    if (massage.length > 30) {
        reduceMassage = massage.slice(0, 27).trim() + '...'
    } else reduceMassage = massage.trim()

    const onClickHandler = () => {
        navigate(`/${id}`)
    }

    const backgroundStyle = isActive ? 'bg-background_4/70' : ''

    return (
        <li
            key={name + id}
            onClick={onClickHandler}
            className={`flex py-[15px] px-[30px] mr-[14px] ml-[10px] rounded cursor-pointer ${backgroundStyle} ease-linear duration-50 hover:bg-background_4`}
        >
            <Avatar imagePath={imagePath} styles='w-[65px] h-[65px]' />
            <div className='flex-auth w-full flex flex-col justify-between pl-[16px] pr-[20px] py-[2px]'>
                <h3 className='text-[21px] text-paragraph font-medium'>
                    {name}
                </h3>
                <p className='text-[16px] text-paragraph whitespace-nowrap'>
                    {reduceMassage}
                </p>
            </div>
        </li>
    )
}

export default Dialogue
