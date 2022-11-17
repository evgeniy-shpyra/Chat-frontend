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

    return (
        <div className='flex-none pb-[35px] pt-[30px] px-[35px]'>
            <div className='relative'>
                <button
                    type='submit'
                    className='absolute right-[30px] top-2/4 -translate-y-[12px] _icon-arrow-right text-gray_30 text-[24px]'
                    onClick={submitHandler}
                />
                <input
                    id='massage'
                    name='massage'
                    className='h-[60px] w-full rounded-[10px] px-[30px] outline-none bg-white placeholder:text-[16px] placeholder:text-gray_30 text-[18px] text-gray_40'
                    placeholder='Enter your message...'
                    onChange={changeValueHandler}
                    value={message}
                />
            </div>
        </div>
    )
}

export default InputMassage
