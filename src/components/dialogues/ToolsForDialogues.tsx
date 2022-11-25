import { debounce } from 'lodash'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { openUsersWindow } from '../../redux/features/appSlice'
import {
    changeValueForSearchingDialogues,
    fetchDialogues,
} from '../../redux/features/dialoguesSlice'
import InputSearch from '../InputSearch'

const ToolsForDialogues = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { valueForSearching } = useAppSelector((state) => state.dialogue)

    const handleClickToButton = () => {
        dispatch(openUsersWindow())
    }

    const debouncedSearch = React.useRef(
        debounce(() => {
            dispatch(fetchDialogues())
        }, 300)
    ).current

    const handleChangeSearchValue = (value: string) => {
        dispatch(changeValueForSearchingDialogues(value))
        debouncedSearch()
    }

    return (
        <div className='px-[20px] w-full h-[103px] bg-background_1 '>
            <div className='flex items-center h-full'>
                <InputSearch
                    handleChangeValue={handleChangeSearchValue}
                    value={valueForSearching}
                />
                <button
                    onClick={handleClickToButton}
                    className='flex-none ml-[20px] h-[55px] w-[55px] p-[12px] bg-white rounded-full _icon-plus text-[30px] text-gray_30 transition-colors hover:text-gray_40'
                />
            </div>
        </div>
    )
}

export default ToolsForDialogues
