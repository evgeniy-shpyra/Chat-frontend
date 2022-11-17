import conversationSlice from './features/conversationSlice'
import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './features/usersSlice'
import authSlice from './features/authSlice'
import dialogueSlice from './features/dialoguesSlice'
import appSlice from './features/appSlice'

const store = configureStore({
    reducer: {
        app: appSlice,
        auth: authSlice,
        users: usersSlice,
        dialogue: dialogueSlice,
        conversation: conversationSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
