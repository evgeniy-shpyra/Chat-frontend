import React from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { addDialogueAsync } from '../../redux/features/dialoguesSlice'
import { WebSocketContext } from '../../WebSocket'
import Avatar from '../Avatar'
import Skeleton from 'react-loading-skeleton'

interface IUser {
    id: number
    username: string
    imagePath: string | null
}

const User = ({ id, username, imagePath }: IUser) => {
    const dispatch = useAppDispatch()

    const handleClickOnUser = () => {
        dispatch(addDialogueAsync(id))
    }

    return (
        <li
            onClick={handleClickOnUser}
            className='pt-[15px] mr-[30px] cursor-pointer transition-colors hover:bg-black/10 rounded animate-[appearance_0.05s_ease-in-out]'
        >
            <div className='flex items-center pl-[10px]'>
                <Avatar imagePath={imagePath} styles='h-[60px] w-[60px]' />

                <h3 className='text-[20px] text-paragraph font-medium pl-[16px]'>
                    {username}
                </h3>
            </div>
            <div className='h-[1px] bg-gray_10 mt-[15px] mx-[5px]' />
        </li>
    )
}

interface LoaderUserProps {
    numberOfItems: number
}

export const LoaderUser: React.FC<LoaderUserProps> = ({ numberOfItems }) => {
    return (
        <>
            {Array(numberOfItems)
                .fill(0)
                .map((item, index) => (
                    <li
                        key={index}
                        className='pt-[15px] mr-[30px] animate-[appearance_0.1s_ease-in-out]'
                    >
                        <div className='flex items-center pl-[10px]'>
                            <Skeleton
                                width={60}
                                height={60}
                                borderRadius='100%'
                                baseColor='#f3f3f3'
                                highlightColor='#ecebeb'
                            />
                            <Skeleton
                                height={25}
                                width={100}
                                style={{ margin: '0 0 0 16px' }}
                                baseColor='#f3f3f3'
                                highlightColor='#ecebeb'
                            />
                        </div>
                        <div className='h-[1px] bg-gray_10 mt-[15px] mx-[5px]' />
                    </li>
                ))}
        </>
    )
}

export default User
