import { IResponseConversationData } from './../../models/responseModels';
import {
    IResponseDialogueData,
    IResponseDialoguesData,
} from '../../models/responseModels'
import instance from '..'

class ConversationAPI {
    static getConversation = (interlocutorId: number) => {
        return instance.get<IResponseConversationData>(`/dialogues/${interlocutorId}`)
    }
}

export default ConversationAPI
