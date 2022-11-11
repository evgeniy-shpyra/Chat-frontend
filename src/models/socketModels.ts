import * as models from './models'

export interface ClientToServerEvents {
    'add-new-user:add': (user: models.IOtherUserData) => void
    'online:add': (id: number) => void

    'dialogue:add': (data: { dialogueId: number; toUserId: number }) => void
}

export interface ServerToClientEvents {
    'add-new-user:get': (user: models.IOtherUserData) => void
    'dialogue:get': (data: models.IDialogueData) => void
    // noArg: () => void
    // basicEmit: (a: number, b: string, c: Buffer) => void
    // withAck: (d: string, callback: (e: number) => void) => void
}
