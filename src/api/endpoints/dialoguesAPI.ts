import {
    IResponseDialogueData,
    IResponseDialoguesData,
} from './../../models/responseModels'
import instance from '..'

class DialoguesAPI {
    static getDialogues = () => {
        return instance.get<IResponseDialoguesData>(`/dialogues`)
    }
    static addDialogue = (id: number) => {
        return instance.post<IResponseDialogueData>(`/dialogue/${id}`, {
            withCredentials: true,
        })
    }
}

export default DialoguesAPI
