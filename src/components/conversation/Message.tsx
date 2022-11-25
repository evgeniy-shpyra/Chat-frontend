import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import Avatar from '../Avatar'

interface MassageProps {
    messageId: number
    text: string
    isMy: boolean
    date: string
}
const Message = ({ text, isMy, date }: MassageProps) => {
    const containerStyles = isMy ? 'flex-row-reverse' : ''

    const imagePathInterlocutor = useAppSelector(
        (state) => state.conversation.imagePath
    )

    const myImagePath = useAppSelector((state) => state.auth.imagePath)

    const imagePath = isMy ? myImagePath : imagePathInterlocutor

    const textContainerStyles = isMy
        ? ' rounded-tl-[10px]'
        : 'rounded-tr-[10px]'

    return (
        <div className={'w-full flex py-[10px] ' + containerStyles}>
            <Avatar imagePath={imagePath} styles='w-[60px] h-[60px]' />
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

export default Message
