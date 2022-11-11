import React from 'react'
import { OwnerOfMassageEnum } from '../../models/models'

interface MassageProps {
    avatarUrl: string
    text: string
    owner: OwnerOfMassageEnum
}
const Massage = ({ avatarUrl, text, owner}: MassageProps) => {
    const containerStyles =
        owner === OwnerOfMassageEnum.My ? 'flex-row-reverse' : ''

    const textContainerStyles =
        owner === OwnerOfMassageEnum.My
            ? ' rounded-tl-[10px]'
            : 'rounded-tr-[10px]'

    return (
        <div className={'w-full flex py-[10px] ' + containerStyles}>
            <img
                src={avatarUrl}
                className='w-[65px] h-[65px] rounded-full object-cover inline-block'
            />
            <div
                className={
                    'py-[15px] px-[20px] bg-white inline-block self-start mx-[30px] rounded-b-[10px] max-w-[calc(50%-85px)]  ' +
                    textContainerStyles
                }
            >
                {text}
            </div>
        </div>
    )
}

export default Massage
