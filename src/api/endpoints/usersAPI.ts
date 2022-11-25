import { IResponseOtherUsersData } from './../../models/responseModels'
import instance from '..'

class UsersAPI {
    static getAllUsers = (uploadPage: number, name: string | null) => {
        return instance.get<IResponseOtherUsersData>(`/users`, {
            params: { page: uploadPage, name },
        })
    }
}

export default UsersAPI
