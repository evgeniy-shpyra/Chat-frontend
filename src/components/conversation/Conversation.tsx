import React from 'react'
import InterlocutorInfo from './InterlocutorInfo'
import InputMassage from './InputMassage'
import ListOfMassages from './ListOfMassages'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
    closeConversation,
    fetchConversation,
} from '../../redux/features/conversationSlice'

interface ConversationProps {
    isBigFormat: boolean
}

const Conversation: React.FC<ConversationProps> = ({ isBigFormat }) => {
    const { id } = useParams()
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch(fetchConversation(Number(id))).then((res) => {
            if (res.meta.requestStatus === 'rejected') navigate('/')
        })

        return () => {
            dispatch(closeConversation())
        }
    }, [id])

    return (
        <div className='flex-auto w-full bg-background_4 relative flex flex-col'>
            <InterlocutorInfo isBigFormat={isBigFormat} />
            <div className='flex-auto h-full pr-[5px] overflow-hidden flex flex-col justify-end'>
                <ListOfMassages isBigFormat={isBigFormat} />
            </div>
            <InputMassage />
        </div>
    )
}

export default Conversation
