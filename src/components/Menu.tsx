import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { StatusWindowEnum } from '../models/models'
import { openAccountWindow, openUsersWindow } from '../redux/features/appSlice'
import Avatar from './Avatar'

const mobileIconsStyles = 'text-[30px] text-black mx-[7%] h-[100%] pt-[10px] transition-colors'

interface MenuProps {
    isBigFormat: boolean
}

const Menu: React.FC<MenuProps> = ({ isBigFormat }) => {
    const { imagePath } = useAppSelector((state) => state.auth)
    const { usersWindow, accountWindow } = useAppSelector((state) => state.app)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const goToProfileHandler = () => {
        dispatch(openAccountWindow())
    }

    const goToChatsHandler = () => {
        navigate('/')
    }

    const goToUsersHandler = () => {
        dispatch(openUsersWindow())
    }

    return (
        <div className='h-mobileMenu w-[100%] border-t lg:h-[100%] lg:w-[100px] lg:border-none flex-none bg-background_4'>
            <ul className='h-[80px] pb-[25px] flex justify-center lg:p-0 lg:h-[100px] lg:justify-center items-center'>
                {isBigFormat ? (
                    <li>
                        <Avatar
                            imagePath={imagePath}
                            styles='cursor-pointer w-[70px] h-[70px]'
                            onClick={goToProfileHandler}
                        />
                    </li>
                ) : (
                    <>
                        <li
                            className={`_icon-user ${mobileIconsStyles} ${
                                accountWindow === StatusWindowEnum.Open
                                    ? 'text-[#135e41]'
                                    : 'text-[#2B8161]'
                            }`}
                            onClick={goToProfileHandler}
                        />
                        <li
                            className={`_icon-chats ${mobileIconsStyles} ${
                                location.pathname === '/' &&
                                accountWindow === StatusWindowEnum.Close &&
                                usersWindow === StatusWindowEnum.Close
                                    ? 'text-[#135e41]'
                                    : 'text-[#2B8161]'
                            }`}
                            onClick={goToChatsHandler}
                        />
                        <li
                            className={`_icon-users ${mobileIconsStyles} ${
                                usersWindow === StatusWindowEnum.Open
                                    ? 'text-[#135e41]'
                                    : 'text-[#2B8161]'
                            }`}
                            onClick={goToUsersHandler}
                        />
                    </>
                )}
            </ul>
        </div>
    )
}

export default Menu
