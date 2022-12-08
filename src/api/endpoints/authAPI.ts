import { ILoginDate } from './../../models/models'
import instance from '..'
import {
    IResponseUserData,
    IResponseAvatarData,
    IResponseLogoutData,
} from '../../models/responseModels'
import { IRegisterDate } from '../../models/models'

class AuthAPI {
    static registration = (values: IRegisterDate) => {
        return instance.post<IResponseUserData>('/auth/register', values, {
            withCredentials: true,
        })
    }
    static login = (values: ILoginDate) => {
        return instance.post<IResponseUserData>('/auth/login', values, {
            withCredentials: true,
        })
    }
    static logout = () => {
        return instance.post<IResponseLogoutData>('/auth/logout')
    }
    static refresh = () => {
        return instance.get<IResponseUserData>('/auth/refresh', {
            withCredentials: true,
        })
    }
    static setAvatar = (file: FormData) => {
        return instance.post<IResponseAvatarData>(`/set-avatar`, file)
    }
}

export default AuthAPI
