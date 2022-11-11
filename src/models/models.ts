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

export enum OwnerOfMassageEnum {
    My = 0,
    NotMine = 1,
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
}

export interface IDialogueData {
    dialogue_id: number
    user_id: number
    username: string
    email: string
    image_path: string
}

export interface IMessagesData {
    user_id: number
    text: string
}
