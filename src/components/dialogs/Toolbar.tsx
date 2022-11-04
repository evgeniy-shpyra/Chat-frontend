import React from 'react'

const Toolbar = () => {
    const [searchValue, setSearchValue] = React.useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handleClickToButton = () => {
        console.log('pick')
    }

    return (
        <div className='pl-[35px] pr-[30px] sticky top-0 w-full h-[103px] bg-background_1'>
            <div className='flex items-center h-full'>
                <div className='mr-[25px] h-[55px] flex-auto relative'>
                    <img
                        src='./assets/icons/search-normal.svg'
                        className='absolute top-2/4 left-[27.5px] -translate-x-[12px] -translate-y-[12px] '
                    />
                    <input
                        value={searchValue}
                        onChange={handleChange}
                        className='h-full w-full rounded-[10px] outline-0 pl-[54px] pr-[35px] placeholder:text-[16px] placeholder:text-gray_30 text-[18px] text-gray_40 '
                        placeholder='Search by name...'
                    />
                </div>
                <button
                    onClick={handleClickToButton}
                    className='flex-none h-[55px] w-[55px] p-[12px] bg-white rounded-full'
                >
                    <img
                        src='./assets/icons/plus.svg'
                        className='w-full h-full object-cover'
                    />
                </button>
            </div>
        </div>
    )
}

export default Toolbar
