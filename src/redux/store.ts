import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './features/usersSlice'
import authSlice from './features/authSlice'
import dialogueSlice from './features/dialoguesSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        users: usersSlice,
        dialogue: dialogueSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
