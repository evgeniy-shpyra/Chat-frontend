import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { clearUsers, fetchUsers } from '../../redux/features/usersSlice'
import ScrollContainer from '../ScrollContainer'
import User, { LoaderUser } from './User'

const ListOfUsers = () => {
    const { users, isLoading } = useAppSelector((state) => state.users)

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchUsers())
        return () => {
            dispatch(clearUsers())
        }
    }, [])

    const onScrollList = (e: React.UIEvent<HTMLElement>) => {
        const scrollBottom =
            Math.ceil(e.currentTarget.scrollTop) +
                e.currentTarget.offsetHeight ==
            e.currentTarget.scrollHeight

        if (scrollBottom && !isLoading) {
            dispatch(fetchUsers())
        }
    }

    return (
        <ul className='w-full h-[calc(100%-75px)]'>
            <ScrollContainer
                onScrollList={onScrollList}
                heightStyle='h-full'
            >
                <>
                    {users.map((item) => (
                        <User
                            key={item.user_id + item.username}
                            username={item.username}
                            id={item.user_id}
                            imagePath={item.imagepath}
                            is_exist_dialogue={item.is_exist_dialogue}
                        />
                    ))}
                    {isLoading && users.length === 0 && (
                        <LoaderUser numberOfItems={3} />
                    )}
                    {!isLoading && users.length === 0 && (
                        <div className='h-full flex items-center justify-center text-gray_40'>
                            No users found
                        </div>
                    )}
                </>
            </ScrollContainer>
        </ul>
    )
}

export default ListOfUsers
