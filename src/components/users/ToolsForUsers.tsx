import React from 'react'
import { useNavigate } from 'react-router-dom'
import InputSearch from '../InputSearch'

interface ToolsForUsersProps {
    handleClose: () => void
}

const ToolsForUsers: React.FC<ToolsForUsersProps> = ({ handleClose }) => {
    // const navigate = useNavigate()

    const [searchValue, setSearchValue] = React.useState('')

    const handleChangeSearchValue = (value: string) => {
        setSearchValue(value)
    }

    const handleClickOnButton = () => {
        // navigate(-1)
        handleClose()
    }

    return (
        <div className='w-full flex-none pb-[20px] flex'>
            <InputSearch
                value={searchValue}
                handleChangeValue={handleChangeSearchValue}
                inputStyles='border'
            />
            <button
                onClick={handleClickOnButton}
                className='flex-none h-[55px] w-[55px] _icon-close-with-circle text-[55px] ml-[15px] text-gray_30'
            ></button>
        </div>
    )
}

export default ToolsForUsers
