import React from 'react'
import Dialogues from '../components/dialogues/Dialogues'

import { Route, Routes } from 'react-router-dom'
import Conversation from '../components/conversation/Conversation'
import EmptyConversation from '../components/conversation/EmptyConversation'
import ModalWindows from '../components/ModalWindows'
import Menu from '../components/Menu'
import { useAppSelector } from '../hooks/reduxHooks'

const Chat = React.memo(() => {
    const isDesktop = useAppSelector((state) => state.app.isDesktop)

    return (
        <div className='flex h-screen'>
            {isDesktop ? (
                <>
                    <Menu isBigFormat={isDesktop} />
                    <Dialogues isBigFormat={isDesktop} />
                    <Routes>
                        <Route
                            path='/:id'
                            element={<Conversation isBigFormat={isDesktop} />}
                        />
                        <Route path='/' element={<EmptyConversation />} />
                    </Routes>
                </>
            ) : (
                <>
                    <Routes>
                        <Route
                            path='/'
                            element={<Dialogues isBigFormat={isDesktop} />}
                        />
                        <Route
                            path='/:id'
                            element={<Conversation isBigFormat={isDesktop} />}
                        />
                    </Routes>
                </>
            )}

            <ModalWindows />
        </div>
    )
})

export default Chat
