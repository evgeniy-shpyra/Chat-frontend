import React from 'react'
import ToolsForDialogs from './ToolsForDialogues'
import ScrollContainer from '../ScrollContainer'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { fetchDialogues } from '../../redux/features/dialoguesSlice'
import ListOfDialogues from './ListOfDialogues'

const Dialogues = () => {
    const handleSearch = (value: string) => {}

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchDialogues())
    }, [])

    return (
        <div className='flex-none w-[450px] bg-background_1 relative border-x-2 pr-[5px]'>
            <ToolsForDialogs />
            <ScrollContainer heightStyle='h-[calc(100%-103px)]'>
                <ListOfDialogues />
            </ScrollContainer>
        </div>
    )
}

export default Dialogues
