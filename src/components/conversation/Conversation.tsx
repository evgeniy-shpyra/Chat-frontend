import React from 'react'
import InterlocutorInfo from './InterlocutorInfo'
import InputMassage from './InputMassage'
import ListOfMassages from './ListOfMassages'

const data = {
    name: 'Alex1',
    massage: 'Hello, man! How are you?',
    avatarUrl:
        'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232249540-4.jpg',
}

const Conversation = () => {
    return (
        <div className='flex-auto w-full bg-background_4 relative flex flex-col'>
            <InterlocutorInfo name={data.name} avatarUrl={data.avatarUrl} />
            <div className='flex-auto h-full pr-[5px] overflow-hidden flex flex-col justify-end'>
                <ListOfMassages />
            </div>
            <InputMassage />
        </div>
    )
}

export default Conversation
