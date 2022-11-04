import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Chat from '../components/chat/Chat'
import Dialogues from '../components/dialogs/Dialogues'
import Friends from '../components/Friends'
import Menu from '../components/Menu'

const Main = () => {
    return (
        <div className='h-screen overflow-hidden flex'>
            <Menu />
            <Dialogues />
            <Routes>
                <Route path='/' element={<Chat />} />
                <Route path='/friends' element={<Friends />} />
            </Routes>
        </div>
    )
}

export default Main
