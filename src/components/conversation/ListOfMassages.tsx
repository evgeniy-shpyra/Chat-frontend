import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import { scrollTrackStyle } from '../../styles'
import InputMassage from './InputMassage'
import Message from './Message'

const ListOfMassages = () => {
    const massagesTrackRef = React.useRef<HTMLDivElement>(null)

    const { messages } = useAppSelector((state) => state.conversation)
    const myId = useAppSelector((state) => state.auth.id)

    const scrollToBottom = (): void => {
        massagesTrackRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        })
    }

    React.useEffect(() => {
        scrollToBottom()
        
    }, [messages])

    return (
        <div className={'flex flex-col overflow-y-scroll ease-linear duration-1000 ' + scrollTrackStyle}>
            <div ref={massagesTrackRef} className='px-[25px] justify-self-end'>
                {messages.map((item) => (
                    <Message
                        key={item.message_id + item.date.toString()}
                        messageId={item.message_id}
                        text={item.text}
                        isMy={item.owner_user_id === myId}
                        fullDate={item.date}
                    />
                ))}
            </div>
        </div>
    )
}

export default ListOfMassages
