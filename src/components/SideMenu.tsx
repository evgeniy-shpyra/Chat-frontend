import React from 'react'

interface SideMenuProps {
    children?: React.ReactNode
}

const SideMenu = ({ children }: SideMenuProps) => {
    return (
        <div className='flex-none w-[450px] bg-background_1 relative border-r-2 pr-[5px]'>
            {children}
        </div>
    )
}

export default SideMenu
