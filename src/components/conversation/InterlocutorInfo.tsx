import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import Avatar from '../Avatar'

interface InterlocutorInfoProps {
    // name: string
    // avatarUrl: string
    isBigFormat: boolean
}

const InterlocutorInfo: React.FC<InterlocutorInfoProps> = ({ isBigFormat }) => {
    const navigate = useNavigate()

    const { username, imagePath, isLoading } = useAppSelector(
        (state) => state.conversation
    )

    const onBackToDialogues = () => {
        navigate('/')
    }

    return (
        <div className='flex-none h-[80px] bg-background_1 border-b-2 flex justify-between items-center px-[25px]'>
            {!isBigFormat && (
                <div onClick={onBackToDialogues} className='_icon-arrow-right origin-center rotate-180 text-[25px] text-white' />
            )}
            <h3 className='flex-none text-paragraph font-medium text-[20px]'>
                {/* {username || <Skeleton width={100} />} */}
                {username}
            </h3>
            {!isLoading ? (
                <Avatar imagePath={imagePath} styles='w-[60px] h-[60px]' />
            ) : (
                <Skeleton width={60} height={60} borderRadius='100%' />
            )}
        </div>
    )
}

export default InterlocutorInfo
