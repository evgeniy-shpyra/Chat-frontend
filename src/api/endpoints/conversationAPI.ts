import {
    IResponseConversationData,
    IResponseMessageData,
    IResponseDeleteConversation,
} from './../../models/responseModels'
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
    static deleteConversation = (dialogueId: number) => {
        return instance.delete<IResponseDeleteConversation>(
            `/conversation/${dialogueId}`
        )
    }
}

export default ConversationAPI
