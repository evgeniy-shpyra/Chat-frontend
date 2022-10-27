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

export interface IUserDate {
    user: {
        id: number
        username: string
        email: string
    }
    tokens: {
        accessToken: string
        refreshToken: string
    }
}

//response

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
