import React from 'react'
import ToolsForDialogs from './ToolsForDialogues'
import Dialogue from './Dialogue'
import ScrollContainer from '../ScrollContainer'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchDialogues } from '../../redux/features/dialoguesSlice'

const ListOfDialogues = () => {
    const handleSearch = (value: string) => {}
    
    const dispatch = useAppDispatch()

    const { dialogues } = useAppSelector(state => state.dialogue)
    
    React.useEffect(() => {
        dispatch(fetchDialogues())
    }, [])

    return (
        <>
            <ToolsForDialogs />
            <ScrollContainer heightStyle='h-[calc(100%-103px)]'>
                <ul>
                    {dialogues.map((item) => (
                        <Dialogue
                            key={item.dialogue_id + item.username}
                            name={item.username}
                            imagePath={item.image_path}
                            // massage={item.massage}
                        />
                    ))}
                </ul>
            </ScrollContainer>
        </>
    )
}

export default ListOfDialogues
