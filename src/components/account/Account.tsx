import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { closeAccountWindow } from '../../redux/features/appSlice'
import { logout } from '../../redux/features/authSlice'
import Avatar from '../Avatar'

const Account = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const accountRef = React.useRef<HTMLDivElement>(null)
    const { imagePath, username, email } = useAppSelector((state) => state.auth)

    const handleClose = () => {
        dispatch(closeAccountWindow())
    }

    const onExitHandler = () => {
        dispatch(logout())
    }

    const onClickHandler = (e: any) => {
        if (!e?.path?.includes(accountRef.current)) handleClose()
    }

    React.useEffect(() => {
        setTimeout(() => window.addEventListener('click', onClickHandler), 200)
        return () => window.removeEventListener('click', onClickHandler)
    }, [])

    return (
        <div className='absolute top-0 left-0  p-[15px] w-screen h-[calc(100vh-80px)] lg:h-screen bg-black/20 flex justify-center items-center'>
            <div
                ref={accountRef}
                className='bg-white px-[20px] py-[30px] lg:p-[30px] rounded-[10px] w-[500px]'
            >
                <div className='flex w-full'>
                    <Avatar
                        imagePath={imagePath}
                        styles='h-[70px] w-[70px] lg:h-[120px] lg:w-[120px]'
                    />
                    <div className='flex-auto pl-[20px] lg:pl-[35px]'>
                        <h3 className='text-paragraph text-[20px] lg:text-[28px] pb-[10px]'>
                            {username}
                        </h3>
                        <p className='text-paragraph text-[16px]'>{email}</p>
                    </div>
                    <div
                        onClick={onExitHandler}
                        className='_icon-exit self-start text-[22px] cursor-pointer transition-colors text-error hover:text-[#c22121]'
                    />
                </div>
            </div>
        </div>
    )
}

export default Account
