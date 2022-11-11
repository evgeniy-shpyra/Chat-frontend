import React from 'react'
import ListOfDialogues from '../components/dialogues/ListOfDialogues'
import SideMenu from '../components/SideMenu'
import { Route, Routes } from 'react-router-dom'
import Users from '../components/users/Users'
import Conversation from '../components/conversation/Conversation'

const Chat = () => {
    return (
        <div className='flex h-screen'>
            <SideMenu>
                <ListOfDialogues />
            </SideMenu>
            <Conversation />
            <Routes>
                <Route path='/users' element={<Users />} />
            </Routes>
        </div>
    )
}

export default Chat
