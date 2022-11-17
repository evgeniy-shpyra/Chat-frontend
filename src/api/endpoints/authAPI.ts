import { ILoginDate } from './../../models/models'
import instance from '..'
import {
    IResponseUserData,
    IResponseAvatarData,
} from '../../models/responseModels'
import { IRegisterDate } from '../../models/models'



class AuthAPI {
    static registration = (values: IRegisterDate) => {
        return instance.post<IResponseUserData>('/auth/register', values)
    }
    static login = (values: ILoginDate) => {
        return instance.post<IResponseUserData>('/auth/login', values)
    }
    static refresh = () => {
        return instance.get<IResponseUserData>('/auth/refresh', {
            withCredentials: true,
        })
    }
    static setAvatar = (file: FormData) => {
        return instance.post<IResponseAvatarData>(
            `/set-avatar`,
            file
        )
    }
}

export default AuthAPI
