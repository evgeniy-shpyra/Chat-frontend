import React from 'react'
import ToolsForDialogs from './ToolsForDialogues'
import ListOfDialogues from './ListOfDialogues'
import { Resizable } from 're-resizable'
import Menu from '../Menu'

interface DialoguesProps {
    isBigFormat: boolean
}

const Dialogues: React.FC<DialoguesProps> = ({ isBigFormat }) => {

    

    return (
        <Resizable
            defaultSize={{
                width: isBigFormat ? 400 : '100%',
                height: 'calc(100%-80px)',
            }}
            className={`flex-none bg-background_1 flex flex-col ${
                isBigFormat ? 'border-x-2' : ''
            } `}
            maxWidth={isBigFormat ? 600 : '100%'}
            minWidth={350}
            enable={{
                left: false,
                right: isBigFormat,
                bottom: false,
                top: false,
            }}
        >
            <ToolsForDialogs isBigFormat={isBigFormat} />
            <ListOfDialogues />
            {!isBigFormat && <Menu isBigFormat={isBigFormat} />}
        </Resizable>
    )
}

export default Dialogues
