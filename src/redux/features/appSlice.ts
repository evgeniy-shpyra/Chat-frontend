import { chatAPI } from '../../api/endpoints/chatAPI'
import { AuthStatusEnum, StatusWindowEnum } from '../../models/models'
import { AppDispatch, RootState } from '../store'
import { ResultCode } from '../../api/index'
import { ILoginDate, IRegisterDate } from '../../models/models'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserDate } from '../../models/models'
import authAPI from '../../api/endpoints/authAPI'

interface IInitialState {
    usersWindow: StatusWindowEnum
    accountWindow: StatusWindowEnum
}

const initialState: IInitialState = {
    usersWindow: StatusWindowEnum.Close,
    accountWindow: StatusWindowEnum.Close,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        closeUsersWindow(state) {
            state.usersWindow = StatusWindowEnum.Close
        },
        openUsersWindow(state) {
            state.usersWindow = StatusWindowEnum.Open
        },
        closeAccountWindow(state) {
            state.accountWindow = StatusWindowEnum.Close
        },
        openAccountWindow(state) {
            state.accountWindow = StatusWindowEnum.Open
        },
    },
})

export const {
    closeUsersWindow,
    openUsersWindow,
    closeAccountWindow,
    openAccountWindow,
} = appSlice.actions

export default appSlice.reducer
