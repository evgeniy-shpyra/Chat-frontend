import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { closeUsersWindow } from '../../redux/features/appSlice'
import InputSearch from '../InputSearch'
import ListOfUsers from './ListOfUsers'
import ToolsForUsers from './ToolsForUsers'

const Users = () => {
    const dispatch = useAppDispatch()
    const usersRef = React.useRef<HTMLDivElement>(null)

    const handleClose = () => {
        dispatch(closeUsersWindow())
    }

    const onClickHandler = (e: any) => {
        if (!e?.path?.includes(usersRef.current)) handleClose()
    }

    React.useEffect(() => {
        setTimeout(() => window.addEventListener('click', onClickHandler), 200)
        return () => window.removeEventListener('click', onClickHandler)
    }, [])

    return (
        <div className='absolute top-0 left-0 p-[15px] w-screen h-[calc(100vh-80px)] lg:h-screen bg-black/20 flex justify-center items-center'>
            <div
                ref={usersRef}
                className='bg-white py-[20px] px-[15px] lg:p-[20px] h-full w-full rounded-[10px] lg:w-[500px] lg:h-[80%] flex flex-col items-start'
            >
                <ToolsForUsers handleClose={handleClose} />
                <ListOfUsers />
            </div>
        </div>
    )
}

export default Users
