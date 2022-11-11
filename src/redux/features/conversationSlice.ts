import { IMessagesData } from './../../models/models'
import { ResultCode } from '../../api/index'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import DialoguesAPI from '../../api/endpoints/dialoguesAPI'
import ConversationAPI from '../../api/endpoints/conversationAPI'

export const fetchDialogues = createAsyncThunk<
    Array<IMessagesData>,
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

interface initialState {
    messages: Array<IMessagesData>
    error: string | null
    isLoading: boolean
}

const initialState: initialState = {
    messages: [],
    error: null,
    isLoading: false,
}

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchDialogues.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                fetchDialogues.fulfilled,
                (state, action: PayloadAction<Array<IMessagesData>>) => {
                    state.messages = action.payload
                    state.isLoading = false
                }
            )
            .addCase(fetchDialogues.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoading = false
            })
    },
})

export default conversationSlice.reducer
