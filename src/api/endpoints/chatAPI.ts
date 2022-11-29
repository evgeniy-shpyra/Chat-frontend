import {
    ServerToClientEvents,
    ClientToServerEvents,
    IMessageAddSocket,
    IMessageGetSocket,
} from './../../models/socketModels'
import { io, Socket } from 'socket.io-client'
import { AppDispatch } from '../../redux/store'
import { IDialogueData, IMessagesData } from '../../models/models'
import {
    addDialogue,
    updateMessageInDialogue,
} from '../../redux/features/dialoguesSlice'
import { addDMessage } from '../../redux/features/conversationSlice'

const wsBase = process.env.REACT_APP_SERVER_HOST || 'http://localhost:8080/'

let ws: Socket<ServerToClientEvents, ClientToServerEvents> | null = null
// let dispatch: AppDispatch | null = null

const subscribeDialogues = (dispatch: AppDispatch) => {
    ws?.on('dialogue:get', (data: IDialogueData) => {
        dispatch(addDialogue(data))
        console.log(data)
    })

    ws?.on('dialogue:delete', (date: { dialogueId: number }) => {
        console.log(date.dialogueId)
    })
}

const subscribeMessage = (dispatch: AppDispatch) => {
    ws?.on('message:get', (data: IMessageGetSocket) => {
        dispatch(addDMessage(data))
        dispatch(
            updateMessageInDialogue({
                text: data.message.text,
                date: data.message.date,
                dialogueId: data.dialogueId,
            })
        )
    })
}

export const chatAPI = {
    subscribe: (addDispatch: AppDispatch, userId: number) => {
        ws = io(wsBase)
        subscribeDialogues(addDispatch)
        subscribeMessage(addDispatch)

        ws?.emit('online:add', userId)
    },

    addDialogue: (dialogueId: number, toUserId: number) => {
        ws?.emit('dialogue:add', { dialogueId, toUserId })
    },

    addMessage: (data: IMessageAddSocket) => {
        ws?.emit('message:add', data)
    },

    deleteDialogue: (dialogueId: number, toUserId: number) => {
        ws?.emit('dialogue:delete', { dialogueId, toUserId })
    },
}
