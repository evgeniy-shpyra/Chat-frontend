import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { deleteHistoryOfConversationAsync } from '../../redux/features/conversationSlice'
import { deleteDialogueAsync } from '../../redux/features/dialoguesSlice'



interface DialogueMenuProps {
    id: number
    positionX: number
    positionY: number
}
const DialogueMenu: React.FC<DialogueMenuProps> = ({
    id,
    positionX,
    positionY,
}) => {
    const liStyles =
        'px-[10px] py-[5px] tracking-normal cursor-pointer flex items-center transition-colors hover:bg-gray_10'

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onDeleteDialogue = () => {
        dispatch(deleteDialogueAsync({ dialogueId: id }))
        navigate('/')
    }
    const onClearHistory = () => {
        dispatch(deleteHistoryOfConversationAsync({ dialogueId: id }))
    }

    return (
        <ul
            className={`absolute bg-white rounded z-50 shadow-lg shadow-black-500 w-[161px]`}
            style={{ top: positionY, left: positionX }}
        >
            <li className={`${liStyles} rounded-t`} onClick={onClearHistory}>
                <div className='_icon-clean pr-[5px] text-paragraph' />
                <p className='text-[14px] text-paragraph'>Очистити історію</p>
            </li>
            <li className={`${liStyles} rounded-b`} onClick={onDeleteDialogue}>
                <div className='_icon-exit pr-[5px] text-red-700' />
                <p className='text-[14px] text-paragraph'>Видалити чат</p>
            </li>
        </ul>
    )
}

export default DialogueMenu
