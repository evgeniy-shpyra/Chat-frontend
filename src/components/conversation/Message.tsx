import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import Avatar from '../Avatar'

interface MassageProps {
    messageId: number
    text: string
    isMy: boolean
    fullDate: string
    isBigFormat: boolean
}
const Message = ({ text, isMy, fullDate, isBigFormat }: MassageProps) => {
    const [date, setDate] = React.useState<string>()

    const imagePathInterlocutor = useAppSelector(
        (state) => state.conversation.imagePath
    )

    const myImagePath = useAppSelector((state) => state.auth.imagePath)
    const imagePath = isMy ? myImagePath : imagePathInterlocutor

    React.useEffect(() => {
        const currentDate = new Date(fullDate)
        setDate(
            currentDate
                .toLocaleTimeString('en-US', {
                    hour12: false,
                })
                .slice(0, -3)
        )
    }, [fullDate])


    return (
        <div
            className={`w-full flex py-[7px] ${isMy ? 'flex-row-reverse' : ''}`}
        >
            <Avatar imagePath={imagePath} styles='w-[50px] h-[50px]' />
            <div
                className={`relative py-[7px] px-[13px] bg-white inline-block self-start mx-[15px] lg:mx-[30px] rounded-b-[15px] xl:max-w-[calc(50%-85px)] 
                ${
                    isMy
                        ? 'rounded-tl-[13px] pl-[48px]'
                        : 'rounded-tr-[13px] pr-[48px]'
                }`}
            >
                <p className='text-[15px] text-paragraph break-all'>{text}</p>
                <div
                    className={`absolute bottom-[5px] text-[11px] tracking-tighter leading-none font-medium text-gray_50 ${
                        isMy ? 'left-[12px]' : 'right-[12px]'
                    }`}
                >
                    {date}
                </div>
            </div>
        </div>
    )
}

export default Message
