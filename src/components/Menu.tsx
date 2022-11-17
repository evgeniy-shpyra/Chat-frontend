import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { openAccountWindow } from '../redux/features/appSlice'
import Avatar from './Avatar'

const Menu = () => {
    const { imagePath } = useAppSelector((state) => state.auth)

    const dispatch = useAppDispatch()
    const clickToAvatarHandler = () => {
        dispatch(openAccountWindow())
    }

    return (
        <div className='w-[100px] flex-none bg-background_4'>
            <div className='h-[100px] flex justify-center items-center'>
                <Avatar
                    imagePath={imagePath}
                    styles='cursor-pointer w-[70px] h-[70px]'
                    onClick={clickToAvatarHandler}
                />
            </div>
        </div>
    )
}

export default Menu
