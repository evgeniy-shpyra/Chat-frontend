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
    createDialogue,
    clearHistory,
    deleteDialogue,
    deleteDialogueAsync,
    updateMessageInDialogue,
} from '../../redux/features/dialoguesSlice'
import {
    addDMessage,
    deleteHistoryOfConversation,
} from '../../redux/features/conversationSlice'
import {
    createDialogueUsers,
    deleteDialogueUsers,
} from '../../redux/features/usersSlice'

const wsBase = `${process.env.REACT_APP_SERVER_HOST}` || 'http://localhost:8080'

let ws: Socket<ServerToClientEvents, ClientToServerEvents> | null = null

const subscribeDialogues = (dispatch: AppDispatch) => {
    ws?.on('dialogue:get', (data: IDialogueData) => {
        dispatch(createDialogue(data))
        dispatch(createDialogueUsers({ userId: data.user_id }))
    })

    ws?.on(
        'dialogue:delete',
        (data: { dialogueId: number; userId: number }) => {
            dispatch(deleteDialogue({ dialogueId: data.dialogueId }))
            dispatch(deleteDialogueUsers({ userId: data.userId }))
        }
    )
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
    ws?.on('conversation-clear-history:get', (date: { dialogueId: number }) => {
        dispatch(clearHistory({ dialogueId: date.dialogueId }))
        dispatch(deleteHistoryOfConversation({ dialogueId: date.dialogueId }))
    })
}

export const chatAPI = {
    subscribe: (addDispatch: AppDispatch, userId: number) => {
        ws = io(wsBase, { transports: ['websocket'] })
        subscribeDialogues(addDispatch)
        subscribeMessage(addDispatch)

        ws?.emit('online:add', userId)
    },

    logout: (userId: number) => {
        ws?.emit('logout', { userId })
    },

    addDialogue: (dialogueId: number, toUserId: number) => {
        ws?.emit('dialogue:add', { dialogueId, toUserId })
    },

    addMessage: (data: IMessageAddSocket) => {
        ws?.emit('message:add', data)
    },

    deleteDialogue: (dialogueId: number, toUserId: number, myId: number) => {
        ws?.emit('dialogue:delete', { dialogueId, toUserId, userId: myId })
    },

    deleteConversation: (dialogueId: number, toUserId: number) => {
        ws?.emit('conversation-clear-history:add', { dialogueId, toUserId })
    },
}
