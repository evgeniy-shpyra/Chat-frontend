import React from 'react'

interface HeaderBarProps {
    name: string
    avatarUrl: string
}

const HeaderBar = ({ name, avatarUrl }: HeaderBarProps) => {
    return (
        <div className='flex-none h-[80px] bg-background_1 border-b-2 flex justify-between items-center px-[25px]'>
            <h3 className='flex-none text-paragraph font-medium text-[20px]'>
                {name}
            </h3>
            <img
                src={avatarUrl}
                className='flex-none w-[60px] h-[60px] object-cover rounded-full'
            />
        </div>
    )
}

export default HeaderBar
