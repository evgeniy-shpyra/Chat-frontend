import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { closeUsersWindow } from '../../redux/features/appSlice'
import InputSearch from '../InputSearch'
import ListOfUsers from './ListOfUsers'
import ToolsForUsers from './ToolsForUsers'

const Users = () => {
    const dispatch = useAppDispatch()
    const backgroundRef = React.useRef<HTMLDivElement>(null)
 
    const handleClose = () => {
        dispatch(closeUsersWindow())
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
            <div className='bg-white p-[20px] rounded-[10px] w-[500px] h-[80%] flex flex-col items-start'>
                <ToolsForUsers handleClose={handleClose} />
                <ListOfUsers />
            </div>
        </div>
    )
}

export default Users
