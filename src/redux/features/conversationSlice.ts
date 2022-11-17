import { chatAPI } from './../../api/endpoints/chatAPI'
import { RootState } from './../store'
import { IConversationData, IMessagesData } from './../../models/models'
import { ResultCode } from '../../api/index'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import DialoguesAPI from '../../api/endpoints/dialoguesAPI'
import ConversationAPI from '../../api/endpoints/conversationAPI'

export const fetchConversation = createAsyncThunk<
    IConversationData,
    number,
    { rejectValue: string }
>(
    'conversation/fetchConversation',
    async (interlocutorId, { rejectWithValue }) => {
        try {
            const response = await ConversationAPI.getConversation(
                interlocutorId
            )

            if (response.data.resultCode === ResultCode.Error)
                throw new Error(response.data.msg)

            return response.data.data
        } catch (err: any) {
            return rejectWithValue((err as Error).message)
        }
    }
)

export const addMessageAsync = createAsyncThunk<
    IMessagesData,
    { text: string },
    { state: RootState; rejectValue: string }
>('conversation/addMessageAsync', async (data, { rejectWithValue, getState }) => {
    try {
        const dialogueId = getState().conversation.dialogueId
        const toUserId = getState().conversation.userId

        if (!dialogueId) {
            throw new Error('Occurred some error')
        }

        const response = await ConversationAPI.addMessage(data.text, dialogueId)

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        toUserId && chatAPI.addMessage(response.data.data, toUserId)

        return response.data.data
    } catch (err: any) {
        return rejectWithValue((err as Error).message)
    }
})

interface IInitialState {
    messages: IMessagesData[]
    dialogueId: number | null
    username: string | null
    imagePath: string | null
    userId: number | null
    isLoading: boolean
    error: string | null
}

const initialState: IInitialState = {
    messages: [],
    dialogueId: null,
    username: null,
    imagePath: null,
    userId: null,
    error: null,
    isLoading: false,
}

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        closeConversation(state) {
            state.messages = []
            state.username = null
            state.imagePath = null
            state.userId = null
        },
        addDMessage: (state, action: PayloadAction<IMessagesData>) => {
            // console.log('action.payload', action.payload)
            state.messages.push(action.payload)
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchConversation.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                fetchConversation.fulfilled,
                (state, action: PayloadAction<IConversationData>) => {
                    state.messages = action.payload.massages
                    state.dialogueId = action.payload.dialogueId
                    state.username = action.payload.interlocutorUser.username
                    state.imagePath = action.payload.interlocutorUser.image_path
                    state.userId = action.payload.interlocutorUser.user_id
                    state.isLoading = false
                }
            )
            .addCase(fetchConversation.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoading = false
            })
            .addCase(addMessageAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                addMessageAsync.fulfilled,
                (state, action: PayloadAction<IMessagesData>) => {
                    state.messages.push(action.payload)
                    state.isLoading = false
                }
            )
            .addCase(addMessageAsync.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoading = false
            })
    },
})

export const { closeConversation, addDMessage } = conversationSlice.actions
export default conversationSlice.reducer
