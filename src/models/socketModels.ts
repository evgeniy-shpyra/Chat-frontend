import * as models from './models'

export interface IMessageAddSocket {
    message: models.IMessagesData
    toUserId: number
    dialogueId: number
}

export interface IMessageGetSocket {
    message: models.IMessagesData
    dialogueId: number
}

export interface ClientToServerEvents {
    // 'add-new-user:add': (user: models.IOtherUserData) => void
    'online:add': (id: number) => void
    'message:add': (data: IMessageGetSocket) => void
    'dialogue:add': (data: { dialogueId: number; toUserId: number }) => void
}

export interface ServerToClientEvents {
    'dialogue:get': (data: models.IDialogueData) => void
    'message:get': (data: IMessageAddSocket) => void
    // noArg: () => void
    // basicEmit: (a: number, b: string, c: Buffer) => void
    // withAck: (d: string, callback: (e: number) => void) => void
}
