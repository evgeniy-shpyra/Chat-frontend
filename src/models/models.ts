import { ResultCode } from '../api/index'

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
    NotMine = 1
}

export interface IUserDate {
    user: {
        id: number
        username: string
        email: string
        imagePath?: string
    }
    tokens: {
        accessToken: string
        refreshToken: string
    }
}

export interface IResponseUserData extends IUserDate {
    data: IUserDate
    resultCode: ResultCode
    msg?: string
}

export interface IResponseAvatarData {
    path: string
    resultCode: ResultCode
    msg?: string
}

