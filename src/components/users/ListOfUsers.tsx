import React from 'react'
import { isTemplateMiddle } from 'typescript'
import { useAppSelector } from '../../hooks/reduxHooks'
import ScrollContainer from '../ScrollContainer'
import User from './User'

const ListOfUsers = () => {
    const { users } = useAppSelector((state) => state.users)

    return (
        <ul className='w-full h-full'>
            <ScrollContainer heightStyle='h-[calc(100%-75px)]'>
                {users.map((item) => (
                    <User
                        key={item.user_id + item.username}
                        username={item.username}
                        id={item.user_id}
                        imagePath={item.imagepath}
                    />
                ))}
            </ScrollContainer>
          
        </ul>
    )
}

export default ListOfUsers
