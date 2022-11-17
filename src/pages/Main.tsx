import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from './Chat'
import { useAppSelector } from '../hooks/reduxHooks'
import { AuthStatusEnum } from '../models/models'

import SetAvatar from './SetAvatar'

const Main: React.FC = () => {
    const { authStatus, id } = useAppSelector((state) => state.auth)

    return (
        <>
            {authStatus === AuthStatusEnum.Login && (
                <Routes>
                    <Route path='/*' element={<Chat />} />
                    <Route path='/set-avatar' element={<SetAvatar />} />
                </Routes>
            )}
        </>
    )
}

export default Main
