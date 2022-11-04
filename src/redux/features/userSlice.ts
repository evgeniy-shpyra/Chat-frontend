import { AuthStatusEnum } from './../../models/models'
import { RootState } from '../store'
import { ResultCode } from '../../api/index'
import { ILoginDate, IRegisterDate } from '../../models/models'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserDate } from '../../models/models'
import authAPI from '../../api/endpoints/authAPI'
import UserAPI from '../../api/endpoints/userAPI'

export const registration = createAsyncThunk<
    IUserDate,
    IRegisterDate,
    { rejectValue: string }
>('user/registration', async (values, { rejectWithValue }) => {
    try {
        const response = await authAPI.registration(values)

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        return response.data.data
    } catch (err) {
        return rejectWithValue((err as Error).message)
    }
})

export const login = createAsyncThunk<
    IUserDate,
    ILoginDate,
    { rejectValue: string }
>('user/login', async (values, thunkAPI) => {
    try {
        const response = await authAPI.login(values)

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        return response.data.data
    } catch (err) {
        return thunkAPI.rejectWithValue((err as Error).message)
    }
})

export const checkAuth = createAsyncThunk<
    IUserDate,
    undefined,
    { rejectValue: string }
>('user/checkauth', async (_, { rejectWithValue }) => {
    try {
        const response = await authAPI.refresh()

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        return response.data.data
    } catch (err) {
        return rejectWithValue((err as Error).message)
    }
})

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
    authStatus: AuthStatusEnum
}

const initialState: IInitialState = {
    id: null,
    username: null,
    email: null,
    imagePath: null,
    error: null,
    isLoading: false,
    authStatus: AuthStatusEnum.Unknown,
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
                state.id = null
                state.username = null
                state.email = null
                state.imagePath = null
                state.isLoading = true
                state.error = null
                state.authStatus = AuthStatusEnum.Unknown
            })
            .addCase(
                registration.fulfilled,
                (state, action: PayloadAction<IUserDate>) => {
                    state.id = action.payload.user.id
                    state.username = action.payload.user.username
                    state.email = action.payload.user.email
                    state.isLoading = false
                    state.authStatus = AuthStatusEnum.Login
                    localStorage.setItem(
                        'token',
                        action.payload.tokens.accessToken
                    )
                }
            )
            .addCase(registration.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.authStatus = AuthStatusEnum.Logout
                state.isLoading = false
            })
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
                    if (action.payload.user.imagePath)
                        state.imagePath = action.payload.user.imagePath
                    state.isLoading = false
                    state.authStatus = AuthStatusEnum.Login
                    localStorage.setItem(
                        'token',
                        action.payload.tokens.accessToken
                    )
                }
            )
            .addCase(login.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                localStorage.removeItem('token')
                state.authStatus = AuthStatusEnum.Logout
                state.isLoading = false
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true
                state.error = null
                localStorage.removeItem('token')
            })
            .addCase(
                checkAuth.fulfilled,
                (state, action: PayloadAction<IUserDate>) => {
                    state.id = action.payload.user.id
                    state.username = action.payload.user.username
                    state.email = action.payload.user.email
                    if (action.payload.user.imagePath)
                        state.imagePath = action.payload.user.imagePath
                    state.isLoading = false
                    state.authStatus = AuthStatusEnum.Login
                    localStorage.setItem(
                        'token',
                        action.payload.tokens.accessToken
                    )
                }
            )
            .addCase(checkAuth.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                localStorage.removeItem('token')
                state.authStatus = AuthStatusEnum.Logout
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
