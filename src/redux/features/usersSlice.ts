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
        const myId = getState().auth.id

        const response = await UsersAPI.getAllUsers(myId ? myId : 0)

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
    isLoadingUsers: boolean
    error: string | null
}

const initialState: IInitialState = {
    users: [],
    isLoadingUsers: false,
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
                state.isLoadingUsers = true
            })
            .addCase(
                fetchAllUsers.fulfilled,
                (state, action: PayloadAction<Array<IOtherUserData>>) => {
                    state.users = action.payload
                    state.isLoadingUsers = false
                }
            )
            .addCase(fetchAllUsers.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoadingUsers = false
            })
    },
})

export const { addUserToUsers } = usersSlice.actions

export default usersSlice.reducer
