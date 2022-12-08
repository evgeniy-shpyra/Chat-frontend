import { IResponseMessageData } from './../../models/responseModels'
import { IMessageGetSocket } from './../../models/socketModels'
import { chatAPI } from './../../api/endpoints/chatAPI'
import { AppDispatch, RootState } from './../store'
import { IConversationData, IMessagesData } from './../../models/models'
import { ResultCode } from '../../api/index'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import ConversationAPI from '../../api/endpoints/conversationAPI'
import { clearHistory, updateMessageInDialogue } from './dialoguesSlice'

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
    { state: RootState; rejectValue: string; dispatch: AppDispatch }
>(
    'conversation/addMessageAsync',
    async (data, { rejectWithValue, getState, dispatch }) => {
        try {
            const dialogueId = getState().conversation.dialogueId
            const toUserId = getState().conversation.userId

            if (!dialogueId) {
                throw new Error('Occurred some error')
            }

            const response = await ConversationAPI.addMessage(
                data.text,
                dialogueId
            )

            if (response.data.resultCode === ResultCode.Error)
                throw new Error(response.data.msg)

            dispatch(
                updateMessageInDialogue({
                    text: response.data.data.text,
                    date: response.data.data.date,
                    dialogueId: dialogueId,
                })
            )

            toUserId &&
                chatAPI.addMessage({
                    message: response.data.data,
                    dialogueId,
                    toUserId,
                })

            return response.data.data
        } catch (err: any) {
            return rejectWithValue((err as Error).message)
        }
    }
)

export const deleteHistoryOfConversationAsync = createAsyncThunk<
    { dialogueId: number },
    { dialogueId: number },
    { rejectValue: string; dispatch: AppDispatch; state: RootState }
>(
    'conversation/deleteHistoryOfConversationAsync',
    async ({ dialogueId }, { rejectWithValue, dispatch, getState }) => {
        try {
            const response = await ConversationAPI.deleteConversation(
                dialogueId
            )

            if (response.data.resultCode === ResultCode.Error)
                throw new Error(response.data.msg)

            dispatch(clearHistory({ dialogueId }))

            const indexOfDialogue = getState().dialogue.dialogues.findIndex(
                (item) => item.dialogue_id == dialogueId
            )
            const toUserId =
                getState().dialogue.dialogues[indexOfDialogue].user_id

            chatAPI.deleteConversation(dialogueId, toUserId)

            return response.data.data
        } catch (err: any) {
            return rejectWithValue((err as Error).message)
        }
    }
)

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
            state.dialogueId = null
            state.userId = null
        },
        addDMessage: (state, action: PayloadAction<IMessageGetSocket>) => {
            if (action.payload.dialogueId === state.dialogueId)
                state.messages.push(action.payload.message)
        },
        deleteHistoryOfConversation: (
            state,
            action: PayloadAction<{ dialogueId: number }>
        ) => {
            if (state.dialogueId == action.payload.dialogueId)
                state.messages = []
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
                // state.isLoading = true
            })
            .addCase(
                addMessageAsync.fulfilled,
                (state, action: PayloadAction<IMessagesData>) => {
                    state.messages.push(action.payload)
                }
            )
            .addCase(addMessageAsync.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
            })
            .addCase(
                deleteHistoryOfConversationAsync.fulfilled,
                (state, action: PayloadAction<{ dialogueId: number }>) => {
                    if (state.dialogueId == action.payload.dialogueId)
                        state.messages = []
                }
            )
            .addCase(
                deleteHistoryOfConversationAsync.rejected,
                (state, action) => {
                    if (action.payload) state.error = action.payload
                }
            )
    },
})

export const { closeConversation, addDMessage, deleteHistoryOfConversation } =
    conversationSlice.actions
export default conversationSlice.reducer
