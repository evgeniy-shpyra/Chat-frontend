import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'

const Chat = () => {


    const { isAuth } = useAppSelector((state) => state.user)

        const navigate = useNavigate()

    React.useEffect(() => {
        if(!isAuth){
            navigate('/login')
        }
    }, [isAuth])

    return <div><Link to='/avatar'>avatar</Link></div>
}

export default Chat
