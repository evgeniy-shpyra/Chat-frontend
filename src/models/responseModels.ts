import * as models from './models'
import { ResultCode } from '../api/index'

export interface IResponseOtherUsersData {
    users: Array<models.IOtherUserData>
    resultCode: ResultCode
    msg?: string
}

export interface IResponseOtherOneUserData {
    user: models.IOtherUserData
    resultCode: ResultCode
    msg?: string
}

export interface IResponseUserData {
    data: models.IUserDate
    resultCode: ResultCode
    msg?: string
}

export interface IResponseAvatarData {
    path: string
    resultCode: ResultCode
    msg?: string
}

export interface IResponseDialogueData {
    data: models.IDialogueData
    resultCode: ResultCode
    msg?: string
}

export interface IResponseDialoguesData {
    data: Array<models.IDialogueData>
    resultCode: ResultCode
    msg?: string
}

export interface IResponseDeleteDialogueData {
    data: { id: number }
    resultCode: ResultCode
    msg?: string
}

export interface IResponseConversationData {
    data: models.IConversationData
    resultCode: ResultCode
    msg?: string
}

export interface IResponseMessageData {
    data: models.IMessagesData
    resultCode: ResultCode
    msg?: string
}
