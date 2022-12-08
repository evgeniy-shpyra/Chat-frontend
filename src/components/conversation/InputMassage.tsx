import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { addMessageAsync } from '../../redux/features/conversationSlice'

interface IValues {
    massage: string
}

const InputMassage = () => {
    const [message, setMessage] = React.useState('')
    const dispatch = useAppDispatch()

    const { id } = useParams()

    const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    React.useEffect(() => {
        setMessage('')
    }, [id])

    const submitHandler = () => {
        if (message) {
            dispatch(addMessageAsync({ text: message }))
            setMessage('')
        }
    }

    const sendMessageHandler = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter') submitHandler()
    }

    return (
        <div className='flex-none pb-[25px] pt-[15px] px-[15px] lg:pb-[35px] lg:pt-[30px] lg:px-[35px]'>
            <div className='relative'>
                <input
                    id='massage'
                    name='massage'
                    className='h-[50px] w-full rounded-[10px] pl-[20px] pr-[60px] lg:pl-[30px] lg:pr-[80px] outline-none bg-white placeholder:text-[16px] placeholder:text-gray_30 text-[18px] text-gray_40'
                    placeholder='Enter your message...'
                    onChange={changeValueHandler}
                    onKeyDown={sendMessageHandler}
                    value={message}
                />
                <button
                    type='submit'
                    className='absolute right-[15px] lg:right-[30px] top-2/4 -translate-y-[12px] _icon-arrow-right text-[24px] text-gray_30 transition-colors hover:text-gray_40'
                    onClick={submitHandler}
                />
            </div>
        </div>
    )
}

export default InputMassage
