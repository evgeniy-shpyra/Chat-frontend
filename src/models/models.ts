export interface ILoginDate {
    username: string
    password: string
}

export interface IRegisterDate {
    username: string
    email: string
    password: string
}

export enum AuthStatusEnum {
    Unknown = 0,
    Logout = 1,
    Login = 2,
}

//response

export enum StatusWindowEnum {
    Open = 0,
    Close = 1,
}

export interface IUserDate {
    user: {
        id: number
        username: string
        email: string
        image_path?: string
    }
    tokens: {
        accessToken: string
        refreshToken: string
    }
}

export interface IOtherUserData {
    user_id: number
    username: string
    email: string
    imagepath: string | null
    is_exist_dialogue: 0 | 1
}

export interface IDialogueData {
    dialogue_id: number
    user_id: number
    username: string
    email: string
    image_path: string
    date: string
    text: string | null
}

export interface IMessagesData {
    message_id: number
    text: string
    date: string
    owner_user_id: number
}

export interface IConversationData {
    massages: IMessagesData[]
    interlocutorUser: { user_id: number; username: string; image_path: string }
    dialogueId: number
}
