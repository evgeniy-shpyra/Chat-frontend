import {
    IResponseDialogueData,
    IResponseDialoguesData,
} from './../../models/responseModels'
import instance from '..'

class DialoguesAPI {
    static getDialogues = (uploadPage: number, name: string | null) => {
        return instance.get<IResponseDialoguesData>(`/dialogues`, {
            params: { page: uploadPage, name },
        })
    }
    static addDialogue = (id: number) => {
        return instance.post<IResponseDialogueData>(`/dialogue/${id}`, {
            withCredentials: true,
        })
    }
}

export default DialoguesAPI
