import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './stores/rootReducer'

const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch

export default store
