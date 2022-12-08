import { RootState } from './../store'
import { ResultCode } from '../../api/index'
import { IOtherUserData } from '../../models/models'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import UsersAPI from '../../api/endpoints/usersAPI'

export const fetchUsers = createAsyncThunk<
    Array<IOtherUserData>,
    undefined,
    { rejectValue: string; state: RootState }
>('users/fetchUsers', async (_, { rejectWithValue, getState }) => {
    try {
        const uploadPage: number = getState().users.currentUploadPage + 1
        const name: string = getState().users.valueForSearching

        const response = await UsersAPI.getAllUsers(uploadPage, name)

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        return response.data.users
    } catch (err: any) {
        return rejectWithValue((err as Error).message)
    }
})

interface IInitialState {
    users: Array<IOtherUserData>
    currentUploadPage: number
    valueForSearching: string
    isLoading: boolean
    error: string | null
}

const initialState: IInitialState = {
    users: [],
    currentUploadPage: -1,
    valueForSearching: '',
    isLoading: false,
    error: null,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUserToUsers(state, action: PayloadAction<IOtherUserData>) {
            state.users.push(action.payload)
        },
        changeValueForSearchingUsers(state, action: PayloadAction<string>) {
            if (state.valueForSearching === '' || action.payload === '') {
                state.currentUploadPage = -1
                state.users = []
                state.isLoading = true
            }
            state.valueForSearching = action.payload
        },
        clearUsers: (state) => {
            state.users = []
            state.currentUploadPage = -1
        },
        deleteDialogueUsers: (
            state,
            action: PayloadAction<{ userId: number }>
        ) => {
            
            const index = state.users.findIndex(
                (item) => item.user_id == action.payload.userId
            )
         
            if (index >= 0) state.users[index].is_exist_dialogue = 0
        },
        createDialogueUsers: (
            state,
            action: PayloadAction<{ userId: number }>
        ) => {
            const index = state.users.findIndex(
                (item) => item.user_id == action.payload.userId
            )
            // state.users = [...state.users]
            if (index >= 0) state.users[index].is_exist_dialogue = 1
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<Array<IOtherUserData>>) => {
                    if (state.valueForSearching === '') {
                        if (action.payload.length != 0)
                            state.users = [...state.users, ...action.payload]
                        state.currentUploadPage += 1
                    } else {
                        state.users = action.payload
                    }
                    state.isLoading = false
                }
            )
            .addCase(fetchUsers.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoading = false
            })
    },
})

export const {
    addUserToUsers,
    changeValueForSearchingUsers,
    clearUsers,
    deleteDialogueUsers,
    createDialogueUsers,
} = usersSlice.actions

export default usersSlice.reducer
