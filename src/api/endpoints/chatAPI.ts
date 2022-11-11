import {
    ServerToClientEvents,
    ClientToServerEvents,
} from './../../models/socketModels'
import { io, Socket } from 'socket.io-client'
import { AppDispatch } from '../../redux/store'
import { IDialogueData } from '../../models/models'
import { addDialogue } from '../../redux/features/dialoguesSlice'

const wsBase = process.env.REACT_APP_SERVER_HOST || 'http://localhost:8080/'

let ws: Socket<ServerToClientEvents, ClientToServerEvents> | null = null
// let dispatch: AppDispatch | null = null

const receiveDialogues = (dispatch: AppDispatch) => {
    ws?.on('dialogue:get', (data: IDialogueData) => {
        dispatch(addDialogue(data))
    })
}

export const chatAPI = {
    subscribe: (addDispatch: AppDispatch, userId: number) => {
        // dispatch = addDispatch
        ws = io(wsBase)
        receiveDialogues(addDispatch)
        ws?.emit('online:add', userId)
    },

    addDialogue: (dialogueId: number, toUserId: number) => {
        ws?.emit('dialogue:add', { dialogueId, toUserId })
    },
}
