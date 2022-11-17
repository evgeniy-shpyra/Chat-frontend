import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import Dialogue from './Dialogue'

const ListOfDialogues: React.FC = () => {
    const { dialogues } = useAppSelector((state) => state.dialogue)
    const { dialogueId } = useAppSelector((state) => state.conversation)
    return (
        <ul>
            {dialogues.map((item) => (
                <Dialogue
                    key={item.dialogue_id + item.username}
                    name={item.username}
                    imagePath={item.image_path}
                    id={item.dialogue_id}
                    isActive={dialogueId == item.dialogue_id}
                />
            ))}
        </ul>
    )
}

export default ListOfDialogues
