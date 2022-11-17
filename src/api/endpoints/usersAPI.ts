import { IResponseOtherUsersData } from './../../models/responseModels'
import instance from '..'

class UsersAPI {
    static getAllUsers = (uploadPage: number) => {
        return instance.get<IResponseOtherUsersData>(`/users?page=${uploadPage}`)
    }
}

export default UsersAPI
