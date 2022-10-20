import instance from '..'
import { IRegisterDate, IUserDate } from '../../models/authModels'

class AuthAPI {
    static registration = (values: IRegisterDate) => {
        return instance.post<IUserDate>('/auth/register', values)
    }
}

export default AuthAPI
