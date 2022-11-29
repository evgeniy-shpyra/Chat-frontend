import React from 'react'
import ToolsForDialogs from './ToolsForDialogues'
import ListOfDialogues from './ListOfDialogues'

const Dialogues = () => {
    const handleSearch = (value: string) => {}
   
    return (
        <div className='flex-none w-[450px] bg-background_1 border-x-2'>
            <ToolsForDialogs />
            <ListOfDialogues />
        </div>
    )
}

export default Dialogues
