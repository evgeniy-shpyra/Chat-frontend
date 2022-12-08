import { AppDispatch, RootState } from './../store'
import { chatAPI } from './../../api/endpoints/chatAPI'
import { ResultCode } from './../../api/index'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import DialoguesAPI from '../../api/endpoints/dialoguesAPI'
import { IDialogueData } from '../../models/models'
import { createDialogueUsers, deleteDialogueUsers } from './usersSlice'

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

export const createDialogueAsync = createAsyncThunk<
    IDialogueData,
    number,
    { rejectValue: string; dispatch: AppDispatch }
>('dialogs/createDialogueAsync', async (id, { rejectWithValue, dispatch }) => {
    try {
        const response = await DialoguesAPI.addDialogue(id)

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        dispatch(createDialogueUsers({ userId: response.data.data.user_id }))

        chatAPI.addDialogue(
            response.data.data.dialogue_id,
            response.data.data.user_id
        )

        return response.data.data
    } catch (err: any) {
        return rejectWithValue((err as Error).message)
    }
})

export const deleteDialogueAsync = createAsyncThunk<
    { dialogueId: number },
    { dialogueId?: number; userId?: number },
    { rejectValue: string; dispatch: AppDispatch; state: RootState }
>(
    'dialogs/deleteDialogue',
    async (data, { rejectWithValue, dispatch, getState }) => {
        try {
            const myId = getState().auth.id
            let dialogueId: number

            if (data.dialogueId) dialogueId = data.dialogueId
            else if (data.userId) {
                const index = getState().dialogue.dialogues.findIndex(
                    (item) => item.user_id === data.userId
                )
                dialogueId = getState().dialogue.dialogues[index].dialogue_id
            } else throw new Error('Occurred some error')

            const response = await DialoguesAPI.deleteDialogue(dialogueId)

            if (response.data.resultCode === ResultCode.Error)
                throw new Error(response.data.msg)

            dispatch(
                deleteDialogueUsers({
                    userId: response.data.data.interlocutorId,
                })
            )
            if (myId)
                chatAPI.deleteDialogue(
                    dialogueId,
                    response.data.data.interlocutorId,
                    myId
                )

            return { dialogueId }
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
        clearDialogues: (state) => {
            state.dialogues= []
            state.error= null
            state.valueForSearching= ''
            state.currentUploadPage= -1
            state.isLoading= false
        },
        createDialogue: (state, action: PayloadAction<IDialogueData>) => {
            state.dialogues.unshift(action.payload)
        },
        deleteDialogue: (
            state,
            action: PayloadAction<{ dialogueId: number }>
        ) => {
            const index = state.dialogues.findIndex(
                (item) => item.dialogue_id == action.payload.dialogueId
            )
            if (index >= 0) state.dialogues.splice(index, 1)
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
        clearHistory(state, action: PayloadAction<{ dialogueId: number }>) {
            const index = state.dialogues.findIndex(
                (item) => item.dialogue_id === action.payload.dialogueId
            )
            if (index >= 0) state.dialogues[index].text = null
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDialogues.pending, (state) => {
                if (state.dialogues.length === 0) state.isLoading = true
            })
            .addCase(
                fetchDialogues.fulfilled,
                (state, action: PayloadAction<Array<IDialogueData>>) => {
                    if (state.valueForSearching === '') {
                        if (action.payload.length != 0) {
                            state.dialogues = [
                                ...state.dialogues,
                                ...action.payload,
                            ]
                            state.currentUploadPage += 1
                        }
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
            .addCase(createDialogueAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                createDialogueAsync.fulfilled,
                (state, action: PayloadAction<IDialogueData>) => {
                    state.dialogues.unshift(action.payload)
                    state.isLoading = false
                }
            )
            .addCase(createDialogueAsync.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoading = false
            })
            .addCase(deleteDialogueAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                deleteDialogueAsync.fulfilled,
                (state, action: PayloadAction<{ dialogueId: number }>) => {
                    const index = state.dialogues.findIndex(
                        (item) => item.dialogue_id == action.payload.dialogueId
                    )
                    if (index >= 0) state.dialogues.splice(index, 1)
                    state.isLoading = false
                }
            )
            .addCase(deleteDialogueAsync.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoading = false
            })
    },
})

export const {
    clearDialogues,
    createDialogue,
    changeValueForSearchingDialogues,
    updateMessageInDialogue,
    deleteDialogue,
    clearHistory,
} = dialogueSlice.actions

export default dialogueSlice.reducer
