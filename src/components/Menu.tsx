import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'

const icons = [
    { imgUrl: '/assets/icons/chat-icon.svg', url: '/' },
    { imgUrl: '/assets/icons/friends-icon.svg', url: '/friends' },
]

const Menu = () => {
    const userData = useAppSelector((state) => state.user)

    const [currentUrl, setCurrentUrl] = React.useState<string>('')

    const location = useLocation()

    React.useEffect(() => {
        setCurrentUrl(location.pathname)
    }, [location.pathname])

    return (
        <div className='flex-none w-[110px] bg-background_4'>
            <nav>
                <div className='h-[110px] p-[15px] overflow-hidden'>
                    <img
                        className='w-full h-full rounded-full object-cover cursor-pointer'
                        src={
                            userData.imagePath
                                ? userData.imagePath
                                : './assets/default-avatar.png'
                        }
                    />
                </div>

                <ul className='pb-[20px]'>
                    {icons.map((item) => (
                        <Link key={item.url} to={item.url}>
                            <li className='h-[80px] py-[8px] px-[23px] relative'>
                                {currentUrl === item.url && (
                                    <div className='absolute top-0 left-0 w-[8px] h-full bg-background_3' />
                                )}
                                <img
                                    className='w-full h-full cursor-pointer'
                                    src={item.imgUrl}
                                />
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Menu
