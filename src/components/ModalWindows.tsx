import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { StatusWindowEnum } from '../models/models'
import Account from './account/Account'
import Users from './users/Users'

const ModalWindows = () => {
    const { usersWindow, accountWindow } = useAppSelector((state) => state.app)

    return (
        <>
            {usersWindow === StatusWindowEnum.Open && <Users />}
            {accountWindow === StatusWindowEnum.Open && <Account />}
        </>
    )
}

export default ModalWindows
