import { chatAPI } from './../../api/endpoints/chatAPI'
import { ResultCode } from './../../api/index'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import DialoguesAPI from '../../api/endpoints/dialoguesAPI'
import { IDialogueData } from '../../models/models'

export const fetchDialogues = createAsyncThunk<
    Array<IDialogueData>,
    undefined,
    { rejectValue: string }
>('dialogs/fetchDialogues', async (_, { rejectWithValue }) => {
    try {
        const response = await DialoguesAPI.getDialogues()

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
    { rejectValue: string }
>('dialogs/addDialogue', async (id, { rejectWithValue }) => {
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

// export const deleteDialogue = createAsyncThunk<
//     IDialogueData,
//     number,
//     { rejectValue: string }
// >('dialogs/addDialogue', async (id, { rejectWithValue }) => {
//     try {
//         const response = await DialoguesAPI.addDialogue(id)

//         if (response.data.resultCode === ResultCode.Error)
//             throw new Error(response.data.msg)

//         chatAPI.addDialogue(response.data.data)

//         return response.data.data
//     } catch (err: any) {
//         return rejectWithValue((err as Error).message)
//     }
// })

interface initialState {
    dialogues: Array<IDialogueData>
    error: string | null
    isLoading: boolean
}

const initialState: initialState = {
    dialogues: [],
    error: null,
    isLoading: false,
}

export const dialogueSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        addDialogue: (state, action: PayloadAction<IDialogueData>) => {
            // console.log('action.payload', action.payload)
            state.dialogues.unshift(action.payload)
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
                    state.dialogues = action.payload
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
    },
})

export const { addDialogue } = dialogueSlice.actions

export default dialogueSlice.reducer
