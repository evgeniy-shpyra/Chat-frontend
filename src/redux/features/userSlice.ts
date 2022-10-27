import { RootState } from './../store'
import { ResultCode } from '../../api/index'
import { ILoginDate, IRegisterDate } from '../../models/models'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserDate } from '../../models/models'
import authAPI from '../../api/endpoints/authAPI'
import UserAPI from '../../api/endpoints/userAPI'

export const registration = createAsyncThunk(
    'user/registration',
    async (values: IRegisterDate, { rejectWithValue }) => {
        try {
            const response = await authAPI.registration(values)

            if (response.data.resultCode === ResultCode.Error)
                throw new Error(response.data.msg)

            return response.data
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (values: ILoginDate, { rejectWithValue }) => {
        try {
            const response = await authAPI.login(values)

            if (response.data.resultCode === ResultCode.Error)
                throw new Error(response.data.msg)

            return response.data
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'user/checkauth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authAPI.refresh()

            if (response.data.resultCode === ResultCode.Error)
                throw new Error(response.data.msg)

            return response.data
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const setAvatar = createAsyncThunk<
    string,
    Blob,
    { state: RootState; rejectValue: string }
>('user/setAvatar', async (file, thunkAPI) => {
    try {
        const userId = thunkAPI.getState().user.id

        const formData = new FormData()

        formData.append('image', file)

        if (!userId) {
            throw new Error('The user is not authorized')
        }

        const response = await UserAPI.setAvatar({
            file: formData,
            id: userId,
        })

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        return response.data.path
    } catch (err) {
        return thunkAPI.rejectWithValue((err as Error).message)
    }
})

interface IInitialState {
    id: number | null
    username: string | null
    email: string | null
    imagePath: string | null
    error: string | null
    isLoading: boolean
    isAuth: boolean
}

const initialState: IInitialState = {
    id: null,
    username: null,
    email: null,
    imagePath: null,
    error: null,
    isLoading: false,
    isAuth: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        errorIsShown(state) {
            state.error = null
        },
    },
    extraReducers(builder) {
        builder
            .addCase(registration.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(
                registration.fulfilled,
                (state, action: PayloadAction<IUserDate>) => {
                    state.id = action.payload.user.id
                    state.username = action.payload.user.username
                    state.email = action.payload.user.email
                    state.isLoading = false
                    state.isAuth = true
                    localStorage.setItem(
                        'token',
                        action.payload.tokens.accessToken
                    )
                }
            )
            .addCase(
                registration.rejected,
                (state, action: PayloadAction<any>) => {
                    state.error = action.payload
                    state.isAuth = false
                    state.isLoading = false
                }
            )
            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<IUserDate>) => {
                    state.id = action.payload.user.id
                    state.username = action.payload.user.username
                    state.email = action.payload.user.email
                    state.isLoading = false
                    state.isAuth = true
                    localStorage.setItem(
                        'token',
                        action.payload.tokens.accessToken
                    )
                }
            )
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
                state.isAuth = false
                state.isLoading = false
            })
            .addCase(setAvatar.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(
                setAvatar.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.imagePath = action.payload
                    state.isLoading = false
                }
            )
            .addCase(setAvatar.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoading = false
            })
    },
})

export const { errorIsShown } = userSlice.actions

export default userSlice.reducer
