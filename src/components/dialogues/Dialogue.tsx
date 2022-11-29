import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'
import Avatar from '../Avatar'

interface IDialogueProps {
    id: number
    name: string
    fullDate: string
    text: string
    imagePath: string
    isActive: boolean
    isOpenMenu: boolean
    onOpenMenu: (e: React.MouseEvent, id: number) => void
}

const getNumberOfDay = (date: Date) => {
    const startDate = new Date(date.getFullYear(), 0, 1)
    const numberOfDays = Math.floor(
        (date.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000)
    )

    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7)
}

const Dialogue = ({
    text,
    id,
    name,
    fullDate,
    imagePath,
    isActive,
    onOpenMenu,
    isOpenMenu,
}: IDialogueProps) => {
    const [date, setDate] = React.useState<string>()
    const [reduceText, setReduceText] = React.useState<string>()

    React.useEffect(() => {
        if (text.length > 30) {
            setReduceText(text.slice(0, 27).trim() + '...')
        } else setReduceText(text.trim())
    }, [text])

    React.useEffect(() => {
        const dateNow = new Date()
        const dateMessage = new Date(fullDate)

        if (getNumberOfDay(dateMessage) !== getNumberOfDay(dateNow)) {
            setDate(dateMessage.toLocaleDateString())
        } else {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            if (dateMessage.getDate() !== dateNow.getDate()) {
                setDate(days[dateMessage.getDay()])
            } else {
                setDate(
                    dateMessage
                        .toLocaleTimeString('en-US', {
                            hour12: false,
                        })
                        .slice(0, -3)
                )
            }
        }
    }, [fullDate])

    const navigate = useNavigate()

    const onLeftClickHandler = () => {
        !isOpenMenu && navigate(`/${id}`)
    }

    const onRightClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault()
        onOpenMenu(e, id)
    }

    return (
        <li
            key={name + id}
            onClick={onLeftClickHandler}
            onContextMenu={onRightClickHandler}
            className={`flex py-[15px] mr-[13px] ml-[13px] px-[25px] rounded cursor-pointer
                transition-color animate-[appearance_0.1s_ease-in-out] ${
                    !isActive
                        ? `${isOpenMenu ? 'hover:bg-background_4/50' : ''}`
                        : 'bg-background_4'
                } ${isOpenMenu && !isActive ? 'bg-background_4/50' : ''}`}
        >
            <Avatar imagePath={imagePath} styles='w-[60px] h-[60px]' />
            <div className='flex-auth w-full flex flex-col justify-between pl-[16px] pr-[20px] py-[2px]'>
                <h3 className='text-[19px] text-paragraph font-medium'>
                    {name}
                </h3>
                <p className='text-[15px] text-paragraph whitespace-nowrap'>
                    {reduceText}
                </p>
            </div>
            <div className='text-paragraph/80 text-[14px] font-medium tracking-tighter'>
                {date}
            </div>
        </li>
    )
}

interface LoaderDialogueProps {
    numberOfItems: number
}

export const LoaderDialogue: React.FC<LoaderDialogueProps> = ({
    numberOfItems,
}) => {
    return (
        <>
            {Array(numberOfItems)
                .fill(0)
                .map((item, index) => (
                    <li
                        key={index}
                        className='flex py-[15px] mr-[13px] ml-[13px] px-[25px] rounded animate-[appearance_0.1s_ease-in-out]'
                    >
                        <Skeleton
                            width={60}
                            height={60}
                            borderRadius='100%'
                            baseColor='#65b195'
                            highlightColor='#84c7ae'
                        />
                        <div className='flex-auth w-full flex flex-col justify-between pl-[16px] pr-[20px] py-[2px]'>
                            <Skeleton
                                height={21}
                                width={80}
                                baseColor='#65b195'
                                highlightColor='#84c7ae'
                            />
                            <Skeleton
                                height={16}
                                width={150}
                                baseColor='#65b195'
                                highlightColor='#84c7ae'
                            />
                        </div>
                    </li>
                ))}
        </>
    )
}

export default Dialogue
