import { IResponseAvatarData } from './../../models/models'
import instance from '..'

interface ISetAvatarData {
    file: FormData
    id: number
}

class UserAPI {
    static setAvatar = (values: ISetAvatarData) => {
        return instance.post<IResponseAvatarData>(`/setavatar/${values.id}`, values.file)
    }
}

export default UserAPI
