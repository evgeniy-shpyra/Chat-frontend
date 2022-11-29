import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchDialogues } from '../../redux/features/dialoguesSlice'
import ScrollContainer from '../ScrollContainer'
import Dialogue, { LoaderDialogue } from './Dialogue'
import DialogueMenu from './DialogueMenu'

const ListOfDialogues: React.FC = () => {
    const { dialogues, isLoading } = useAppSelector((state) => state.dialogue)
    const { dialogueId } = useAppSelector((state) => state.conversation)

    const dispatch = useAppDispatch()

    const [openMenu, setOpenMenu] = React.useState<{
        id: number
        positionX: number
        positionY: number
    } | null>(null)

    React.useEffect(() => {
        dispatch(fetchDialogues())
    }, [])

    const onScrollList = (e: React.UIEvent<HTMLElement>) => {
        const scrollBottom =
            Math.ceil(e.currentTarget.scrollTop) +
                e.currentTarget.offsetHeight ==
            e.currentTarget.scrollHeight

        if (scrollBottom && !isLoading) {
            dispatch(fetchDialogues())
        }
    }

    const onOpenMenu = (e: React.MouseEvent, id: number) => {
        setOpenMenu({ id, positionX: e.clientX, positionY: e.clientY })
    }

    const onCloseMenu = () => {
        setOpenMenu(null)
    }

    React.useEffect(() => {
        window.addEventListener('click', onCloseMenu)
        return () => window.removeEventListener('click', onCloseMenu)
    }, [])

    return (
        <ul className='pr-[4px] h-[calc(100%-103px)]'>
            <ScrollContainer heightStyle='h-full' onScrollList={onScrollList}>
                {dialogues.map((item) => (
                    <Dialogue
                        key={item.dialogue_id + item.username}
                        name={item.username}
                        fullDate={item.date}
                        imagePath={item.image_path}
                        id={item.dialogue_id}
                        text={item.text ? item.text : 'History is empty'}
                        isActive={dialogueId == item.dialogue_id}
                        onOpenMenu={onOpenMenu}
                        isOpenMenu={openMenu && openMenu.id === item.dialogue_id ? true : false}
                    />
                ))}
                {openMenu && (
                    <DialogueMenu
                        id={openMenu.id}
                        positionX={openMenu.positionX}
                        positionY={openMenu.positionY}
                    />
                )}
                {isLoading && dialogues.length === 0 && (
                    <LoaderDialogue numberOfItems={3} />
                )}
                {!isLoading && dialogues.length === 0 && (
                    <div className='h-full flex justify-center text-paragraph'>
                        No dialogues found
                    </div>
                )}
            </ScrollContainer>
        </ul>
    )
}

export default ListOfDialogues
