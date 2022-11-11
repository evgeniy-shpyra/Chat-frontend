import { IResponseOtherUsersData } from './../../models/responseModels'
import instance from '..'

class UsersAPI {
    static getAllUsers = (id: number) => {
        return instance.get<IResponseOtherUsersData>(`/users/${id}`)
    }
}

export default UsersAPI
