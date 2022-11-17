import React from 'react'
import Dialogues from '../components/dialogues/Dialogues'

import { Route, Routes } from 'react-router-dom'
import Conversation from '../components/conversation/Conversation'
import EmptyConversation from '../components/conversation/EmptyConversation'
import ModalWindows from '../components/ModalWindows'
import Menu from '../components/Menu'

const Chat = React.memo(() => {
    return (
        <div className='flex h-screen'>
            <Menu />
            <Dialogues />
            <Routes>
                <Route path='/:id' element={<Conversation />} />
                <Route path='/' element={<EmptyConversation />} />
            </Routes>
            <ModalWindows />
        </div>
    )
})

export default Chat
