import React from 'react'

interface InputSearchProps {
    value: string
    handleChangeValue: (value: string) => void
    inputStyles?: string
}

const InputSearch: React.FC<InputSearchProps> = ({
    handleChangeValue,
    value,
    inputStyles = '',
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeValue(e.target.value)
    }

    return (
        <div className='h-[55px] w-full relative'>
            <div className='_icon-search-normal text-[24px] text-gray_30 absolute top-2/4 left-[27.5px] -translate-x-[12px] -translate-y-[12px] ' />
            <input
                value={value}
                onChange={handleChange}
                className={`h-full w-full rounded-[10px] outline-0 pl-[54px] pr-[35px] placeholder:text-[16px] placeholder:text-gray_30 text-[18px] text-gray_40 ${inputStyles}`}
                placeholder='Search by name...'
            />
        </div>
    )
}

export default InputSearch
