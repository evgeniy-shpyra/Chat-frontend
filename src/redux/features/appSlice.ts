import { StatusWindowEnum } from '../../models/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
    usersWindow: StatusWindowEnum
    accountWindow: StatusWindowEnum
    isDesktop: boolean
    isTablet: boolean
    isMobile: boolean
}

const initialState: IInitialState = {
    usersWindow: StatusWindowEnum.Close,
    accountWindow: StatusWindowEnum.Close,
    isDesktop: false,
    isTablet: false,
    isMobile: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        closeUsersWindow(state) {
            state.usersWindow = StatusWindowEnum.Close
        },
        openUsersWindow(state) {
            state.accountWindow = StatusWindowEnum.Close
            state.usersWindow = StatusWindowEnum.Open
        },
        closeAccountWindow(state) {
            state.accountWindow = StatusWindowEnum.Close
        },
        openAccountWindow(state) {
            state.usersWindow = StatusWindowEnum.Close
            state.accountWindow = StatusWindowEnum.Open
        },
        changeDeviceType(
            state,
            action: PayloadAction<{
                isDesktop: boolean
                isTablet: boolean
                isMobile: boolean
            }>
        ) {
            state.isDesktop = action.payload.isDesktop
            state.isTablet = action.payload.isTablet
            state.isMobile = action.payload.isMobile
        },
        closeAllWindows: (state) => {
            state.usersWindow = StatusWindowEnum.Close
            state.accountWindow = StatusWindowEnum.Close
        },
    },
})

export const {
    closeAllWindows,
    closeUsersWindow,
    openUsersWindow,
    closeAccountWindow,
    openAccountWindow,
    changeDeviceType,
} = appSlice.actions

export default appSlice.reducer
