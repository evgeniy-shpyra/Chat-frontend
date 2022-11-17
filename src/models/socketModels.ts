import * as models from './models'

export interface ClientToServerEvents {
    // 'add-new-user:add': (user: models.IOtherUserData) => void
    'online:add': (id: number) => void
    'message:add': (data: {
        message: models.IMessagesData
        toUserId: number
    }) => void
    'dialogue:add': (data: { dialogueId: number; toUserId: number }) => void
}

export interface ServerToClientEvents {
    'dialogue:get': (data: models.IDialogueData) => void
    'message:get': (data: models.IMessagesData) => void
    // noArg: () => void
    // basicEmit: (a: number, b: string, c: Buffer) => void
    // withAck: (d: string, callback: (e: number) => void) => void
}
