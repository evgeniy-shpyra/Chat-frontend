import { IResponseConversationData, IResponseMessageData } from './../../models/responseModels'
import instance from '..'

class ConversationAPI {
    static getConversation = (interlocutorId: number) => {
        return instance.get<IResponseConversationData>(
            `/conversation/${interlocutorId}`
        )
    }
    static addMessage = (text: string, dialogueId: number) => {
        return instance.post<IResponseMessageData>(`/message`, {
            text,
            dialogueId,
        })
    }
}

export default ConversationAPI
