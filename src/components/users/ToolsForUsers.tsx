import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
    changeValueForSearchingUsers,
    fetchUsers,
} from '../../redux/features/usersSlice'
import InputSearch from '../InputSearch'
import { debounce } from 'lodash'

interface ToolsForUsersProps {
    handleClose: () => void
}

const ToolsForUsers: React.FC<ToolsForUsersProps> = ({ handleClose }) => {
    // const [searchValue, setSearchValue] = React.useState('')
    const dispatch = useAppDispatch()
    const { valueForSearching } = useAppSelector((state) => state.users)

    const debouncedSearch = React.useRef(
        debounce(() => {
            dispatch(fetchUsers())
        }, 300)
    ).current

    const handleChangeSearchValue = (value: string) => {
        dispatch(changeValueForSearchingUsers(value))
        debouncedSearch()
    }

    const handleClickOnButton = () => {
        handleClose()
    }

    return (
        <div className='w-full flex-none pb-[20px] flex'>
            <InputSearch
                value={valueForSearching}
                handleChangeValue={handleChangeSearchValue}
                inputStyles='border'
            />
            <button
                onClick={handleClickOnButton}
                className='flex-none h-[55px] w-[55px] _icon-close-with-circle text-[55px]  ml-[15px] text-gray_20 transition-colors hover:text-gray_30'
            ></button>
        </div>
    )
}

export default ToolsForUsers
