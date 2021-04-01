import { configureStore } from '@reduxjs/toolkit';
import { persistedReducer } from './stores/rootReducer';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
