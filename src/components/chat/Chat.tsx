import React from 'react'
import Massages from './Massages'
import HeaderBar from './HeaderBar'
import InputMassage from './InputMassage'

const data = {
    name: 'Alex1',
    massage: 'Hello, man! How are you?',
    avatarUrl:
        'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232249540-4.jpg',
}

const Chat = () => {
    return (
        <div className='flex-auto w-full bg-background_4 relative'>
            <HeaderBar name={data.name} avatarUrl={data.avatarUrl} />
            <Massages />
            <InputMassage />
        </div>
    )
}

export default Chat