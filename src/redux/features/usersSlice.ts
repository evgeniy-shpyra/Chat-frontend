import { RootState } from './../store'
import { ResultCode } from '../../api/index'
import { IOtherUserData } from '../../models/models'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import UsersAPI from '../../api/endpoints/usersAPI'

export const fetchAllUsers = createAsyncThunk<
    Array<IOtherUserData>,
    undefined,
    { rejectValue: string; state: RootState }
>('users/fetchAllUsers', async (_, { rejectWithValue, getState }) => {
    try {
        const uploadPage = getState().users.currentUploadPage + 1
        const response = await UsersAPI.getAllUsers(uploadPage)

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        return response.data.users
    } catch (err: any) {
        return rejectWithValue((err as Error).message)
    }
})

interface IInitialState {
    users: Array<{
        user_id: number
        username: string
        email: string
        imagepath: string | null
    }>
    currentUploadPage: number
    isLoading: boolean
    error: string | null
}

const initialState: IInitialState = {
    users: [],
    currentUploadPage: -1,
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
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(
                fetchAllUsers.fulfilled,
                (state, action: PayloadAction<Array<IOtherUserData>>) => {
                    if (action.payload.length != 0) {
                        state.users = [...state.users, ...action.payload]
                            state.currentUploadPage += 1
                    }
                    state.isLoading = false
                }
            )
            .addCase(fetchAllUsers.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoading = false
            })
    },
})

export const { addUserToUsers } = usersSlice.actions

export default usersSlice.reducer
