import { AppDispatch, RootState } from './../store'
import { chatAPI } from './../../api/endpoints/chatAPI'
import { ResultCode } from './../../api/index'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import DialoguesAPI from '../../api/endpoints/dialoguesAPI'
import { IDialogueData } from '../../models/models'

export const fetchDialogues = createAsyncThunk<
    Array<IDialogueData>,
    undefined,
    { rejectValue: string; state: RootState }
>('dialogs/fetchDialogues', async (_, { rejectWithValue, getState }) => {
    try {
        const uploadPage = getState().dialogue.currentUploadPage + 1
        const valueForSearching = getState().dialogue.valueForSearching

        const response = await DialoguesAPI.getDialogues(
            uploadPage,
            valueForSearching
        )

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        return response.data.data
    } catch (err: any) {
        return rejectWithValue((err as Error).message)
    }
})

export const addDialogueAsync = createAsyncThunk<
    IDialogueData,
    number,
    { rejectValue: string; dispatch: AppDispatch }
>('dialogs/addDialogue', async (id, { rejectWithValue, dispatch }) => {
    try {
        const response = await DialoguesAPI.addDialogue(id)

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        chatAPI.addDialogue(
            response.data.data.dialogue_id,
            response.data.data.user_id
        )

        return response.data.data
    } catch (err: any) {
        return rejectWithValue((err as Error).message)
    }
})

export const deleteDialogue = createAsyncThunk<
    { id: number },
    { dialogueId: number },
    { rejectValue: string; state: RootState }
>(
    'dialogs/deleteDialogue',
    async ({ dialogueId }, { rejectWithValue, getState }) => {
        try {
            const response = await DialoguesAPI.deleteDialogue(dialogueId)

            if (response.data.resultCode === ResultCode.Error)
                throw new Error(response.data.msg)

            const indexOfDialogue = getState().dialogue.dialogues.findIndex(
                (item) => item.dialogue_id == dialogueId
            )

            const toUserId =
                getState().dialogue.dialogues[indexOfDialogue].user_id

            chatAPI.deleteDialogue(dialogueId, toUserId)

            return response.data.data
        } catch (err: any) {
            return rejectWithValue((err as Error).message)
        }
    }
)

interface initialState {
    dialogues: Array<IDialogueData>
    error: string | null
    valueForSearching: string
    isLoading: boolean
    currentUploadPage: number
}

const initialState: initialState = {
    dialogues: [],
    error: null,
    valueForSearching: '',
    currentUploadPage: -1,
    isLoading: false,
}

export const dialogueSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        addDialogue: (state, action: PayloadAction<IDialogueData>) => {
            state.dialogues.unshift(action.payload)
        },
        changeValueForSearchingDialogues(state, action: PayloadAction<string>) {
            if (state.valueForSearching === '' || action.payload === '') {
                state.currentUploadPage = -1
                state.dialogues = []
                state.isLoading = true
            }
            state.valueForSearching = action.payload
        },
        updateMessageInDialogue(
            state,
            action: PayloadAction<{
                text: string
                date: string
                dialogueId: number
            }>
        ) {
            const index = state.dialogues.findIndex(
                (item) => item.dialogue_id === action.payload.dialogueId
            )

            if (index < 0) return

            const updatedDialogue = {
                ...state.dialogues[index],
                text: action.payload.text,
                date: action.payload.date,
            }

            state.dialogues.splice(index, 1)
            state.dialogues.unshift(updatedDialogue)
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDialogues.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                fetchDialogues.fulfilled,
                (state, action: PayloadAction<Array<IDialogueData>>) => {
                    if (state.valueForSearching === '') {
                        if (action.payload.length != 0)
                            state.dialogues = [
                                ...state.dialogues,
                                ...action.payload,
                            ]
                        state.currentUploadPage += 1
                    } else {
                        state.dialogues = action.payload
                    }
                    state.isLoading = false
                }
            )
            .addCase(fetchDialogues.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoading = false
            })
            .addCase(addDialogueAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                addDialogueAsync.fulfilled,
                (state, action: PayloadAction<IDialogueData>) => {
                    state.dialogues.unshift(action.payload)
                    state.isLoading = false
                }
            )
            .addCase(addDialogueAsync.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoading = false
            })
            .addCase(deleteDialogue.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                deleteDialogue.fulfilled,
                (state, action: PayloadAction<{ id: number }>) => {
                    // state.dialogues.unshift(action.payload)
                    const index = state.dialogues.findIndex(
                        (item) => item.dialogue_id == action.payload.id
                    )
                    if (index >= 0) state.dialogues.splice(index, 1)
                    state.isLoading = false
                }
            )
            .addCase(deleteDialogue.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoading = false
            })
    },
})

export const {
    addDialogue,
    changeValueForSearchingDialogues,
    updateMessageInDialogue,
} = dialogueSlice.actions

export default dialogueSlice.reducer
