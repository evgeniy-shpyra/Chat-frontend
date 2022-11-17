import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { openUsersWindow } from '../../redux/features/appSlice'
import InputSearch from '../InputSearch'

const ToolsForDialogues = () => {
    const [searchValue, setSearchValue] = React.useState<string>('')

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleChangeSearchValue = (value: string) => {
        setSearchValue(value)
    }

    const handleClickToButton = () => {
        dispatch(openUsersWindow())
    }

    return (
        <div className='pl-[35px] pr-[30px] sticky top-0 w-full h-[103px] bg-background_1'>
            <div className='flex items-center h-full'>
                <InputSearch
                    handleChangeValue={handleChangeSearchValue}
                    value={searchValue}
                />
                <button
                    onClick={handleClickToButton}
                    className='flex-none ml-[25px] h-[55px] w-[55px] p-[12px] bg-white rounded-full _icon-plus text-[30px] text-gray_30'
                />
            </div>
        </div>
    )
}

export default ToolsForDialogues
