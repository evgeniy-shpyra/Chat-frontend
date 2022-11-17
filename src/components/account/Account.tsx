import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { closeAccountWindow } from '../../redux/features/appSlice'
import Avatar from '../Avatar'

const Account = () => {
    const dispatch = useAppDispatch()

    const backgroundRef = React.useRef<HTMLDivElement>(null)
    const { imagePath, username, email } = useAppSelector((state) => state.auth)

    const handleClose = () => {
        dispatch(closeAccountWindow())
    }

    const handleClickToBackground = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (e.target == backgroundRef.current) handleClose()
    }

    return (
        <div
            ref={backgroundRef}
            onClick={handleClickToBackground}
            className='absolute top-0 left-0 w-screen h-screen bg-black/20 flex justify-center items-center'
        >
            <div className='bg-white p-[30px] rounded-[10px] w-[500px]'>
                <div className='flex'>
                    <Avatar
                        imagePath={imagePath}
                        styles='h-[120px] w-[120px]'
                    />
                    <div className='pl-[35px]'>
                        <h3 className='text-paragraph text-[28px] pb-[10px]'>
                            {username}
                        </h3>
                        <p className='text-paragraph text-[16px]'>{email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
  