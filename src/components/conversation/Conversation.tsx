import React from 'react'
import InterlocutorInfo from './InterlocutorInfo'
import InputMassage from './InputMassage'
import ListOfMassages from './ListOfMassages'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/reduxHooks'
import {
    closeConversation,
    fetchConversation,
} from '../../redux/features/conversationSlice'
// import {
//     closeConversation,
//     fetchMessages,
// } from '../../redux/features/messagesSlice'

const data = {
    name: 'Alex1',
    massage: 'Hello, man! How are you?',
    avatarUrl:
        'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232249540-4.jpg',
}

interface ConversationProps {}

const Conversation: React.FC = () => {
    const { id } = useParams()

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchConversation(Number(id)))
        return () => {
            dispatch(closeConversation())
        }
    }, [id])

    return (
        <div className='flex-auto w-full bg-background_4 relative flex flex-col'>
            <InterlocutorInfo />
            <div className='flex-auto h-full pr-[5px] overflow-hidden flex flex-col justify-end'>
                <ListOfMassages />
            </div>
            <InputMassage />
        </div>
    )
}

export default Conversation
