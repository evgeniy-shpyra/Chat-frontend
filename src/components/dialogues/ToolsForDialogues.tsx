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

interface ToolsForDialoguesProps {
    isBigFormat: boolean
}

const ToolsForDialogues: React.FC<ToolsForDialoguesProps> = ({
    isBigFormat,
}) => {
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
        <div className='flex-none px-[20px] flex items-end w-full pt-[20px] pb-[10px] bg-background_1 '>
            <InputSearch
                handleChangeValue={handleChangeSearchValue}
                value={valueForSearching}
            />
            {isBigFormat && (
                <button
                    onClick={handleClickToButton}
                    className='flex-none ml-[20px] h-[55px] w-[55px] p-[12px] bg-white rounded-full _icon-plus text-[30px] text-gray_30 transition-colors hover:text-gray_40'
                />
            )}
        </div>
    )
}

export default ToolsForDialogues
