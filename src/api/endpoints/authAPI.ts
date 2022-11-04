import { ILoginDate } from './../../models/models'
import instance from '..'
import { IRegisterDate, IResponseUserData } from '../../models/models'

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
}

export default AuthAPI
