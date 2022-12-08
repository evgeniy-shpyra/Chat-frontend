import { chatAPI } from './../../api/endpoints/chatAPI'
import { AuthStatusEnum } from '../../models/models'
import { AppDispatch, RootState } from '../store'
import { ResultCode } from '../../api/index'
import { ILoginDate, IRegisterDate } from '../../models/models'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserDate } from '../../models/models'
import authAPI from '../../api/endpoints/authAPI'

export const registration = createAsyncThunk<
    IUserDate,
    IRegisterDate,
    { rejectValue: string; dispatch: AppDispatch }
>('auth/registration', async (values, { dispatch, rejectWithValue }) => {
    try {
        const response = await authAPI.registration(values)

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        chatAPI.subscribe(dispatch, response.data.data.user.id)

        return response.data.data
    } catch (err) {
        return rejectWithValue((err as Error).message)
    }
})

export const login = createAsyncThunk<
    IUserDate,
    ILoginDate,
    { rejectValue: string; dispatch: AppDispatch }
>('auth/login', async (values, thunkAPI) => {
    try {
        const response = await authAPI.login(values)

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        // chatAPI.subscribe(thunkAPI.dispatch, response.data.data.user.user_id)
        chatAPI.subscribe(thunkAPI.dispatch, response.data.data.user.id)
        return response.data.data
    } catch (err) {
        return thunkAPI.rejectWithValue((err as Error).message)
    }
})

export const logout = createAsyncThunk<
    string,
    undefined,
    { rejectValue: string; state: RootState }
>('auth/logout', async (_, thunkAPI) => {
    try {
        const response = await authAPI.logout()
        const userId = thunkAPI.getState().auth.id
        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        if (userId) chatAPI.logout(userId)

        return response.data.data.token
    } catch (err) {
        return thunkAPI.rejectWithValue((err as Error).message)
    }
})

export const checkAuth = createAsyncThunk<
    IUserDate,
    undefined,
    { rejectValue: string; dispatch: AppDispatch }
>('auth/checkauth', async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await authAPI.refresh()

        if (response.data.resultCode === ResultCode.Error)
            throw new Error(response.data.msg)

        chatAPI.subscribe(dispatch, response.data.data.user.id)

        return response.data.data
    } catch (err) {
        return rejectWithValue((err as Error).message)
    }
})

export const setAvatar = createAsyncThunk<
    string,
    Blob,
    { state: RootState; rejectValue: string }
>('auth/setAvatar', async (file, thunkAPI) => {
    try {
        const userId = thunkAPI.getState().auth.id

        const formData = new FormData()

        formData.append('image', file)

        if (!userId) {
            throw new Error('The user is not authorized')
        }

        const response = await authAPI.setAvatar(formData)

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

export const authSlice = createSlice({
    name: 'auth',
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
                state.id = null
                state.username = null
                state.email = null
                state.imagePath = null
                state.isLoading = true
                state.error = null
                state.authStatus = AuthStatusEnum.Unknown
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<IUserDate>) => {
                    state.id = action.payload.user.id
                    state.username = action.payload.user.username
                    state.email = action.payload.user.email
                    if (action.payload.user.image_path)
                        state.imagePath = action.payload.user.image_path
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
                    if (action.payload.user.image_path)
                        state.imagePath = action.payload.user.image_path
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
            .addCase(logout.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(
                logout.fulfilled,
                (state, action: PayloadAction<string>) => {
                    localStorage.removeItem('token')
                    state.id = null
                    state.username = null
                    state.email = null
                    state.imagePath = null
                    state.error = null
                    state.authStatus = AuthStatusEnum.Logout
                    state.isLoading = false
                }
            )
            .addCase(logout.rejected, (state, action) => {
                if (action.payload) state.error = action.payload
                state.isLoading = false
            })
    },
})

export const { errorIsShown } = authSlice.actions

export default authSlice.reducer
