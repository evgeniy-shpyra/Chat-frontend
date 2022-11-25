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
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeValue(e.target.value)
    }

    const focusOnInput = () => {
        inputRef.current?.focus()
    }

    const clearHandler = () => {
        handleChangeValue('')
        focusOnInput()
    }

    return (
        <div className='h-[55px] w-full relative'>
            <div
                onClick={focusOnInput}
                className='_icon-search-normal text-[24px] text-gray_30 absolute top-2/4 left-[27.5px] -translate-x-[12px] -translate-y-[12px] cursor-pointer'
            />
            <input
                ref={inputRef}
                value={value}
                onChange={handleChange}
                className={`h-full w-full rounded-[10px] outline-0 pl-[54px] pr-[35px] placeholder:text-[16px] placeholder:text-gray_30 text-[18px] text-gray_40 ${inputStyles}`}
                placeholder='Search by name...'
            />
            <div
                onClick={clearHandler}
                className={`_icon-close absolute text-[20px] text-gray_30  top-2/4 right-[27.5px] translate-x-[12px] -translate-y-[10px] cursor-pointer transition-opacity hover:transition-colors hover:text-gray_40${
                    value === '' ? ' opacity-0 pointer-events-none' : ''
                }`}
            />
        </div>
    )
}

export default InputSearch
