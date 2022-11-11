import React from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { addDialogueAsync } from '../../redux/features/dialoguesSlice'
import { WebSocketContext } from '../../WebSocket'
import Avatar from '../Avatar'

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
            className='pt-[15px] mr-[30px] cursor-pointer ease-linear duration-50 hover:bg-black/10 rounded'
        >
            <div className='flex items-center pl-[10px]'>
                <Avatar imagePath={imagePath} />

                <h3 className='text-[20px] text-paragraph font-medium pl-[16px]'>
                    {username}
                </h3>
            </div>
            <div className='h-[1px] bg-gray_10 mt-[15px] mx-[5px]' />
        </li>
    )
}

export default User
